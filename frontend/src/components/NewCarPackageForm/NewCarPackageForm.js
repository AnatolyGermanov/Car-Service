import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import styles from './NewCarPackageForm.module.css'

import Form from '../UI/Form/Form'
import Input from '../UI/Input/Input'
import Label from '../UI/Label/Label'
import BlueButton from '../UI/BlueButton/BlueButton'

function NewCarPackageForm({setModalVisible}) {
    const {doc_id} = useParams()
    const titleRef = useRef()
    const amountRef = useRef()

    const createCarPackage = async (e) => {
        e.preventDefault()

        try {
            const auth_token = localStorage.getItem('auth_token')
            await axios.post('http://127.0.0.1:8000/api/v1/carpackages/', {
                doc: doc_id,
                title: titleRef.current.value,
                amount: amountRef.current.value
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
    <Form onSubmit={createCarPackage}>
            <div className={styles.verContainer}>
                <Label htmlFor='title'>Название</Label>
                <Input id='title' type='text' placeholder='Название' required ref={titleRef} />
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='amount'>Количество</Label>
                <Input id='amount' type='number' placeholder='Количество' required ref={amountRef} />
            </div>
            
            <BlueButton type='submit'>Создать</BlueButton>
        </Form>
  )
}

export default NewCarPackageForm