import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import styles from './AcceptanceCertificate.module.css'

import Header from '../../components/Header/PrivateHeader'
import AcceptanceCertificateHeader from './AcceptanceCertificateHeader'
import CarPackage from './CarPackage'
import CarDamage from './CarDamage'
import OrangeButton from '../../components/UI/OrangeButton/OrangeButton'

function AcceptanceCertificate() {
    const navigate = useNavigate()
    const {doc_id} = useParams()
    const [document, setDocument] = useState(null)

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
        <AcceptanceCertificateHeader document={document} />
        <CarPackage />
        <CarDamage />
        <OrangeButton onClick={() => navigate(-1)}>Назад</OrangeButton>
      </div>
    </>
  )
}

export default AcceptanceCertificate