import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import ApiResponse from "../models/api-response.interface";

@Injectable()
export class HttpService {
    constructor(private readonly httpClient: HttpClient, private readonly translateService: TranslateService) {
    }

    get<T>(path: string, params: any = null): Observable<ApiResponse<T>> {
        return this.httpClient.get<ApiResponse<T>>(environment.url + path, {
            headers: this.prepareHeaders(),
            params: params
        });
    }

    post<T>(path: string, body: any) {
        return this.httpClient.post<ApiResponse<T>>(environment.url + path, body, {headers: this.prepareHeaders()});
    }

    file<T>(path: string, file: any) {
        const formData = new FormData();
        formData.append('file', file);
        return this.httpClient.post<T>(environment.url + path, formData, {headers: this.fileHeaders()})
    }

    image(path: string, formData: FormData) {
        return this.httpClient.post(environment.url + path, formData, {headers: this.fileHeaders()})
    }

    put<T>(path: string, body: object) {
        return this.httpClient.put<ApiResponse<T>>(environment.url + path, body, {headers: this.prepareHeaders()});
    }

    delete<T>(path: string) {
        return this.httpClient.delete<ApiResponse<T>>(environment.url + path, {headers: this.prepareHeaders()});
    }

    private prepareHeaders(): HttpHeaders {
        return new HttpHeaders().set('Accept-Language', this.translateService.currentLang);
    }

    private fileHeaders(): HttpHeaders {
        return new HttpHeaders()
            .set('Accept', 'multipart/form-data');
    }
}
