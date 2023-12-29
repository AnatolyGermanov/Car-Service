import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import styles from './NewCarDamageForm.module.css'

import Form from '../UI/Form/Form'
import Input from '../UI/Input/Input'
import Label from '../UI/Label/Label'
import BlueButton from '../UI/BlueButton/BlueButton'

function NewCarDamageForm({setModalVisible}) {
    const {doc_id} = useParams()
    const titleRef = useRef()
    const placeRef = useRef()

    const createCarDamage = async (e) => {
      e.preventDefault()

      try {
          const auth_token = localStorage.getItem('auth_token')
          await axios.post('http://127.0.0.1:8000/api/v1/cardamages/', {
              doc: doc_id,
              title: titleRef.current.value,
              place: placeRef.current.value
          }, 
          {
              headers: {
                  Authorization: `Token ${auth_token}`
              }
          })
          setModalVisible(false)
          alert('Успешно создано')
      }
      catch (error) {
          alert('При создании что-то пошло не так. Попробуйте ещё раз')
      }

  }

  return (
    <Form onSubmit={createCarDamage}>
            <div className={styles.verContainer}>
                <Label htmlFor='title'>Название</Label>
                <Input id='title' type='text' placeholder='Название' required ref={titleRef}/>
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='place'>Место</Label>
                <Input id='place' type='text' placeholder='Место' required ref={placeRef} />
            </div>
            
            <BlueButton type='submit'>Зафиксировать</BlueButton>
        </Form>
  )
}

export default NewCarDamageForm