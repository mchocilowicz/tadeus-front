import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from "./configuration.service";
import * as moment from 'moment'
import {Configuration, ConfigurationSave} from "./configuration.model";

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

    config: Configuration = null;
    nextUserFrom: Date = null;
    nextPartnerFrom: Date = null;
    nextPartnerSendMessagesAt: Date = null;
    nextPartnerNotEditableAt: Date = null;
    nextNgoFrom: Date = null;

    constructor(private service: ConfigurationService) {
    }

    ngOnInit() {
        this.service.getConfig().subscribe(r => {
            if (!r.error) {
                if (r.data) {
                    this.config = r.data;
                    this.populateToDates();
                } else {
                    this.config = new Configuration();
                    this.onClientDate()
                }

            }
        })
    }

    populateToDates() {
        if (this.config.userFrom) {
            this.nextUserFrom = moment(this.config.userFrom).add(this.config.userCloseInterval, 'days').toDate();
        }
        if (this.config.partnerFrom) {
            this.nextPartnerFrom = moment(this.config.partnerFrom).add(this.config.partnerEmailInterval, 'days').toDate();
        }
        if (this.config.ngoFrom) {
            this.nextNgoFrom = moment(this.config.ngoFrom).add(this.config.ngoCloseInterval, 'days').toDate();
        }
        if (this.config.partnerSendMessagesAt) {
            this.nextPartnerSendMessagesAt = moment(this.config.partnerSendMessagesAt).add(this.config.partnerCloseInterval, 'days').toDate()
        }
        if (this.config.partnerNotEditableAt) {
            this.nextPartnerNotEditableAt = moment(this.config.partnerNotEditableAt).add(this.config.ngoGenerateInterval, 'days').toDate()
        }

        if (!this.config.partnerFrom && !this.config.partnerSendMessagesAt && !this.config.partnerNotEditableAt && !this.config.ngoFrom) {
            this.onPartnerDate(this.nextUserFrom);
        } else if (!this.config.partnerSendMessagesAt && !this.config.partnerNotEditableAt && !this.config.ngoFrom) {
            this.onPartnerSendMessagesAt(this.nextPartnerFrom);
        } else if (!this.config.partnerNotEditableAt && !this.config.ngoFrom) {
            this.onPartnerClose(this.nextPartnerSendMessagesAt)
        } else if (!this.config.ngoFrom) {
            this.onNgoDate(this.nextPartnerNotEditableAt);
        }

    }

    onClientDate(date: Date = new Date()) {
        this.config.userFrom = moment(date).toDate();
        this.nextUserFrom = moment(this.config.userFrom).add(this.config.userCloseInterval, 'days').toDate();
        this.onPartnerDate(this.nextUserFrom);
    }

    onClientIntervalChange(interval: number) {
        if (interval > 0) {
            this.nextUserFrom = moment(this.config.userFrom).add(interval, 'days').toDate();
            this.onPartnerDate(this.nextUserFrom);
        }
    }

    onPartnerDate(date: Date) {
        this.config.partnerFrom = date;
        this.nextPartnerFrom = moment(date).add(this.config.partnerEmailInterval, 'days').toDate();
        this.onPartnerSendMessagesAt(this.nextPartnerFrom)
    }

    onPartnerIntervalChange(interval: number) {
        if (interval > 0) {
            this.nextPartnerFrom = moment(this.config.partnerFrom).add(interval, 'days').toDate();
            this.onPartnerSendMessagesAt(this.nextPartnerFrom);
        }
    }

    onPartnerSendMessagesAt(date: Date) {
        this.config.partnerSendMessagesAt = date;
        this.nextPartnerSendMessagesAt = moment(date).add(this.config.partnerCloseInterval, 'days').toDate();
        this.onPartnerClose(this.nextPartnerSendMessagesAt)
    }

    onPartnerSendMessagesIntervalChange(interval: number) {
        if (interval > 0) {
            this.nextPartnerSendMessagesAt = moment(this.config.partnerSendMessagesAt).add(interval, 'days').toDate();
            this.onPartnerSendMessagesAt(this.nextPartnerSendMessagesAt);
        }
    }

    onPartnerClose(date: Date) {
        this.config.partnerNotEditableAt = date;
        this.nextPartnerNotEditableAt = moment(date).add(Number(this.config.ngoGenerateInterval), 'days').toDate();
        this.onNgoDate(this.nextPartnerNotEditableAt);
    }

    onPartnerCloseIntervalChange(interval: number) {
        if (interval > 0) {
            this.nextPartnerNotEditableAt = moment(this.config.partnerNotEditableAt).add(interval, 'days').toDate();
            this.onNgoDate(this.nextPartnerNotEditableAt);
        }
    }

    onNgoDate(date: Date) {
        this.config.ngoFrom = date;
        this.nextNgoFrom = moment(date).add(this.config.ngoCloseInterval, 'days').toDate();
    }

    onNgoIntervalChange(interval: number) {
        let newInterval = Number(interval);
        if (newInterval > 0) {
            this.nextNgoFrom = moment(this.config.ngoFrom).add(newInterval, 'days').toDate();
        }
    }

    onSave() {
        let save = new ConfigurationSave();
        Object.keys(save).forEach(key => {
            save[key] = this.config[key];
        });

        this.service.save(save).subscribe(r => {

        })
    }
}
