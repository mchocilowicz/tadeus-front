import {IType} from "./type.interface";
import {ICity} from "./city.interface";

export interface INgo {
    ID: string;
    phone: string;
    email: string;
    name: string;
    verified: boolean;
    verifiedAt: Date;
    type: string,
    city: string
}

export interface INgoView {
    city: ICity;
    type: IType;
    bankNumber: string;
    phone: string;
    email: string;
    verified: boolean;
    verifiedAt: Date;
    longitude: string;
    latitude: string;
    name: string;
    address: string;
    postCode: string;
    ID: string;
}

export class NgoSave {
    city: string = '';
    type: string = '';
    bankNumber: string = '';
    phone: string = '';
    email: string = '';
    verified: boolean = false;
    verifiedAt: Date = null;
    longitude: number = null;
    latitude: number = null;
    name: string = '';
    address: string = '';
    postCode: string = '';
}
