import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {CityService} from "../../services/city.service";
import {Router} from "@angular/router";
import {INgo} from "../../models/ngo.interface";
import {NgoService} from "./ngo.service";
import {FileUploadDialogComponent} from "../../components/file-upload-dialog/file-upload-dialog.component";
import {environment} from "../../../environments/environment";
import {IType} from "../../models/trading-point.interface";
import {ICity} from "../../models/city.interface";

@Component({
    selector: 'app-ngo',
    templateUrl: './ngo.component.html',
    styleUrls: ['./ngo.component.scss']
})
export class NgoComponent implements OnInit {
    displayedColumns: string[] = [
        'ID',
        'phone',
        'email',
        'name',
        'verified',
        'verifiedAt',
        'type',
        'city'
    ];
    dataSource = new MatTableDataSource<INgo>([]);
    types: IType[];
    cities: ICity[];
    city: string;
    type: string;
    name: string;
    excelUrl: string = null;

    constructor(private dialog: MatDialog,
                private router: Router,
                private ngoService: NgoService,
                private cityService: CityService) {
    }

    openDialog(): void {
        this.dialog.open(FileUploadDialogComponent, {
            width: '250px',
            data: {
                path: 'ngo'
            }
        });
    }

    ngOnInit() {
        this.ngoService.getNgoList().subscribe(r => {
            if (r.data) {
                this.dataSource = r.data;
            }
        });
        this.ngoService.getTypes().subscribe(r => {
            this.types = r.data
        });
        this.cityService.getCities().subscribe(r => {
            this.cities = r.data;
        });
        this.excelUrl = environment.url + 'ngo/excel'
    }

    onRowClick(row: any) {
        this.router.navigateByUrl('/ngo/' + row.ID)
    }

    onFilterClick() {
        const params = {
            name: this.name,
            city: this.city,
            type: this.type
        };
        this.ngoService.getNgoWithQuery(params).subscribe(r => {
            this.dataSource = r.data;
        })
    }

    createClick() {
        this.router.navigateByUrl('ngo/new')
    }
}
