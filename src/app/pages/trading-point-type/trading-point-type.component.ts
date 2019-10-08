import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { SimpleDialogComponent } from "../../components/simple-dialog/simple-dialog.component";
import { TradingPointService } from "../trading-point/trading-point-service.service";
import { ICity } from "../../models/city.interface";

@Component({
    selector: 'app-trading-point-type',
    templateUrl: './trading-point-type.component.html',
    styleUrls: ['./trading-point-type.component.scss']
})
export class TradingPointTypeComponent implements OnInit {

    displayedColumns: string[] = ['name', 'code'];
    dataSource = new MatTableDataSource<ICity>([]);

    @ViewChild(MatPaginator, {static: true})
    paginator!: MatPaginator;

    constructor(private readonly service: TradingPointService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.service.getTypes().subscribe(r => this.dataSource = r.data)
    }

    onRowClick(row: any) {
        this.openDialog({path: 'trading-point-type/' + row.id, isEdit: true, name: row.name})
    }

    onCreate() {
        this.openDialog({path: 'trading-point-type', isEdit: false, name: ''})
    }

    openDialog(data: any) {
        this.dialog.open(SimpleDialogComponent, {
            width: '250px',
            data: data,
        }).afterClosed().subscribe(r => {
            this.service.getTypes().subscribe(r => {
                this.dataSource = r.data;
            });
        });
    }

}
