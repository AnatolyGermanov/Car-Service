import React from 'react'
import moment from 'moment'

import Tr from '../UI/Tr/Tr'
import Td from '../UI/Td/Td'

function OrderListItem({order}) {
    
    const orderDate = moment(order.order_date)
    const formattedDate = orderDate.format("HH:mm:ss DD-MM-YYYY");
    return (
        <Tr>
            <Td>{order.vin.car_model}</Td>
            <Td>{order.car_number}</Td>
            <Td>{formattedDate}</Td>
            <Td>{order.appeal_reason}</Td>
            <Td>{order.status}</Td>
            {/* <Td></Td> */}
        </Tr>
    )
}

export default OrderListItem