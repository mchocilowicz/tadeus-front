import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {HttpService} from "../../services/http.service";
import {IType, TradingPointSave} from "../../models/trading-point.interface";
import {INgo} from "../../models/ngo.interface";
import {Observable} from "rxjs";
import ApiResponse from "../../models/api-response.interface";

@Injectable()
export class NgoService {

    constructor(private service: HttpService) {
    }

    getNgoBy(ID: string): Observable<ApiResponse<any>> {
        return this.service.get<any>('ngo/' + ID)
    }

    getNgoList() {
        return this.service.get<INgo[]>('ngo')
    }

    getNgoWithQuery(param: { name: string, city: string, type: string }) {
        let params = new HttpParams();
        Object.keys(param).forEach(k => {
            if (param[k]) {
                params = params.append(k, param[k])
            }
        });
        return this.service.get<INgo[]>('ngo', params)
    }

    updateNgo(ID: string, body: any) {
        return this.service.put(`ngo/${ID}`, body)
    }

    createNgo(body: any) {
        return this.service.post(`ngo`, body)
    }

    getTypes() {
        return this.service.get<IType[]>('ngo-type')
    }

    updateImage(ID: string, formData: FormData) {
        return this.service.image(`ngo/${ID}/image`, formData)
    }
}
