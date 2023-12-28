import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ClientsListHeader from './ClientsListHeader'
import Table from '../UI/Table/Table'
import ClientsListItem from './ClientsListItem'

function ClientsList() {
  const [clients, setClients] = useState(null)

    const getClients = async () => {
        const auth_token = localStorage.getItem('auth_token')
        const res = await axios.get('http://127.0.0.1:8000/api/v1/userlist/', {
            headers: {
              Authorization: `Token ${auth_token}`
            }
        })
        setClients(res.data)
    }

    useEffect(() => {
        getClients()
    }, [])

  return (
    <>
      {clients ?
        <Table>
          <ClientsListHeader />
          <tbody>
            {clients.map((client) => {
                return (
                    <ClientsListItem key={client.id} client={client} />
                )
            })}
          </tbody>
        </Table>
        : null
      }
    </>
  )
}

export default ClientsList