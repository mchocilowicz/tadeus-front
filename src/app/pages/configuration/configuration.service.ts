import { Injectable } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { Configuration } from "./configuration.model";
import { ConfigurationSave } from "./configuration-save.model";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    constructor(private httpService: HttpService<Configuration>) {
    }

    getConfig() {
        return this.httpService.get('configuration')
    }

    save(dto: ConfigurationSave) {
        return this.httpService.post('configuration', dto)
    }

    update(dto: ConfigurationSave, id: string) {
        return this.httpService.put('configuration/' + id, dto)
    }
}
