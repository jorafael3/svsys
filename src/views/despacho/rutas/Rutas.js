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
import * as ajax from "../../../config/config";
import * as sesion from "../../../funciones/login/login";
import moment from 'moment';
import Select from 'react-select'


function Rutas() {

    const [visible_n, setVisible_n] = useState(false);
    const [RUTA_ID, setRUTA_ID] = useState(false);


    function Cargar_Rutas() {
        let url = "rutas/Cargar_Rutas";
        ajax.AjaxSendReceiveData(url, [], function (x) {

            Tabla_Rutas(x)
        })
    }

    function Tabla_Rutas(datos) {

        let TABLA_ = $('#Tabla_Rutas').DataTable({
            destroy: true,
            data: datos,
            dom: 'Brtip',
            "pageLength": 5,
            order: [[0, "desc"]],
            buttons: [
                {
                    text: `<span className"fw-bold"><i class="bi bi-arrow-clockwise fs-4"></i></span>`,
                    className: 'btn btn-info',
                    action: function (e, dt, node, config) {
                        Cargar_Rutas();
                    },
                },
                {
                    text: `<span class"fw-bold"><i class="bi bi-plus-circle-fill fs-4"></i></span>`,
                    className: 'btn btn-success',
                    action: function (e, dt, node, config) {
                        Nueva_Ruta();
                    },
                },
            ],
            columns: [{
                data: "fecha",
                title: "FECHA",
            },
            {
                data: "cant_choferes",
                title: "CHOFERES ASIGNADOS",
                className: "text-center"
            },
            {
                data: "cant_clientes",
                title: "CLIENTES ASIGNADOS",
                className: "text-center"
            },
            {
                data: null,
                title: "Asignar",
                className: "btn_Asignar text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_Asignar btn btn-success text-light"><i class="bi bi-truck fs-5 fw-bold"></i></button>',
                orderable: "",
                width: 20
            },
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-4");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");

                let hoy = moment().format("YYYY-MM-DD");

                if (data["fecha"] == hoy) {
                    $('td', row).addClass("bg-success bg-opacity-10")
                }


            },
        });
        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 500);
        $('#Tabla_Rutas').on('click', 'td.btn_Asignar', function (respuesta) {
            var data = TABLA_.row(this).data();


            let param = {
                ID: data["ID"]
            }
            Cargar_Rutas_dia(param)
        });

    }

    function Cargar_Rutas_dia(param) {
        let url = "rutas/Cargar_Rutas_dia";
        ajax.AjaxSendReceiveData(url, param, function (x) {

            Tabla_Rutas_dia(x)
        })
    }

    function Tabla_Rutas_dia(datos) {

        let TABLA_ = $('#Tabla_Rutas_dia').DataTable({
            destroy: true,
            data: datos,
            dom: 'Brtip',
            "pageLength": 5,
            order: [[0, "desc"]],
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;

                api.column(0, { page: 'current' })
                    .data()
                    .each(function (group, i, r) {
                        var additionalInfo = api.cell({ row: r, column: 2 }).data(); // Obtener datos de la columna 2


                        if (last !== group) {
                            $(rows)
                                .eq(i)
                                .before(

                                    `
                                    <tr class="group">
                                        <td colspan="1" class="bg-warning bg-opacity-10 fw-bold fs-4">
                                        `+ group + `
                                        </td>
                                        <td colspan="5" class="bg-warning bg-opacity-10 fw-bold fs-4">
                                        <button class="btn btn-success">+</button>
                                        </td>
                                    </tr>
                                    `

                                );

                            last = group;
                        }
                    });
            },
            buttons: [
                {
                    text: `<span className"fw-bold"><i class="bi bi-arrow-clockwise fs-4"></i></span>`,
                    className: 'btn btn-info',
                    action: function (e, dt, node, config) {
                        Cargar_Rutas();
                    },
                },
                {
                    text: `<span class"fw-bold"><i class="bi bi-plus-circle-fill fs-4"></i></span>`,
                    className: 'btn btn-success',
                    action: function (e, dt, node, config) {
                        setVisible_n(true)
                    },
                },
            ],
            columns: [{
                data: "CHOFER",
                title: "PLACA",
                visible: false
            },
            {
                data: "CLIENTE_NOMBRE",
                title: "CLIENTE_NOMBRE",
            }, {
                data: "destino_nombre",
                title: "destino_nombre",
            }, {
                data: "producto_nombre",
                title: "producto_nombre",
            }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");


            },
        });
        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 500);
        $('#Tabla_Rutas').on('click', 'td.btn_Asignar', function (respuesta) {
            var data = TABLA_.row(this).data();


            let param = {
                ID: data["ID"]
            }
            Cargar_Rutas_dia(param)
        });

    }

    function Nueva_Ruta() {
        let url = "rutas/Nueva_Ruta";
        let param = {
            CREADO_POR: sesion.GET_DATOS_SESION()["Usuario"]
        }
        ajax.AjaxSendReceiveData(url, param, function (x) {

            if (x[0] == 1) {
                ajax.Mensaje(x[1], "", "success")
                Cargar_Rutas();
            } else {
                ajax.Mensaje(x[1], "", "error")

            }

        })

    }

    const [N_cliente_id, setN_cliente_id] = useState("");
    const [N_producto_id, setN_producto_id] = useState("");

    function Nueva_Ruta_Dia() {

        let param = {
            CLIENTE: N_cliente_id,
            PRODUCTO: N_producto_id,
        }
        console.log('param: ', param);

        if (N_cliente_id == "") {
            ajax.Mensaje("Debe seleccionar un cliente", "", "error");
        } else {



        }

    }

    const [CLIENTES, setCLIENTES] = useState(false);
    const [PRODUCTOS, setPRODUCTOS] = useState(false);

    useEffect(() => {
        Cargar_Rutas();
        sesion.GET_DATOS_SESION();


        let url_c = "rutas/Cargar_Clientes"
        ajax.AjaxSendReceiveData(url_c, [], function (x) {

            setCLIENTES(x);

        })

        let url_p = "rutas/Cargar_Productos"
        ajax.AjaxSendReceiveData(url_p, [], function (x) {

            setPRODUCTOS(x);

        })


    }, []);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Rutas</strong>
                    </CCardHeader>
                    <CCardBody>
                        <div className='col-12'>
                            <table id='Tabla_Rutas' className='display table table-striped'>
                            </table>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        <div className='col-12'>
                            <table id='Tabla_Rutas_dia' className='display table'>

                            </table>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            <CModal size="lg" id='AD_MODAL_NUEVO' backdrop="static" visible={visible_n} onClose={() => setVisible_n(false)}>
                <CModalHeader>
                    <CModalTitle>Nueva Ruta</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">CLIENTE</span>
                            </label>
                            <Select options={CLIENTES}
                                // defaultValue={provincias.find(option => option.value === CLI_EDI_PROVINCIA)}
                                onChange={(items) => {
                                    // setprov_select(items.label);
                                    setN_cliente_id(items.value);
                                }}
                            />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">PRODUCTO</span>
                            </label>
                            <Select options={PRODUCTOS}
                                // defaultValue={provincias.find(option => option.value === CLI_EDI_PROVINCIA)}
                                onChange={(items) => {
                                    setN_producto_id(items.value);
                                }}
                            />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">GUIA #</span>
                            </label>
                            <input id='N_GUIA' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>

                    </div>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible_n(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary" onClick={Nueva_Ruta_Dia} >Guardar Cambios</CButton>
                </CModalFooter>
            </CModal>
        </CRow>

    )
}

export default Rutas