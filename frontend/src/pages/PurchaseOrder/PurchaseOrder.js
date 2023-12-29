import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import styles from './PurchaseOrder.module.css'

import Header from '../../components/Header/PrivateHeader'
import PurchaseOrderHeader from './PurchaseOrderHeader'
import OrangeButton from '../../components/UI/OrangeButton/OrangeButton'
import WorkList from './WorkList'
import SparePartList from './SparePartList'
import FinalCosting from './FinalCosting'

function PurchaseOrder() {
  const navigate = useNavigate()
    const {doc_id} = useParams()
    const [document, setDocument] = useState(null)
    const [finalCosting, setFinalCosting] = useState({})

    const getDocument = async () => {
        const auth_token = localStorage.getItem('auth_token')
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/documents/${doc_id}/`, {
            headers: {
                Authorization: `Token ${auth_token}`
            }
        })
        setDocument(res.data)
    }

    useEffect(() => {
        getDocument()
    }, [])
    
  return (
    <>
      <Header />
      <div className={styles.container}>
        <PurchaseOrderHeader document={document} />
        <WorkList setFinalCosting={setFinalCosting} />
        <SparePartList setFinalCosting={setFinalCosting} />
        <FinalCosting finalCosting={finalCosting} />
        <OrangeButton onClick={() => navigate(-1)}>Назад</OrangeButton>
      </div>
    </>
  )
}

export default PurchaseOrder