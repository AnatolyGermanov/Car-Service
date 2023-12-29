import React from 'react'

import styles from './NewCarPackage.module.css'

import NewCarPackageForm from '../NewCarPackageForm/NewCarPackageForm'

function NewCarPackage({setModalVisible}) {
  return (
    <div className={styles.container}>
        <div className={styles.newOrderHeader}>
            <span>Добавить комплектацию</span>
            <img src='/Close.svg' alt='CloseButton' onClick={() => setModalVisible(false)}></img>
        </div>
        <NewCarPackageForm setModalVisible={setModalVisible} />
    </div>
  )
}

export default NewCarPackage