import React from 'react'

import styles from './PurchaseOrder.module.css'

import Table from '../../components/UI/Table/Table'
import Tr from '../../components/UI/Tr/Tr'
import Th from '../../components/UI/Th/Th'
import Td from '../../components/UI/Td/Td'

function FinalCosting({finalCosting}) {
  return (
    <div>
        <div className={styles.p}>
            <p>Расчет стоимости</p>
        </div>
        <Table>
            <thead>
                <Tr>
                    <Th>Наименование</Th>
                    <Th>К оплате</Th>
                </Tr>
            </thead>
            <tbody>
                {finalCosting.works ? 
                    <Tr>
                        <Td>Работы</Td>
                        <Td>{finalCosting.works}</Td>
                    </Tr>
                    : null
                }
                {finalCosting.spare_parts ? 
                    <Tr>
                        <Td>Запчасти</Td>
                        <Td>{finalCosting.spare_parts}</Td>
                    </Tr>
                    : null
                }
                {finalCosting.works && finalCosting.spare_parts ?
                    <Tr>
                        <Td>Итого</Td>
                        <Td>{finalCosting.works + finalCosting.spare_parts}</Td>
                    </Tr>
                    : null
                }
            </tbody>
        </Table>
        
    </div>
  )
}

export default FinalCosting