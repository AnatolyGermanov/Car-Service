import React, { useEffect, useState } from 'react'
import axios from 'axios'

import styles from './Profile.module.css'

import Header from '../../components/Header/PrivateHeader'
import Info from './Info'
import ChangeUsername from './ChangeUsername'
import ChangePassword from './ChangePassword'

function Profile() {
  const [user, setUser] = useState(null)

  const getUser = async () => {
    try {
      const auth_token = localStorage.getItem('auth_token')
      const res = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me/', {
        headers: {
          Authorization: `Token ${auth_token}`
        }
      })
      
      const userId = res.data.id
      
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/userlist/${userId}`, {
        headers: {
          Authorization: `Token ${auth_token}`
        }
      })

      setUser(response.data)
    }
    catch (error) {
      console.error(error)
      console.log('Недопустимый токен')
    }
  }

  useEffect(() => {
    getUser();

  }, [])

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.halfContainer}>
          <Info user={user} />
        </div>
        
        <div className={styles.halfContainer}>
          <ChangeUsername />
          <ChangePassword />
        </div>
      </div>
    </>
  )
}

export default Profile