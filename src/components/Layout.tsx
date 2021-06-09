import React, { FC } from 'react';
import styles from '../../styles/Layout.css'
import Nav from './Nav';
import Meta from './Meta';
import Header from './Header';

const Layout: FC = ({children}) => {
    return (
        <>
            <Meta title="Hotel Booking listings" keywords="hotel bookings" description="Hotel Listings" />
            <Nav />
            <div className={styles.container}>
                <main className={styles.main}>
                <Header />
                {children}
                </main>
            </div>
        </>
    )
}
export default Layout;

