import React from 'react'

import styles from './NewSparePart.module.css'

import NewSparePartForm from '../NewSparePartForm/NewSparePartForm'

function NewSparePart({setModalVisible}) {
  return (
    <div className={styles.container}>
        <div className={styles.newOrderHeader}>
            <span>Добавить запчасть</span>
            <img src='/Close.svg' alt='CloseButton' onClick={() => setModalVisible(false)}></img>
        </div>
        <NewSparePartForm setModalVisible={setModalVisible} />
    </div>
  )
}

export default NewSparePart