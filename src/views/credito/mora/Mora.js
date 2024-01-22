import React, { useEffect, useRef, useState } from 'react';
import {
    CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter
} from '@coreui/react'
import Swal from 'sweetalert2';
import $ from 'jquery';
import 'moment/locale/es';
import Clientes from "../mora/Por_Cliente"
import Dashboard from "../mora/Dashboard."


function Mora() {


    const [DASHBOARD, setDASHBOARD] = useState(true);
    const [PORCLIENTE, setPORCLIENTE] = useState(false);

    return (
        <CRow>

            <div className='card'>
                <div className='card-body'>
                    <ul className="nav nav-pills flex-column flex-sm-row">
                        <li className="nav-item">
                            <button className="flex-sm-fill text-sm-center nav-link fw-bold active" >Morosidad</button>
                        </li>
                        <li className="nav-item">
                            <button className="flex-sm-fill text-sm-center nav-link fw-bold" >Historial</button>
                        </li>
                        <li className="nav-item">
                            <button className="flex-sm-fill text-sm-center nav-link fw-bold" >Link</button>
                        </li>
                      
                    </ul>
                </div>
            </div>

            <div className='col-lg-12 col-sm-6 mt-3'>

                <div className="form-check form-switch">
                    <input className="form-check-input" type="radio" name='ra' role="switch"
                        id="check_guia" defaultChecked={DASHBOARD}
                        onChange={() => {
                            // CAMBIAR_MES();
                            setDASHBOARD(true);
                            setPORCLIENTE(false);
                        }} />
                    <label className="form-check-label fw-bold">Dashboard</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="radio" name='ra' role="switch"
                        id="check_producto"
                        onChange={() => {
                            setPORCLIENTE(true);
                            setDASHBOARD(false);
                        }} />
                    <label className="form-check-label fw-bold" >Por Cliente</label>
                </div>
            </div>
            {DASHBOARD && <Dashboard />}
            {PORCLIENTE && <Clientes />}


        </CRow>

    )
}

export default Mora
