import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import ApiResponse from '../models/api-response.interface';
import {environment} from '../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {Injectable} from "@angular/core";

@Injectable()
export class HttpService<T> {
    constructor(private readonly httpClient: HttpClient, private readonly translateService: TranslateService) {
    }

    get(path: string, params: any = null): Observable<ApiResponse<T>> {
        return this.httpClient.get<ApiResponse<T>>(environment.url + path, {
            headers: this.prepareHeaders(),
            params: params
        });
    }

    post(path: string, body: any): Observable<ApiResponse<T>> {
        return this.httpClient.post<ApiResponse<T>>(environment.url + path, body, {headers: this.prepareHeaders()});
    }

    file(path: string, file: any) {
        const formData = new FormData();
        formData.append('file', file);
        return this.httpClient.post<ApiResponse<T>>(environment.url + path, formData, {headers: this.fileHeaders()})
    }

    put(path: string, body: object) {
        return this.httpClient.put<ApiResponse<T>>(environment.url + path, body, {headers: this.prepareHeaders()});
    }

    delete(path: string) {
        return this.httpClient.delete<ApiResponse<T>>(environment.url + path, {headers: this.prepareHeaders()});
    }

    private prepareHeaders(): HttpHeaders {
        return new HttpHeaders().set('Accept-Language', this.translateService.currentLang);
    }

    private fileHeaders(): HttpHeaders {
        return new HttpHeaders()
            .set('Accept', 'application/json');
    }
}
