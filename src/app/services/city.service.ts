import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";


@Injectable()
export class CityService {
    constructor(private readonly httpService: HttpService<any>) {
    }

    getCities() {
        return this.httpService.get('city');
    }
}
