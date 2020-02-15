import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgoService} from "../ngo.service";
import {IType} from "../../../models/type.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {CityService} from "../../../services/city.service";
import {ICity} from "../../../models/city.interface";

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

    icon: string = null;
    thumbnail: string = null;
    newIcon: File = null;
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
                name: new FormControl('', [Validators.required]),
                type: new FormControl('', [Validators.required]),
                createdAt: new FormControl(new Date(), [Validators.required]),
                bankAccount: new FormControl('', [Validators.required]),
                phone: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required, Validators.email]),
                verified: new FormControl(false, [Validators.required]),
                verifiedAt: new FormControl('', []),
                collectedDonation: new FormControl(0, [Validators.required]),
            });
        } else {
            this.ngoService.getNgoBy(id).subscribe(r => {
                if (r.data) {
                    this.transactions = r.data.transactions;
                    this.ngoForm = this.fb.group({
                        name: new FormControl('', [Validators.required]),
                        type: new FormControl('', [Validators.required]),
                        createdAt: new FormControl(new Date(), [Validators.required]),
                        bankAccount: new FormControl('', [Validators.required]),
                        phone: new FormControl('', [Validators.required]),
                        email: new FormControl('', [Validators.required, Validators.email]),
                        verified: new FormControl(false, [Validators.required]),
                        verifiedAt: new FormControl('', []),
                        collectedDonation: new FormControl(0, [Validators.required]),
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


    onIconChange($event) {
        this.newIcon = $event.target.files[0]
    }

    onThumbnailChange($event) {
        this.thumbnail = $event.target.files[0]
    }

    updateImage() {
        if (this.canUploadImage()) {
            const form = new FormData();
            if (this.newIcon) {
                form.append('icon', this.newIcon);
            }
            if (this.newThumbnail) {
                form.append('thumbnail', this.newThumbnail);
            }
            // this.service.updateImage(this.ID, form).subscribe(r => this.router.navigateByUrl('trading-point'))
        }
    }

    canUploadImage() {
        return this.ID && this.ID.length > 0 && this.ID !== 'new' && (this.newIcon !== null || this.newThumbnail !== null);
    }
}
