import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { TradingPointService } from "./trading-point-service.service";
import { MatDialog } from "@angular/material";
import { ITradingPoint } from "../../models/trading-point.interface";
import { CityService } from "../../services/city.service";
import { Router } from "@angular/router";
import { FileUploadDialogComponent } from "../../components/file-upload-dialog/file-upload-dialog.component";

@Component({
    selector: 'app-trading-point',
    templateUrl: './trading-point.component.html',
    styleUrls: ['./trading-point.component.scss']
})
export class TradingPointComponent implements OnInit {
    displayedColumns: string[] = ['ID', 'name', 'type', 'donation', 'vat', 'fee', 'city', 'xp', 'updatedDate'];
    dataSource = new MatTableDataSource<ITradingPoint>([]);
    types: [];
    cities: [];
    city: string;
    type: string;
    name: string;

    @ViewChild(MatPaginator, {static: true})
    paginator!: MatPaginator;

    constructor(private service: TradingPointService,
                private readonly dialog: MatDialog,
                private cityService: CityService,
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
            if (r.error) {

            } else {
                this.dataSource = r.data;
            }
        });
        this.service.getTypes().subscribe(r => {
            this.types = r.data
        });
        this.cityService.getCities().subscribe(r => {
            this.cities = r.data;
        })
        this.dataSource.paginator = this.paginator;
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
            this.dataSource = r.data;
        })
    }

}
