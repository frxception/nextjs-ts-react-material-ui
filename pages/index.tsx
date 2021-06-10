// index.tsx
import React, { FC, useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Layout.module.css";
import { listAPIHandler } from "@src/services/hotel";
import { storeProfile } from "@src/utils/storage";
import HotelTable from "@src/components/HotelTable";
import CurrencySelector from "@src/components/CurrencySelector";
import { ProfileSettings } from "@src/components/config/types";
import { Hotel, HotelTypes } from "@src/types/HotelTypes";
import LoaderModal from "@src/components/LoaderModal";
import Search from "@src/components/Search";

const Home: FC<any> = ({ data: {hotelData, profileSettings }}) => {
  // @ts-ignore
  const [hotel, setHotel] = useState<Hotel>(hotelData);
  // @ts-ignore
  const [settings, setSettings] = useState<ProfileSettings>(profileSettings)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState<string>('');
  const [searchColumns, setSearchColumns] = useState<string[]>(["name", "address"]);


  //one time load
  useEffect(() => {
    setSettings( profileSettings );
    storeProfile( profileSettings, null)
    localStorage.setItem('profileSettings', JSON.stringify(profileSettings))
  });

  useEffect(() => {
    if(hotelData){
      setHotel( hotelData );
    }
  }, []);

  const fetchHotelsByCurrency = async (value: string) => {
    return fetch('http://localhost:3000/api/hotels?partnerId=1&currency='+settings.currency);
  }
  // @ts-ignore
  const selectCurrency = async (value: string): void=> {
    settings.currency = value;
    setSettings( settings );
    profileSettings.currency = value;
    storeProfile({...profileSettings, currency: value}, null) ;
    setModalMsg(`Switching to (${settings.currency}) Currency`);
    setModalOpen(true);
    // @ts-ignore
    const result = await(await fetchHotelsByCurrency(value)).json();
    setHotel( result )
    setModalOpen(false);
  }

  const searchAction = async (keyword: string) => {
      setModalMsg(`Loading search results...`);
      setModalOpen(true);

      // @ts-ignore
      const reloadHotels = await(await fetchHotelsByCurrency(settings.currency)).json();
      let modHotel = {...hotel};
      
      if(keyword && keyword.length > 0){
        const filterResults = reloadHotels.hotels.filter((row: HotelTypes)=> 
          searchColumns.some((column) =>
            // @ts-ignore
            row[column].toString().toLowerCase().indexOf(keyword.toLowerCase()) > -1
          )
        );
        modHotel = {...hotel, hotels: filterResults };
      }
      
      setHotel(modHotel)
      setModalOpen(false);

  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Hotel Bookings</title>
        <meta name="keywords" content="Hotel Bookings" />
      </Head>
      <LoaderModal open={modalOpen} message={modalMsg} />
      <div style={{display: 'flex'}}>
        <Search keyword={''} action={searchAction} />
        <CurrencySelector defaultCurrency={settings.currency} action={selectCurrency}/>
      </div>
      
      {/* <HotelTable  data={data.hotelData}/> */}
      <HotelTable data={hotel}/>

    </div>
  );
};

/**
 * getServerSideProps - generate each page at request time
 * @param context 
 * @returns ssr props
 */
export const getServerSideProps = async (context: any) => {

  const result = await listAPIHandler(context);
  if (!result?.data?.hotels) {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }


  return {
    props: {
      data: {
        hotelData: result.data,
        profileSettings: JSON.parse(JSON.stringify(result.settings))
      }
    }
  };
};


export default Home;
