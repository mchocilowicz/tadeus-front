import {Component, OnInit} from '@angular/core';
import {TradingPointService} from "../trading-point-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IType} from "../../../models/trading-point.interface";
import {CityService} from "../../../services/city.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ICity} from "../../../models/city.interface";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-trading-point-view',
    templateUrl: './trading-point-view.component.html',
    styleUrls: ['./trading-point-view.component.scss']
})
export class TradingPointViewComponent implements OnInit {
    terminals = null;
    transactions = null;
    transactionDisplayFields: string[] = ['type', 'price', 'date', 'xp'];
    displayedColumns: string[] = ['ID', 'name', 'phone', 'step'];
    cities: ICity[] = [];
    types: IType[] = [];
    ID: string;
    terminalForm: FormGroup;
    tradingPointForm: FormGroup;
    newImage: File = null;
    image: string;

    constructor(private service: TradingPointService,
                private activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private router: Router,
                private cityService: CityService) {
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.paramMap.get('ID');
        this.ID = id;
        if (id === 'new') {
            this.tradingPointForm = this.fb.group({
                type: new FormControl(null, Validators.required),
                phone: new FormControl(null, Validators.required),
                name: new FormControl(null, Validators.required),
                address: this.fb.group({
                    street: new FormControl(null, Validators.required),
                    number: new FormControl(null, Validators.required),
                    postCode: new FormControl(null, Validators.required),
                    longitude: new FormControl(null, Validators.required),
                    latitude: new FormControl(null, Validators.required),
                    city: new FormControl(null, Validators.required)
                }),
                donationPercentage: new FormControl(0, Validators.required),
                email: new FormControl(null, Validators.required),
                price: new FormControl(0, Validators.required),
                active: new FormControl(false, Validators.required),
                vat: new FormControl(23, Validators.required),
                fee: new FormControl(0.66, Validators.required),
                xp: new FormControl(0, Validators.required),
            })
        } else {
            this.service.getTradingPoint(id).subscribe(r => {
                if (r.data) {
                    this.image = environment.url + 'img/' + r.data.image;
                    this.terminals = r.data.terminals;
                    this.transactions = r.data.transactions;
                    this.tradingPointForm = this.fb.group({
                        type: new FormControl(r.data.type, Validators.required),
                        phone: new FormControl(r.data.phone, Validators.required),
                        name: new FormControl(r.data.name, Validators.required),
                        donationPercentage: new FormControl(r.data.donationPercentage, Validators.required),
                        email: new FormControl(r.data.email, [Validators.required, Validators.email]),
                        price: new FormControl(r.data.price, Validators.required),
                        active: new FormControl(r.data.active, Validators.required),
                        vat: new FormControl(r.data.vat, Validators.required),
                        fee: new FormControl(r.data.fee, Validators.required),
                        xp: new FormControl(r.data.xp, Validators.required),
                        address: this.fb.group({
                            street: new FormControl(r.data.address.street, Validators.required),
                            number: new FormControl(r.data.address.number, Validators.required),
                            postCode: new FormControl(r.data.address.postCode, Validators.required),
                            longitude: new FormControl(r.data.address.longitude, Validators.required),
                            latitude: new FormControl(r.data.address.latitude, Validators.required),
                            city: new FormControl(r.data.address.city, Validators.required)
                        })
                    });
                    this.terminalForm = this.fb.group({
                        phone: new FormControl(null, [Validators.required]),
                        prefix: [48],
                        name: new FormControl(null, [Validators.required])
                    })
                } else {
                    this.router.navigateByUrl('trading-point')
                }
            });
        }
        this.service.getTypes().subscribe(r => this.types = r.data);
        this.cityService.getCities().subscribe(r => this.cities = r.data);
    }


    onEdit() {
        if (this.tradingPointForm.valid) {
            if (this.ID === 'new') {
                this.service.createTradingPoint(this.tradingPointForm.value).subscribe(() => this.router.navigateByUrl('trading-point'))
            } else {
                this.service.updateTradingPoint(this.ID, this.tradingPointForm.value).subscribe(() => this.router.navigateByUrl('trading-point'))
            }
        }
    }

    saveTerminal() {
        if (this.terminalForm.valid) {
            this.service.saveTerminal(this.ID, this.terminalForm.value).subscribe(r => {
                if (r.data) {
                    this.terminals = [...this.terminals, r.data];
                    this.terminalForm.reset();
                }
            })
        }
    }

    onImageChange($event) {
        this.newImage = $event.target.files[0]
    }

    updateImage() {
        if (this.canUploadImage()) {
            const form = new FormData();
            form.append('image', this.newImage);
            this.service.updateImage(this.ID, form).subscribe(r => this.router.navigateByUrl('trading-point'))
        }
    }

    canUploadImage() {
        return this.ID && this.ID.length > 0 && this.ID !== 'new' && this.newImage !== null;
    }
}
