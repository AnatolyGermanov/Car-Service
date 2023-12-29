import React from 'react'
import moment from 'moment'

import Table from '../../components/UI/Table/Table'
import Tr from '../../components/UI/Tr/Tr'
import Th from '../../components/UI/Th/Th'


function AcceptanceCertificateHeader({document}) {
    const doc_date = moment(document?.doc_date)
    const formattedDate = doc_date.format("DD.MM.YYYY");
    
  return (
    <Table>
        <thead>
            <Tr>
                <Th>
                    Акт приема передачи № 
                    {document ? document.doc_num : null} от {formattedDate}
                </Th>
            </Tr>
        </thead>
        
    </Table>
  )
}

export default AcceptanceCertificateHeader