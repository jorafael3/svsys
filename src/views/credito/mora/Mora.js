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
import Creditos_Cancelados from "../mora/Creditos_cancelados"
import Morosidad from "../mora/Morosidad"
import Fondo_Garantia from "../mora/Fondo_garantia"
import Prueba_archivo from "../mora/Prueba"


function Mora() {


    const [DASHBOARD, setDASHBOARD] = useState(true);
    const [PORCLIENTE, setPORCLIENTE] = useState(true);

    function Cancelados() {
        $("#SECC_CC").show(100);
        $("#SECC_M").hide();
        $("#SECC_FG").hide();
        $("#SECC_HC").hide();

        $(".nav-link").removeClass("active");
        $("#BTN_CC").addClass("active");

    }

    function Historial() {
        $("#SECC_HC").show(100);
        $("#SECC_CC").hide();
        $("#SECC_M").hide();
        $("#SECC_FG").hide();

        $(".nav-link").removeClass("active");
        $("#BTN_HC").addClass("active");
    }

    function Morosida() {
        $("#SECC_M").show(100);
        $("#SECC_CC").hide();
        $("#SECC_FG").hide();
        $("#SECC_HC").hide();

        $(".nav-link").removeClass("active");
        $("#BTN_M").addClass("active");
    }

    function Fondo() {
        $("#SECC_FG").show(100);
        $("#SECC_CC").hide();
        $("#SECC_M").hide();
        $("#SECC_HC").hide();

        $(".nav-link").removeClass("active");
        $("#BTN_FG").addClass("active");

    }

    function Prueba() {
        $("#SECC_PR").show(100);

        $("#SECC_FG").hide();
        $("#SECC_CC").hide();
        $("#SECC_M").hide();
        $("#SECC_HC").hide();

        $(".nav-link").removeClass("active");
        $("#BTN_PR").addClass("active");

    }

    return (
        <CRow>

            <div className='card'>
                <div className='card-body'>
                    <ul className="nav nav-pills flex-column flex-sm-row">
                        <li className="nav-item">
                            <button id='BTN_CC' onClick={Cancelados} className="flex-sm-fill text-sm-center nav-link fw-bold active" >CREDITOS CANCELADOS</button>
                        </li>
                        <li className="nav-item">
                            <button id='BTN_M' onClick={Morosida} className="flex-sm-fill text-sm-center nav-link fw-bold" >MOROSIDAD</button>
                        </li>
                        <li className="nav-item">
                            <button id='BTN_FG' onClick={Fondo} className="flex-sm-fill text-sm-center nav-link fw-bold" >FONDO GARANTIA</button>
                        </li>
                        <li className="nav-item">
                            <button id='BTN_HC' onClick={Historial} className="flex-sm-fill text-sm-center nav-link fw-bold" >HISTORIAL CC</button>
                        </li>
                        <li className="nav-item">
                            <button id='BTN_PR' onClick={Prueba} className="flex-sm-fill text-sm-center nav-link fw-bold" >PRUEBA</button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* <div className='col-lg-12 col-sm-6 mt-3'>

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
            </div> */}

            <div id='SECC_CC' className='mt-2'>
                {/* {DASHBOARD && <Dashboard />} */}
                <Creditos_Cancelados />
            </div>
            <div id='SECC_M' style={{ display: "none" }} className='mt-2'>
                <Morosidad />
            </div>
            <div id='SECC_FG' style={{ display: "none" }} className='mt-2'>
                <Fondo_Garantia />
            </div>
            <div id='SECC_HC' style={{ display: "none" }} className='mt-2'>
                {/* {PORCLIENTE && <Clientes />} */}
                <Clientes />
            </div>
            <div id='SECC_PR' style={{ display: "none" }} className='mt-2'>
                {/* {PORCLIENTE && <Clientes />} */}
                <Prueba_archivo />
            </div>

        </CRow>

    )
}

export default Mora
