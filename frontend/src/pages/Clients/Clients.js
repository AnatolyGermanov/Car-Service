import React from 'react'

import styles from './Clients.module.css'

import Header from '../../components/Header/PrivateHeader'
import ClientsList from '../../components/ClientsList/ClientsList'

function Clients() {
  return (
    <>
        <Header />
        <div className={styles.container}>
            <p>Клиенты</p>
            <ClientsList />
        </div>
    </>
  )
}

export default Clients