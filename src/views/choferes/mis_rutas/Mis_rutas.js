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
import ReactDOMServer from 'react-dom/server';
import 'moment/locale/es';

function Mis_rutas() {

    const [USUARIO, setUSUARIO] = useState("");
    const [PLACA, setPLACA] = useState("");
    const [SECC_TABLA, setSECC_TABLA] = useState(true);
    const [SECC_TABLA_DETALLE, setSECC_TABLA_DETALLE] = useState(false);
    var d = sesion.GET_DATOS_SESION();


    function Cargar_Mis_Rutas() {
        setUSUARIO(d["Usuario"])
        setPLACA(d["PLACA"])
        console.log('d: ', d);

        let param = {
            USUARIO: d["Usuario_ID"]
        }
        console.log('param: ', param);

        let url = "misrutas/Cargar_Mis_Rutas"
        ajax.AjaxSendReceiveData(url, param, function (x) {
            console.log('x: ', x);

            $('#Tabla_Rutas_SECC').empty();
            if ($.fn.dataTable.isDataTable('#Tabla_Rutas')) {
                $('#Tabla_Rutas').DataTable().destroy();
                $('#Tabla_Rutas_SECC').empty();
            }
            let tabla = `
            <table id='Tabla_Rutas' class=' display table table-striped'>
            </table>
            `;
            $('#Tabla_Rutas_SECC').append(tabla);
            let TABLA_ = $('#Tabla_Rutas').DataTable({
                destroy: true,
                data: x,
                dom: 'Brtip',
                "pageLength": 5,
                order: [[0, "desc"]],
                buttons: [
                    {
                        text: `<span className"fw-bold"><i class="bi bi-arrow-clockwise fs-4"></i></span>`,
                        className: 'btn btn-info btn-sm',
                        action: function (e, dt, node, config) {
                            Cargar_Mis_Rutas()
                        },
                    },
                ],
                columns: [{
                    data: "FECHA_RUTA",
                    title: "FECHA",
                    render: function (x) {
                        return moment(x).format("YYYY MMMM DD")
                    }
                },
                {
                    data: "RUTAS_ASIGNADAS",
                    title: "RUTAS",
                    className: "text-center"
                },
                {
                    data: null,
                    title: "",
                    className: "btn_Asignar text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                    defaultContent: '<button type="button" class="btn_Asignar btn btn-success text-light"><i class="bi bi-truck fs-5 fw-bold"></i></button>',
                    orderable: "",
                    width: 20
                },
                ],
                "createdRow": function (row, data, index) {
                    $('td', row).eq(0).addClass("fw-bold fs-5");
                    $('td', row).eq(1).addClass("fw-bold fs-6 ");
                    $('td', row).eq(2).addClass("fw-bold fs-6 ");




                },
            });
            setTimeout(function () {
                $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
            }, 500);

            $('#Tabla_Rutas').on('click', 'td.btn_Asignar', function (respuesta) {
                var data = TABLA_.row(this).data();
                console.log('data: ', data);
                setSECC_TABLA(false);
                setSECC_TABLA_DETALLE(true)
                Cargar_Mis_Rutas_Detalle(data)
            });
        })


    }

    function Cargar_Mis_Rutas_Detalle(data) {

        let param = {
            RUTA: data["ID"],
            USUARIO: d["Usuario_ID"]
        }

        console.log('param: ', param);
        let url = "misrutas/Cargar_Mis_Rutas_Detalle"
        ajax.AjaxSendReceiveData(url, param, function (x) {
            console.log('x: ', x);
            $('#Tabla_Rutas_detalle_SECC').empty();
            if ($.fn.dataTable.isDataTable('#Tabla_Rutas_detalle')) {
                $('#Tabla_Rutas_detalle').DataTable().destroy();
                $('#Tabla_Rutas_detalle_SECC').empty();
            }
            let tabla = `
            <table id='Tabla_Rutas_detalle' class=' display table table-striped'>
            </table>
            `;
            $('#Tabla_Rutas_detalle_SECC').append(tabla);
            let TABLA_ = $('#Tabla_Rutas_detalle').DataTable({
                destroy: true,
                data: x,
                dom: 'Brtip',
                // "pageLength": 5,
                paging: false,
                info: false,
                order: [[0, "desc"]],
                buttons: [
                    {
                        text: `<span class"fw-bold"><i class="bi bi-arrow-return-left fs-4"></i> Regresar</span>`,
                        className: 'btn btn-info btn-sm',
                        action: function (e, dt, node, config) {
                            setSECC_TABLA_DETALLE(false);
                            setSECC_TABLA(true)
                            Cargar_Mis_Rutas()
                        },
                    },
                ],
                columns: [{
                    data: "CHOFER_PLACA",
                    title: "FECHA",

                },
                {
                    data: null,
                    title: "",
                    className: "btn_Asignar text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                    defaultContent: `
                        <button type="button" class="btn_detalles btn btn-warning text-light">
                            <i class="bi bi-eye fs-5"></i>
                        </button><br>
                        <button type="button" class="btn_img btn btn-primary text-light mt-1">
                            <i class="bi bi-camera fs-5"></i>
                        </button>`,
                    orderable: "",
                    width: 20
                },
                ],
                "createdRow": function (row, data, index) {
                    $('td', row).eq(0).addClass("fw-bold fs-5");
                    $('td', row).eq(1).addClass("fw-bold fs-6 ");
                    $('td', row).eq(2).addClass("fw-bold fs-6 ");

                    let a = `
                    <td>
                   
                        <div class="small text-medium-emphasis">
                            <span>Guia </span> | 
                            <span  class="`+ (data["GUIA"] == "" ? "text-danger" : "") + `">`+ (data["GUIA"] == "" ? "No Asiganda" : data["GUIA"]) + `</span> 
                        </div>
                        <span class="fs-6 text-muted">Cliente</span>
                        <div class="fs-6">`+ data["CLIENTE_NOMBRE"] + `</div>
                        <span class="fs-6 text-muted">Destino</span>
                        <div class="fs-6">`+ data["CLIENTE_SUCURSAL"] + `</div>
                        <span class="fs-6 text-muted">Producto</span>
                        <div class="fs-6">`+ data["PRODUCTO_NOMBRE"] + `</div>
                        <div class="small text-medium-emphasis">
                            <span class="fs-6">Cantidad</span> | `+ data["HOLCIM"] + `
                        </div>
                    </td>
                    `
                    $('td', row).eq(0).html(a);

                },
            });
            setTimeout(function () {
                $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
            }, 500);
            $('#Tabla_Rutas_detalle').on('click', '.btn_Asignar .btn_detalles', function () {
                var data = TABLA_.row($(this).closest('tr')).data();
                console.log('Detalles button clicked - Data:', data);
            });
            $('#Tabla_Rutas_detalle').on('click', '.btn_Asignar .btn_img', function () {
                var data = TABLA_.row($(this).closest('tr')).data();
                console.log('Img button clicked - Data:', data);
            });
        });

    }


    useEffect(() => {
        Cargar_Mis_Rutas();

    }, []);


    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Mis Rutas</strong>
                    </CCardHeader>
                    <CCardBody>
                        <div className='col-xl-12 col-sm-12'>
                            <h2 className='fs-1'>{USUARIO}</h2>
                            <h2 className='fs-2 text-muted'>{PLACA}</h2>
                            <h4 className='fs-4 text-muted'>{moment().format("YYYY MMMM D")}</h4>
                        </div>
                        {SECC_TABLA && (
                            <div className='col-12 mt-2' id=''>
                                <div className='table-responsive' id='Tabla_Rutas_SECC'>
                                    <table id='Tabla_Rutas' className='display table table-striped'>
                                    </table>
                                </div>
                            </div>
                        )}

                        {SECC_TABLA_DETALLE && (
                            <div className='col-12 mt-3' id=''>
                                <div className='table-responsive' id='Tabla_Rutas_detalle_SECC'>
                                    <table id='Tabla_Rutas_detalle' className='display table table-striped'>
                                    </table>
                                </div>
                            </div>
                        )}


                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

    )

}

export default Mis_rutas