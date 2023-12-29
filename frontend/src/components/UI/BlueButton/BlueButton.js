import React from 'react'

import styles from './BlueButton.module.css'

const BlueButton = (
  ({children, ...props}) => {
  return (
    <button className={styles.BlueButton} {...props} >
        {children}
    </button>
  )
})

export default BlueButton