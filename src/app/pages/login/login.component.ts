import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../../services/login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    phone: string | null = '';
    code: number | null = null;
    nextStep: boolean | null = false;
    errorMessage: string | null = '';
    phonePrefix: string | null = '+48';

    constructor(private readonly loginService: LoginService, private readonly router: Router) {
    }

    ngOnInit() {
    }

    onBackButtonClick(): void {
        this.nextStep = false;
    }

    onPhoneFormSubmit(): void {
        if (this.phone && this.phonePrefix) {
            this.loginService.sendPhone(this.phone, this.phonePrefix).subscribe(r => {
                if (r.error) {
                    this.errorMessage = r.message;
                } else {
                    this.errorMessage = '';
                    this.nextStep = true;
                }
            });
        }
    }

    onCodeFormSubmit(): void {
        if (this.phone && this.phonePrefix && this.code) {
            this.loginService.sendCode(this.phone, this.phonePrefix, this.code).subscribe(r => {
                if (r.error) {
                    this.errorMessage = r.message;
                } else {
                    this.errorMessage = '';
                    this.phone = '';
                    this.code = null;
                    this.nextStep = false;
                    localStorage.setItem('tds', r.data);
                    this.router.navigateByUrl('/user');
                }
            });
        }
    }

}
