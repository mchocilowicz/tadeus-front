import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import ApiResponse from "../models/api-response.interface";
import {HttpService} from "./http.service";


@Injectable()
export class LoginService {
    constructor(private readonly httpService: HttpService<any>) {
    }

    sendPhone(phone: number, phonePrefix: number): Observable<ApiResponse<any>> {
        return this.httpService.post('signIn', {phone, phonePrefix});
    }

    sendCode(phone: number, phonePrefix: number, code: number): Observable<ApiResponse<any>> {
        return this.httpService.post('code', {phone, phonePrefix, code});
    }
}
