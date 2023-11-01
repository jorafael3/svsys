import React, { useEffect, useRef, useState } from 'react';
import {
    CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter
} from '@coreui/react'
import * as ajax from "../../../config/config";
import $, { param } from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Select from 'react-select'
import Clientes from "../../../funciones/reportes/guias/Por_cliente"
import Chofer from "../../../funciones/reportes/guias/Por_chofer"
import Destino from "../../../funciones/reportes/guias/Por_Destino"
import Servicio from "../../../funciones/reportes/guias/Por_Servicio"

function Reportes_guias() {
    const [showClientes, setShowClientes] = useState(false);
    const [showChofer, setShowChofer] = useState(false);
    const [showDestino, setshowDestino] = useState(false);
    const [showServicio, setshowServicio] = useState(false);
    const [parametros, setparametros] = useState();

    function Cargar_Reporte() {
        let FECHA_INI = $("#AD_FECHA_INI").val();
        let FECHA_FIN = $("#AD_FECHA_FIN").val();

        let r_cliente = $("#flexSwitchCheckChecked").is(":checked");
        let r_chofer = $("#flexSwitchCheckChecked2").is(":checked");
        let r_destino = $("#flexSwitchCheckChecked3").is(":checked");
        let r_servicio = $("#flexSwitchCheckChecked4").is(":checked");

        if (r_cliente == false && r_chofer == false && r_destino == false && r_servicio == false) {
            ajax.Mensaje("Selecione un tipo de reporte", "", "error");
        } else {
            let param = {
                FECHA_INI: FECHA_INI,
                FECHA_FIN: FECHA_FIN,
            }
            setparametros(param)
            if (r_cliente) {
                setShowClientes(true);
                setShowChofer(false);
                setshowServicio(false);
                setshowDestino(false);

            } else if (r_chofer) {
                setShowChofer(true);
                setShowClientes(false);
                setshowServicio(false);
                setshowDestino(false);

            } else if (r_destino) {
                setShowChofer(false);
                setShowClientes(false);
                setshowServicio(false);
                setshowDestino(true);

            } else if (r_servicio) {
                setShowChofer(false);
                setShowClientes(false);
                setshowServicio(true);
                setshowDestino(false);

            }

        }

    }



    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Reporte Guias</strong>
                    </CCardHeader>
                    <CCardBody>
                        <div className='col-12'>
                            <div className="row g-9 mb-8">
                                <div className="col-md-3 fv-row">
                                    <label className="required fs-6 fw-semibold mb-2">Fecha Inicio</label>
                                    <input id='AD_FECHA_INI' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" />
                                </div>
                                <div className="col-md-3 fv-row">
                                    <label className="required fs-6 fw-semibold mb-2">Fecha Fin</label>
                                    <input id='AD_FECHA_FIN' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" />
                                </div>
                                <div className="col-md-3">
                                </div>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <div className="g-9 p-2 mt-2">
                                    <div className="col-md-4">
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="radio" name='s'
                                                id="flexSwitchCheckChecked"
                                            />
                                            <label className="form-check-label fw-bold" >Cliente</label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="radio" name='s'
                                                id="flexSwitchCheckChecked2"
                                            />
                                            <label className="form-check-label fw-bold" >Chofer</label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-check form-switch ">
                                            <input
                                                className="form-check-input "
                                                type="radio" name='s'
                                                id="flexSwitchCheckChecked3" />
                                            <label className="form-check-label fw-bold" >Destino</label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="radio" name='s'
                                                id="flexSwitchCheckChecked4" />
                                            <label className="form-check-label fw-bold" >Servicio</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4'>
                                <button onClick={Cargar_Reporte} className='btn btn-success text-light fw-bold mt-4'>
                                    <i className="bi bi-clipboard2-data fs-3"></i><br />
                                    Generar
                                </button>

                            </div>
                        </div>
                        <hr/>
                        <div className='col-12 mt-4'>
                            {showClientes && <Clientes param={parametros} />}
                            {showChofer && <Chofer param={parametros} />}
                            {showDestino && <Destino param={parametros} />}
                            {showServicio && <Servicio param={parametros} />}
                        </div>

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

    );
}

export default Reportes_guias
