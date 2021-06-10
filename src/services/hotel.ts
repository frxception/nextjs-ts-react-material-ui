import { getTokenCookie } from "@src/utils/cookienizer";
import { ProfileSettings } from "@src/components/config/types";
import { Hotel } from "@src/types/HotelTypes";
import { API_URL, REMOTE_PARTNERS_CFG } from '@src/components/config';
import { storeProfile } from '@src/utils/storage';

interface ApiHandlerResp {
    data: Hotel | undefined,
    settings: ProfileSettings | undefined
}


/**
 * Hotel list service api handler SSR mode.
 * @param context - required
 * @param isSSR - if api call is in server side
 * @param isStatic - if api call is static side
 * @returns Promise<ApiHandlerResp>
 * @usage
 *  https://localhost:3000/api/hotels --- get all hotel list with the default profile settings
 *  https://localhost:3000/api/hotels?partnerId=1&currency=SGD --- server side hotel list will use the params
 *  https://localhost:3000/api/hotels/<hotel_id>?partnerId=1&currency=SGD --- static rendered hotel view will use the provided params and arguments
 *  https://localhost:3000/api/hotels/<hotel id> ---  static rendered hotel view will use default or existing profile settings
 */
export const listAPIHandler = async (context: any, isSSR: boolean = true, isStatic: boolean = false): Promise<ApiHandlerResp> => {

    const prevProfile = isSSR ? getTokenCookie(context.req, 'profile') : undefined;
    const partnerId = (prevProfile) ? prevProfile.split('|')[0] : (context?.query?.partnerId || 1 ); //set to default partner id if no prev profile
    const currency = (prevProfile) ? prevProfile.split('|')[1] : (context?.query?.currency || REMOTE_PARTNERS_CFG[0].defaultCurrency);  //set to default partner id and currency if no prev profile
    const apiURL = `${API_URL || 'http://localhost:3000/api'}/hotels?partnerId=${partnerId}&currency=${currency}`;
    try{
        const callAPI = await fetch(apiURL);

        if(!callAPI) return new Promise<ApiHandlerResp>((resolve) => {
            resolve({ data: undefined, settings: undefined });
        })
        const data = await(callAPI).json();
        const settings: ProfileSettings = storeProfile({partnerId, currency} as ProfileSettings, context.res, isSSR, isStatic);
        return new Promise<ApiHandlerResp>((resolve) => {
            resolve({ data, settings });
        })
    }catch(e){
        console.error('ERROR: Unable to get request API: ', e)
        return new Promise<ApiHandlerResp>((resolve) => {
            resolve({ data: undefined, settings: undefined });
        })
    }
}


/**
 * Hotel service api handler for client component.
 * @param context - required
 * @returns Promise<ApiHandlerResp>
 * @usage
 *  https://localhost:3000/api/hotels/<hotel_id>?partnerId=1&currency=SGD --- will use the provided params and arguments
 *  https://localhost:3000/api/hotels/<hotel id> --- will use default or existing profile settings
 */
// @ts-ignore
 export const hotelAPIHandler = async (context: any, res: any): Promise<Hotel> => {
    const partnerId = context.query.partnerId || 1; 
    const currency = context.query.currency || REMOTE_PARTNERS_CFG[0].defaultCurrency; 
    res.setHeader('Access-Control-Allow-Origin', '*');

    const apiURL = `${API_URL}/hotels?partnerId=${partnerId}&currency=${currency}`;

    const data = await( await fetch(apiURL)).json();
    return new Promise<Hotel>((resolve) => {
        resolve(data as Hotel);
    });
}

