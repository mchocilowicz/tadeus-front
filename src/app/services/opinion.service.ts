import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable()
export class OpinionService {

    constructor(private readonly httpService: HttpService<any>) {
    }

    getUsersOpinion() {
        return this.httpService.get('user/opinion');
    }
}