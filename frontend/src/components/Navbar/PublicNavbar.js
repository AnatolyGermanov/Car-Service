import React from 'react'


import styles from './Navbar.module.css'

import CustomNavLink from '../UI/CustomNavLink/CustomNavLink';

function Navbar() {
  return (
    <div className={styles.navBar}>
        <CustomNavLink to={'/'}>Главная</CustomNavLink>
        <CustomNavLink to={'/about'}>О нас</CustomNavLink>
        <CustomNavLink to={'/services'}>Услуги</CustomNavLink>
    </div>
  )
}

export default Navbar;