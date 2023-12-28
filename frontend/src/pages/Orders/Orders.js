import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import styles from './Orders.module.css'

import useAuth from '../../hooks/useAuth'

import Header from '../../components/Header/PrivateHeader'
import OrderList from '../../components/OrderList/OrderList'
import OrangeButton from '../../components/UI/OrangeButton/OrangeButton'
import Modal from '../../components/UI/Modal/Modal'
import NewOrder from '../../components/NewOrder/NewOrder'

function Orders() {
  const navigate = useNavigate()
  const [newOrderModalVisible, setNewOrderModalVisible] = useState(false)
  const {user} = useAuth()
  const {userId} = useParams()

  return (
    <>
        {user?.is_staff && !userId ?
          <Navigate to={'/clients'} />
          : null
        }
        <Header />
        { newOrderModalVisible ?
          <Modal setVisible={setNewOrderModalVisible}>
            <NewOrder setModalVisible={setNewOrderModalVisible} />
          </Modal>
          : null
        }
        <div className={styles.container}>
          {!user || user.is_staff ?
            <p>Заявки</p>
            : <p>Мои заявки</p>
          }
          <div>
            <OrangeButton onClick={() => setNewOrderModalVisible(true)}>Новая заявка</OrangeButton>
          </div>

          <OrderList />
          <div>
            <OrangeButton onClick={() => navigate(-1)}>Назад</OrangeButton>
          </div>
        </div>
    </>
  )
}

export default Orders