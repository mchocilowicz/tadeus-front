import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";

@Injectable()
export class StatusService {
    constructor(private httpServie: HttpService) {
    }

    getUserStatuses() {
        return this.httpServie.get<string[]>("user/status")
    }
}
