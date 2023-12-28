import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import styles from './SignOn.module.css'

import useAuth from '../../hooks/useAuth'

import Input from '../UI/Input/Input'
import Label from '../UI/Label/Label'
import Form from '../UI/Form/Form'
import OrangeButton from '../UI/OrangeButton/OrangeButton'

function SignOn() {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const {setIsAuth} = useAuth()

  const signOn = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://127.0.0.1:8000/auth/token/login/', {
      'username': usernameRef.current.value,
      'password': passwordRef.current.value
      })
    
      localStorage.setItem('auth_token', res.data.auth_token)
      setIsAuth(true)
      navigate('/profile')
    }
    catch (error) {
      console.log('Неправильный логин или пароль')
    }
    
  }

  return (
    <Form onSubmit={signOn}>
        <div className={styles.verContainer}>
            <Label htmlFor='login'>Логин</Label>
            <Input id='login' type='text' placeholder='Логин' required ref={usernameRef} />
        </div>
        <div className={styles.verContainer}>
            <Label htmlFor='password'>Пароль</Label>
            <Input id='password' type='password' placeholder='Пароль' required autoComplete='on' ref={passwordRef} />
        </div>
        <OrangeButton type='submit'>Войти</OrangeButton>
    </Form>
  )
}

export default SignOn