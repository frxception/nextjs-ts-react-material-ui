import React, { FC } from 'react';
import { HotelTypes } from '@src/types/HotelTypes';
import { currencyFormat1 } from '@src/utils/formatter';
import { REMOTE_PARTNERS_CFG } from './config';

type Props = {
    data: HotelTypes
    currency: string,
}

const HotelPriceTaxFees: FC<Props> = ({data, currency}) => {
    return (
        <div>
          <h3>{data.price ? currencyFormat1(Number(data.price), REMOTE_PARTNERS_CFG[0].currencyChars[currency])+ ' ' + currency  : 'Price not available'} </h3>
          {
              (data.taxes_and_fees ) ?<div><div>Tax: {(data?.taxes_and_fees?.tax) ? data.taxes_and_fees.tax + ' '+currency : 'n/a'} </div>
              <div>Fee {(data?.taxes_and_fees?.hotel_fees) ? data.taxes_and_fees.hotel_fees + ' '+currency : 'n/a'} </div></div> : <div></div>
          }
        </div>
    )
}
export default HotelPriceTaxFees;
