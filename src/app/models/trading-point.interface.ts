import {IType} from "./type.interface";
import {ICity} from "./city.interface";

export interface TradingPointListElem {
    ID: string,
    type: string,
    name: string,
    city: string,
    email: string
}

export interface IType {
    id: string;
    name: string;
}

export class TradingPointView {
    ID: string;
    type: string;
    name: string;
    address: any;
    donationPercentage: number;
    image: string;
    email: string;
    price: number;
    active: boolean;
    terminals: any;
    transactions: any;
    vat: number = 23;
    fee: number = 0.66;
    xp: number = 0;

    constructor() {
        this.address = new Address();
    }
}

export class Address {
    city: ICity;
    longitude: number;
    latitude: number;
    postCode: number;
    street: string;
    number: number;
}

export interface Terminal {
    ID: string;
    name: string;
    prefix: number;
    phone: number;
    step: string;
}

export class TradingPointSave {
    ID: string;
    city: ICity;
    type: IType;
    name: string;
    address: string;
    donationPercentage: number;
    vat: number = 23;
    longitude: number;
    latitude: number;
    fee: number = 0.66;
    postCode: string;
    xp: number = 0;
}
