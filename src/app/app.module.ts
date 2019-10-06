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
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';
import { CityComponent } from './pages/city/city.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginService } from "./services/login.service";
import { CityService } from "./services/city.service";
import { UserService } from "./services/user.service";
import { HttpService } from "./services/http.service";
import { TradingPointComponent } from "./pages/trading-point/trading-point.component";
import { TradingPointService } from "./pages/trading-point/trading-point-service.service";
import { TradingPointViewComponent } from './pages/trading-point/trading-point-view/trading-point-view.component';
import { NgoTypeComponent } from './pages/ngo-type/ngo-type.component';
import { TradingPointTypeComponent } from './pages/trading-point-type/trading-point-type.component';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { NgoComponent } from "./pages/ngo/ngo.component";
import { StatsComponent } from "./pages/stats/stats.component";
import { ConfigurationComponent } from "./pages/configuration/configuration.component";
import { FileUploadDialogComponent } from './components/file-upload-dialog/file-upload-dialog.component';
import { NgoViewComponent } from './pages/ngo/ngo-view/ngo-view.component';
import { NgoService } from "./pages/ngo/ngo.service";

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
        path: 'city',
        component: CityComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'ngo-type',
        component: NgoTypeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'trading-point-type',
        component: TradingPointTypeComponent,
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
        NavComponent,
        TradingPointComponent,
        TradingPointViewComponent,
        NgoTypeComponent,
        TradingPointTypeComponent,
        SimpleDialogComponent,
        NgoComponent,
        StatsComponent,
        ConfigurationComponent,
        FileUploadDialogComponent,
        NgoViewComponent
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
        MatDialogModule,
        MatSortModule,
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
        NgoService
    ],
    entryComponents: [
        FileUploadDialogComponent,
        SimpleDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
