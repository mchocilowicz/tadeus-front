import {Component, Injectable, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {HttpParams} from "@angular/common/http";
import * as moment from "moment";

@Component({
    selector: 'app-ngo-settlement',
    templateUrl: './ngo-settlement.component.html',
    styleUrls: ['./ngo-settlement.component.scss']
})
export class NgoSettlementComponent implements OnInit {

    data: SettlementNgoData;
    displayedColumns: string[] = ['ngoId', 'ngoName', 'createdAt', 'isPaid', 'price', 'paymentDetails'];
    dataSource: MatTableDataSource<any>;
    periods: any[] = null;
    selectedPeriod: any = null;
    showAll: boolean = false;

    closeAt: Date = null;

    constructor(private router: Router,
                private service: NgoSettlementService) {
    }

    ngOnInit() {
        this.getSettlementsData();
        this.service.getPeriodsList().subscribe(r => {
            if (r.data) {
                this.periods = r.data;
            }
        })
    }


    onSearchClick() {
        this.getSettlementsData();
    }


    updatePaymentIsPaid($event, ID: string) {
        const el = this.dataSource.data.find(e => e.ID === ID);
        el.isPaid = $event.target.checked;
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
                    this.router.navigateByUrl('settlement/trading-point')
                }
            })
        }
    }

    onClosePeriod() {
        this.service.closePartnerPeriod().subscribe(r => {
            if (!r.error) {
                this.router.navigateByUrl('settlement/trading-point')
            }
        })
    }

    canClosePeriod(): boolean {
        return !(this.data.isClosed && moment().isAfter(moment(this.data.from).add(this.data.closeInterval, 'days')));
    }

    canEdit(): boolean {
        return this.data.isClosed;
    }


    private getSettlementsData() {
        this.service.getSettlementData(this.showAll, this.selectedPeriod).subscribe(r => {
            if (r.data) {
                this.data = r.data;
                this.selectedPeriod = r.data.currentPeriod;
                this.dataSource = new MatTableDataSource<any>(r.data.payouts);
            }
        });
    }
}


@Injectable()
export class NgoSettlementService {
    constructor(private http: HttpService) {
    }

    getPeriodsList() {
        return this.http.get<any>("settlement/ngo/periods");
    }

    getSettlementData(showAll: boolean, selectedPeriod: string) {
        let params = new HttpParams()
            .append('showAll', `${ showAll }`)
            .append('selectedPeriod', selectedPeriod);
        return this.http.get<SettlementNgoData>("settlement/ngo", params);
    }

    onSaveChanges(data: any) {
        return this.http.put("settlement/ngo", data)
    }


    closePartnerPeriod() {
        return this.http.put('settlement/ngo/close', null)
    }
}

export interface SettlementNgoData {
    payouts: any[]
    currentPeriod: string;
    from: Date;
    isClosed: boolean;
    closeInterval: number;
}
