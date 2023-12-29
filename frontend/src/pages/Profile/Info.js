import React, { useRef } from 'react'

import styles from './Profile.module.css'

import Label from '../../components/UI/Label/Label'
import Input from '../../components/UI/Input/Input'
import OrangeButton from '../../components/UI/OrangeButton/OrangeButton'
import axios from 'axios'

function Info({user}) {
  const firstnameRef = useRef()
  const lastnameRef = useRef()
  const patronymicRef = useRef()
  const phone_numberRef = useRef()
  const emailRef = useRef()

  const changeInfo = async (e) => {
    e.preventDefault()

    try {
      const auth_token = localStorage.getItem('auth_token')
      await axios.patch(`http://127.0.0.1:8000/api/v1/userlist/${user.id}/`, {
        "first_name": firstnameRef.current.value,
        "last_name": lastnameRef.current.value,
        "patronymic": patronymicRef.current.value,
        "email": emailRef.current.value,
        "phone_number": phone_numberRef.current.value,
      },
      {
        headers: {
          Authorization: `Token ${auth_token}`
        }
      })

      alert('Данные успешно изменены')
    }
    catch (error) {
      alert('Возникла ошибка при изменении данных. Повторите ещё раз')
    }
  }

  return (
    <form onSubmit={changeInfo} className={styles.halfVerContainer}>
          <div className={styles.horContainer}>
            <div className={styles.verContainer}>
                <Label htmlFor='lastname'>Фамилия*</Label>
                <Input id='lastname' type='text' placeholder='Фамилия' required defaultValue={user?.last_name || ''} ref={lastnameRef}/>
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='firstname'>Имя*</Label>
                <Input id='firstname' type='text' placeholder='Имя' required defaultValue={user?.first_name || ''} ref={firstnameRef} />
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='patronymic'>Отчество</Label>
                <Input id='patronymic' type='text' placeholder='Отчество' defaultValue={user?.patronymic || ''} ref={patronymicRef} />
            </div>
          </div>
          <div className={styles.verContainer}>
              <Label htmlFor='phone_number'>Номер телефона*</Label>
              <Input id='phone_number' type='tel' placeholder='Номер телефона' minLength='11' maxLength='11' pattern='^8\d{10}$' title='Формат номера: 8xxxxxxxxxx' required autoComplete='tel' defaultValue={user?.phone_number || ''} ref={phone_numberRef} />
          </div>
          <div className={styles.verContainer}>
              <Label htmlFor='email'>Электронная почта</Label>
              <Input id='email' type='email' placeholder='Электронная почта' autoComplete='on' defaultValue={user?.email || ''} ref={emailRef} />
          </div>
          <OrangeButton type='submit'>Изменить</OrangeButton>
    </form>
  )
}

export default Info