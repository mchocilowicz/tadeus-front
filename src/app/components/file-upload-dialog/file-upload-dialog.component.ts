import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-file-upload-dialog',
    templateUrl: './file-upload-dialog.component.html',
    styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent {

    file: null | File;

    constructor(
        public dialogRef: MatDialogRef<FileUploadDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private service: HttpService<any>,
        private router: Router) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onChange($event: any) {
        this.file = $event.target.files[0]
    }

    onOkClick() {
        this.service.file(this.data.path + '/' + 'import', this.file).subscribe(r => {
            if (!r.error) {
                this.dialogRef.close();
                this.router.navigateByUrl(this.data.path);
            }
        })
    }

}
