import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import styles from './AcceptanceCertificate.module.css'
import Table from '../../components/UI/Table/Table'
import Tr from '../../components/UI/Tr/Tr'
import Th from '../../components/UI/Th/Th'
import Td from '../../components/UI/Td/Td'
import Modal from '../../components/UI/Modal/Modal'
import BlueButton from '../../components/UI/BlueButton/BlueButton'
import NewCarPackage from '../../components/NewCarPackage/NewCarPackage'
import useAuth from '../../hooks/useAuth'

function CarPackage() {
    const {doc_id} = useParams()
    const [equipmentList, setEquipmentList] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const {user} = useAuth()

    const getCarPackages = async () => {
        const auth_token = localStorage.getItem('auth_token')
        const res = await axios.get('http://127.0.0.1:8000/api/v1/carpackages/', {
            params: {
                doc: doc_id
            },
            headers: {
                Authorization: `Token ${auth_token}`
            }
        })
        setEquipmentList(res.data)
    }

    useEffect(() => {
        getCarPackages()
    }, [])

  return (
    <div className={styles.smallContainer}>
        <div className={styles.innerContainer}>
            <p>Комплектация</p>
            {user?.is_staff ?
                <BlueButton onClick={() => setModalVisible(true)} style={{padding: `5px 10px`}}>+</BlueButton>
                : null
            }
        </div>
        {modalVisible ?
            <Modal setVisible={setModalVisible}>
                <NewCarPackage setModalVisible={setModalVisible} />
            </Modal>
            : null
        }
        <Table>
            <thead>
                <Tr>
                    <Th>№</Th>
                    <Th>Наименование</Th>
                    <Th>Количество</Th>
                </Tr>
            </thead>
            <tbody>
                {equipmentList ?
                    equipmentList.map((item, index) => {
                        return <Tr key={item.id}>
                                <Td>{index+1}</Td>
                                <Td>{item.title}</Td>
                                <Td>{item.amount}</Td>
                            </Tr>
                    })
                    : null
                }
            </tbody>
        </Table>
    </div>
  )
}

export default CarPackage