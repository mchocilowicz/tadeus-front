import {Component, Injectable, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Observable} from "rxjs";
import ApiResponse from "../../models/api-response.interface";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

    data: StatsResponse = null;
    weeksDataSource: MatTableDataSource<StatsPeriodData>;
    monthsDataSource: MatTableDataSource<StatsPeriodData>;
    readonly displayColumns: string[] = ['period', 'price'];

    constructor(private readonly service: StatsService) {
    }

    ngOnInit() {
        this.service.getStatsData().subscribe(r => {
            if (r.data) {
                this.data = r.data;
                const transactions = r.data.transactions;
                if (transactions) {
                    if (transactions.weeks) {
                        this.weeksDataSource = new MatTableDataSource(transactions.weeks);
                    }
                    if (transactions.months) {
                        this.monthsDataSource = new MatTableDataSource(transactions.months);
                    }
                }
            }
        })
    }

}

@Injectable()
export class StatsService {

    constructor(private readonly http: HttpService) {
    }

    getStatsData(): Observable<ApiResponse<StatsResponse>> {
        return this.http.get<StatsResponse>('stats');
    }
}

class StatsResponse {
    user: StatsUserData;
    ngo: StatsNgoData;
    tradingPoint: StatsTradingPointData;
    transactions: StatsTransactionData;
}

class StatsUserData {
    activeUsers: number;
    today: number;
    week: number;
    month: number;
    overMonth: number;
    months: number
}

class StatsNgoData {
    overall: number;
    personalPool: number;
    donationPool: number;
    ngo: number;
    userPool: number;
}

class StatsTradingPointData {
    activePoints: number;
    today: number;
    week: number;
    month: number;
    overMonth: number;
    months: number;
}

class StatsTransactionData {
    today: number;
    weeks: StatsPeriodData[];
    months: StatsPeriodData[];
}

class StatsPeriodData {
    period: string;
    price: number;
}