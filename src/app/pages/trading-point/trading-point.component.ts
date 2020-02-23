import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TradingPointService} from "./trading-point-service.service";
import {MatDialog} from "@angular/material";
import {IType, TradingPointListElem} from "../../models/trading-point.interface";
import {CityService} from "../../services/city.service";
import {Router} from "@angular/router";
import {FileUploadDialogComponent} from "../../components/file-upload-dialog/file-upload-dialog.component";
import {ICity} from "../../models/city.interface";
import {environment} from "../../../environments/environment";
import {OpinionService} from "../../services/opinion.service";
import {Opinion} from "../../models/opinion.interface";

@Component({
    selector: 'app-trading-point',
    templateUrl: './trading-point.component.html',
    styleUrls: ['./trading-point.component.scss']
})
export class TradingPointComponent implements OnInit {
    displayedColumns: string[] = ['ID', 'name', 'email', 'phone', 'type', 'city'];
    dataSource = new MatTableDataSource<TradingPointListElem>([]);
    opinionDisplayedColumns: string[] = ['name', 'phone', 'email', 'value', 'createdAt'];
    opinionDataSource = new MatTableDataSource<Opinion>();
    types: IType[];
    cities: ICity[];
    city: string;
    type: string;
    name: string;
    excelUrl: string;

    constructor(private service: TradingPointService,
                private readonly dialog: MatDialog,
                private cityService: CityService,
                private opinionService: OpinionService,
                private router: Router) {
    }

    openDialog(): void {
        this.dialog.open(FileUploadDialogComponent, {
            width: '250px',
            data: {
                path: 'trading-point'
            }
        });
    }

    ngOnInit() {
        this.service.getTradingPoints().subscribe(r => {
            if (r.data) {
                this.dataSource.data = r.data;
            }
        });
        this.service.getTypes().subscribe(r => {
            this.types = r.data
        });
        this.cityService.getCities().subscribe(r => {
            this.cities = r.data;
        });
        this.opinionService.getTradingPointsOpinion().subscribe(r => {
            if (r.data) {
                this.opinionDataSource.data = r.data;
            }
        });
        this.excelUrl = environment.url + 'trading-point/excel'
    }

    onRowClick(row: any) {
        this.router.navigateByUrl('/trading-point/' + row.ID)
    }

    onFilterClick() {
        const params = {
            name: this.name,
            city: this.city,
            type: this.type
        };

        this.service.getTradingPointsWithQuery(params).subscribe(r => {
            this.dataSource.data = r.data;
        })
    }

    createClick() {
        this.router.navigateByUrl('trading-point/new');
    }
}
