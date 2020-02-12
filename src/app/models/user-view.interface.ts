export interface UserView {
    id: string;
    ID: string;
    prefix: number | null;
    phone: number | null;
    donationPool: number;
    collectedMoney: number;
    updateAt: Date;
    personalPool: number;
    xp: number;
    currentNgo: string;
    lastNgo: string;
    transactions: UserTransactionResponse[];
    status: string;
}

export interface UserTransactionResponse {
    type: string;
    createdAt: Date;
    price: number;
    xp: number;
}