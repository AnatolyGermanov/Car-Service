import React from 'react'

import Tr from '../UI/Tr/Tr'
import Th from '../UI/Th/Th'

function ClientsListHeader() {
  return (
    <thead>
        <Tr>
            <Th>Фамилия</Th>
            <Th>Имя</Th>
            <Th>Отчество</Th>
            <Th>Телефон</Th>
            <Th>Электронная почта</Th>
        </Tr>
    </thead>
  )
}

export default ClientsListHeader