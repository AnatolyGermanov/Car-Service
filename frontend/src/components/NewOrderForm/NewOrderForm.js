import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import styles from './NewOrderForm.module.css'

import useAuth from '../../hooks/useAuth'

import Form from '../UI/Form/Form'
import Input from '../UI/Input/Input'
import Label from '../UI/Label/Label'
import OrangeButton from '../UI/OrangeButton/OrangeButton'

function NewOrderForm({setNewOrderModalVisible}) {
    const [car, setCar] = useState(null)
    const VINRef = useRef()
    const car_modelRef = useRef()
    const release_dateRef = useRef()
    const body_numberRef = useRef()
    const car_numberRef = useRef()
    const mileageRef = useRef()
    const engine_numberRef = useRef()
    const appeal_reasonRef = useRef()
    const {user} = useAuth()
    const {userId} = useParams()
    
    const getCar = async () => {
        const auth_token = localStorage.getItem('auth_token')
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/v1/carlist/${VINRef.current.value}/`, {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })
            setCar(res.data)
            
            car_modelRef.current.value = res.data.car_model
            release_dateRef.current.value = res.data.release_date
            body_numberRef.current.value = res.data.body_number
        } 
        catch (error) {
            console.log(error)
        }
    }

    const newOrder = async (e) => {
        e.preventDefault()

        try {
            const auth_token = localStorage.getItem('auth_token')
            if (!car) {
                await axios.post(`http://127.0.0.1:8000/api/v1/carlist/`, {
                    vin: VINRef.current.value,
                    car_model: car_modelRef.current.value,
                    release_date: release_dateRef.current.value,
                    body_number: body_numberRef.current.value
                },
                {
                    headers: {
                        Authorization: `Token ${auth_token}`
                    }
                })
            }
            
            await axios.post(`http://127.0.0.1:8000/api/v1/orderlist/`, {
                user: user.is_staff ? userId : user.id,
                appeal_reason: appeal_reasonRef.current.value,
                vin_id: VINRef.current.value,
                car_number: car_numberRef.current.value,
                mileage: mileageRef.current.value,
                engine_number: engine_numberRef.current.value
            },
            {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })
            setNewOrderModalVisible(false);
        } 
        catch (error) {
            console.log(error)
        }

    }

    return (
        <Form onSubmit={newOrder}>
            <div className={styles.verContainer}>
                <Label htmlFor='VIN'>VIN</Label>
                <Input onBlur={getCar} id='VIN' type='text' placeholder='VIN' required ref={VINRef} />
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='car_model'>Марка и модель автомобиля</Label>
                <Input id='car_model' type='text' placeholder='Марка и модель автомобиля' required ref={car_modelRef} />
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='release_date'>Год выпуска</Label>
                <Input id='release_date' type='date' placeholder='Год выпуска' required ref={release_dateRef} />
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='body_number'>Кузов №</Label>
                <Input id='body_number' type='text' placeholder='Кузов №' ref={body_numberRef} />
            </div>
            <div className={styles.horContainer}>
                <div className={styles.verContainer}>
                    <Label htmlFor='car_number'>Гос. №</Label>
                    <Input id='car_number' type='text' placeholder='Гос. №' required ref={car_numberRef} />
                </div>
                <div className={styles.verContainer}>
                    <Label htmlFor='mileage'>Пробег</Label>
                    <Input id='mileage' type='number' min='0' placeholder='Пробег' required ref={mileageRef} />
                </div>
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='engine_number'>Двигатель №</Label>
                <Input id='engine_number' type='text' placeholder='Двигатель №' ref={engine_numberRef} />
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='appeal_reason'>Причина обращения</Label>
                <Input id='appeal_reason' type='text' placeholder='Причина обращения' ref={appeal_reasonRef} />
            </div>
            <OrangeButton type='submit'>Создать</OrangeButton>
        </Form>
    )
}

export default NewOrderForm