import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './Header.module.css'

//import useAuth from '../../hooks/useAuth';

import OrangeButton from '../UI/OrangeButton/OrangeButton';
import Navbar from '../Navbar/PublicNavbar';
import Modal from '../UI/Modal/Modal'
import Auth from '../Auth/Auth';

function Header() {
  const navigate = useNavigate()
  const [modalVisible, setModalVisible] = useState(false)
  //const {setIsAuth} = useAuth()

  const checkAuth = async () => {
    const auth_token = localStorage.getItem('auth_token');
    
    if (!auth_token) {
      setModalVisible(true)
      return;
    }
    const res = await axios.get('http://127.0.0.1:8000/api/v1/check_token/', {
      params: {
      'auth_token': auth_token
      }
    })
    if (!res.data.checked) {
      setModalVisible(true)
      return;
    }

    navigate('/profile')
  }

  return (
    <>
      {
        modalVisible ? 
        <Modal setVisible={setModalVisible}>
          <Auth initAuthComponent='SignOn' setModalVisible={setModalVisible}></Auth>
        </Modal>
        : null
      }
      
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <img src='free-icon-logo.png' alt='Logo'></img>
          <span>QuickFix</span>
        </div>
        <div className={styles.navbarContainer}>
          <Navbar />
          <span className={styles.phoneNumber}>+8 800 555 35 35</span>
          <OrangeButton onClick={() => checkAuth()}>Авторизация</OrangeButton>
        </div>
      </div>
    </>
  )
}

export default Header;