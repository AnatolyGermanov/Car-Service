import React from 'react'

import styles from './NewWork.module.css'

import NewWorkForm from '../NewWorkForm/NewWorkForm'

function NewWork({setModalVisible}) {
  return (
    <div className={styles.container}>
        <div className={styles.newOrderHeader}>
            <span>Добавить работу</span>
            <img src='/Close.svg' alt='CloseButton' onClick={() => setModalVisible(false)}></img>
        </div>
        <NewWorkForm setModalVisible={setModalVisible} />
    </div>
  )
}

export default NewWork