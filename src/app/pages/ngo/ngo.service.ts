import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {HttpService} from "../../services/http.service";
import {IType} from "../../models/trading-point.interface";
import {INgo} from "../../models/ngo.interface";

@Injectable()
export class NgoService {

    constructor(private service: HttpService) {
    }

    getNgoBy(ID: string) {
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

    getTypes() {
        return this.service.get<IType[]>('ngo-type')
    }
}
