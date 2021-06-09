import { REMOTE_PARTNERS_CFG } from "@src/components/config";
import { ProfileSettings } from "@src/components/config/types";
import { setTokenCookie } from "@src/utils/cookienizer"


/**
 * Store profile settings
 * @param param0 
 * @param response - optional, default is null
 * @param isSSR - is Serve Side Rendered, default is false
 * @param isStatic - if page is statically rendered
 * @returns ProfileSettings
 */
// @ts-ignore
export const storeProfile = ({partnerId, currency, region, sortOption, locale, country}: ProfileSettings, 
    response: any = null, isSSR = false, isStatic = false): ProfileSettings=> {
    
    let settings: ProfileSettings = { //set initial default values
        partnerId: partnerId | 1,//NOTE: by default for now we only have tokyo as partner 
        region: REMOTE_PARTNERS_CFG[0].region, //TODO: get this from user selection
        currency: 'SGD', //TODO: get this from user selection
        sortOption: 'PRICE',//TODO: get this from user selection
        locale: 'en',//TODO: get this from user selection
        country: 'Singapore',//TODO: get this from user selection
    } as ProfileSettings;

    settings = {...settings, 
        partnerId: partnerId || settings.partnerId, 
        currency: currency || settings.currency, 
        region: region || settings.region, 
        sortOption: sortOption || settings.sortOption, 
        locale: locale || settings.locale, 
        country: country || settings.country };
    
    if(!isSSR){
        if( !isStatic){
            if(localStorage){
                if(localStorage.getItem('profileSettings')){
                    localStorage.removeItem('profileSettings')
                }
                localStorage.setItem('profileSettings', JSON.stringify(settings))
            }
        }
    }
    
    if(response){
        //cookies
        setTokenCookie(response, 'profile', `${partnerId}|${currency}`) 
    }

    return settings;     
}