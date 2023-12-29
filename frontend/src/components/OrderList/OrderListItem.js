import React, { useState } from 'react'
import moment from 'moment'

import Tr from '../UI/Tr/Tr'
import Td from '../UI/Td/Td'
import Modal from '../UI/Modal/Modal'
import ChangeOrder from '../ChangeOrder/ChangeOrder'
import CustomLink from '../UI/CustomLink/CustomLink'

function OrderListItem({order}) {
    const [modalVisible, setModalVisible] = useState(false)
    
    const orderDate = moment(order.order_date)
    const formattedDate = orderDate.format("HH:mm:ss DD-MM-YYYY");
    return (
        <>
            {modalVisible ? 
                <Modal setVisible={setModalVisible}>
                    <ChangeOrder setModalVisible={setModalVisible} order={order} />
                </Modal>
                : null
            }
            <Tr onClick={() => setModalVisible(true)} style={{cursor: 'pointer'}}>
                <Td>{order.vin.car_model}</Td>
                <Td>{order.car_number}</Td>
                <Td>{formattedDate}</Td>
                <Td>{order.appeal_reason}</Td>
                <Td>{order.status}</Td>
                <Td>
                    {order.document_set.map((document)=>{
                        return document.doc_type === 'Заказ-наряд' ?
                            <CustomLink key={document.id} to={`/PurchaseOrder/${document.id}`} >{document.doc_type}</CustomLink>
                            : <CustomLink key={document.id} to={`/AcceptanceCertificate/${document.id}`} >{document.doc_type}</CustomLink>
                    })}
                </Td>
            </Tr>
        </>
    )
}

export default OrderListItem