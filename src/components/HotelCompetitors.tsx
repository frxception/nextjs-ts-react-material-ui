import React, { FC, useState } from 'react';
import { HotelTypes } from '@src/types/HotelTypes';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { REMOTE_PARTNERS_CFG } from './config';
import { currencyFormat1 } from '@src/utils/formatter';

type Props = {
  hotel: HotelTypes
  currency: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    panel: {
      backgroundColor: theme.palette.background.paper,
      marginLeft: 0
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light)
    },
  }),
);

// @ts-ignore
const HotelCompetitors: FC<Props> = ( {hotel, currency}) => {
  const classes = useStyles();
  const savings = (cPrice: number) => {
    return Math.floor( cPrice - Math.floor(Number(hotel.price)));
  };
  const sIconStyle = (color: string) => {
     return {color, paddingLeft: 2, marginBottom: -5, marginLeft: 8};
  }

  return (

        <Grid container spacing={1}>
          <Grid item xs={12} md={14}>
            <div className={classes.panel}>

            <br/> {
                  //@ts-ignore
                  Object.keys(hotel.competitors).length === 0 ? '' : 'Competitors:'}
                  { 
                      //@ts-ignore
                      Object.entries(hotel.competitors).map((t,k) => 
                      <div key={k}>
                        <LocalHotelIcon style={sIconStyle('rgb(167 196 249)')} />
                          <span style={{fontWeight:'bold', paddingLeft: 7}}><a href={t[0]+'.com'}>{t[0]}</a>: &nbsp;</span>
                          <span style={savings(t[1]) < 0 ? {textDecorationLine: 'line-through', textDecorationColor: 'green', fontStyle: 'italic', fontSize:12} : {color: 'red', fontSize:12}}>{ currencyFormat1(Math.round(Number(t[1])), REMOTE_PARTNERS_CFG[0].currencyChars[currency]) } <span> &nbsp;{currency} </span></span>
                          {
                            (savings(t[1]) < 0 ) ? <span style={{fontSize: 12}}> <ThumbUpIcon style={sIconStyle('#61bd61')} /> &nbsp;<i>Savings: </i> {Math.abs(savings(t[1]))} {' ' +currency} </span> : 
                            <span>&nbsp;<ThumbDownIcon style={sIconStyle('#ff6d75')} /></span>
                          }
                      </div>) 
                    } 
            </div>
          </Grid>
        </Grid>
  )


}
export default HotelCompetitors;
