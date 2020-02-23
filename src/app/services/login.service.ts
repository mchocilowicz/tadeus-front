import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from "./http.service";


@Injectable()
export class LoginService {
    constructor(private readonly httpService: HttpService) {
    }

    sendPhone(phone: number, phonePrefix: number): Observable<any> {
        return this.httpService.post('signIn', {phone, phonePrefix});
    }

    sendCode(phone: number, phonePrefix: number, code: number): Observable<any> {
        return this.httpService.post('code', {phone, phonePrefix, code});
    }
}
