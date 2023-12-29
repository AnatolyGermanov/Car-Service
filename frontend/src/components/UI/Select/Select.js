import React from 'react'

import styles from './Select.module.css'

const Select = React.forwardRef(
  ({children, ...props}, ref) => {
    return (
      <select className={styles.select} {...props} ref={ref}>
          {children}
      </select>
    )
  }
)

export default Select