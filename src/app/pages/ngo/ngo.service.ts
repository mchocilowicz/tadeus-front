import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { HttpService } from "../../services/http.service";

@Injectable()
export class NgoService {

    constructor(private service: HttpService<any>) {
    }

    uploadFile(file: File) {
        return this.service.file('ngo/import', file)
    }

    getNgoList() {
        return this.service.get('ngo')
    }

    getNgoWithQuery(param: { name: string, city: string, type: string }) {
        let params = new HttpParams();
        Object.keys(param).forEach(k => {
            if (param[k]) {
                params = params.append(k, param[k])
            }
        });
        return this.service.get('ngo', params)
    }

    getTypes() {
        return this.service.get('ngo-type')
    }
}
