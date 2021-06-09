import { RemotePartnersConfig } from "./types";

const dev = process.env.NODE_ENV !== 'production';


// export const server = dev ? 'http://localhost:3000/api' : 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo';

export const API_URL = process.env.API_URL;
export const API_REMOTE_URL = process.env.REMOTE_API_URL;



//this should be stored and persisted in db as partners api
export const  REMOTE_PARTNERS_CFG: RemotePartnersConfig[] = [
    {
        id: 1, //unique partner id for the region
        locale: 'jp', //language locale
        region: 'tokyo', // city or region from this contry
        ctxURI: '/hotels', 
        country: 'japan',
        defaultCurrency: 'SGD',
        currencies: ['SGD', 'USD', 'CNY', 'KRW'],
        currencyChars: {
            SGD: '$ ',
            USD: '$ ',
            CNY: '￥',
            KRW: '₩ '
        }

        // {
        //     USD: 'http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/USD',
        //     SGD: 'http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/SGD',
        //     CNY: 'http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/CNY',
        //     KRW: 'http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/KRW'
        // }
    }
]

