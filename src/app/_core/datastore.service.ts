import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { flightsearchParam } from "../flights/model/flightsearchParam.model";
import { Booking } from "../flights/model/booking.model";

@Injectable({ providedIn: 'root' })
export class DatastoreService {

    devMode: boolean = true;
    serviceurl: string = "http://localhost:1995/cleartravel.com/"

    constructor(private http: HttpClient) { }

    public readFromLocalJson(jsonPath: string): Observable<any> {
        // return this.http.get(jsonPath).pipe(catchError((error: any) => Observable.throw(error)));
        return this.http.get(jsonPath).pipe(catchError((error: any) => throwError(error)));
    }

    public getAirtports(): Promise<any> {
        console.log("getAirtports ===")
        return new Promise((resolve, reject) => {
            if (this.devMode) {
                this.readFromLocalJson('../../assets/jsons/airport.json').subscribe(res => {
                    console.log('--- airport List Dev-----');
                    console.log(res);
                    if (res) {
                        resolve(res);
                    }
                    else
                        resolve([]);
                })
            }
            else {
                const options = {
                    headers: { 'Content-Type': 'application/json' }
                }
                this.http.get(this.serviceurl + 'airport', options).subscribe(
                    data => {
                        console.log(data)
                        resolve(data);
                    },
                    err => {
                        console.log(err)
                    }
                )
            }
        })
    }

    public getTravelClassList(): Promise<any> {
        console.log("getTravelClassList ===")
        return new Promise((resolve, reject) => {
            this.readFromLocalJson('../../assets/jsons/travelclass.json').subscribe(res => {
                console.log('--- getTravelClassList List Dev-----');
                console.log(res);
                if (res) {
                    resolve(res);
                }
                else
                    resolve([]);
            })
        })
    }

    // public getTravelClassList(): Promise<any> {
    //     console.log("getTravelClassList ===")
    //     return new Promise((resolve, reject) => {
    //         if (this.devMode) {
    //             this.readFromLocalJson('../../assets/jsons/travelclass.json').subscribe(res => {
    //                 console.log('--- getTravelClassList List Dev-----');
    //                 console.log(res);
    //                 if (res) {
    //                     resolve(res);
    //                 }
    //                 else
    //                     resolve([]);
    //             })
    //         }
    //         else {
    //             const options = {
    //                 headers: { 'Content-Type': 'application/json' }
    //             }
    //             this.http.get(this.serviceurl + 'class', options).subscribe(
    //                 data => {
    //                     console.log(data)
    //                     resolve(data);
    //                 },
    //                 err => {
    //                     console.log(err)
    //                 }
    //             )
    //         }
    //     })
    // }

    public getFlights(searchObj: flightsearchParam): Promise<any> {
        console.log("getFlights ===")
        return new Promise((resolve, reject) => {
            if (this.devMode) {
                this.readFromLocalJson('../../assets/jsons/flight_search_result.json').subscribe(res => {
                    console.log('--- getFlights List Dev-----');
                    console.log(res);
                    if (res) {
                        resolve(res);
                    }
                    else
                        resolve([]);
                })
            }
            else {
                let params = new HttpParams()
                    .set('arrivalAirportCode', searchObj.to.code)
                    .append('departureAirportCode', searchObj.from.code)
                    .set('dateOfFlight', searchObj.dateOfFlight)
                    .set('numberOfPassengers', searchObj.passengerCount)
                    .set('travelClass', searchObj.travelClass.id);
                const options = {
                    headers: { 'Content-Type': 'application/json' },
                    params: params
                }
                this.http.get(this.serviceurl + 'flightdetails', { params }).subscribe(
                    data => {
                        console.log(data)
                        resolve(data);
                    },
                    err => {
                        console.log(err)
                    }
                )
            }
        })
    }

    public postBooking(bookingObj: Booking): Promise<any> {
        console.log("postBooking ===")
        return new Promise((resolve, reject) => {
            if (this.devMode) {
                resolve(true);
                // this.readFromLocalJson('../../assets/jsons/flight_search_result.json').subscribe(res => {
                //     console.log('--- getFlights List Dev-----');
                //     console.log(res);
                //     if (res) {
                //         resolve(res);
                //     }
                //     else
                //         resolve([]);
                // })
            }
            else {
                let customerNameList: string = "";
                bookingObj.customerNames.forEach((element, index) => {
                    customerNameList = customerNameList + ', ' + element
                });
                let params = new HttpParams()
                    .set('flightNumber', bookingObj.flightData.flightdetails[0].flightNumber)
                    .set('airline', bookingObj.flightData.flightdetails[0].airline)
                    .set('departureAirportCode', bookingObj.flightData.flightdetails[0].from.code)
                    .set('departureTime', bookingObj.flightData.flightdetails[0].departureTime)
                    .set('arrivalAirportCode', bookingObj.flightData.flightdetails[0].to.code)
                    .set('arrivalTime', bookingObj.flightData.flightdetails[0].arrivalTime)
                    .set('amount', bookingObj.flightData.flightdetails[0].price)
                    .set('numberOfPassengers', bookingObj.numberOfPassengers)
                    .set('travelClass', bookingObj.flightData.flightdetails[0].travelClass.id)
                    .set('dateOfFlight', bookingObj.flightData.flightdetails[0].dateOfFlight)
                    .set('customerPhone', bookingObj.customerPhone)
                    .set('userID', bookingObj.user.userid)
                    .set('customerName', customerNameList);

                if (bookingObj.flightData.flightdetails.length >= 2) {
                    let innerParam = new HttpParams()
                        .set('flightNumber', bookingObj.flightData.flightdetails[1].flightNumber)
                        .set('airline', bookingObj.flightData.flightdetails[1].airline)
                        .set('departureAirportCode', bookingObj.flightData.flightdetails[1].from.code)
                        .set('departureTime', bookingObj.flightData.flightdetails[1].departureTime)
                        .set('arrivalAirportCode', bookingObj.flightData.flightdetails[1].to.code)
                        .set('arrivalTime', bookingObj.flightData.flightdetails[1].arrivalTime)
                        .set('amount', bookingObj.flightData.flightdetails[1].price)
                        .set('numberOfPassengers', bookingObj.numberOfPassengers)
                        .set('travelClass', bookingObj.flightData.flightdetails[1].travelClass.id)
                        .set('dateOfFlight', bookingObj.flightData.flightdetails[1].dateOfFlight)

                    params = params.append("connectedFlight", JSON.stringify(innerParam));
                }
                const options = {
                    headers: { 'Content-Type': 'application/json' },
                    params: params
                }
                this.http.post(this.serviceurl + 'bookflight', options).subscribe(
                    data => {
                        console.log(data)
                        resolve(data);
                    },
                    err => {
                        console.log(err)
                    }
                )
            }
        })
    }

    public getUserBooking(): Promise<any> {
        console.log("getUser ===")
        return new Promise((resolve, reject) => {
            if (this.devMode) {
                console.log("dev mode")
                this.readFromLocalJson('../../assets/jsons/userbooking.json').subscribe(res => {
                    console.log('--- getUserBooking List Dev-----');
                    console.log(res);
                    if (res) {
                        resolve(res);
                    }
                    else
                        resolve([]);
                })
            }
            else {
                const options = {
                    headers: { 'Content-Type': 'application/json' }
                }
                this.http.get(this.serviceurl + 'users', options).subscribe(
                    data => {
                        console.log(data)
                        resolve(data);
                    },
                    err => {
                        console.log(err)
                    }
                )
            }
        })
    }

}