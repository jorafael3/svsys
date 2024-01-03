import React, { useEffect, useRef, useState } from 'react';
import {
    CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter
} from '@coreui/react'
import Swal from 'sweetalert2';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import 'datatables.net-buttons/js/buttons.colVis.min.mjs';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'datatables.net-fixedcolumns';
import 'datatables.net-fixedcolumns-dt/css/fixedColumns.dataTables.css';
import axios from 'axios';
import * as ajax from "../../../config/config";
import * as sesion from "../../../funciones/login/login";
import moment from 'moment';
import Select from 'react-select'
import ReactDOMServer from 'react-dom/server';
import 'moment/locale/es';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


function Por_Cliente() {

    const [FECHA_INI, setFECHA_INI] = useState(moment().startOf("month").format("YYYY-MM-DD"));
    const [FECHA_FIN, setFECHA_FIN] = useState(moment().format("YYYY-MM-DD"));


    function Cargar_Datos() {
        let ruc = $("#CLIENTE_RUCNOM").val()
        let param = {
            FECHA_INI: FECHA_INI,
            FECHA_FIN: FECHA_FIN,
            RUC: ruc
        }
        console.log('param: ', param);
        let url = "Mora/Cargar_Datos_Cliente"
        ajax.AjaxSendReceiveData(url, param, function (x) {
            console.log('x: ', x);
            Tabla_Clientes(x);
        })
    }

    function Tabla_Clientes(datos) {
        $('#Tabla_clientes').empty();
        if ($.fn.dataTable.isDataTable('#Tabla_clientes')) {
            $('#Tabla_clientes').DataTable().destroy();
            $('#Tabla_clientes_SECC').empty();
        }
        let tabla = `
        <table id='Tabla_clientes' class='table display table-striped'>
        </table>
        `;
        $('#Tabla_clientes_SECC').append(tabla);
        let TABLA_ = $('#Tabla_clientes').DataTable({
            destroy: true,
            data: datos,
            dom: 'Bfrtip',
            buttons: ['colvis',"excel"],
            scrollCollapse: true,
            scrollX: true,
            columnDefs: [
                { width: 100, targets: 0 },
                { width: 300, targets: 2 },
                // { width: 180, targets: 5 },
                // { width: 180, targets: 9 },
                // { width: 200, targets: 10 },
            ],
            order: [[2, "asc"], [0, "desc"]],
            fixedColumns: {
                left: 2
            },
            columns: [{
                data: "FechaCorte",
                title: "FECHA CORTE",
                width: 130
            },
            {
                "data": "Identificacion",
                "title": "IDENTIFICACION"
            },
            {
                "data": "Cliente",
                "title": "CLIENTE"
            },
            {
                "data": "NumeroCredito",
                "title": "NUMERO DE CREDITO"
            },
            {
                "data": "NumeroCreditoNuevo",
                "title": "NUMERO DE CREDITO NUEVO"
            },
            {
                "data": "Oficina",
                "title": "OFICINA"
            },
            {
                "data": "OrigenCredito",
                "title": "ORIGEN DEL CREDITO"
            },
            {
                "data": "EstadoCredito",
                "title": "ESTADO DEL CREDITO"
            },
            {
                "data": "TipoCartera",
                "title": "TIPO DE CARTERA"
            },
            {
                "data": "TipoTablaAmortizacion",
                "title": "TIPO DE TABLA DE AMORTIZACION"
            },
            {
                "data": "TipoGracia",
                "title": "TIPO DE GRACIA"
            },
            {
                "data": "PeriodosGracia",
                "title": "PERIODOS DE GRACIA"
            },
            {
                "data": "MontoOriginal",
                "title": "MONTO ORIGINAL"
            },
            {
                "data": "PlazoOriginal",
                "title": "PLAZO ORIGINAL"
            },
            {
                "data": "Saldo",
                "title": "SALDO"
            },
            {
                "data": "ValorAPagar",
                "title": "VALOR A PAGAR"
            },
            {
                "data": "ValorCuota",
                "title": "VALOR CUOTA"
            },
            {
                "data": "FechaDesembolso",
                "title": "FECHA DESEMBOLSO"
            },
            {
                "data": "FechaPrimerVencimiento",
                "title": "FECHA PRIMER VENCIMIENTO"
            },
            {
                "data": "FechaVencimiento",
                "title": "FECHA VENCIMIENTO"
            },
            {
                "data": "FechaCancelacion",
                "title": "FECHA CANCELACION"
            },
            {
                "data": "Atraso",
                "title": "ATRASO"
            },
            {
                "data": "AtrasoMaximo",
                "title": "ATRASO MAXIMO"
            },
            {
                "data": "CuotasRestantes",
                "title": "CUOTAS RESTANTES"
            },
            {
                "data": "CuotaImpaga",
                "title": "CUOTA IMPAGA"
            },
            {
                "data": "TipoCancelacion",
                "title": "TIPO DE CANCELACION"
            },
            {
                "data": "DispositivoNotificacion",
                "title": "DISPOSITIVO DE NOTIFICACION"
            },
            {
                "data": "Celular_01",
                "title": "CELULAR 01"
            },
            {
                "data": "Celular_02",
                "title": "CELULAR 02"
            },
            {
                "data": "Celular_03",
                "title": "CELULAR 03"
            },
            {
                "data": "TelefonoNegocio_01",
                "title": "TELEFONO DE NEGOCIO 01"
            },
            {
                "data": "TelefonoNegocio_02",
                "title": "TELEFONO DE NEGOCIO 02"
            },
            {
                "data": "TelefonoNegocio_03",
                "title": "TELEFONO DE NEGOCIO 03"
            },
            {
                "data": "TelefonoDomicilio_01",
                "title": "TELEFONO DOMICILIO 01"
            },
            {
                "data": "TelefonoDomicilio_02",
                "title": "TELEFONO DOMICILIO 02"
            },
            {
                "data": "TelefonoDomicilio_03",
                "title": "TELEFONO DOMICILIO 03"
            },
            {
                "data": "TelefonoLaboral_01",
                "title": "TELEFONO LABORAL 01"
            },
            {
                "data": "TelefonoLaboral_02",
                "title": "TELEFONO LABORAL 02"
            },
            {
                "data": "TelefonoLaboral_03",
                "title": "TELEFONO LABORAL 03"
            }
                // {
                //     data: "FACTURADO",
                //     title: "FACTURADO TOTAL",
                //     render: $.fn.dataTable.render.number(',', '.', 2, "$")
                // },
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-7 ");
                $('td', row).eq(1).addClass("fw-bold fs-7 ");
                $('td', row).eq(2).addClass("fw-bold fs-7 ");
                $('td', row).eq(3).addClass("fw-bold fs-7 bg-success bg-opacity-10");
                $('td', row).eq(4).addClass("fw-bold fs-7 ");
                $('td', row).eq(5).addClass("fw-bold fs-7 bg-info bg-opacity-10");
                for (let i = 5; i <= 40; i++) {
                    $('td', row).eq(i).addClass("fw-bold fs-7");
                }
                $('td', row).eq(7).addClass("bg-warning bg-opacity-10");



            },
        }).clear().rows.add(datos).draw();
    }

    useEffect(() => {

        Cargar_Datos();
    }, []);
    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Por Cliente</strong>
                </CCardHeader>
                <CCardBody>
                    <div className='col-12'>
                        <div className="row g-9 mb-8">
                            <div className="col-md-3 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Fecha Inicio</label>
                                <input
                                    onChange={(item) => {
                                        console.log('item: ', item.target.value);
                                        setFECHA_INI(item.target.value)
                                    }}
                                    defaultValue={FECHA_INI}
                                    id='AD_FECHA_INI' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" />
                            </div>
                            <div className="col-md-3 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Fecha Fin</label>
                                <input
                                    onChange={(item) => {
                                        console.log('item: ', item.target.value);
                                        setFECHA_FIN(item.target.value)
                                    }}
                                    defaultValue={FECHA_FIN}
                                    id='AD_FECHA_FIN' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" />
                            </div>
                            <div className="col-md-3 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Ruc / Nombre (Vacio todo)</label>
                                <input id='CLIENTE_RUCNOM' type="text" className="form-control form-control-solid ps-12 flatpickr-input active" />
                            </div>
                            <div className="col-md-3">
                                <button
                                    onClick={Cargar_Datos}
                                    className='btn btn-success text-light fw-bold mt-4'><i className="bi bi-search fw-bold fs-5"></i></button>
                            </div>
                        </div>

                    </div>
                    <div className='col-12' id=''>
                        <div className='row'>
                            <div className='col-12 mt-5'>
                                <div className='table-responsive' id='Tabla_clientes_SECC'>
                                    <table id='Tabla_clientes' className='display table table-striped'>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    )
}
export default Por_Cliente
