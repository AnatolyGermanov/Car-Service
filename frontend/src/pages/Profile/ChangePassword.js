import React, { useRef } from 'react'
import axios from 'axios'

import styles from './Profile.module.css'

import Label from '../../components/UI/Label/Label'
import Input from '../../components/UI/Input/Input'
import OrangeButton from '../../components/UI/OrangeButton/OrangeButton'

function ChangePassword() {
    const new_passwordRef = useRef()
    const re_new_passwordRef = useRef()
    const old_passwordRef = useRef()

    const changePassword = async (e) => {
        e.preventDefault()

        try {
            const auth_token = localStorage.getItem('auth_token')
            await axios.post(`http://127.0.0.1:8000/api/v1/auth/users/set_password/`, {
                new_password: new_passwordRef.current.value,
                re_new_password: re_new_passwordRef.current.value,
                current_password: old_passwordRef.current.value
            },
            {
                headers: {
                Authorization: `Token ${auth_token}`
                }
            })
            alert('Пароль успешно изменен')
        }
        catch (error) {
            if (error.response.data.current_password)
                alert('Неправильный текущий пароль')
            if (error.response.data.new_password)
                alert(error.response.data.new_password.join('\n'))
            console.log(error.response.data)
        }
    }

  return (
    <form onSubmit={changePassword} className={styles.halfVerContainer}>
        <div className={styles.verContainer}>
            <Label htmlFor='new_password'>Новый пароль</Label>
            <Input id='new_password' type='password' placeholder='Новый пароль' minLength='8' required autoComplete='off' ref={new_passwordRef}/>
        </div>
        <div className={styles.verContainer}>
            <Label htmlFor='re_new_password'>Повторите новый пароль</Label>
            <Input id='re_new_password' type='password' placeholder='Повторите новый пароль' required autoComplete='off' ref={re_new_passwordRef} />
        </div>
        <div className={styles.verContainer}>
            <Label htmlFor='old_password'>Старый пароль</Label>
            <Input id='old_password' type='password' placeholder='Старый пароль' required autoComplete='off' ref={old_passwordRef} />
        </div>
        <OrangeButton type='submit'>Изменить пароль</OrangeButton>
    </form>
  )
}

export default ChangePassword