import { InputData } from "./InputData.model";
import { Airport } from "./airport.model";

export class flightsearchParam {
    public id: number;
    public from:Airport;
    public to:Airport;
    public passengerCount:number;
    public travelClass:InputData;
    public dateOfFlight:string;
    
}