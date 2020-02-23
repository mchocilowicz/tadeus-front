import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {CityService} from "../../services/city.service";
import {MatDialog} from "@angular/material/dialog";
import {SimpleDialogComponent} from "../../components/simple-dialog/simple-dialog.component";
import {ICity} from "../../models/city.interface";


@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
    displayedColumns: string[] = ['name'];
    dataSource = new MatTableDataSource<ICity>([]);

    constructor(private readonly cityService: CityService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.cityService.getCities().subscribe(r => {
            this.dataSource.data = r.data;
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
                this.dataSource.data = r.data;
            });
        });
    }

}
