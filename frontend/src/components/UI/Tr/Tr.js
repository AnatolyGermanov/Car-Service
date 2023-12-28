import React from 'react'

import styles from './Tr.module.css'

function Tr({children, ...props}) {
  return (
    <tr className={styles.tr} {...props}>
        {children}
    </tr>
  )
}

export default Tr