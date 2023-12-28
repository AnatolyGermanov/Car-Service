import React from 'react'

import Tr from '../UI/Tr/Tr'
import Th from '../UI/Th/Th'

function OrderListHeader() {
  return (
    <thead>
        <Tr>
            <Th>Марка и модель автомобиля</Th>
            <Th>Гос. №</Th>
            <Th>Дата заявки</Th>
            <Th>Причина обращения</Th>
            <Th>Статус заявки</Th>
            {/* <Th>Документы</Th> */}
        </Tr>
    </thead>
  )
}

export default OrderListHeader