import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable()
export class StatusService {
    constructor(private httpServie: HttpService<any>) {
    }

    getUserStatuses() {
        return this.httpServie.get("user/status")
    }
}