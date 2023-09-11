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
import Quagga from 'quagga';

// import 'datatables.net-buttons/css/buttons.dataTables.min.css';

import * as funciones from '../../../funciones/Despacho/guias/guias';
import { json } from 'react-router-dom';

function Guia() {
    const [data, setData] = useState([]);
    const [code, setCode] = useState(null);
    const [parametro1, setParametro1] = useState('valor1');
    const [parametro2, setParametro2] = useState('valor2');
    var N_PEDIDO;
    function Mensaje(t1, t2, icon) {
        Swal.fire({
            title: t1,
            text: t2,
            icon: icon,
            // iconUrl: 'ruta/a/mi/icono.png'
        });
    }

    function Generar_Guia() {

        let Datos = funciones.Datos_Guias();
        if (Datos.length > 0) {
            let CABECERA = Datos[0];
            console.log('CABECERA: ', CABECERA);
            let DETALLE = Datos[0]["DETALLE"];
            console.log('DETALLE: ', DETALLE);
            $("#ORDEN").text(CABECERA["ORDEN"]);
            $("#CLIENTE").text(CABECERA["CLIENTE"]);
            $("#RUC").text(CABECERA["RUC"]);
            $("#SOLICITANTE").text(CABECERA["SOILICTANTE"]);
            $("#DIRECCION_1").text(CABECERA["DIRECCION_1"]);
            $("#FECHA_EMISION").text(CABECERA["FECHA_EMISION"]);
            $("#FACTURA").text(CABECERA["FACTURA"]);
            $("#TELEFONO").text(CABECERA["TELEFONO"]);
            $("#FECHA_VALIDEZ").text(CABECERA["FECHA_VALIDEZ"]);
            $("#PTO_DE_PARTIDA").text(CABECERA["PARTIDA"]);
            $("#PTO_DE_LLEGADA").text(CABECERA["LLEGADA"]);
            $("#DIRECCION_2").text(CABECERA["DIRECCION_2"]);
            $("#TIPO_DE_ENTREGA").text(CABECERA["TIPO_ENTREGA"]);
            $("#PEDIDO_INTERNO").text(CABECERA["PEDIDO_INTERNO"]);
            $("#PED_COMPRA").text(CABECERA["PEDIDO_COMPRA"]);
            N_PEDIDO = CABECERA["PEDIDO_INTERNO"];
            Tabla_Detalle(DETALLE)
            $("#SECC_DATOS").removeClass("d-none");
        } else {
            Mensaje("No hay datos para mostrar", "", "error");
        }
    }

    function Tabla_Detalle(datos) {
        let TABLA_ORDENES_DETALLE = $('#TABLA_DETALLE').DataTable({
            destroy: true,
            data: datos,
            dom: 'Brtip',
            buttons: [{
                text: `<span class"fw-bold">Guardar Datos <i class="bi bi-save"></i></span>`,
                className: 'btn btn-info',
                action: function (e, dt, node, config) {
                    Guardar_Orden();
                },
            }, {
                extend: 'excel',
                text: '<i class="fa fa-file-excel"></i> Excel',
                className: 'btn btn-primary',
            }],
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
            },
            {
                data: "UNIDAD",
                title: "UNIDAD"
            }, {
                data: "CANTIDAD",
                title: "CANTIDAD"
            }, {
                data: "DESPACHADA",
                title: "DESPACHADA"
            }, {
                data: "ENTREGADA",
                title: "ENTREGADA"
            },
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
    }

    function Guardar_Orden() {
        let cliente = $("#SEL_CLIENTES").val();
        let servicio = $("#SEL_SERVICIOS").val();
        let entrega = $("#SEL_ENTREGA").val();

        if (cliente == "") {
            Mensaje("Debe seleccionar un cliente", "", "error");
        } else if (servicio == "") {
            Mensaje("Debe seleccionar un servicio", "", "error");

        } else if (entrega == "") {
            Mensaje("Debe seleccionar un tipo de entrega", "", "error");

        } else {
            let param = {
                PEDIDO: N_PEDIDO,
                CLIENTE: cliente,
                SERVICIO: servicio,
                ENTREGA: entrega,
            }

            Guardar_Datos(param);
        }
    }

    function Guardar_Datos(param) {
        console.log('param: ', param);
        const postData = {
            param1: parametro1,
            param2: parametro2,
        };

        axios.get('http://127.0.0.1:8080/prueba.php/procesarDatos',
            postData
            ,
            {
                headers: {
                    'Content-Type': 'application/json', // Especifica el tipo de contenido como JSON
                },
            })
            .then(response => {
                console.log('data: ', response.data);
                //setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos: ', error);
            }, [parametro1, parametro2]);


    }

  

    useEffect(() => {
        // Coloca aquí la lógica que deseas ejecutar cuando la página se carga
        let CLIENTES = funciones.Clientes();
        console.log('CLIENTES: ', CLIENTES);
        let select = $("#SEL_CLIENTES")
        select.empty();
        select.append("<option value=''>Seleccione</option>");
        CLIENTES.map(function (x) {
            select.append("<option value='" + x["ID"] + "'>" + x["NOMBRE"] + "</option>");
        })


    }, []);
   
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Ingresar Guia</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CButton color="primary" onClick={Generar_Guia}>Generar Guia</CButton>
                        <div id='SECC_DATOS' className='d-none'>
                            <div className='row p-3'>
                                <h4 className='text-dark'>ORDEN DE DESPACHO #
                                    <span id='ORDEN'> </span>
                                </h4>
                                <div className='col-6'>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">CLIENTE</label>
                                        <div className="col-sm-9">
                                            :<span id='CLIENTE'></span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">RUC</label>
                                        <div className="col-sm-9">
                                            :<span id='RUC'></span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">SOLICITANTE</label>
                                        <div className="col-sm-9">
                                            :<span id='SOLICITANTE'></span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">DIRECCION</label>
                                        <div className="col-sm-9">
                                            :<span id='DIRECCION_1'></span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">FECHA_EMISION</label>
                                        <div className="col-sm-9">
                                            :<span id='FECHA_EMISION'></span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">FACTURA</label>
                                        <div className="col-sm-9">
                                            :<span id='FACTURA'></span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">TELEFONO</label>
                                        <div className="col-sm-9">
                                            :<span id='TELEFONO'></span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">FECHA VALIDEZ</label>
                                        <div className="col-sm-9">
                                            :<span id='FECHA_VALIDEZ'></span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='row p-3'>
                                <div className='col-6'>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">PTO. DE PARTIDA</label>
                                        <div className="col-sm-9">
                                            :<span id='PTO_DE_PARTIDA'></span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">PTO. DE LLEGADA</label>
                                        <div className="col-sm-9">
                                            :<span id='PTO_DE_LLEGADA'></span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">DIRECCION</label>
                                        <div className="col-sm-9">
                                            :<span id='DIRECCION_2'></span>
                                        </div>
                                    </div>

                                </div>
                                <div className='col-6'>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">TIPO DE ENTREGA</label>
                                        <div className="col-sm-9">
                                            :<span id='TIPO_DE_ENTREGA'></span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">PEDIDO INTERNO</label>
                                        <div className="col-sm-9">
                                            :<span id='PEDIDO_INTERNO'></span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label col-form-label-sm fw-bold">PED COMPRA</label>
                                        <div className="col-sm-9">
                                            :<span id='PED_COMPRA'></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className='row p-5'>
                                <div className='col-12'>
                                    <div className="row g-9 mb-8">
                                        <div className="col-md-4 col-sm-12 fv-row fv-plugins-icon-container">
                                            <label className="required fs-6 fw-bold mb-2">CLIENTE <span className='text-danger'>*</span></label>
                                            <select id='SEL_CLIENTES' className="form-select form-select-solid" >
                                                <option value="">Seleccione</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label className="required fs-6 fw-semibold mb-2">SERVICIO</label>
                                            <select id='SEL_SERVICIOS' className="form-select form-select-solid" >
                                                <option value="">Seleccione</option>
                                                <option value="1">CARGA</option>
                                                <option value="2">FLETE</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label className="required fs-6 fw-semibold mb-2">ENTREGA</label>
                                            <select id='SEL_ENTREGA' className="form-select form-select-solid" >
                                                <option value="">Seleccione</option>
                                                <option value="1">MATRIZ</option>
                                                <option value="2">SUCURSAL</option>
                                                <option value="2">OBRA</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div className='table-responsive mt-2'>
                                    <table className='table table-striped' id='TABLA_DETALLE' width={"100%"}>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Guia
