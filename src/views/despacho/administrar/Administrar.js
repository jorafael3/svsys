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
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import moment from 'moment';
import * as funciones from '../../../funciones/Despacho/administrar/administrar';

function Administrar() {
    const [visible, setVisible] = useState(false)
    const [nombreCliente, setNombreCliente] = useState('');
    const [fecha, setFecha] = useState('');

    function Cargar_Datos() {
        let DATOS = funciones.Cargar_datos();
        console.log('DATOS: ', DATOS);
        Tabla_Detalle(DATOS)
    }
    function Tabla_Detalle(datos) {
        let TABLA_ = $('#AD_TABLA_DATOS').DataTable({
            destroy: true,
            data: datos,
            dom: 'Brtip',
            buttons: [
                {
                    text: `<span className"fw-bold"><i className="bi bi-save"></i></span>`,
                    className: 'btn btn-info',
                    action: function (e, dt, node, config) {
                        // Guardar_Orden();
                    },
                },
                {
                    extend: 'excel',
                    text: '<i className="fa fa-file-excel"></i> Excel',
                    className: 'btn btn-primary',
                }],
            columns: [{
                data: "PEDIDO",
                title: "PEDIDO",
            },
            {
                data: "FECHA_ENTREGA",
                title: "FECHA_ENTREGA"
            },
            {
                data: "CLIENTE",
                title: "CLIENTE"
            },
            {
                data: "ENTREGA",
                title: "ENTREGA"
            }, {
                data: "SERVICIO",
                title: "SERVICIO"
            },
            {
                data: null,
                title: "MAS",
                className: "btn_recibir text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_recibir btn btn-primary"><i class="bi bi-plus-circle"></i></button>',
                orderable: "",
                width: 20
            }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6 ");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6 bg-light-warning");
                $('td', row).eq(4).addClass("fw-bold fs-6");
            },
        });

        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 500);
        $('#AD_TABLA_DATOS').on('click', 'td.btn_recibir', function (respuesta) {
            var data = TABLA_.row(this).data();
            console.log('data: ', data);
            setVisible(true)
            setNombreCliente(data["CLIENTE"]);
            setFecha(data["FECHA_ENTREGA"]);
        })

    }

    useEffect(() => {
        // Coloca aquí la lógica que deseas ejecutar cuando la página se carga
        let hoy = moment().format("YYYY-MM-DD");
        let inicio_mes = moment().startOf("month").format("YYYY-MM-DD");
        $("#AD_FECHA_INI").val(inicio_mes);
        $("#AD_FECHA_FIN").val(hoy);

    }, []);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Administrar</strong>
                    </CCardHeader>
                    <CCardBody>
                        <div className='col-12'>
                            <div className="row g-9 mb-8">
                                <div className="col-md-3 col-sm-12 fv-row fv-plugins-icon-container">
                                    <label className="required fs-6 fw-bold mb-2">CHOFER <span className='text-danger'>*</span></label>
                                    <select id='SEL_CLIENTES' className="form-select form-select-solid" >
                                        <option value="">Seleccione</option>
                                        <option value="1">NOMBRE 1</option>
                                        <option value="2">NOMBRE 2</option>
                                        <option value="3">NOMBRE 3</option>

                                    </select>
                                </div>
                                <div className="col-md-3 fv-row">
                                    <label className="required fs-6 fw-semibold mb-2">Fecha Inicio</label>
                                    <input id='AD_FECHA_INI' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" />

                                </div>
                                <div className="col-md-3 fv-row">
                                    <label className="required fs-6 fw-semibold mb-2">Fecha Fin</label>
                                    <input id='AD_FECHA_FIN' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" />
                                </div>
                                <div className="col-md-3 fv-row">
                                    <label className="required fs-6 fw-semibold mb-2">Buscar</label>
                                    <button onClick={Cargar_Datos} className='btn btn-success'>Buscar</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 mt-5'>
                            <div className='table-responsive'>
                                <table id='AD_TABLA_DATOS' className='table table-striped'>

                                </table>
                            </div>
                        </div>

                        <CModal size="lg" id='AD_MODAL_DETALLES' backdrop="static" visible={visible} onClose={() => setVisible(false)}>
                            <CModalHeader>
                                <CModalTitle>DETALLES</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <div className="col-6 p-1">
                                    <h4 className="mb-2 mb-3">Pedido Interno #
                                        <span className="text-gray-700" id="ORDEN_NUM"></span>
                                    </h4>
                                    <div className="d-flex flex-stack">
                                        <div className="text-gray-700 fw-semibold fs-6 me-2">FECHA DE ENTREGA</div>
                                        <div className="d-flex align-items-senter">
                                            <span id="FECHA" className="text-gray-900 fw-bolder fs-6">
                                                {fecha}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-stack">
                                        <div className="text-gray-700 fw-semibold fs-6 me-2">CLIENTE</div>
                                        <div className="d-flex align-items-senter">
                                            <span id="NOMBRE_CLIENTE" className="text-gray-900 fw-bolder fs-6">
                                                {nombreCliente}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="separator separator-dashed my-3"></div>
                                </div>
                                <div className='col-6'>
                                    <div className="d-flex flex-column mb-7 fv-row fv-plugins-icon-container">
                                        <label className="required fs-6 fw-semibold form-label mb-2">INGRESAR FACTURA</label>
                                        <div className="position-relative">
                                            <input type="text" className="form-control form-control-solid" placeholder='000-000-00000000' />
                                        </div>
                                    </div>
                                </div>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Cerrar
                                </CButton>
                                <CButton color="primary">Guardar Cambios</CButton>
                            </CModalFooter>
                        </CModal>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

    )

}

export default Administrar
