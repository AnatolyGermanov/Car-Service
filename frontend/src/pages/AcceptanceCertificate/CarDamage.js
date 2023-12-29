import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import styles from './AcceptanceCertificate.module.css'
import Table from '../../components/UI/Table/Table'
import Tr from '../../components/UI/Tr/Tr'
import Th from '../../components/UI/Th/Th'
import Td from '../../components/UI/Td/Td'
import axios from 'axios'
import BlueButton from '../../components/UI/BlueButton/BlueButton'
import NewCarDamage from '../../components/NewCarDamage/NewCarDamage'
import Modal from '../../components/UI/Modal/Modal'
import useAuth from '../../hooks/useAuth'

function CarDamage() {
    const {doc_id} = useParams()
    const [damageList, setDamageList] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const {user} = useAuth()

    const getCarDamges = async () => {
        const auth_token = localStorage.getItem('auth_token')
        const res = await axios.get('http://127.0.0.1:8000/api/v1/cardamages/', {
            params: {
                doc: doc_id
            },
            headers: {
                Authorization: `Token ${auth_token}`
            }
        })
        setDamageList(res.data)
    }

    useEffect(() => {
        getCarDamges()
    }, [])

  return (
    <div className={styles.smallContainer}>
        <div className={styles.innerContainer}>
            <p>Список повреждений</p>
            {user?.is_staff ?
                <BlueButton onClick={() => setModalVisible(true)} style={{padding: `5px 10px`}}>+</BlueButton>
                : null
            }
        </div>
        {modalVisible ?
            <Modal setVisible={setModalVisible}>
                <NewCarDamage setModalVisible={setModalVisible} />
            </Modal>
            : null
        }
        <Table>
            <thead>
                <Tr>
                    <Th>№</Th>
                    <Th>Наименование</Th>
                    <Th>Место</Th>
                </Tr>
            </thead>
            <tbody>
                {damageList ?
                    damageList.map((item, index) => {
                        return <Tr key={item.id}>
                                <Td>{index+1}</Td>
                                <Td>{item.title}</Td>
                                <Td>{item.place}</Td>
                            </Tr>
                    })
                    : null
                }
            </tbody>
        </Table>
    </div>
  )
}

export default CarDamage