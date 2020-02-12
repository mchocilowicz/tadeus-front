import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";


@Injectable()
export class UserService {

    constructor(private readonly httpService: HttpService<any>) {
    }

    getUsers(filters: any) {
        const params = Object.keys(filters).filter(it => filters[it]).map(it => `${ it }=${ filters[it] }`).join("&");
        return this.httpService.get('user?' + params);
    }

    getUserInformationBy(ID: string) {
        return this.httpService.get('user/' + ID);
    }
}
