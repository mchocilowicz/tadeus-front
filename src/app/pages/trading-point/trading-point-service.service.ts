import { Injectable } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { HttpParams } from "@angular/common/http";
import { TradingPointSave } from "../../models/trading-point.interface";

@Injectable({
    providedIn: 'root'
})
export class TradingPointService {

    constructor(private readonly service: HttpService<any>) {
    }

    uploadFile(file: File) {
        return this.service.file('trading-point/upload', file)
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

    saveTerminal(id: string, phone: string) {
        return this.service.post(`trading-point/${id}/terminal`, {phone: phone})
    }

    getTradingPoint(id: string) {
        return this.service.get('trading-point/' + id)
    }

    updateTradingPoint(id: string, body: TradingPointSave) {
        return this.service.put(`trading-point/${id}`, body)
    }
}
