import {Injectable} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Configuration, ConfigurationSave} from "./configuration.model";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    constructor(private httpService: HttpService) {
    }

    getConfig() {
        return this.httpService.get<Configuration>('configuration')
    }

    save(config: ConfigurationSave) {
        return this.httpService.post('configuration', config)
    }
}
