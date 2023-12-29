import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import styles from './NewSparePartForm.module.css'

import Form from '../UI/Form/Form'
import Input from '../UI/Input/Input'
import Label from '../UI/Label/Label'
import BlueButton from '../UI/BlueButton/BlueButton'
import Select from '../UI/Select/Select'

function NewSparePartForm({setModalVisible}) {
  const {doc_id} = useParams()
  const [spare_partlist, setSpare_partList] = useState(null)
  const spare_partRef = useRef()
  const amountRef = useRef()

  const getSpare_partList = async () => {
    const auth_token = localStorage.getItem('auth_token')
    const res = await axios.get('http://127.0.0.1:8000/api/v1/sparepartlist/', {
        headers: {
            Authorization: `Token ${auth_token}`
        }
    })
    setSpare_partList(res.data)
  }

  const createSpare_part = async (e) => {
    e.preventDefault()

    try {
      const auth_token = localStorage.getItem('auth_token')
      await axios.post('http://127.0.0.1:8000/api/v1/spareparts/', {
        doc: doc_id,
        spare_part_id: spare_partRef.current.value,
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
    getSpare_partList()
  }, [])

  return (
    <Form onSubmit={createSpare_part}>
            <div className={styles.verContainer}>
                <Label htmlFor='spare_part'>Запчасть</Label>
                <Select id='spare_part' ref={spare_partRef}>
                  {spare_partlist ? 
                    spare_partlist.map((item) => {
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

export default NewSparePartForm