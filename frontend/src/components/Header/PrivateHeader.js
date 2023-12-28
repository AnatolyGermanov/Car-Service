import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './Header.module.css'

import useAuth from '../../hooks/useAuth';

import OrangeButton from '../UI/OrangeButton/OrangeButton';
import Navbar from '../Navbar/PrivateNavbar';

function Header() {
  const navigate = useNavigate()
  const {setIsAuth} = useAuth()

  const signOut = async () => {
    try {
      const auth_token = localStorage.getItem('auth_token')
      await axios.post('http://127.0.0.1:8000/auth/token/logout/', undefined, {
        headers: {
          Authorization: `Token ${auth_token}`
        }
      })
      localStorage.removeItem('auth_token')
      setIsAuth(false)
      navigate('/')
    }
    catch (error) {
      console.log('')
    }
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <img src='/free-icon-logo.png' alt='Logo'></img>
          <span>QuickFix</span>
        </div>
        <div className={styles.navbarContainer}>
          <Navbar />
          <span className={styles.phoneNumber}>+8 800 555 35 35</span>
          <OrangeButton onClick={() => signOut()}>Выйти</OrangeButton>
        </div>
      </div>
    </>
  )
}

export default Header;