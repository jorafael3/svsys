import {
    CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter
} from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react';
import * as ajax from "../../../config/config";


function Scrapy() {

    function Get_Scrapy() {
        let url = "desarrollo/scrapy_guias"
        ajax.AjaxSendReceiveData(url, "", function (x) {
            console.log('x: ', x);

        })
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <h3>Scrapy Guias</h3>
                    </CCardHeader>
                    <CCardBody>
                        <button onClick={Get_Scrapy} className='btn btn-success fw-bold text-light'>Ejecutar Scrapy</button>
                        <div className='col-12 p-2'>
                            <textarea readOnly={true} className='form-control ' id="" cols="20" rows="10"></textarea>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Scrapy
