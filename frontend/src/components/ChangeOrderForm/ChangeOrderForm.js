import React, { useRef } from 'react'
import axios from 'axios'

import styles from './ChangeOrderForm.module.css'

import useAuth from '../../hooks/useAuth'

import Form from '../UI/Form/Form'
import Input from '../UI/Input/Input'
import Label from '../UI/Label/Label'
import OrangeButton from '../UI/OrangeButton/OrangeButton'
import BlueButton from '../UI/BlueButton/BlueButton'

function ChangeOrderForm({order}) {
    const VINRef = useRef()
    const car_modelRef = useRef()
    const release_dateRef = useRef()
    const body_numberRef = useRef()
    const car_numberRef = useRef()
    const mileageRef = useRef()
    const engine_numberRef = useRef()
    const appeal_reasonRef = useRef()
    const {user} = useAuth()
    
    const changeOrder = async (e) => {
        e.preventDefault()

        try {
            const auth_token = localStorage.getItem('auth_token')
            if (order.vin.vin === VINRef.current.value)
            await axios.patch(`http://127.0.0.1:8000/api/v1/carlist/${VINRef.current.value}/`, {
                car_model: car_modelRef.current.value,
                release_date: release_dateRef.current.value,
                body_number: body_numberRef.current.value
            },
            {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })
            
            await axios.patch(`http://127.0.0.1:8000/api/v1/orderlist/${order.id}/`, {
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
        } 
        catch (error) {
            alert('Возникла ошибка при изменении заявки. Повторите ещё раз')
        }

    }

    const setStatus = async (status) => {
        try {
            const auth_token = localStorage.getItem('auth_token')
            await axios.patch(`http://127.0.0.1:8000/api/v1/orderlist/${order.id}/`, {
                status: status
            },
            {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const createPurchaseOrder = async () => {
        try {
            const auth_token = localStorage.getItem('auth_token')
            await axios.post(`http://127.0.0.1:8000/api/v1/documents/`, {
                doc_num: 0,
                doc_type: 'Заказ-наряд',
                order: order.id
            },
            {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })
            
            alert('Документ заказ-наряд успешно создан')
        }
        catch (error) {
            alert('Документ заказ-наряд уже существует')
        }
    }

    const createAcceptanceCertificate = async () => {
        try {
            const auth_token = localStorage.getItem('auth_token')
            await axios.post(`http://127.0.0.1:8000/api/v1/documents/`, {
                doc_num: 0,
                doc_type: 'Акт приема-передачи',
                order: order.id
            },
            {
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })

            setStatus('Диагностика')
            alert('Документ акт приема-передачи успешно создан')
        }
        catch (error) {
            alert('Документ акт приема-передачи уже существует')
        }
    }

    return (
        <Form onSubmit={changeOrder}>
            <div className={styles.verContainer}>
                <Label htmlFor='VIN'>VIN*</Label>
                <Input id='VIN' type='text' placeholder='VIN' required defaultValue={order.vin.vin} ref={VINRef} />
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='car_model'>Марка и модель автомобиля*</Label>
                <Input id='car_model' type='text' placeholder='Марка и модель автомобиля' required defaultValue={order.vin.car_model} ref={car_modelRef} />
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='release_date'>Год выпуска*</Label>
                <Input id='release_date' type='date' placeholder='Год выпуска' required defaultValue={order.vin.release_date} ref={release_dateRef} />
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='body_number'>Кузов №</Label>
                <Input id='body_number' type='text' placeholder='Кузов №' defaultValue={order.vin.body_number} ref={body_numberRef} />
            </div>
            <div className={styles.horContainer}>
                <div className={styles.verContainer}>
                    <Label htmlFor='car_number'>Гос. №*</Label>
                    <Input id='car_number' type='text' placeholder='Гос. №' required defaultValue={order.car_number} ref={car_numberRef} />
                </div>
                <div className={styles.verContainer}>
                    <Label htmlFor='mileage'>Пробег*</Label>
                    <Input id='mileage' type='number' min='0' placeholder='Пробег' required defaultValue={order.mileage} ref={mileageRef} />
                </div>
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='engine_number'>Двигатель №</Label>
                <Input id='engine_number' type='text' placeholder='Двигатель №' defaultValue={order.engine_number} ref={engine_numberRef} />
            </div>
            <div className={styles.verContainer}>
                <Label htmlFor='appeal_reason'>Причина обращения</Label>
                <Input id='appeal_reason' type='text' placeholder='Причина обращения' defaultValue={order.appeal_reason} ref={appeal_reasonRef} />
            </div>

                <div className={styles.horContainer}>
                    <div className={styles.verContainer}>
                        {user.is_staff ?
                            <>
                                <BlueButton type='button' onClick={createPurchaseOrder}>Создать заказ-наряд</BlueButton>
                                <BlueButton type='button' onClick={createAcceptanceCertificate}>Создать акт приема-передачи</BlueButton>
                            </>
                            : null
                        }
                    </div>
                    <div className={styles.verContainer}>
                        <OrangeButton type='submit'>Изменить данные</OrangeButton>
                        {order.status === 'Выполнение' ?
                            <OrangeButton type='button' onClick={() => setStatus('Завершен')}>Завершить заявку</OrangeButton>
                            : null
                        }
                    </div>
                </div>
        </Form>
    )
}

export default ChangeOrderForm