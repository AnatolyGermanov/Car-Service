import React, { useRef } from 'react'

import styles from './SignUp.module.css'

import Input from '../UI/Input/Input'
import Label from '../UI/Label/Label'
import Form from '../UI/Form/Form'
import OrangeButton from '../UI/OrangeButton/OrangeButton'
import axios from 'axios'

function SignUp() {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const re_passwordRef = useRef()

  const signUp = async (e) => {
    e.preventDefault()

    try {
      await axios.post(`http://127.0.0.1:8000/api/v1/auth/users/`, {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        re_password: re_passwordRef.current.value
      })
    }
    catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <Form onSubmit={signUp}>
      <div className={styles.verContainer}>
            <Label htmlFor='login'>Логин</Label>
            <Input id='login' type='text' placeholder='Логин' required ref={usernameRef} />
      </div>
      <div className={styles.verContainer}>
            <Label htmlFor='password'>Пароль</Label>
            <Input id='password' type='password' placeholder='Пароль' required autoComplete='on' ref={passwordRef} />
      </div>
      <div className={styles.verContainer}>
            <Label htmlFor='repeatPassword'>Повторите пароль</Label>
            <Input id='repeatPassword' type='password' placeholder='Повторите пароль' required autoComplete='on' ref={re_passwordRef} />
      </div>
      <OrangeButton type='submit'>Зарегистрироваться</OrangeButton>
    </Form>
  )
}

export default SignUp