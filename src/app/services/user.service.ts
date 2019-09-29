import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";


@Injectable()
export class UserService {

    constructor(private readonly httpService: HttpService<any>) {
    }

    getUsers() {
        return this.httpService.get('user');
    }
}
