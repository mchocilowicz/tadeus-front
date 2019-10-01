import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from "../../services/user.service";


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, {static: true})
    paginator!: MatPaginator;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.userService.getUsers().subscribe(r => console.log(r));
    }
}
