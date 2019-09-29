import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import ApiResponse from "../models/api-response.interface";
import { HttpService } from "./http.service";


@Injectable()
export class LoginService {
    constructor(private readonly httpService: HttpService<any>) {
    }

    sendPhone(phone: string, phonePrefix: string): Observable<ApiResponse<any>> {
        return this.httpService.post('signIn', {phone, phonePrefix});
    }

    sendCode(phone: string, phonePrefix: string, code: number): Observable<ApiResponse<any>> {
        return this.httpService.post('code', {phone, phonePrefix, code});
    }
}
