import { HotelProps, HotelTypes } from '@src/types/HotelTypes';
import React, { FC } from 'react';
import HotelItem from './HotelItem';

const HotelList: FC<HotelProps> = ({data, settings}) => {
    return (
        <div>
            {data.hotels?.map((hotel: HotelTypes) => (
                <HotelItem hotel={hotel} settings={settings} key={hotel.id} />
            ))}
         </div>   
    )
}
export default HotelList;

