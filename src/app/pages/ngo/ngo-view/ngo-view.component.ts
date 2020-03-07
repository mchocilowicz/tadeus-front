import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgoService} from "../ngo.service";
import {IType} from "../../../models/trading-point.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {CityService} from "../../../services/city.service";
import {ICity} from "../../../models/city.interface";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-ngo-view',
    templateUrl: './ngo-view.component.html',
    styleUrls: ['./ngo-view.component.scss']
})
export class NgoViewComponent implements OnInit {

    transactionDisplayFields: string[] = ['ID', 'price', 'date'];
    transactions: any[] = null;
    ngoForm: FormGroup;
    types: IType[] = null;
    cities: ICity[] = null;
    ID: string = null;

    image: string = null;
    thumbnail: string = null;
    newImage: File = null;
    newThumbnail: File = null;

    constructor(private fb: FormBuilder,
                private router: Router,
                private activateRoute: ActivatedRoute,
                private ngoService: NgoService,
                private cityService: CityService) {
    }

    ngOnInit() {
        const id = this.activateRoute.snapshot.paramMap.get('ID');
        this.ID = id;
        if (id === 'new') {
            this.ngoForm = this.fb.group({
                name: new FormControl(null, [Validators.required]),
                longName: new FormControl(null, [Validators.required]),
                email: new FormControl(null, [Validators.required]),
                bankNumber: new FormControl(null, [Validators.required]),
                description: new FormControl(null, [Validators.required]),
                verified: new FormControl(null, [Validators.required]),
                verifiedAt: new FormControl({value: null, disabled: true}, []),
                createdAt: new FormControl({
                    value: new Date(),
                    disabled: true
                }, [Validators.required, Validators.email]),
                type: new FormControl(false, [Validators.required]),
                collectedDonation: new FormControl({value: 0, disabled: true}, []),
                phone: new FormControl(null, [Validators.required]),
                address: this.fb.group({
                    street: new FormControl(null, [Validators.required]),
                    number: new FormControl(null, [Validators.required]),
                    postCode: new FormControl(null, [Validators.required]),
                    latitude: new FormControl(null, [Validators.required]),
                    longitude: new FormControl(null, [Validators.required]),
                    city: new FormControl(null, [Validators.required])
                })
            });
        } else {
            this.ngoService.getNgoBy(id).subscribe(r => {
                if (r.data) {
                    this.image = environment.url + 'img/' + r.data.image;
                    this.thumbnail = environment.url + 'img/' + r.data.thumbnail;

                    this.transactions = r.data.transactions;
                    this.ngoForm = this.fb.group({
                        name: new FormControl(r.data.name, [Validators.required]),
                        longName: new FormControl(r.data.longName, [Validators.required]),
                        email: new FormControl(r.data.email, [Validators.required, Validators.email]),
                        bankNumber: new FormControl(r.data.bankNumber, [Validators.required]),
                        description: new FormControl(r.data.description, [Validators.required]),
                        verified: new FormControl(r.data.verified, [Validators.required]),
                        verifiedAt: new FormControl({value: r.data.verifiedAt, disabled: true}, []),
                        createdAt: new FormControl({
                            value: new Date(r.data.createdAt),
                            disabled: true
                        }, [Validators.required]),
                        type: new FormControl(r.data.type, [Validators.required]),
                        collectedDonation: new FormControl({value: r.data.collectedDonation, disabled: true}, []),
                        phone: new FormControl(r.data.phone, [Validators.required]),
                        address: this.fb.group({
                            street: new FormControl(r.data.address.street, [Validators.required]),
                            number: new FormControl(r.data.address.number, [Validators.required]),
                            postCode: new FormControl(r.data.address.postCode, [Validators.required]),
                            latitude: new FormControl(r.data.address.latitude, [Validators.required]),
                            longitude: new FormControl(r.data.address.longitude, [Validators.required]),
                            city: new FormControl(r.data.address.city, [Validators.required])
                        })
                    });
                } else {
                    this.router.navigateByUrl('ngo')
                }

            })
        }
        this.ngoService.getTypes().subscribe(r => this.types = r.data);
        this.cityService.getCities().subscribe(r => this.cities = r.data);
    }

    onEdit() {
        if (this.ngoForm.valid) {

        }
    }


    onImageChange($event) {
        this.newImage = $event.target.files[0]
    }

    onThumbnailChange($event) {
        this.thumbnail = $event.target.files[0]
    }

    updateImage() {
        if (this.canUploadImage()) {
            const form = new FormData();
            if (this.newImage) {
                form.append('image', this.newImage);
            }
            if (this.newThumbnail) {
                form.append('thumbnail', this.newThumbnail);
            }
            // this.service.updateImage(this.ID, form).subscribe(r => this.router.navigateByUrl('trading-point'))
        }
    }

    canUploadImage() {
        return this.ID && this.ID.length > 0 && this.ID !== 'new' && (this.newImage !== null || this.newThumbnail !== null);
    }
}
