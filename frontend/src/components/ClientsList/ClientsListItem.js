import React from 'react'
import { useNavigate } from 'react-router-dom'

import Tr from '../UI/Tr/Tr'
import Td from '../UI/Td/Td'

function ClientsListItem({client}) {
    const navigate = useNavigate()

    return (
        <>
            {client.is_staff ?
                null
                : <Tr onClick={() => navigate(`/orders/${client.id}`)} style={{cursor: 'pointer'}}>
                    <Td>{client.last_name}</Td>
                    <Td>{client.first_name}</Td>
                    <Td>{client.patronymic}</Td>
                    <Td>{client.phone_number}</Td>
                    <Td>{client.email}</Td>
                </Tr>

            }
        </>
        
    )
}

export default ClientsListItem