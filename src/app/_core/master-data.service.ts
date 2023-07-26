import { Injectable } from "@angular/core";
import { DatastoreService } from "src/app/_core/datastore.service";
import { Airport } from "../flights/model/airport.model";
import { InputData } from "../flights/model/InputData.model";

@Injectable({ providedIn: 'root' })
export class MasterDataService {
    public airportList = new Array<Airport>();
    public travelClassList = new Array<InputData>();

    constructor(private dataStoreService: DatastoreService) { }

    public loadMasterData() {
        this.getAirtports();
        this.getTravelClassList();
    }

    public getAirtports(): Promise<Array<Airport>> {
        this.airportList = new Array<Airport>();
        return new Promise((resolve, reject) => {
            this.dataStoreService.getAirtports().then(res => {
                if (res) {
                    res.forEach((element: any) => {
                        let airport = new Airport();
                        airport.id = element.airportSrId;
                        airport.code = element.airportCode;
                        airport.name = element.airportName;
                        airport.city = element.airportCity;
                        this.airportList.push(airport);
                    });
                }
            })
        })
    }

    public getTravelClassList(): Promise<Array<Airport>> {
        this.airportList = new Array<Airport>();
        return new Promise((resolve, reject) => {
            this.dataStoreService.getTravelClassList().then(res => {
                if (res) {
                    res.forEach((element: any) => {
                        let travelClass = new InputData();
                        travelClass.id = element.airportSrId;
                        travelClass.value = element.className;
                        this.travelClassList.push(travelClass);
                    });
                }
            })
        })
    }

}