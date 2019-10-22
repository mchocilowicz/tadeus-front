import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import * as moment from 'moment'
import { ConfigurationSave } from "./configuration-save.model";
import { Configuration } from "./configuration.model";

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

    onClientIntervalChange(interval: number) {
        if (interval > 0) {
            this.config.nextClientPaymentDate = moment(this.config.currentClientPaymentDate).add(interval, 'days').toDate();
            this.onPartnerDate(this.config.nextClientPaymentDate)
        }
    }

    onPartnerDate(date) {
        this.config.currentPartnerPaymentDate = moment(date).add(1, 'days').toDate();
        this.config.nextPartnerPaymentDate = moment(this.config.currentPartnerPaymentDate).add(this.config.partnerCycleDays, 'days').toDate();
        this.onNgoDate(this.config.nextPartnerPaymentDate)
    }

    onPartnerIntervalChange(interval: number) {
        if (interval > 0) {
            this.config.nextPartnerPaymentDate = moment(this.config.currentPartnerPaymentDate).add(interval, 'days').toDate();
            this.onNgoDate(this.config.nextPartnerPaymentDate)
        }
    }

    onNgoDate(date) {
        this.config.currentNgoPaymentDate = moment(date).add(1, 'days').toDate();
        this.config.nextNgoPaymentDate = moment(this.config.currentNgoPaymentDate).add(this.config.ngoCycleDays, 'days').toDate();
    }

    onNgoIntervalChange(interval: number) {
        if (interval > 0) {
            this.config.nextNgoPaymentDate = moment(this.config.currentNgoPaymentDate).add(interval, 'days').toDate();
        }
    }

    onUpdate() {
        this.service.update(this.prepareRequestBody(), this.config.id).subscribe(r => {
            if (r.data) {
                this.config = r.data
            }
        })
    }

    onSave() {
        this.service.save(this.prepareRequestBody()).subscribe(r => {
            if (r.data) {
                this.config = r.data
            }
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
