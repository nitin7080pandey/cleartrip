import { User } from "src/app/login/model/user.model";
import { InputData } from "./InputData.model";
import { Airport } from "./airport.model";

export class FlightDetail {
    public flightNumber: string;
    public airline: string;
    public from: Airport;
    public to: Airport;
    public passengerCount: number;
    public travelClass: InputData;
    public dateOfFlight: string;
    public price: number;
    public departureTime: string;
    public arrivalTime: string;
    public availableSeats: number;
    public legNumber: string;
    public seatNumber: string;
}