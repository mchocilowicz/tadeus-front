import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import ApiResponse from "../models/api-response.interface";
import {Observable} from "rxjs";

@Injectable()
export class TransactionService {

    constructor(private httpService: HttpService) {
    }

    getTransactions(): Observable<ApiResponse<TransactionListElem[]>> {
        return this.httpService.get<TransactionListElem[]>('transaction')
    }

    getTransactionBy(ID: string): Observable<ApiResponse<TransactionView>> {
        let path = ['transaction', ID].join('/');
        return this.httpService.get<TransactionView>(path)
    }
}

export interface TransactionListElem {
    ngoID: string
    userID: string
    transactionID: string
    terminalID: string
    tradingPointID: string
    createdAt: Date
}

export interface TransactionView {
    ngoID: string
    userID: string
    transactionID: string
    terminalID: string
    tradingPointID: string
    userXp: number
    isPaid: boolean
    ngoDonation: number
    price: number
    donationPercentage: number
    provisionPercentage: number
    paymentValue: number
    vat: number
    provision: number
    donationPool: number
    personalPool: number
    tradingPointXp: number
    createdAt: Date
}
