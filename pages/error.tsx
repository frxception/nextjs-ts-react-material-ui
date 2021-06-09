// index.tsx
import React, { FC } from 'react';
import Head from 'next/head';
import styles from '../styles/Layout.module.css';
import Link from 'next/link';
import { Button } from '@material-ui/core';

const Error: FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>All about the hotel bookings</title>        
        <meta name='keywords' content='Hotel Bookings' />
      </Head>
      <h2>Oops something went wrong with API! Please have some tea and try again later :)</h2>
      <Button>
                <Link href={`/`}> Go back home</Link>
      </Button>
    </div>
  );
};

export default Error;
