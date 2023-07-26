import { User } from "src/app/login/model/user.model";
import { FlightDetail } from "./flightdetail.model";
import { FlightSearchResult } from "./flightSearchResult.model";

export class Booking {
    public bookingId:Number;
    public flightData: FlightSearchResult;
    public customerNames: Array<string>;
    public numberOfPassengers :number;
    public customerPhone: string;
    public user: User;
   
}