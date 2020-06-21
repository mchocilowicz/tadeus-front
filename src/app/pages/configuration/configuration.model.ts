export class Configuration {
    minNgoTransfer: number = 0;
    minPersonalPool: number = 0;
    userExpiration: number = 365;

    personalPoolFrequency: number = 30;
    donationPoolFrequency: number = 30;

    userCloseInterval: number = 30;
    partnerEmailInterval: number = 14;
    partnerCloseInterval: number = 21;
    ngoGenerateInterval: number = 14;
    ngoCloseInterval: number = 21;

    userFrom: Date = null;
    partnerFrom: Date = null;
    partnerSendMessagesAt: Date = null;
    partnerNotEditableAt: Date = null;
    ngoFrom: Date = null;
}

export class ConfigurationSave {
    minNgoTransfer: number = null;
    minPersonalPool: number = null;
    userExpiration: number = null;
    userCloseInterval: number = null;
    partnerEmailInterval: number = null;
    partnerCloseInterval: number = null;
    ngoGenerateInterval: number = null;
    ngoCloseInterval: number = null;
    personalPoolFrequency: number = 30;
    donationPoolFrequency: number = 30;
}
