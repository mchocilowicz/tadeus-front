import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Opinion} from "../models/opinion.interface";

@Injectable()
export class OpinionService {

    constructor(private readonly httpService: HttpService) {
    }

    getUsersOpinion() {
        return this.httpService.get<Opinion[]>('user/opinion');
    }

    getTradingPointsOpinion() {
        return this.httpService.get<Opinion[]>('trading-point/opinion');
    }
}
