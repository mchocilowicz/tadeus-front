import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { SimpleDialogComponent } from "../../components/simple-dialog/simple-dialog.component";
import { HttpService } from "../../services/http.service";

@Component({
    selector: 'app-ngo-type',
    templateUrl: './ngo-type.component.html',
    styleUrls: ['./ngo-type.component.scss']
})
export class NgoTypeComponent implements OnInit {

    displayedColumns: string[] = ['name', 'code'];
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator, {static: true})
    paginator!: MatPaginator;

    constructor(private readonly service: HttpService<any>, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.service.get('ngo-type').subscribe(r => {
            this.dataSource = r.data;
        });
    }

    onRowClick(row: any) {
        this.openDialog({path: 'ngo-type/' + row.id, isEdit: true, name: row.name})
    }

    onCreate() {
        this.openDialog({path: 'ngo-type', isEdit: false, name: ''})
    }

    openDialog(data: any) {
        this.dialog.open(SimpleDialogComponent, {
            width: '250px',
            data: data,
        }).afterClosed().subscribe(r => {
            this.service.get('ngo-type').subscribe(r => {
                this.dataSource = r.data;
            });
        });
    }
}
