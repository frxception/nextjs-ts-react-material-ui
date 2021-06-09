import React, { FC, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Button, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
type Props = {
    keyword: string
    action: (value: string) => void
}

const xxxuseStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400,
    },
    margin: {
        margin: theme.spacing(1),
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      textField: {
        width: '25ch',
      },
      button: {
        width: 59,
        display: 'flex'
    }
  }),
  
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 700,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

const Search: FC<Props> = ({keyword, action}) => {
    const classes = useStyles();
    const [value, setValue] = useState<string>(keyword);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string);
    };

    const handleSubmit = (event: React.ChangeEvent<{ value: unknown }>) => {
        action(value);
    }
    
    return (

    <Paper className={classes.root} >
   
      <InputBase
        className={classes.input}
        placeholder="Enter hotel search keyword"
        inputProps={{ 'aria-label': 'search hotel keyword' }} onChange={handleChange}
      />
      <IconButton onClick={handleSubmit} className={classes.iconButton} aria-label="search" disabled={value.length > 0 ? false : true}> 
        <SearchIcon  />
      </IconButton>
     
    </Paper>

        // <FormControl  className={classes.formControl}>
        //     <TextField  onChange={handleChange} id="search-input" label="Enter hotel search keyword (i.e. name, address)" />
        //     <Button variant="outlined" size="large" color="primary" className={classes.button}>
        //         Large
        //     </Button>
        // </FormControl> 

            // <FormControl fullWidth className={classes.margin} >
            //     <InputLabel htmlFor="outlined-adornment-amount">"Enter hotel search keyword (i.e. name, address)"</InputLabel>
            //     <OutlinedInput
            //     id="outlined-adornment-amount"
            //     value={value}
            //     onChange={handleChange}
            //     labelWidth={160}
            //     />
            // </FormControl>
    )
}
export default Search;

