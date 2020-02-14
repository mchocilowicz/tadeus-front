import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserTransaction, UserView} from "../../../models/user-view.interface";
import {MatTableDataSource} from "@angular/material/table";
import ApiResponse from "../../../models/api-response.interface";

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

    userInformation: UserView;
    newStatus: string;
    editForm: FormGroup;
    transferForm: FormGroup;
    transactionDisplayFields: string[] = ['type', 'price', 'date', 'xp'];
    transactionDataSource = new MatTableDataSource<UserTransaction>();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private userService: UserService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get("ID");
        if (id) {
            this.loadInitialData(id);
        } else {
            this.router.navigateByUrl("user")
        }
    }

    onStatusChange($event: any) {
        this.editForm.patchValue({
            status: $event.value
        })
    }

    onEditSubmit() {
        this.userService.updateUserInformation(this.userInformation.ID, this.editForm.value).subscribe(r => {
            this.navigateToUserList(r)
        })
    }

    onTransferSubmit() {
        this.userService.transferPoolToAnotherUser(this.userInformation.ID, this.transferForm.value).subscribe(r => {
            this.navigateToUserList(r)
        })
    }

    onDeleteClick() {
        this.userService.deleteUser(this.userInformation.ID).subscribe(r => {
            this.navigateToUserList(r)
        })
    }

    private navigateToUserList(r: ApiResponse<any>) {
        if (!r.error) {
            this.router.navigateByUrl("user")
        }
    }


    private loadInitialData(id: string) {
        this.userService.getUserInformationBy(id).subscribe(r => {
            if (r.data) {
                this.userInformation = r.data;
                this.transactionDataSource = r.data.transactions;
                this.newStatus = r.data.status;

                this.editForm = this.fb.group({
                    status: [this.userInformation.status],
                    prefix: [48],
                    phone: [null]
                });
                this.transferForm = this.fb.group({
                    targetID: [null],
                });
            }
        })
    }

}
