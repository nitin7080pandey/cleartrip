import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputData } from '../../model/InputData.model';
import { LoginService } from 'src/app/login/services/login.service';
import { FlightService } from '../../services/flight.service';
import { Booking } from '../../model/booking.model';
import { FlightSearchResult } from '../../model/flightSearchResult.model';
declare var window: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public booking: Booking;
  public flightDetail: FlightSearchResult;
  public travellerCount: number;
  public bookingConfirm: boolean = false;
  formModal: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public loginService: LoginService, public flightService: FlightService) {
  }

  ngOnInit() {
    this.booking = new Booking();
    this.booking.customerNames = new Array<string>();
    this.bookingConfirm = false;
    let flightData = this.activatedRoute.snapshot.paramMap.get('flight')
    if (flightData) {
      this.flightDetail = JSON.parse(flightData);
      this.booking.flightData = this.flightDetail;
    }
    let count = this.activatedRoute.snapshot.paramMap.get('travellers')
    if (count) {
      this.travellerCount = +count;
      let i = 1;
      while (i <= this.travellerCount) {
        this.booking.customerNames.push("");
        i++;
        console.log(this.booking)
      }
    }

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );

  }

  confirmBooking() {
    this.flightService.confirmBooking(this.booking).then(
      (data) => {
        this.bookingConfirm = true;
        this.openFormModal();
      })
  }


  addTraveller() {
    this.booking.customerNames.push("");
  }

  deleteTraveller(val: string, i: number) {
    this.booking.customerNames.splice(i, 1);

  }

  openFormModal() {
    this.formModal.show();
  }
  
  saveSomeThing() {
    this.formModal.hide();
    this.router.navigate(['my-booking'], { replaceUrl: true })
  }

}
