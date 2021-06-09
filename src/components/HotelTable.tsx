import React, {FC, useState, useEffect} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { CustomTableProps, HeadCell, Hotel, HotelDetailsCompetitorType, HotelTypes, Order } from '@src/types/HotelTypes';
import { sorter, getComparator} from '@src/utils/sortify';
import { Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Link, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import HotelCompetitors from './HotelCompetitors';
import HotelStarRatings from './HotelStarRatings';
import HotelPriceTaxFees from './HotelPriceTaxFees';
import LoaderModal from './LoaderModal';

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'rating', numeric: true, disablePadding: false, label: 'Rating' },
  { id: 'stars', numeric: true, disablePadding: false, label: 'Stars' },
];

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: 1000,
    },
    table: {
      minWidth: 650,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    tableContainer: {
      borderRadius: 25 ,
      margin: '10px 10px',
      maxWidth: 1500,
      width: 1000,
      marginBottom: theme.spacing(2),
    },
    tableHeaderCell: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 40,
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    tableRowCell: {
      padding: 25
    },
    
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    },
    media: {
      height: 200,
      width: 300
    },
    cardRoot: {
      maxWidth: 900,
      minWidth:300,
      minHeight: 230,
      maxHeight: 350,
      border: 'none',
      boxShadow: "none"
    }

}));

const CustomTableHead: FC<CustomTableProps> = (props: CustomTableProps) => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof HotelTypes) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
    
      <TableCell  className={classes.tableHeaderCell} align="right">
        Sort By: 
      </TableCell>
        {headCells.map((headCell) => (
          <TableCell  className={classes.tableHeaderCell} 
            key={headCell.id}
            align='left' //{headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}>
              
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>

                <Chip style={{backgroundColor: "orange", color: 'white', fontSize: 12, fontWeight: 'bold'}} label={headCell.label}>
                </Chip>

              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}

            </TableSortLabel>

          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// @ts-ignore
const HotelTable: FC<any> = ( {data}: Hotel) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof HotelTypes>('price');
  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [hotels, setHotels] = useState([] as HotelTypes[]);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const classes = useStyles();
  useEffect(() => {
    setHotels(data.hotels);
  });

  const handleModal = (message : string, isOpen: boolean): void => {
    setModalMessage(message);
    setModalOpen(isOpen);
  }
  // @ts-ignore
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // @ts-ignore
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof HotelTypes) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const savingsPercentage = (hotel: any, competitors: HotelDetailsCompetitorType): number => {
    let totalPerc: number[] = [];
    if(! competitors ) return 0;
    // @ts-ignore
    if(Object.keys(competitors).length > 0){
      // @ts-ignore
      Object.entries(competitors).map((t,k)=>{
        if(Number(t[1]) > Number(hotel.price)){
          totalPerc.push(Number(t[1]));
        }
      });
    }
    const max = totalPerc.length > 0 ? Math.max(...totalPerc) : 0;
    const diffMax = Math.abs(max - Number(hotel.price));
    const diffVal = diffMax - max;
    const perc = diffMax / diffVal;
    const total = Math.round(Math.abs(( perc * 100 ).toFixed(2)));
    // @ts-ignore
    return totalPerc.length > 0 ? (total === 0 ? 1 : total) : 0;
    // return totalPerc.length > 0 ? Number( (Math.floor( max - Number(hotel.price) )) / max ).toFixed(2) : 0;
 } 


  return (
    <div className={classes.root}>

      <LoaderModal open={modalOpen} message={modalMessage} />

      {

          (hotels && Object.keys(hotels).length > 0) ?

          <TableContainer component={Paper} className={classes.tableContainer}>
            
          <Table className={classes.table} aria-labelledby="tableTitle" aria-label="enhanced table">
            <CustomTableHead onRequestSort={handleRequestSort} rowCount={hotels.length} classes={classes} order={order} orderBy={orderBy} />

            <TableBody>
              { 
                //@ts-ignore
                sorter(hotels, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: HotelTypes) => {
                  return (
                    <TableRow hover key={row.name} >
                      <TableCell className={classes.tableRowCell}  align="left">

                        <Grid container>
                            <Grid item lg={2}>
                                <Card className={classes.cardRoot}>
                                  <CardActionArea>
                                    <CardMedia
                                      className={classes.media}
                                      image={row.photo}
                                      title={row.name}
                                    />
                                  
                                  </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>

                      </TableCell>

                      <TableCell className={classes.tableRowCell}  colSpan={3} align="left">
                        
                        <Grid container>
                          <Grid item lg={2}>
                              {/* <Avatar alt={row.name} src={row.id} className={classes.avatar}/> */}
                              <Card className={classes.cardRoot}>
                                <CardActionArea>
                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                      {row.name}
                                      <HotelStarRatings data={row} />
                                    </Typography>

                                    <Typography variant="body2" color="textSecondary" >
                                      {row.address}
                                    </Typography>

                                    <Typography variant="body2" color="textSecondary" >
                                      {row.competitors ? <HotelCompetitors hotel={row} currency={data.currency}/> : ''}
                                    </Typography>

                                  </CardContent>
                                </CardActionArea>
                              </Card>

                            </Grid>
                      
                          </Grid>

                      </TableCell>

                      <TableCell className={classes.tableRowCell} component="h2" valign="top">
                          <div>
                          <Button onClick={()=>handleModal('Loading selected hotel...', true)} variant="outlined" size="medium" style={{marginTop: 15}}>
                              <Link  href={`/hotel/${row.id}`}>Select room</Link>
                          </Button>
                          </div>

                          <HotelPriceTaxFees data={row} currency={data.currency} />

                          <br></br>
                          <div>
                            {
                              !row.competitors || savingsPercentage(row, row.competitors) === 0 ? <span></span> :
                              <Chip style={{backgroundColor: "green", color: 'white', fontSize: 12, fontWeight: 'bold'}} icon={<CheckIcon style={{color: "white"}} />} label={'Save up to '+savingsPercentage(row, row.competitors) + '%'}>
                              </Chip>
                            }
                          
                          </div>
                        

                      </TableCell>
                      
                    </TableRow>
                  );
                })
              }
            </TableBody>


          </Table>
          <TablePagination  onChangePage={handleChangePage}  onChangeRowsPerPage={handleChangeRowsPerPage} rowsPerPageOptions={[4, 8, 15]} component="div" count={hotels.length} rowsPerPage={rowsPerPage} page={page} />

        </TableContainer>

        :

        <TableContainer component={Paper} className={classes.tableContainer}>
            <div style={{margin: 'auto', textAlign:"center", padding: 40, marginTop: 20}}>Woohh! No hotels found <MoodBadIcon/></div>
            <div style={{margin: 'auto', textAlign:"center", marginBottom: 50}}>
                <Button onClick={()=>handleModal('Teleporting...', true)} variant="outlined" size="large" style={{marginTop: 15}}>
                      <Link  href={`/`}>Go back to listings</Link>
                </Button>
            </div>

        </TableContainer>


          
      }


      

      
    </div>
  );
}



export default HotelTable;
