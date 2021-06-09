import { API_REMOTE_URL, REMOTE_PARTNERS_CFG } from '@src/components/config';
import { RemotePartnersConfig } from '@src/components/config/types';
import { getTokenCookie, setTokenCookie } from "@src/utils/cookienizer";
import { Hotel, HotelTypes } from '@src/types/HotelTypes';

// @ts-ignore
export default async(req: NextApiRequest, res: NextApiResponse)=> {

  // console.log(">>>> hotel index req.partnerId: ", req.query.partnerId)
  // const API_REMOTE_URL = 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo'

  const cookiePartnerId = getTokenCookie(req, 'partnerId')
  const partnerId = (req.query) ? Number(req.query.partnerId || 1) : 1;
  const config: RemotePartnersConfig = REMOTE_PARTNERS_CFG.filter(
    (cfg)=> cfg.id === partnerId)[0];

  const currency = req.query.currency || config.currencies[0]  
  // const mainResp = await fetch(`${API_REMOTE_URL}`);
  const mainResp = await fetch(`${API_REMOTE_URL}${config.ctxURI}/${config.region}`);
  const mainJsonData = await mainResp.json();

  // const detailResp =  await fetch(`${API_REMOTE_URL}/1/${currency}`);
  const detailResp =  await fetch(`${API_REMOTE_URL}${config.ctxURI}/${config.region}/1/${currency}`);
  const detailJsonData = await detailResp.json();

  let hotels: HotelTypes[] = [] as HotelTypes[];
  let dataResp: Hotel = {} as Hotel;
  
  dataResp.currency = currency;
  dataResp.partnerId = partnerId;
  dataResp.region = config.region;

  mainJsonData.forEach((hotel: HotelTypes)=>{
    const detailResult: HotelTypes = detailJsonData.filter((data: any)=>data.id === hotel.id)[0]
    if(detailResult){
      const price = detailResult.price
      const competitors = {...detailResult.competitors} ;
      const taxes_and_fees = {...detailResult.taxes_and_fees} ; 

      hotels.push({...hotel,
        //@ts-ignore 
        price, competitors, taxes_and_fees
      })
    }else{
      hotels.push(hotel);
    }
  });

  dataResp.hotels = hotels;

  setTokenCookie(res, 'profile', `${partnerId}|${currency}`)

  res.status(200).json(dataResp)


};

// The endpoints to use are:
// Static data: https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo
// Prices:
// USD: http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/USD
// SGD: http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/SGD
// CNY: http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/CNY
// KRW: http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/KRW
