import React, { useRef } from 'react'

import styles from './Profile.module.css'

import Label from '../../components/UI/Label/Label'
import Input from '../../components/UI/Input/Input'
import OrangeButton from '../../components/UI/OrangeButton/OrangeButton'
import axios from 'axios'

function ChangeUsername() {
  const new_usernameRef = useRef()
  const current_passwordRef = useRef()

  const changeUsername = async (e) => {
    e.preventDefault()

    try {
      const auth_token = localStorage.getItem('auth_token')
      await axios.post(`http://127.0.0.1:8000/api/v1/auth/users/set_username/`, {
        new_username: new_usernameRef.current.value,
        current_password: current_passwordRef.current.value
      },
      {
        headers: {
          Authorization: `Token ${auth_token}`
        }
      })

      alert('Логин успешно изменен')
    }
    catch (error) {
      if (error.response.data.current_password)
        alert('Неправильный пароль')
      if (error.response.data.new_username)
        alert(error.response.data.new_username.join('\n'))
    }
  }

  return (
    <form onSubmit={changeUsername} className={styles.halfVerContainer}>
      <div className={styles.verContainer}>
          <Label htmlFor='new_username'>Новый логин</Label>
          <Input id='new_username' type='text' placeholder='Новый логин' required ref={new_usernameRef} />
      </div>
      <div className={styles.verContainer}>
          <Label htmlFor='current_password'>Пароль</Label>
          <Input id='current_password' type='password' placeholder='Пароль' required autoComplete='off' ref={current_passwordRef} />
      </div>
      <OrangeButton type='submit'>Изменить логин</OrangeButton>
    </form>
  )
}

export default ChangeUsername;