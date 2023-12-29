import React from 'react'
import { Link } from 'react-router-dom'

import styles from './CustomLink.module.css'

function CustomLink({children, to, ...props}) {
  return (
    <Link
        to={to}
        className={styles.link }
        {...props}
    >
        {children}
    </Link>
  )
}

export default CustomLink