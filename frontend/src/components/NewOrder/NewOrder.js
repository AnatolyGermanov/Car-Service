import React from 'react'

import styles from './NewOrder.module.css'

import NewOrderForm from '../NewOrderForm/NewOrderForm'

function NewOrder({setModalVisible}) {
  return (
    <div className={styles.container}>
        <div className={styles.newOrderHeader}>
            <span>Новая заявка</span>
            <img src='/Close.svg' alt='CloseButton' onClick={() => setModalVisible(false)}></img>
        </div>
        <NewOrderForm setNewOrderModalVisible={setModalVisible} />
    </div>
  )
}

export default NewOrder