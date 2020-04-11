import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './pages/login/login.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserComponent} from './pages/user/user.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';
import {NavComponent} from './components/nav/nav.component';
import {LoginService} from "./services/login.service";
import {CityService} from "./services/city.service";
import {UserService} from "./services/user.service";
import {HttpService} from "./services/http.service";
import {TradingPointComponent} from "./pages/trading-point/trading-point.component";
import {TradingPointService} from "./pages/trading-point/trading-point-service.service";
import {TradingPointViewComponent} from './pages/trading-point/trading-point-view/trading-point-view.component';
import {SimpleDialogComponent} from './components/simple-dialog/simple-dialog.component';
import {NgoComponent} from "./pages/ngo/ngo.component";
import {StatsComponent} from "./pages/stats/stats.component";
import {ConfigurationComponent} from "./pages/configuration/configuration.component";
import {FileUploadDialogComponent} from './components/file-upload-dialog/file-upload-dialog.component';
import {NgoViewComponent} from './pages/ngo/ngo-view/ngo-view.component';
import {NgoService} from "./pages/ngo/ngo.service";
import {ConfigurationService} from "./pages/configuration/configuration.service";
import {OpinionService} from "./services/opinion.service";
import {StatusService} from "./services/status.service";
import {UserViewComponent} from './pages/user/user-view/user-view.component';
import {MatRadioModule} from "@angular/material/radio";
import {TransactionComponent} from './pages/transaction/transaction.component';
import {TransactionViewComponent} from './pages/transaction/transaction-view/transaction-view.component';
import {TransactionService} from "./services/transaction.service";
import {
    TradingPointSettlementComponent,
    TradingPointSettlementService
} from './pages/trading-point-settlement/trading-point-settlement.component';
import {NgoSettlementComponent, NgoSettlementService} from './pages/ngo-settlement/ngo-settlement.component';
import {ReportsComponent, ReportsSerivce} from './pages/reports/reports.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export const appRoutes: Routes = [
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
        path: 'user/:ID',
        component: UserViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'trading-point',
        component: TradingPointComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'trading-point/:ID',
        component: TradingPointViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'ngo',
        component: NgoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'ngo/:ID',
        component: NgoViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'configuration',
        component: ConfigurationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'stats',
        component: StatsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'transaction/:ID',
        component: TransactionViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'transaction',
        component: TransactionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'stats',
        component: StatsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settlement',
        children: [
            {
                path: 'trading-point',
                component: TradingPointSettlementComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'ngo',
                component: NgoSettlementComponent,
                canActivate: [AuthGuard]
            }
        ]
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
        NavComponent,
        TradingPointComponent,
        TradingPointViewComponent,
        SimpleDialogComponent,
        NgoComponent,
        StatsComponent,
        ConfigurationComponent,
        FileUploadDialogComponent,
        NgoViewComponent,
        UserViewComponent,
        TransactionComponent,
        TransactionViewComponent,
        TradingPointSettlementComponent,
        NgoSettlementComponent,
        ReportsComponent
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
        ReactiveFormsModule,
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
        MatDialogModule,
        MatSortModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        // StoreModule.forRoot(reducers, {
        //   metaReducers,
        //   runtimeChecks: {
        //     strictStateImmutability: true,
        //     strictActionImmutability: true
        //   }
        // })
    ],
    providers: [
        HttpService,
        LoginService,
        UserService,
        CityService,
        TradingPointService,
        NgoService,
        ConfigurationService,
        OpinionService,
        StatusService,
        TransactionService,
        TradingPointSettlementService,
        NgoSettlementService,
        ReportsSerivce,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
    entryComponents: [
        FileUploadDialogComponent,
        SimpleDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
