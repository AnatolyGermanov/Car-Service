import React from 'react'

import styles from './ChangeOrder.module.css'

import ChangeOrderForm from '../ChangeOrderForm/ChangeOrderForm'


function ChangeOrder({setModalVisible, order}) {
  return (
    <div className={styles.container}>
        <div className={styles.changeOrderHeader}>
            <span>Данные заявки</span>
            <img src='/Close.svg' alt='CloseButton' onClick={() => setModalVisible(false)}></img>
        </div>
        <ChangeOrderForm  order={order} />
    </div>
  )
}

export default ChangeOrder