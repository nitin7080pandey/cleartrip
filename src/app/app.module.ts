import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './_core/core.module';
import { FlightsComponent } from './flights/components/flights/flights.component';
import { BookingComponent } from './flights/components/booking/booking.component';
import { LoginComponent } from './login/components/login/login.component';
import { MyBookingComponent } from './user/components/my-booking/myBooking.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FlightsComponent,
    BookingComponent,
    MyBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
