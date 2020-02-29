import { Component, Injectable, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";

@Component({
    selector: 'app-trading-point-settlement',
    templateUrl: './trading-point-settlement.component.html',
    styleUrls: ['./trading-point-settlement.component.scss']
})
export class TradingPointSettlementComponent implements OnInit {

    constructor(private service: TradingPointSettlementService) {
    }

    ngOnInit() {
        this.service.getSettlementData().subscribe(r => {
            if (r.data) {
                console.log(r.data);
            }
        })
    }

}


@Injectable()
export class TradingPointSettlementService {
    constructor(private http: HttpService) {
    }

    getSettlementData() {
        return this.http.get<SettlementPartnerData>("settlement/partner");
    }

    generateSettlements() {
        this.http.post("settlement/partner", null)
    }
}

export interface SettlementPartnerData {
    userPeriodFrom: Date;
    hasPartnerPeriod: boolean;
    hasData: boolean;
    payments: any[];
    partnerPeriodFrom: Date;
    isEditable: boolean;
    sendMessagesAt: Date;
    notEditableAt: Date;
}