export interface RemotePartnersConfig {
    id: number; //unique partner id for the region
    locale: string; // 'jp', //language locale
    region: string; // 'tokyo', // city or region from this contry
    country: string; // 'JAPAN',
    defaultCurrency: string; //'USD',
    ctxURI: string; //'/hotels/tokyo/1',
    currencies: string[]; //['USD', 'SGD', 'CNY', 'KRW'] 
    currencyChars: {[key:string]: string}

}


export interface ProfileSettings {
    partnerId: number;
    region: string;
    currency: string;
    sortOption?: string;
    locale?: string;
    country?: string;
  
}