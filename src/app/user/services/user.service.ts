import { Injectable } from '@angular/core';
import { User } from "../model/user.model";
import { DatastoreService } from 'src/app/_core/datastore.service';
import { Booking } from 'src/app/flights/model/booking.model';
import { FlightSearchResult } from 'src/app/flights/model/flightSearchResult.model';
import { FlightDetail } from 'src/app/flights/model/flightdetail.model';
import { LoginService } from 'src/app/login/services/login.service';
import { Airport } from 'src/app/flights/model/airport.model';
import { InputData } from 'src/app/flights/model/InputData.model';
import { MasterDataService } from 'src/app/_core/master-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedUser: User;
  public myBookings: Array<Booking>;

  constructor(private dataStoreService: DatastoreService, private loginService: LoginService, private masterDataService: MasterDataService) {

  }


  public getMyBookingList(): Promise<Array<Booking>> {
    this.myBookings = new Array<Booking>();
    return new Promise((resolve, reject) => {
      this.dataStoreService.getUserBooking().then((res: Array<any>) => {
        let currentUSer = res.find(x => x.id == this.loginService.loggedUser.userid)
        if (currentUSer) {
          currentUSer.bookingList.forEach((element: any) => {
            let myBooking = new Booking();
            myBooking.bookingId = element.bookingId;
            myBooking.customerNames = new Array<string>();
            myBooking.customerNames.push(element.customerName);
            myBooking.customerPhone = element.customerPhone;
            myBooking.flightData = new FlightSearchResult();
            myBooking.flightData.flightdetails = new Array<FlightDetail>();
            let flightDetail = new FlightDetail();
            flightDetail.flightNumber = element.flightNumber;
            flightDetail.dateOfFlight = element.dateOfFlight;
            flightDetail.legNumber = element.legNumber;
            flightDetail.seatNumber = element.seatNumber;
            flightDetail.from = new Airport();
            let fromData = this.masterDataService.airportList.find(x => x.code == element.departureAirportCode);
            flightDetail.from = fromData ? fromData : new Airport();
            flightDetail.departureTime = element.departureTime;
            flightDetail.arrivalTime = element.arrivalTime;
            flightDetail.to = new Airport();
            let toData = this.masterDataService.airportList.find(x => x.code == element.arrivalAirportCode);
            flightDetail.to = toData ? toData : new Airport();
            flightDetail.travelClass = new InputData();
            flightDetail.airline = element.airline;
            myBooking.flightData.flightdetails.push(flightDetail);
            this.myBookings.push(myBooking);
            console.log(this.myBookings);
          });
        }
      })
    })
  }
}
