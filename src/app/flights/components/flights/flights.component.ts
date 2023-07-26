import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputData } from '../../model/InputData.model';
import { flightsearchParam } from '../../model/flightsearchParam.model';
import { LoginService } from 'src/app/login/services/login.service';
import { FlightService } from '../../services/flight.service';
import { Airport } from '../../model/airport.model';
import { FlightSearchResult } from '../../model/flightSearchResult.model';
import { MasterDataService } from 'src/app/_core/master-data.service';


@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  selectedStartDate: string;
  travellerFlag: boolean = false;
  flightDestinationList: Array<InputData>;
  flightSearchParam: flightsearchParam;

  constructor(public loginService: LoginService, public flightService: FlightService, private router: Router, public masterDataService: MasterDataService) {
  }

  ngOnInit() {
    this.flightSearchParam = new flightsearchParam();
    this.flightSearchParam.from = new Airport();
    this.flightSearchParam.to = new Airport();
    this.flightSearchParam.travelClass = new InputData();
  }

  updateMyDate(event: any) {
    this.selectedStartDate = event.target.value;
  }

  updateTravellers(event: any) {
    this.travellerFlag = !this.travellerFlag;

  }

  searchFlights() {
    console.log(this.flightSearchParam)
    console.log(JSON.stringify(this.flightSearchParam));
    this.flightService.searchFlight(this.flightSearchParam)

  }

  bookFlight(flightDetails: FlightSearchResult) {
    if (!this.flightSearchParam.passengerCount || this.flightSearchParam.passengerCount <= 0) {
      this.flightSearchParam.passengerCount = 1;
    }
    this.router.navigate(['confirm-booking', JSON.stringify(flightDetails), this.flightSearchParam.passengerCount], { replaceUrl: true })

  }




}
