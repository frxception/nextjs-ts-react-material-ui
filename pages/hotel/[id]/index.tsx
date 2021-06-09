import React, { FC, useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import styles from '@styles/Hotels.module.css';
import { HotelTypes } from '@src/types/HotelTypes';
import { listAPIHandler } from '@src/services/hotel';
import { API_URL, REMOTE_PARTNERS_CFG } from '@src/components/config';
import HotelStarRatings from '@src/components/HotelStarRatings';
import HotelPriceTaxFees from '@src/components/HotelPriceTaxFees';
import { Button, CardActions, Divider } from '@material-ui/core';
import { getTokenCookie } from '@src/utils/cookienizer';



// @ts-ignore
const Hotel: FC<any> = ( {data}: any ) => {
  // @ts-ignore
  const [checked, setChecked] = useState(true);

  const hotel = data.result.hotels[0]; 
  return (
    <>
 
      <Slide direction="up" in={checked} mountOnEnter unmountOnExit>

        <Card className={`${styles.cardroot} ${styles.card}`} variant="outlined">

          <CardContent>
            <Typography variant="h1" className={styles.title} color="textSecondary" gutterBottom>
              {hotel.name} 
              <HotelStarRatings data={hotel} />
            </Typography>
            <div style={{fontSize:16, paddingBottom: 10}}>{hotel.address}</div>

            <Typography  gutterBottom style={{fontSize: 12}}>
                  Price: <HotelPriceTaxFees data={hotel} currency={data.result.currency} />
            </Typography>
            <br></br>
            <img src={hotel.photo} width="100%" height="300px" />

            
            <Typography variant="body2" component="p">
              <br></br>
              <div dangerouslySetInnerHTML={{ __html: hotel.description || "" }}></div>
            </Typography>

          </CardContent>
          <Divider />
          <CardActions style={{fontSize: 16, padding: 20}}>
            <Button size="large" color='primary'  variant="outlined">Book now</Button>
          </CardActions>
        </Card>

      </Slide>
    </>
  )

}

// @ts-ignore
// export const getInitialProps = async (context) => {
export const getServerSideProps = async (context) => {
  
  const hotelId = context.params.id;
  const prevProfile = getTokenCookie(context.req, 'profile') || undefined;
  const partnerId = (prevProfile) ? prevProfile.split('|')[0] : (context?.query?.partnerId || 1 ); //set to default partner id if no prev profile
  const currency = (prevProfile) ? prevProfile.split('|')[1] : (context?.query?.currency || REMOTE_PARTNERS_CFG[0].defaultCurrency);  //set to default partner id and currency if no prev profile
  const apiURL = `${API_URL}/hotels/${hotelId}?partnerId=${partnerId}&currency=${currency}`;
  const result = await( await fetch(apiURL) ).json();

  return {
    props: {
      data: {
        result,
      },
      revalidate: 20 //validate ssr every 20secs
    }
  };
}


/**
 * @deprecated
 * getStaticProps - render static page at build time (data doesnt change often)
 * @param context 
 * @returns 
 */
export const ___getStaticProps = async (context: any) => {
    const hotelId = context.params.id;
    const partnerId = context.query?.partnerId || 1; 
    const currency = context.query?.currency || REMOTE_PARTNERS_CFG[0].defaultCurrency; 
    const apiURL = `${API_URL}/hotels/${hotelId}?partnerId=${partnerId}&currency=${currency}`;
    const result = await( await fetch(apiURL) ).json();
    return {
      props: {
        data: {
          result,
        },
        revalidate: 20 //incremental static generation (ISG) -- rebuild every 20 secs
      }
    };
  }

  /**
   * @deprecated
   * Render all possible hotel (each hotel id) page view statically.
   * @param context 
   * @returns 
   */
  export const ___getStaticPaths = async (context: any) => {
    const results = await listAPIHandler(context, false, true);
    // @ts-ignore
    const ids = results.data.hotels.map((hotel: HotelTypes) => hotel.id);
    const paths = ids.map((hid: number | string) => ({ params: { id: hid.toString() } }));
  
    return {
      paths,
      fallback: false
    };
  }


export default Hotel;

