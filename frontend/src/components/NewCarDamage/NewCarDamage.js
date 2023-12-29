import React from 'react'

import styles from './NewCarDamage.module.css'

import NewCarDamageForm from '../NewCarDamageForm/NewCarDamageForm'


function NewCarDamage({setModalVisible}) {
  return (
    <div className={styles.container}>
        <div className={styles.newOrderHeader}>
            <span>Зафиксировать повреждение</span>
            <img src='/Close.svg' alt='CloseButton' onClick={() => setModalVisible(false)}></img>
        </div>
        <NewCarDamageForm setModalVisible={setModalVisible} />
    </div>
  )
}

export default NewCarDamage