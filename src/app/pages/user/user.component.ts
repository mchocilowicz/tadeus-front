import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from "../../services/user.service";
import { UserListItem } from "../../models/user-list-item.interface";
import { OpinionService } from "../../services/opinion.service";


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    displayedColumns: string[] = ['id', 'phone', 'email', 'xp', 'status', 'updatedAt'];
    userDataSource = new MatTableDataSource<UserListItem>();
    opinionDataSource = new MatTableDataSource<any>();

    constructor(private userService: UserService, private opinionService: OpinionService) {
    }

    ngOnInit() {
        this.userService.getUsers().subscribe(r => {
            if (r.data) {
                this.userDataSource = r.data;
            }
        });
        this.opinionService.getUsersOpinion().subscribe(r => {
            if (r.data) {
                this.opinionDataSource = r.data;
            }
        })
    }
}