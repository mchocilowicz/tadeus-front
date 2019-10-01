import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { TradingPointService } from "../trading-point-service.service";

@Component({
    selector: 'app-trading-point-file-dialog',
    templateUrl: './trading-point-file-dialog.component.html',
    styleUrls: ['./trading-point-file-dialog.component.scss']
})
export class TradingPointFileDialogComponent {
    file: null | File;


    constructor(
        public dialogRef: MatDialogRef<TradingPointFileDialogComponent>, private service: TradingPointService) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onChange($event: any) {
        this.file = $event.target.files[0]
    }

    onOkClick() {
        this.service.uploadFile(this.file).subscribe(r => {
            if (!r.error) {
                this.dialogRef.close()
            }
        })
    }
}
