import React from 'react'

import styles from './Td.module.css'

function Td({children, ...props}) {
  return (
    <td className={styles.td} {...props}>
        {children}
    </td>
  )
}

export default Td