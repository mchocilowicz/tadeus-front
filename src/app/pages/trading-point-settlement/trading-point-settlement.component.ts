import { Component, Injectable, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import * as moment from 'moment'

@Component({
    selector: 'app-trading-point-settlement',
    templateUrl: './trading-point-settlement.component.html',
    styleUrls: ['./trading-point-settlement.component.scss']
})
export class TradingPointSettlementComponent implements OnInit {

    data: SettlementPartnerData;
    displayedColumns: string[] = ['id', 'from', 'to', 'partner', 'count', 'sellPrice', 'donation', 'provision', 'price', 'paidPrice', 'isPaid', 'details', 'sendMessagesAt'];
    dataSource: MatTableDataSource<any>;
    periods: any[] = null;
    selectedPeriod: any = null;
    showAll: boolean = false;

    userPeriod: Date = null;
    partnerPeriod: Date = null;
    mailSendAt: Date = null;
    notEditableAt: Date = null;
    closeAt: Date = null;

    constructor(private router: Router,
                private service: TradingPointSettlementService) {
    }

    ngOnInit() {
        this.getSettlementsData();
        this.service.getPeriodsList().subscribe(r => {
            if (r.data) {
                this.periods = r.data;
            }
        })
    }

    onCreateNewPeriod() {
        this.service.generateSettlements().subscribe(r => {
            if (!r.error) {
                this.router.navigateByUrl('settlement/trading-point')
            }
        })
    }

    onSearchClick() {
        this.getSettlementsData();
    }

    canProcessNewUserPeriods(): boolean {
        return !(this.data.hasDataToProcess && !this.data.isClosed && this.data.isEditable);
    }

    canSendEmails(): boolean {
        return !(this.data.isEditable && !this.data.isClosed && this.isDateAfter(this.data.sendMessagesAt));
    }

    canClosePeriod(): boolean {
        return !(!this.data.isEditable && !this.data.isClosed && this.isDateAfter(this.data.notEditableAt));
    }

    canGeneratePayout(): boolean {
        return !(this.data.generatePayout && this.data.isClosed && this.isDateAfter(this.data.closedAt))
    }

    updatePaymentPrice($event, ID: string) {
        const el = this.dataSource.data.find(e => e.ID === ID);
        el.paidPrice = $event.target.valueAsNumber;
        el.isPaid = el.paidPaid >= el.price;
        el.hasChanges = true;
    }

    updatePaymentDetails($event, ID: string) {
        const el = this.dataSource.data.find(e => e.ID === ID);
        el.details = $event.target.value;
        el.hasChanges = true;
    }

    onSave() {
        const changedData = this.dataSource.data.filter(e => e.hasChanges);
        if (changedData.length > 0) {
            this.service.onSaveChanges(changedData).subscribe(r => {
                if (!r.error) {
                    this.router.navigateByUrl('settlement/ngo')
                }
            })
        }
    }

    onSendNotification() {
        this.service.generateNotifications().subscribe(r => {
            if (!r.error) {
                this.router.navigateByUrl('settlement/trading-point')
            }
        })
    }

    onClosePeriod() {
        this.service.closePartnerPeriod().subscribe(r => {
            if (!r.error) {
                this.router.navigateByUrl('settlement/trading-point')
            }
        })
    }

    onGeneratePayout() {
        this.service.generatePayoutData(this.selectedPeriod).subscribe(r => {
            if (!r.error) {
                this.router.navigateByUrl('settlement/trading-point')
            }
        })
    }

    private getSettlementsData() {
        this.service.getSettlementData(this.showAll, this.selectedPeriod).subscribe(r => {
            if (r.data) {
                this.data = r.data;
                this.selectedPeriod = r.data.partnerPeriodId;
                this.dataSource = new MatTableDataSource<any>(r.data.payments);
                if (this.data.userPeriodFrom) {
                    this.userPeriod = moment(this.data.userPeriodFrom).toDate();
                } else {
                    this.userPeriod = moment().toDate();
                }
                if (this.data.partnerPeriodFrom) {
                    this.partnerPeriod = moment(this.data.partnerPeriodFrom).toDate()
                } else {
                    this.partnerPeriod = moment(this.userPeriod).add(this.data.userCloseInterval, 'days').toDate();
                }
                if (this.data.sendMessagesAt) {
                    this.mailSendAt = moment(this.data.sendMessagesAt).toDate();
                } else {
                    this.mailSendAt = moment(this.partnerPeriod).add(this.data.partnerEmailInterval, 'days').toDate();
                }
                if (this.data.notEditableAt) {
                    this.notEditableAt = moment(this.data.notEditableAt).toDate();
                } else {
                    this.notEditableAt = moment(this.mailSendAt).add(this.data.partnerCloseInterval, 'days').toDate();
                }
                if (this.data.closedAt) {
                    this.closeAt = moment(this.data.closedAt).toDate();
                } else {
                    this.closeAt = moment(this.notEditableAt).add(this.data.ngoGenerateInterval, 'days').toDate();
                }
            }
        });
    }

    private isDateBefore(date): boolean {
        if (date) {
            return moment().isSameOrBefore(date)
        }
        return false;
    }

    private isDateAfter(date): boolean {
        if (date) {
            return moment().isSameOrAfter(date)
        }
        return false;
    }
}


@Injectable()
export class TradingPointSettlementService {
    constructor(private http: HttpService) {
    }

    getPeriodsList() {
        return this.http.get<any>("settlement/partner/periods");
    }

    getSettlementData(showAll: boolean, selectedPeriod: string) {
        let params = new HttpParams()
            .append('showAll', `${ showAll }`)
            .append('selectedPeriod', selectedPeriod);
        return this.http.get<SettlementPartnerData>("settlement/partner", params);
    }

    generateSettlements() {
        return this.http.post("settlement/partner", null);
    }

    onSaveChanges(data: any) {
        return this.http.put("settlement/partner", data)
    }

    generateNotifications() {
        return this.http.put("settlement/partner/notifications", null)
    }

    closePartnerPeriod() {
        return this.http.put('settlement/partner/close', null)
    }

    generatePayoutData(periodId: string) {
        return this.http.post(`settlement/partner/${ periodId }/ngoPayout`, null)
    }
}

export interface SettlementPartnerData {
    userPeriodFrom: Date;
    hasDataToProcess: boolean;
    payments: any[];
    partnerPeriodFrom: Date;
    partnerPeriodId: string;
    isClosed: boolean;
    isEditable: boolean;
    sendMessagesAt: Date;
    notEditableAt: Date;
    closedAt: Date;
    userCloseInterval: number;
    partnerEmailInterval: number;
    partnerCloseInterval: number;
    ngoGenerateInterval: number;
    generatePayout: boolean;
}
