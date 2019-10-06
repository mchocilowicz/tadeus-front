import { IType } from "./type.interface";
import { ICity } from "./city.interface";

export interface ITradingPoint {
    id: string,
    ID: string,
    type: IType,
    name: string,
    donation: number,
    vat: number,
    fee: number,
    city: ICity,
    xp: number,
    updatedDate: Date,
}

export class TradingPointView {
    ID: string = '';
    city: string = '';
    type: string = '';
    name: string = '';
    address: string = '';
    donationPercentage: number = null;
    vat: number = 23;
    longitude: number = null;
    latitude: number = null;
    fee: number = 0.66;
    postCode: string = '';
    xp: number = 0;
}

export class TradingPointSave {
    ID: string = '';
    city: ICity;
    type: IType;
    name: string = '';
    address: string = '';
    donationPercentage: number = null;
    vat: number = 23;
    longitude: number = null;
    latitude: number = null;
    fee: number = 0.66;
    postCode: string = '';
    xp: number = 0;
}
