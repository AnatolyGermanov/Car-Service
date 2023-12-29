import React, { useEffect, useState } from 'react'

import styles from './PurchaseOrder.module.css'

import Table from '../../components/UI/Table/Table'
import Tr from '../../components/UI/Tr/Tr'
import Th from '../../components/UI/Th/Th'
import Td from '../../components/UI/Td/Td'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BlueButton from '../../components/UI/BlueButton/BlueButton'
import NewWork from '../../components/NewWork/NewWork'
import Modal from '../../components/UI/Modal/Modal'
import useAuth from '../../hooks/useAuth'

function WorkList({setFinalCosting}) {
    const {doc_id} = useParams()
    const [workList, setWorkList] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const {user} = useAuth()
  
    useEffect(() => {
        const finalCost = workList?.reduce((acc, item) => {
            return acc + item.amount * item.work.current_cost
        }, 0)
    
        setFinalCosting((prev) => ({
            ...prev,
            works: finalCost
        })
        )
    }, [workList])
    
    

    const getWorkList = async () => {
        const auth_token = localStorage.getItem('auth_token')
        const res = await axios.get('http://127.0.0.1:8000/api/v1/works/', {
            params: {
                doc: doc_id
            },
            headers: {
                Authorization: `Token ${auth_token}`
            }
        })
        setWorkList(res.data)
    }

    useEffect(() => {
        getWorkList()
    }, [])

  return (
    <div className={styles.smallContainer}>
        <div className={styles.innerContainer}>
            <p>Список требуемых работ</p>
            {user?.is_staff ?
                <BlueButton onClick={() => setModalVisible(true)} style={{padding: `5px 10px`}}>+</BlueButton>
                : null
            }
        </div>
        {modalVisible ?
            <Modal setVisible={setModalVisible}>
                <NewWork setModalVisible={setModalVisible} />
            </Modal>
            : null
        }
        <Table>
            <thead>
                <Tr>
                    <Th>№</Th>
                    <Th>Наименование работы</Th>
                    <Th>Количество</Th>
                    <Th>Цена</Th>
                    <Th>Сумма</Th>
                </Tr>
            </thead>
            <tbody>
                {workList ?
                    workList.map((item, index) => {
                        return <Tr key={item.id}>
                                <Td>{index+1}</Td>
                                <Td>{item.work.title}</Td>
                                <Td>{item.amount}</Td>
                                <Td>{item.work.current_cost}</Td>
                                <Td>{item.amount * item.work.current_cost}</Td>
                            </Tr>
                    })
                    : null
                }
            </tbody>
        </Table>
    </div>
  )
}

export default WorkList