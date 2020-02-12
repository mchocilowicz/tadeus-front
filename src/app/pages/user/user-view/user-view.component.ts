import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserView } from "../../../models/user-view.interface";

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

    userInformation: UserView;
    newStatus: string;
    form: FormGroup;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private userService: UserService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get("ID");
        if (id) {
            this.userService.getUserInformationBy(id).subscribe(r => {
                if (r.data) {
                    this.userInformation = r.data;
                    this.newStatus = r.data.status;
                }
            })
        } else {
            this.router.navigateByUrl("user")
        }
    }

    onSuspendClick() {
        this.newStatus = "SUSPENDED";
    }

    onBlockClick() {
        this.newStatus = "BLOCKED"
    }

}
