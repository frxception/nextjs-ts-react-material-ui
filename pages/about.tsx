// index.tsx
import { FC } from 'react';
import Head from 'next/head';
import styles from '../styles/Layout.module.css';

const About: FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>All about the hotel bookings</title>        
        <meta name='keywords' content='Hotel Bookings' />
      </Head>
      <h1>About Hotel Bookings</h1>
    </div>
  );
};

export default About;
