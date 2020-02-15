import {Injectable} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {HttpParams} from "@angular/common/http";
import {TradingPointSave} from "../../models/trading-point.interface";

@Injectable({
    providedIn: 'root'
})
export class TradingPointService {

    constructor(private readonly service: HttpService<any>) {
    }

    getTradingPoints() {
        return this.service.get('trading-point')
    }

    getTradingPointsWithQuery(param: { name: string, city: string, type: string }) {
        let params = new HttpParams();
        Object.keys(param).forEach(k => {
            if (param[k]) {
                params = params.append(k, param[k])
            }
        });
        console.log(params);
        return this.service.get('trading-point', params)
    }

    getTypes() {
        return this.service.get('trading-point-type')
    }

    saveTerminal(ID: string, body: any) {
        return this.service.post(`trading-point/${ID}/terminal`, body)
    }

    getTradingPoint(ID: string) {
        return this.service.get('trading-point/' + ID)
    }

    updateTradingPoint(ID: string, body: TradingPointSave) {
        return this.service.put(`trading-point/${ID}`, body)
    }

    createTradingPoint(body: any) {
        return this.service.post(`trading-point`, body)
    }

    updateImage(ID: string, formData: FormData) {
        return this.service.image(`trading-point/${ID}/image`, formData)
    }

}
