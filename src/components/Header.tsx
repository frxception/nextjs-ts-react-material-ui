import React, { FC } from 'react';
import styles from '@styles/Header.module.css'

const Header: FC = () => {
    return (
      <div style={{padding: 30}}>
        <h1 className={styles.title}>
          <span>Super Crazy Cheap Budget</span>  Hotel Listings
        </h1>
        <p className={styles.description}>
          
        </p>
      </div>
    )
  }
  
  export default Header
  



