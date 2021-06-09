// index.tsx
import React, { FC, useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Layout.module.css";
import HotelTable from "@src/components/HotelTable";
import { filteredTokyo } from "@src/data/tokyo";


const Home: FC<any> = ({ data }: any) => {
  const hotelData = {...filteredTokyo};
  return (
    <div className={styles.container}>
      <Head>
        <title>Hotel Bookings</title>
        <meta name="keywords" content="Hotel Bookings" />
      </Head>
      <HotelTable  data={hotelData}/>

    </div>
  );
};


export default Home;
