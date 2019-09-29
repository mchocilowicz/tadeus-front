import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import ApiResponse from '../models/api-response.interface';
import { environment } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from "@angular/core";

@Injectable()
export class HttpService<T> {
    constructor(private readonly httpClient: HttpClient, private readonly translateService: TranslateService) {
    }

    get(path: string): Observable<ApiResponse<T>> {
        return this.httpClient.get<ApiResponse<T>>(environment.url + path, {headers: this.prepareOptions()});
    }

    post(path: string, body: any): Observable<ApiResponse<T>> {
        return this.httpClient.post<ApiResponse<T>>(environment.url + path, body, {headers: this.prepareOptions()});
    }

    private prepareOptions(): HttpHeaders {
        return new HttpHeaders().set('Accept-Language', this.translateService.currentLang);
    }
}
