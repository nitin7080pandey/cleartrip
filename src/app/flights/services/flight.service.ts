import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { DatastoreService } from "src/app/_core/datastore.service";
import { Airport } from "../model/airport.model";
import { InputData } from "../model/InputData.model";
import { flightsearchParam } from "../model/flightsearchParam.model";
import { FlightDetail } from "../model/flightdetail.model";
import { FlightSearchResult } from "../model/flightSearchResult.model";
import { Booking } from "../model/booking.model";
import { MasterDataService } from "src/app/_core/master-data.service";

@Injectable({ providedIn: 'root' })
export class FlightService {
    public flightSearchResult = new Array<FlightSearchResult>();


    constructor(private http: HttpClient, private dataStoreService: DatastoreService, private masterDataService: MasterDataService) { }

    public searchFlight(searchObj: flightsearchParam): Promise<any> {
        console.log("searchFlight ======")
        this.flightSearchResult = new Array<FlightSearchResult>();
        return new Promise((resolve, reject) => {
            this.dataStoreService.getFlights(searchObj).then(
                (data) => {
                    console.log("search data received -------");
                    console.log(data)

                    data.forEach((element: any) => {
                        let flightSearchRes = new FlightSearchResult();
                        flightSearchRes.flightdetails = new Array<FlightDetail>();
                        console.log(data);
                        // let flightDetailList = new Array<FlightDetail>();
                        let flightInfo = this.BindFlightDetail(element)
                        flightSearchRes.flightdetails.push(flightInfo);
                        if (element.connectedFlight) {
                            let connectFlight = this.BindFlightDetail(element.connectedFlight);
                            flightSearchRes.flightdetails.push(connectFlight);
                            this.flightSearchResult.push(flightSearchRes);
                            console.log(this.flightSearchResult)
                        }
                        else {
                            this.flightSearchResult.push(flightSearchRes);
                            console.log(this.flightSearchResult)

                        }
                        // else
                        // {
                        //     flightSearchRes.flightdetails.push(flightDetailList);
                        // }
                    });

                },
                err => {

                }
            )

        })
    }

    BindFlightDetail(element: any): FlightDetail {
        let flightInfo = new FlightDetail();
        flightInfo.airline = element.airline;
        flightInfo.flightNumber = element.flightNumber;
        flightInfo.dateOfFlight = element.dateOfFlight;
        flightInfo.departureTime = element.departureTime;
        flightInfo.from = new Airport();
        let fromData = this.masterDataService.airportList.find(x => x.code == element.departureAirportCode);
        flightInfo.from = fromData ? fromData : new Airport();
        flightInfo.to = new Airport();
        let toData = this.masterDataService.airportList.find(x => x.code == element.arrivalAirportCode);
        flightInfo.to = toData ? toData : new Airport();
        flightInfo.passengerCount = element.numberOfPassengers;
        flightInfo.travelClass = new InputData();
        let travelClass = this.masterDataService.travelClassList.find(x => x.id == element.travelClass);
        flightInfo.travelClass = travelClass ? travelClass : new InputData();
        flightInfo.price = element.amount;
        flightInfo.availableSeats = element.availableSeats;
        return flightInfo;
    }

    public confirmBooking(bookingObj: Booking): Promise<any> {
        this.flightSearchResult = new Array<FlightSearchResult>();
        return new Promise((resolve, reject) => {
            this.dataStoreService.postBooking(bookingObj).then(
                (data) => {
                    resolve(true);
                },
                err => {
                    reject(err);

                }
            )

        })
    }

}