import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../services/http.service";

@Component({
    selector: 'app-simple-dialog',
    templateUrl: './simple-dialog.component.html',
    styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent {

    value: string;

    constructor(
        public dialogRef: MatDialogRef<SimpleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private service: HttpService) {
        this.value = data.name;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onOkClikc() {
        const data = this.data;
        if (data.isEdit) {
            this.service.put(data.path, {name: data.name}).subscribe(r => {
                if (!r.error) {
                    this.dialogRef.close();
                }
            })
        } else {
            this.service.post(data.path, {name: data.name}).subscribe(r => {
                if (!r.error) {
                    this.dialogRef.close();
                }
            })
        }
    }
}
