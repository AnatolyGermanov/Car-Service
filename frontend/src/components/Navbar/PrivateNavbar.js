import React from 'react'


import styles from './Navbar.module.css'

import useAuth from '../../hooks/useAuth';

import CustomNavLink from '../UI/CustomNavLink/CustomNavLink';

function Navbar() {
  const {user} = useAuth()

  return (
    <div className={styles.navBar}>
        <CustomNavLink to={'/profile'}>Профиль</CustomNavLink>
        {user?.is_staff ?
          <CustomNavLink to={'/clients'}>Клиенты</CustomNavLink>
          : null
        }
        {!user || user.is_staff ?
          null
          : <CustomNavLink to={'/orders'}>Заявки</CustomNavLink>
        }
    </div>
  )
}

export default Navbar;