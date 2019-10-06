import { City, TradingPointType } from "./trading-point.interface";

export interface INgo {
    ID: string;
    phone: string;
    email: string;
    name: string;
    verified: boolean;
    verifiedAt: Date;
    type: TradingPointType,
    city: City
}
