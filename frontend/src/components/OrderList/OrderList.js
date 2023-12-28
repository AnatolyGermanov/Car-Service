import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import Table from '../UI/Table/Table'
import OrderListHeader from './OrderListHeader'
import OrderListItem from './OrderListItem'

function OrderList() {
    const navigate = useNavigate()
    const [orders, setOrders] = useState(null)
    const { userId} = useParams()

    const getOrders = async () => {
        try {
            const auth_token = localStorage.getItem('auth_token')
            const res = await axios.get(`http://127.0.0.1:8000/api/v1/orderlist/`, {
                params: {
                    user_id: userId
                },
                headers: {
                Authorization: `Token ${auth_token}`
                }
            })
            setOrders(res.data)
        }
        catch (error) {
            console.log(error)
            navigate(-1)
        }
        
    }

    useEffect(() => {
        getOrders()
    }, [])

  return (
    <>
        { orders ? 
            <Table>
                <OrderListHeader />
                <tbody>
                    {orders.map((order) => {
                        return (
                            <OrderListItem key={order.id} order={order} />
                        )
                    })}
                </tbody>
            </Table>
            : null
        }
    </>
  )
}

export default OrderList