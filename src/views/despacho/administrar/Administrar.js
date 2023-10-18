import React, { useEffect, useRef, useState } from 'react';
import {
    CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter
} from '@coreui/react'
import Swal from 'sweetalert2';
import $, { ajax } from 'jquery';
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


    //*********** DATOS DETALLE*/
    const [Pedido, setPedido] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [Fecha, setFecha] = useState('');
    const [solicitante, setsolicitante] = useState('');
    const [direccion, setdireccion] = useState('');
    const [partida, setpartida] = useState('');
    const [llegada, setllegada] = useState('');
    const [direccion2, setdireccion2] = useState('');
    const [factura, setfactura] = useState('');
    const [telefono, settelefono] = useState('');
    const [validez, setvalidez] = useState('');
    const [entrega, setentrega] = useState('');
    const [compra, setcompra] = useState('');
    const [vigente, setvigente] = useState('');
    const [placa, setplaca] = useState('');
    const [chofer, setchofer] = useState('');


    function Cargar_Datos() {
        let FECHA_INI = $("#AD_FECHA_INI").val();
        let FECHA_FIN = $("#AD_FECHA_FIN").val();
        let param = {
            FECHA_INI: moment(FECHA_INI).format("YYYYMMDD"),
            FECHA_FIN: moment(FECHA_FIN).format("YYYYMMDD")
        }
        console.log('param: ', param);
        let DATOS = funciones.Cargar_Guias_Sin_Despachar(param, function (x) {
            console.log('DATOS: ', x);
            Tabla_guias_sin_despachar(x)
        });
        // 
    }

    function Tabla_guias_sin_despachar(datos) {

        $('#AD_TABLA_DATOS_SECC').empty();
        if ($.fn.dataTable.isDataTable('#AD_TABLA_DATOS')) {
            $('#AD_TABLA_DATOS').DataTable().destroy();
            $('#AD_TABLA_DATOS_SECC').empty();
        }

        let tabla = `
        <table id='AD_TABLA_DATOS' class='table display table-striped'>
        </table>
        `;
        $('#AD_TABLA_DATOS_SECC').append(tabla);
        let TABLA_ = $('#AD_TABLA_DATOS').DataTable({
            destroy: true,
            data: datos,
            dom: 'Bfrtip',
            order: [[0, "desc"]],
            buttons: [
                {
                    text: `<span class"fw-bold"><i class="bi bi-arrow-clockwise fs-4"></i></span>`,
                    className: 'btn btn-info',
                    action: function (e, dt, node, config) {
                        Cargar_Datos();
                    },
                },
                {
                    extend: 'excel',
                    text: '<i class="bi bi-file-earmark-excel fs-4"></i>',
                    className: 'btn btn-primary',
                }],
            columns: [{
                data: "FECHA_DE_EMISION",
                title: "FECHA DE EMISION",
                render: function (x) {
                    return moment(x).format("YYYY-MM-DD")
                }
            },
            {
                data: "PEDIDO_INTERNO",
                title: "PEDIDO INTERNO"
            },
            {
                data: "FACTURA",
                title: "FACTURA"
            },
            {
                data: "VENCIDO",
                title: "ESTADO",
                render: function (x, y, r) {
                    if (x == 1) {
                        x = `
                        <span class="text-success">Vigente</span><br>
                        <span class="text-muted">`+ r.FECHA_VALIDEZ + `</span>
                        `
                    } else {
                        x = `
                        <span class="text-success">Vencida</span><br>
                        <span class="text-muted">`+ r.FECHA_VALIDEZ + `</span>
                        `
                    }
                    return x;
                }
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
            setVisible(true);
            setPedido(data["PEDIDO_INTERNO"]);
            setNombreCliente(data["CLIENTE"] + " (" + data["CLIENTE_RUC"] + ")");
            setFecha(data["FECHA_DE_EMISION"]);
            setsolicitante(data["SOLICITANTE"]);
            setdireccion(data["DIRECCION_1"]);
            setpartida(data["PTO_DE_PARTIDA"]);
            setllegada(data["PTO_DE_LLEGADA"]);
            setdireccion2(data["DIRECCION_2"]);
            setfactura(data["FACTURA"]);
            settelefono(data["TELEFONO"]);
            setvalidez(data["FECHA_VALIDEZ"]);
            setentrega(data["TIPO_DE_ENTREGA"]);
            setcompra(data["PED_COMPRA"]);
            setvigente(data["VENCIDO"] == 1 ? "VIGENTE" : "VENCIDA");
            setplaca(data["placa"] != null ? data["placa"] : "SIN ASIGNAR");
            setchofer(data["chofer_nombre"] ? data["chofer_nombre"] : "SIN ASIGNAR");

            let param = {
                PEDIDO_INTERNO: data["PEDIDO_INTERNO"]
            }

            funciones.Cargar_Guias_Sin_Despachar_detalle(param, function (x) {
                console.log('x: ', x);
                Tabla_guias_sin_despachar_detalles(x)
            })
        })

    }

    function Tabla_guias_sin_despachar_detalles(datos) {
        let TABLA_ = $('#DES_TABLA_GUIAS_DETALLE').DataTable({
            destroy: true,
            data: datos,
            dom: 'rtip',
            order: [[0, "desc"]],
            columns: [{
                data: "ORD",
                title: "ORD",
            },
            {
                data: "CODIGO",
                title: "CODIGO"
            },
            {
                data: "DESCRIPCION",
                title: "DESCRIPCION"
            }, {
                data: "UNIDAD",
                title: "UNIDAD"
            }, {
                data: "POR_DESPACHAR",
                title: "POR_DESPACHAR"
            }, {
                data: "DESPACHADA",
                title: "DESPACHADA"
            }, {
                data: "ENTREGADA",
                title: "ENTREGADA"
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
    }

    function Reasignar_placa() {
        let PEDIDO = Pedido;
        let placa = $("#N_PLACA").val();
        let param = {
            PEDIDO_INTERNO: PEDIDO,
            PLACA: placa,
        }
        console.log('param: ', param);
        funciones.Reasignar_Nueva_placa(param);
        Cargar_Datos();
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
                                {/* <div className="col-md-3 col-sm-12 fv-row fv-plugins-icon-container">
                                    <label className="required fs-6 fw-bold mb-2">CHOFER <span className='text-danger'>*</span></label>
                                    <select id='SEL_CLIENTES' className="form-select form-select-solid" >
                                        <option value="">Seleccione</option>
                                        <option value="1">NOMBRE 1</option>
                                        <option value="2">NOMBRE 2</option>
                                        <option value="3">NOMBRE 3</option>

                                    </select>
                                </div> */}
                                <div className="col-md-3 fv-row">
                                    <label className="required fs-6 fw-semibold mb-2">Fecha Inicio</label>
                                    <input id='AD_FECHA_INI' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" />

                                </div>
                                <div className="col-md-3 fv-row">
                                    <label className="required fs-6 fw-semibold mb-2">Fecha Fin</label>
                                    <input id='AD_FECHA_FIN' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" />
                                </div>
                                <div className="col-md-3">
                                    <button onClick={Cargar_Datos} className='btn btn-success text-light fw-bold mt-4'><i className="bi bi-search fw-bold fs-5"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 mt-5'>
                            <div className='table-responsive' id='AD_TABLA_DATOS_SECC'>
                                <table id='AD_TABLA_DATOS' className='table table-striped'>

                                </table>
                            </div>
                        </div>

                        <CModal size="xl" id='AD_MODAL_DETALLES' backdrop="static" visible={visible} onClose={() => setVisible(false)}>
                            <CModalHeader>
                                <CModalTitle>DETALLES</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <div className='row'>
                                    <h4 className="mb-2 mb-3">Pedido Interno #
                                        <span className="text-gray-700" id="ORDEN_NUM">{Pedido}</span>
                                    </h4>
                                    <div className="col-6 p-1">
                                        <table className="table">
                                            <tbody>
                                                <tr className="border-top">
                                                    <td className='fw-bold'>FECHA EMISIÓN:</td>
                                                    <td className="text-muted fw-bold fs-7">{Fecha}</td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className='fw-bold'>CLIENTE:</td>
                                                    <td className="text-muted fw-bold fs-7">{nombreCliente}</td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className='fw-bold'>SOLICITANTE:</td>
                                                    <td className="text-muted fw-bold fs-7">{solicitante}</td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className='fw-bold'>DIRECCION:</td>
                                                    <td className="text-muted fw-bold fs-7">{direccion}</td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className='fw-bold'>PTO. DE PARTIDA:</td>
                                                    <td className="text-muted fw-bold fs-7">{partida}</td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className='fw-bold'>PTO. DE LLEGADA:</td>
                                                    <td className="text-muted fw-bold fs-7">{llegada}</td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className='fw-bold'>DIRECCION:</td>
                                                    <td className="text-muted fw-bold fs-7">{direccion2}</td>
                                                </tr>
                                            </tbody>

                                        </table>


                                    </div>
                                    <div className="col-6 p-1">

                                        <table className="table">
                                            <tbody>
                                                <tr className="border-top">
                                                    <td className='fw-bold'>FACTURA:</td>
                                                    <td className="text-muted fw-bold fs-7">{factura}</td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className='fw-bold'>TELEFONO:</td>
                                                    <td className="text-muted fw-bold fs-7">{telefono}</td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className='fw-bold'>FECHA VALIDEZ:</td>
                                                    <td className="text-muted fw-bold fs-7">
                                                        {validez}
                                                        <span className={vigente == "VIGENTE" ? "text-success" : "text-danger"}>
                                                            ({vigente})
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className='fw-bold'>TIPO DE ENTREGA:</td>
                                                    <td className="text-muted fw-bold fs-7">{entrega}</td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className='fw-bold'>PEDIDO DE COMPRA:</td>
                                                    <td className="text-muted fw-bold fs-7">{compra}</td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className='fw-bold text-primary'>PLACA ASIGNADA:</td>
                                                    <td className="text-muted fw-bold fs-7">
                                                        <span className={placa == "SIN ASIGNAR" ? "text-danger fw-bold fs-7" : "text-muted fw-bold fs-7"}>
                                                            {placa}
                                                        </span>
                                                        {placa == "SIN ASIGNAR" && (
                                                            <div className="custom-file">
                                                                <input type="text" className="custom-file-input" id="N_PLACA" lang="es" />
                                                                <button onClick={Reasignar_placa} className='btn btn-light text-success'><i className="bi bi-cloud-arrow-up"></i></button>
                                                            </div>
                                                        )}

                                                    </td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className='fw-bold text-primary'>CHOFER:</td>
                                                    <td>
                                                        <span className={chofer == "SIN ASIGNAR" ? "text-danger fw-bold fs-7" : "text-muted fw-bold fs-7"}>
                                                            {chofer}
                                                        </span>
                                                    </td>
                                                </tr>

                                            </tbody>

                                        </table>


                                    </div>

                                    <div className='col-12' >
                                        <div className='table-responsive'>
                                            <table id='DES_TABLA_GUIAS_DETALLE'>

                                            </table>
                                        </div>

                                    </div>
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
