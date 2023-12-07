import React, { useEffect, useRef, useState } from 'react';
import { CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import Swal from 'sweetalert2';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import * as ajax from "../../../config/config";


function Rutas() {

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Rutas</strong>
                    </CCardHeader>
                    <CCardBody>
                        <div className='col-12'>
                            <table id='Tabla_Rutas' className='table table striped'>

                            </table>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

    )
}

export default Rutas