import React, { useEffect, useRef, useState } from 'react';
import {
    CCard, CCardBody, CCardHeader, CCol, CRow,
} from '@coreui/react'
import * as ajax from "../../../config/config";
import $, { param } from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Clientes from "../../../funciones/reportes/guias/Por_cliente"
import Chofer from "../../../funciones/reportes/guias/Por_chofer"
import Destino from "../../../funciones/reportes/guias/Por_Destino"
import Servicio from "../../../funciones/reportes/guias/Por_Servicio"
import moment from 'moment';
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/plugins/monthSelect/style.css'; // Import the plugin styles
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js'; // Import the monthSelect plugin

function Reportes_guias() {
    const [showClientes, setShowClientes] = useState(false);
    const [showChofer, setShowChofer] = useState(false);
    const [showDestino, setshowDestino] = useState(false);
    const [showServicio, setshowServicio] = useState(false);
    const [parametros, setparametros] = useState();
    const [fecha_ini, setfecha_ini] = useState(moment().startOf("month").format("YYYY-MM-DD"));
    const [fecha_fin, setfecha_fin] = useState(moment().endOf("month").format("YYYY-MM-DD"));

    function Cargar_Reporte() {
        // let FECHA_INI = $("#AD_FECHA_INI").val();
        // let FECHA_FIN = $("#AD_FECHA_FIN").val();
        let FECHA_INI = fecha_ini;
        let FECHA_FIN = fecha_fin;
        let FECHA_INI_A = moment(fecha_ini).subtract(1,'months').startOf("month").format("YYYY-MM-DD");
        let FECHA_FIN_A = moment(fecha_ini).subtract(1,'months').endOf("month").format("YYYY-MM-DD");;

        let r_cliente = $("#flexSwitchCheckChecked").is(":checked");
        let r_chofer = $("#flexSwitchCheckChecked2").is(":checked");
        let r_destino = $("#flexSwitchCheckChecked3").is(":checked");
        let r_servicio = $("#flexSwitchCheckChecked4").is(":checked");

        if (r_cliente == false && r_chofer == false && r_destino == false && r_servicio == false) {
            ajax.Mensaje("Selecione un tipo de reporte", "", "error");
        } else {
            if (FECHA_INI == "" || FECHA_FIN == "") {

            } else {
                let param = {
                    FECHA_INI: FECHA_INI,
                    FECHA_FIN: FECHA_FIN,
                    FECHA_INI_A: FECHA_INI_A,
                    FECHA_FIN_A: FECHA_FIN_A,
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

    }

    useEffect(() => {
        const options = {
            dateFormat: 'Y-m-d', // Customize the date format
            onChange: (selectedDates, dateStr) => {
                let inicio = moment(new Date(selectedDates[0])).startOf("month").format("YYYY-MM-DD");
                let fin = moment(inicio).endOf("month").format("YYYY-MM-DD");
                setfecha_ini(inicio);
                setfecha_fin(fin);
            },
            defaultDate: 'today',
            plugins: [
                new monthSelectPlugin({
                    shorthand: true, //defaults to false
                    dateFormat: "M-Y", //defaults to "F Y"
                    altFormat: "F Y", //defaults to "F Y"
                    theme: "dark" // defaults to "light"
                })
            ]
        };
        flatpickr('#myDatePicker', options);
    }, []);

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
                                    <label className="required fs-6 fw-semibold mb-2">Mes</label>
                                    {/* <input defaultValue={moment("20231001").format("YYYY-MM-DD")} id='AD_FECHA_INI' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" /> */}
                                    <input type="text" id="myDatePicker" className='form-control' placeholder="Select Date" />
                                </div>
                                {/* <div className="col-md-3 fv-row">
                                    <label className="required fs-6 fw-semibold mb-2">Fecha Fin</label>
                                    <input defaultValue={moment().format("YYYY-MM-DD")} id='AD_FECHA_FIN' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" />
                                </div> */}
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
                                    {/* <div className="col-md-4">
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
                                    </div> */}
                                </div>
                            </div>
                            <div className='col-4'>
                                <button onClick={Cargar_Reporte} className='btn btn-success text-light fw-bold mt-4'>
                                    <i className="bi bi-clipboard2-data fs-3"></i><br />
                                    Generar
                                </button>

                            </div>
                        </div>
                        <hr />
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
