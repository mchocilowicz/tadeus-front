import { Component, Injectable, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { MatTableDataSource } from "@angular/material/table";
// @ts-ignore
import moment = require("moment");

@Component({
    selector: 'app-trading-point-settlement',
    templateUrl: './trading-point-settlement.component.html',
    styleUrls: ['./trading-point-settlement.component.scss']
})
export class TradingPointSettlementComponent implements OnInit {

    data: SettlementPartnerData;
    displayedColumns: string[] = ['id', 'from', 'to', 'partner', 'count', 'sellPrice', 'donation', 'provision', 'price', 'paidPrice', 'isPaid', 'details'];
    dataSource: MatTableDataSource<any>;

    constructor(private service: TradingPointSettlementService) {
    }

    ngOnInit() {
        this.service.getSettlementData().subscribe(r => {
            if (r.data) {
                this.data = r.data;
                this.dataSource = new MatTableDataSource<any>(r.data.payments);
            }
        })
    }

    onCreateNewPeriod() {
        this.service.generateSettlements().subscribe(r => {
            if (r.data) {

            }
        })
    }

    canProcessNewUserPeriods(): boolean {
        return !(this.data.hasPartnerPeriod && this.data.hasDataToProcess && this.data.sendMessagesAt === null);
    }

    canCreateNewPartnerPeriods(): boolean {
        return this.data.hasPartnerPeriod;
    }

    canClosePeriod(): boolean {
        return !(this.data.notEditableAt && moment(this.data.notEditableAt).isAfter(moment()));
    }

    updatePaymentPrice($event, ID: string) {
        const el = this.dataSource.data.find(e => e.ID === ID);
        el.paidPrice = $event.target.valueAsNumber;
        if (el.paidPaid >= el.price) {
            el.isPaid = true;
        } else {
            el.isPaid = false;
        }
    }

    updatePaymentDetails($event, ID: string) {
        const el = this.dataSource.data.find(e => e.ID === ID);
        el.details = $event.target.value;
    }

    onSave() {
        console.log(this.dataSource.data)
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
        return this.http.post("settlement/partner", null);
    }
}

export interface SettlementPartnerData {
    userPeriodFrom: Date;
    hasPartnerPeriod: boolean;
    hasDataToProcess: boolean;
    payments: any[];
    partnerPeriodFrom: Date;
    isEditable: boolean;
    sendMessagesAt: Date;
    notEditableAt: Date;
    userCloseInterval: number;
    partnerEmailInterval: number;
    partnerCloseInterval: number;
    ngoGenerateInterval: number;
}