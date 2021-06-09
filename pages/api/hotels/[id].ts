import { REMOTE_PARTNERS_CFG } from '@src/components/config';
import { hotelAPIHandler } from '@src/services/hotel';
import { HotelTypes } from '@src/types/HotelTypes';

/**
*  Get statically generate hote view page.
*  http://localhost:3000/api/hotels/2?partnerId=1&currency=SGD
*  https://localhost:3000/api/hotels/<hotel_id>?partnerId=1&currency=SGD --- static rendered hotel view will use the provided params and arguments
*  https://localhost:3000/api/hotels/<hotel id> ---  static rendered hotel view will use default or existing profile settings
*/
const handler = async (context: any, res: any): Promise<any> => {

    const hotelId = context.query.id;
    const partnerId = context.query.partnerId;
    const results = await hotelAPIHandler(context, res);
        return new Promise((resolve) => {
            const filtered = results.hotels.filter((hotel: HotelTypes) => hotel.id === Number(hotelId));
            if (filtered.length > 0) {
                res.status(200).json(
                    {
                        partnerId,
                        region: REMOTE_PARTNERS_CFG[0].region,
                        currency: results.currency,
                        hotels: [filtered[0]]
                    }
                );
            } else {
                res
                    .status(404)
                    .json({ message: `Hotel with the id of ${context?.query?.id} does not exist :-(` })
            }
            resolve(true);

    });

}
export default handler;