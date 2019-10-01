import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CityService } from "../../services/city.service";
import { City } from "../../models/trading-point.interface";
import { MatDialog } from "@angular/material/dialog";
import { SimpleDialogComponent } from "../../components/simple-dialog/simple-dialog.component";


@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
    displayedColumns: string[] = ['name'];
    dataSource = new MatTableDataSource<City>([]);

    @ViewChild(MatPaginator, {static: true})
    paginator!: MatPaginator;

    constructor(private readonly cityService: CityService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.cityService.getCities().subscribe(r => {
            this.dataSource = r.data;
        });
    }

    onRowClick(row: any) {
        this.openDialog({path: 'city/' + row.id, isEdit: true, name: row.name})
    }

    onCreate() {
        this.openDialog({path: 'city', isEdit: false, name: ''})
    }

    openDialog(data: any) {
        this.dialog.open(SimpleDialogComponent, {
            width: '250px',
            data: data,
        }).afterClosed().subscribe(r => {
            this.cityService.getCities().subscribe(r => {
                this.dataSource = r.data;
            });
        });
    }

}
