import React from 'react'

import styles from './OrangeButton.module.css'

const OrangeButton = (
  ({children, ...props}) => {
  return (
    <button className={styles.orangeButton} {...props} >
        {children}
    </button>
  )
})

export default OrangeButton