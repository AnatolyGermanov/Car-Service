import React, { useState } from 'react'

import styles  from './Auth.module.css'

import SignOn from '../SignOn/SignOn'
import SignUp from '../SignUp/SignUp'

const authComponents = {
    'SignOn': <SignOn />,
    'SignUp': <SignUp />,
}

function Auth({initAuthComponent, setModalVisible}) {
    const [authComponent, setAuthComponent] = useState(initAuthComponent)

  return (
    <div className={styles.auth}>
        <div className={styles.authHeader}>
            <span>Авторизация</span>
            <img src='Close.svg' alt='CloseButton' onClick={() => setModalVisible(false)}></img>
        </div>
        <div>
            <button 
                style={{borderTopLeftRadius: 5, borderBottomLeftRadius: 5}} 
                className={`${styles.button} ${authComponent === 'SignOn' ? styles.active : ''}`}
                onClick={() => setAuthComponent('SignOn')}
            >
                Вход в систему
            </button>
            <button 
                style={{borderTopRightRadius: 5, borderBottomRightRadius: 5}} 
                className={`${styles.button} ${authComponent === 'SignUp' ? styles.active : ''}`}
                onClick={() => setAuthComponent('SignUp')}
            >
                Регистрация
            </button>
        </div>
        {authComponents[authComponent]}
    </div>
  )
}

export default Auth