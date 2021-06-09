import React, { FC, useState } from 'react';
import { HotelTypes } from '@src/types/HotelTypes';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { REMOTE_PARTNERS_CFG } from './config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
      marginLeft:40,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);
type Props = {
    defaultCurrency: string,
    action: (value: string) => void
}

const CurrencySelector: FC<Props> = ({defaultCurrency, action}) => {
    const classes = useStyles();
    const [currency, setCurrency] = useState(defaultCurrency);
    const currencies = [...REMOTE_PARTNERS_CFG[0].currencies];

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCurrency(event.target.value as string);
        action(event.target.value as string);
    };

    return (
        <FormControl  className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label" >Select Currency</InputLabel>
                <Select 
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={currency}
                onChange={handleChange}
                >
                    
                    {/* TODO: make this dynamic */}
                    <MenuItem key={0} value={currencies[0]}>{currencies[0]}</MenuItem>
                    <MenuItem key={1} value={currencies[1]}>{currencies[1]}</MenuItem>
                    <MenuItem key={2} value={currencies[2]}>{currencies[2]}</MenuItem>
                    <MenuItem key={3} value={currencies[3]}>{currencies[3]}</MenuItem>
                    {/* {
                        currencies.map((t) => {
                            <MenuItem key={t} value={t}>{t}</MenuItem>
                        })
                    } */}
               
                </Select>
        </FormControl> 

    )
}
export default CurrencySelector;

