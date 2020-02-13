export interface UserView {
    id: string;
    ID: string;
    name: string;
    prefix: number | null;
    phone: number | null;
    donationPool: number;
    collectedMoney: number;
    updateAt: Date;
    personalPool: number;
    xp: number;
    currentNgo: string;
    lastNgo: string;
    transactions: UserTransaction[];
    status: string;
}

export interface UserTransaction {
    type: string;
    createdAt: Date;
    price: number;
    xp: number;
}