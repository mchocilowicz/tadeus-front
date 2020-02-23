import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {ICity} from "../models/city.interface";


@Injectable()
export class CityService {
    constructor(private readonly httpService: HttpService) {
    }

    getCities() {
        return this.httpService.get<ICity[]>('city');
    }
}
