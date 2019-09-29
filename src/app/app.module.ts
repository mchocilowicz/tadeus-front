import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { reducers, metaReducers } from './reducers';
import { LoginComponent } from './pages/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './pages/user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule
} from '@angular/material';
import { CityComponent } from './pages/city/city.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginService } from "./services/login.service";
import { CityService } from "./services/city.service";
import { UserService } from "./services/user.service";
import { HttpService } from "./services/http.service";


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'city',
        component: CityComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '/user',
        pathMatch: 'full'
    },
    {path: '**', component: UserComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UserComponent,
        CityComponent,
        NavComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes, {enableTracing: true}),
        MatSidenavModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatExpansionModule,
        // StoreModule.forRoot(reducers, {
        //   metaReducers,
        //   runtimeChecks: {
        //     strictStateImmutability: true,
        //     strictActionImmutability: true
        //   }
        // })
    ],
    providers: [HttpService, LoginService, UserService, CityService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
