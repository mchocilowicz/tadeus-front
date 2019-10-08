import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import * as moment from 'moment'

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

    config: Configuration = new Configuration();

    constructor(private service: ConfigurationService) {
    }

    ngOnInit() {
        this.service.getConfig().subscribe(r => {
            let data = r.data;
            let c = this.config;
            if (data) {
                Object.keys(c).forEach(key => {
                    c[key] = data[key]
                });
            } else {
                this.onClientDate()
            }
            this.config = c;
        })
    }

    onClientDate(date = new Date()) {
        this.config.currentClientPaymentDate = moment(date).toDate();
        this.config.nextClientPaymentDate = moment(this.config.currentClientPaymentDate).add(this.config.clientCycleDays, 'days').toDate();
        this.onPartnerDate(this.config.nextClientPaymentDate)
    }

    onClientInterval() {

    }

    onPartnerDate(date) {
        this.config.currentPartnerPaymentDate = moment(date).add(1, 'days').toDate();
        this.config.nextPartnerPaymentDate = moment(this.config.currentPartnerPaymentDate).add(this.config.partnerCycleDays, 'days').toDate();
        this.onNgoDate(this.config.nextPartnerPaymentDate)
    }

    onPartnerInterval() {

    }

    onNgoDate(date) {
        this.config.currentNgoPaymentDate = moment(date).add(1, 'days').toDate();
        this.config.nextNgoPaymentDate = moment(this.config.currentNgoPaymentDate).add(this.config.ngoCycleDays, 'days').toDate();
    }

    onNgoInterval() {

    }

    onUpdate() {
        this.service.update(this.prepareRequestBody(), this.config.id).subscribe(r => {

        })
    }

    onSave() {
        this.service.save(this.prepareRequestBody()).subscribe(r => {

        })
    }

    private prepareRequestBody() {
        const body = new ConfigurationSave();
        Object.keys(body).forEach(key => {
            body[key] = this.config[key]
        });
        return body;
    }
}

export class ConfigurationSave {
    minNgoTransfer: number = 0;
    minPersonalPool: number = 0;
    currentClientPaymentDate: Date = null;
    clientCycleDays: number = 1;
    nextClientPaymentDate: Date = null;
    currentPartnerPaymentDate: Date = null;
    partnerCycleDays: number = 1;
    nextPartnerPaymentDate: Date = null;
    currentNgoPaymentDate: Date = null;
    ngoCycleDays: number = 1;
    nextNgoPaymentDate: Date = null;
}

export class Configuration {
    id: string;
    minNgoTransfer: number = 0;
    minPersonalPool: number = 0;
    currentClientPaymentDate: Date = null;
    clientCycleDays: number = 1;
    nextClientPaymentDate: Date = null;
    currentPartnerPaymentDate: Date = null;
    partnerCycleDays: number = 1;
    nextPartnerPaymentDate: Date = null;
    currentNgoPaymentDate: Date = null;
    ngoCycleDays: number = 1;
    nextNgoPaymentDate: Date = null;
}
