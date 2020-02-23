import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {UserListItem} from "../models/user-list-item.interface";


@Injectable()
export class UserService {

    constructor(private readonly httpService: HttpService) {
    }

    getUsers(filters: any) {
        const params = Object.keys(filters).filter(it => filters[it]).map(it => `${it}=${filters[it]}`).join("&");
        return this.httpService.get<UserListItem[]>('user?' + params);
    }

    getUserInformationBy(ID: string) {
        return this.httpService.get<any>('user/' + ID);
    }

    updateUserInformation(ID: string, body: any) {
        return this.httpService.put('user/' + ID, body)
    }

    transferPoolToAnotherUser(ID: string, body: any) {
        return this.httpService.put('user/' + ID + "/transfer", body)
    }

    deleteUser(ID: string) {
        return this.httpService.delete(`user/${ID}`)
    }
}
