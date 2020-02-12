import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from "../../services/user.service";
import { UserListItem } from "../../models/user-list-item.interface";
import { OpinionService } from "../../services/opinion.service";
import { StatusService } from "../../services/status.service";
import { Opinion } from "../../models/opinion.interface";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    userDisplayColumns: string[] = ['id', 'phone', 'email', 'xp', 'status', 'updatedAt'];
    opinionDisplayedColumns: string[] = ['name', 'phone', 'email', 'value', 'createdAt'];
    userDataSource = new MatTableDataSource<UserListItem>();
    opinionDataSource = new MatTableDataSource<Opinion>();
    statuses: string[];
    filterForm: FormGroup;

    constructor(private userService: UserService,
                private opinionService: OpinionService,
                private statusService: StatusService,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.filterForm = this.fb.group({
            prefix: [48],
            phone: [null],
            status: [null],
            updatedFrom: [null],
            updatedTo: [null],
            xpMin: [null],
            xpMax: [null]
        });
        this.userService.getUsers(this.filterForm.value).subscribe(r => {
            if (r.data) {
                this.userDataSource = r.data;
            }
        });
        this.opinionService.getUsersOpinion().subscribe(r => {
            if (r.data) {
                this.opinionDataSource = r.data;
            }
        });
        this.statusService.getUserStatuses().subscribe(r => {
            if (r.data) {
                this.statuses = r.data;
            }
        });
    }

    onFilterFormSubmit() {
        console.log(this.filterForm.value);
        this.userService.getUsers(this.filterForm.value).subscribe(r => {
            if (r.data) {
                this.userDataSource = r.data;
            }
        });
    }

    onRowClick(elem: UserListItem) {

        this.router.navigateByUrl('/user/' + elem.ID)
    }
}