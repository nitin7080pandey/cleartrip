import { NgModule, Optional, SkipSelf } from "@angular/core";
import { DatastoreService } from "./datastore.service";
import { HttpClientModule } from "@angular/common/http";
import { MasterDataService } from "./master-data.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [DatastoreService, MasterDataService]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {

    }
}