import { Typography, withStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import { HotelTypes } from '@src/types/HotelTypes';
import React, { FC } from 'react';



const StyledRating = withStyles({
    iconFilled: {
      color: '#ff6d75',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);

type Props = {
    data: HotelTypes
}

const HotelStarRatings: FC<Props> = ({data}) => {
    return (
        <div>
        <Typography variant="body2" color="textSecondary">
            <span style={{fontSize: 12, verticalAlign: 5}}>Stars: </span>
            <Rating aria-labelledby="Stars" size='small' name="read-only" value={data.stars} readOnly / > 
            &nbsp;&nbsp; <span style={{fontSize: 12, verticalAlign: 5}}>Ratings: </span> 
            
            <StyledRating size='small' title={`${data.rating}/10`}
            name="customized-color"
            defaultValue={Math.round(Number(data.rating))}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={0.5}
            max={10}
            icon={<SentimentSatisfiedIcon fontSize="inherit" />}
            />

        </Typography>
        </div>
    )
}
export default HotelStarRatings;

