import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from './flights/components/flights/flights.component';
import { BookingComponent } from './flights/components/booking/booking.component';
import { LoginComponent } from './login/components/login/login.component';
import { MyBookingComponent } from './user/components/my-booking/myBooking.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'flight-list', component: FlightsComponent},
  {path: 'confirm-booking/:flight/:travellers', component: BookingComponent},
  {path: 'my-booking', component: MyBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
