export interface ITradingPoint {
    id: string,
    ID: string,
    type: TradingPointType,
    name: string,
    donation: number,
    vat: number,
    fee: number,
    city: City,
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
    city: City;
    type: TradingPointType;
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

export interface City {
    id: string,
    name: string
}

export interface TradingPointType {
    code: number,
    id: string,
    name: string
}
