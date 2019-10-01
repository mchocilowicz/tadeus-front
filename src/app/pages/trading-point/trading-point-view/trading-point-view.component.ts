import { Component, OnInit } from '@angular/core';
import { TradingPointService } from "../trading-point-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TradingPointSave, TradingPointView } from "../../../models/trading-point.interface";
import { CityService } from "../../../services/city.service";

@Component({
    selector: 'app-trading-point-view',
    templateUrl: './trading-point-view.component.html',
    styleUrls: ['./trading-point-view.component.scss']
})
export class TradingPointViewComponent implements OnInit {
    phone = '';
    phonePrefix = '+48';
    id = null;
    terminals = [];
    tradingPoint: TradingPointView = new TradingPointView();
    displayedColumns: string[] = ['ID', 'phone', 'step'];
    cities = [];
    types = [];

    constructor(private service: TradingPointService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private cityService: CityService) {
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('ID');
        this.service.getTradingPoint(this.id).subscribe(r => {
            this.terminals = r.data.terminals;
            this.tradingPoint = r.data;
        });
        this.service.getTypes().subscribe(r => this.types = r.data);
        this.cityService.getCities().subscribe(r => this.cities = r.data);
    }


    onEdit() {
        const dto = new TradingPointSave();
        dto.address = this.tradingPoint.address;
        dto.ID = this.tradingPoint.ID;
        dto.postCode = this.tradingPoint.postCode;
        dto.name = this.tradingPoint.name;
        dto.city = this.cities.find(c => c.name === this.tradingPoint.city);
        dto.type = this.types.find(c => c.name === this.tradingPoint.type);
        dto.longitude = this.tradingPoint.longitude;
        dto.latitude = this.tradingPoint.latitude;
        dto.xp = this.tradingPoint.xp;
        dto.vat = this.tradingPoint.vat;
        dto.donationPercentage = this.tradingPoint.donationPercentage;
        dto.fee = this.tradingPoint.fee;

        this.service.updateTradingPoint(this.id, dto).subscribe(r => {
            if (!r.error) {
                this.router.navigateByUrl('/trading-point')
            }
        })
    }

    saveTerminal() {
        if (this.phone) {
            this.service.saveTerminal(this.id, this.phonePrefix + this.phone).subscribe(r => {
                    if (!r.error) {
                        this.terminals = [...this.terminals, r.data];
                        this.phone = null;
                    }
                }
            )
        }
    }

}
