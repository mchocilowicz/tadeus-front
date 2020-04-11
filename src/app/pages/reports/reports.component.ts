import {Component, Injectable, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import * as moment from "moment";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import ApiResponse from "../../models/api-response.interface";
import {HttpParams} from "@angular/common/http";

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

    ngoDataSource: MatTableDataSource<ReportData>;
    tradingPointDataSource: MatTableDataSource<ReportData>;
    displayedColumns: string[] = ['ID', 'name', 'users', 'donations', 'count', 'list'];
    hasData: boolean = false;
    dates: string[] = null;
    selectedDate: string = "";

    private today: string = moment().format("YYYY-MM");

    constructor(private readonly service: ReportsSerivce) {
    }


    ngOnInit() {
        this.service.getDates().subscribe(r => {
            if (r.data) {
                this.dates = r.data;
            }
        });
        this.service.getReportsForMonth(this.today).subscribe(r => {
            if (r.data) {
                this.ngoDataSource = new MatTableDataSource<ReportData>(r.data.ngo);
                this.tradingPointDataSource = new MatTableDataSource<ReportData>(r.data.tradingPoint);
                this.hasData = true;
            }
        });
    }

    onSearchClick() {
        if (this.isDateSelected()) {
            this.service.getReportsForMonth(this.selectedDate).subscribe(r => {
                if (r.data) {
                    this.ngoDataSource.data = r.data.ngo;
                    this.tradingPointDataSource.data = r.data.tradingPoint;
                }
            })
        }

    }

    isDateSelected(): boolean {
        return this.selectedDate !== "";
    }

}


@Injectable()
export class ReportsSerivce {
    constructor(private readonly http: HttpService) {
    }

    getDates(): Observable<ApiResponse<string[]>> {
        return this.http.get<string[]>('reports/dates')
    }

    getReportsForMonth(month: string): Observable<ApiResponse<ReportResponse>> {
        let params = new HttpParams().append('date', month);
        return this.http.get<ReportResponse>('reports', params);
    }
}

class ReportResponse {
    ngo: ReportData[];
    tradingPoint: ReportData[];
}

class ReportData {
    ID: string;
    name: string;
    usersCount: number;
    donations: number;
    count: number;
    list: ReportListItem[];
}

class ReportListItem {
    ID: string;
    name: string;
    count: number;
}