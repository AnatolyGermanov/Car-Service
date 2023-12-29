import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import styles from './PurchaseOrder.module.css'

import Table from '../../components/UI/Table/Table'
import Tr from '../../components/UI/Tr/Tr'
import Th from '../../components/UI/Th/Th'
import Td from '../../components/UI/Td/Td'
import BlueButton from '../../components/UI/BlueButton/BlueButton'
import NewSparePart from '../../components/NewSparePart/NewSparePart'
import Modal from '../../components/UI/Modal/Modal'
import useAuth from '../../hooks/useAuth'

function SparePartList({setFinalCosting}) {
    const {doc_id} = useParams()
    const [sparePartList, setSparePartList] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const {user} = useAuth()
    
    useEffect(() => {
        const finalCost = sparePartList?.reduce((acc, item) => {
            return acc + item.amount * item.spare_part.current_cost
        }, 0)
        
        setFinalCosting((prev) => ({
            ...prev,
            spare_parts: finalCost
        })
        )
    }, [sparePartList])

    const getSparePartList = async () => {
        const auth_token = localStorage.getItem('auth_token')
        const res = await axios.get('http://127.0.0.1:8000/api/v1/spareparts/', {
            params: {
                doc: doc_id
            },
            headers: {
                Authorization: `Token ${auth_token}`
            }
        })
        setSparePartList(res.data)
    }

    useEffect(() => {
        getSparePartList()
    }, [])

  return (
    <div className={styles.smallContainer}>
        <div className={styles.innerContainer}>
            <p>Список требуемых запчастей</p>
            {user?.is_staff ?
                <BlueButton onClick={() => setModalVisible(true)} style={{padding: `5px 10px`}}>+</BlueButton>
                : null
            }
        </div>
        {modalVisible ?
            <Modal setVisible={setModalVisible}>
                <NewSparePart setModalVisible={setModalVisible} />
            </Modal>
            : null
        }
        <Table>
            <thead>
                <Tr>
                    <Th>№</Th>
                    <Th>Наименование запчасти</Th>
                    <Th>Количество</Th>
                    <Th>Цена</Th>
                    <Th>Сумма</Th>
                </Tr>
            </thead>
            <tbody>
                {sparePartList ?
                    sparePartList.map((item, index) => {
                        return <Tr key={item.id}>
                                <Td>{index+1}</Td>
                                <Td>{item.spare_part.title}</Td>
                                <Td>{item.amount}</Td>
                                <Td>{item.spare_part.current_cost}</Td>
                                <Td>{item.amount * item.spare_part.current_cost}</Td>
                            </Tr>
                    })
                    : null
                }
            </tbody>
        </Table>
        
    </div>
  )
}

export default SparePartList