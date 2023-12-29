import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import styles from './NewWorkForm.module.css'

import Form from '../UI/Form/Form'
import Input from '../UI/Input/Input'
import Label from '../UI/Label/Label'
import BlueButton from '../UI/BlueButton/BlueButton'
import Select from '../UI/Select/Select'

function NewWorkForm({setModalVisible}) {
  const {doc_id} = useParams()
  const [worklist, setWorkList] = useState(null)
  const workRef = useRef()
  const amountRef = useRef()
  
  const getWorkList = async () => {
    const auth_token = localStorage.getItem('auth_token')
    const res = await axios.get('http://127.0.0.1:8000/api/v1/worklist/', {
        headers: {
            Authorization: `Token ${auth_token}`
        }
    })
    setWorkList(res.data)
  }

  const createWork = async (e) => {
    e.preventDefault()

    try {
      const auth_token = localStorage.getItem('auth_token')
      await axios.post('http://127.0.0.1:8000/api/v1/works/', {
        doc: doc_id,
        work_id: workRef.current.value,
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
      console.log(error)
      alert('При создании произошла ошибка. Попробуйте снова')
    }
  }

  useEffect(() => {
    getWorkList()
  }, [])

  return (
    <Form onSubmit={createWork}>
      <div className={styles.verContainer}>
        <Label htmlFor='work'>Вид работы</Label>
        <Select id='work' ref={workRef}>
          {worklist ? 
            worklist.map((item) => {
              return <option key={item.id} value={item.id}>{item.title}</option>
            })
            : null
          }
        </Select>
      </div>
      <div className={styles.verContainer}>
          <Label htmlFor='amount'>Количество</Label>
          <Input id='amount' type='number' placeholder='Количество' required ref={amountRef} />
      </div>
      
      <BlueButton type='submit'>Добавить</BlueButton>
    </Form>
  )
}

export default NewWorkForm