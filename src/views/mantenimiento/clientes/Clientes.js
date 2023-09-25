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

var URL = "clientes/"

function Clientes() {
    const [visible_n, setVisible_n] = useState(false);
    const [visible_e, setVisible_e] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [ciudades, setciudades] = useState([]);
    const provincias = ajax.Provincias()

    const [CLI_EDI_RUC, setCLI_EDI_RUC] = useState('');
    const [CLI_EDI_RAZON, setCLI_EDI_RAZON] = useState('');
    const [CLI_EDI_NOMBRE, setCLI_EDI_NOMBRE] = useState('');
    const [CLI_EDI_PROVINCIA, setCLI_EDI_PROVINCIA] = useState('');
    const [CLI_EDI_CIUDADES, setCLI_EDI_CIUDADES] = useState('');
    const [CLI_EDI_DIRECCION, setCLI_EDI_DIRECCION] = useState('');
    const [CLI_EDI_CORREO, setCLI_EDI_CORREO] = useState('');
    const [CLI_EDI_TELEFONO, setCLI_EDI_TELEFONO] = useState('');


    const handleEditarClick = (data) => {
        console.log('data: ', data);
        setCLI_EDI_RUC(data["CLIENTE_NOMBRE"]); // Update the state variable
        console.log('data["CLIENTE_NOMBRE"]: ', data["CLIENTE_NOMBRE"]);
    };

    useEffect(() => {
        // Cargar_Provincias()
        Cargar_Clientes();
    }, []);

    function Cargar_Clientes() {
        let url = URL + "Cargar_Clientes"
        ajax.AjaxSendReceiveData(url, "", function (x) {
            console.log('x: ', x);
            Tabla_Clientes(x)
        })
    }

    function Tabla_Clientes(datos) {
        let t = $('#CLI_TABLA_CLIENTES');
        t.empty();
        if ($.fn.dataTable.isDataTable('#CLI_TABLA_CLIENTES')) {
            t.DataTable().destroy();
            t.empty();
        }
        let TABLA_ = t.DataTable({
            destroy: true,
            data: datos,
            dom: 'Brtip',
            buttons: [
                {
                    text: `<span className"fw-bold"><i class="bi bi-arrow-clockwise"></i></span>`,
                    className: 'btn btn-info',
                    action: function (e, dt, node, config) {
                        Cargar_Clientes();
                    },
                },
                // {
                //     extend: 'excel',
                //     text: '<i className="fa fa-file-excel"></i> Excel',
                //     className: 'btn btn-primary',
                // }
            ],
            columns: [{
                data: "CLIENTE_RUC",
                title: "RUC",
            },
            {
                data: "CLIENTE_NOMBRE",
                title: "NOMBRE"
            },
            {
                data: "CLIENTE_RAZON_SOCIAL",
                title: "CLIENTE_RAZON_SOCIAL",
            },
            {
                data: null,
                title: "Editar",
                className: "btn_editar text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_editar btn btn-warning text-light"><i class="bi bi-pencil"></i></button>',
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
        t.on('click', 'td.btn_editar', function (respuesta) {
            var data = TABLA_.row(this).data();
            console.log('data: ', data);
            setVisible_e(true)
            handleEditarClick(data)
            // setCLI_EDI_RUC(data["CLIENTE_NOMBRE"]);
            // console.log('CLI_EDI_NOMBRE: ', CLI_EDI_NOMBRE);
            // $("#CLI_EDI_NOMBRE").val(data["CLIENTE_NOMBRE"]);
            // setFecha(data["FECHA_ENTREGA"]);
        })
    }

    function Cargar_Provincias() {
        setVisible_n(true)
        setciudades([])
        setSelectedValue("")
    }

    function Cambiar_Ciudad(event) {
        setSelectedValue(event.target.value)
        let pr = $("#CLI_PROVINCIA").val();
        let array_ciudades = ajax.Ciudades(pr);
        console.log('ciudades: ', array_ciudades);
        setciudades(array_ciudades)
    }

    function Guardar_Clientes() {
        let CLI_RUC = $("#CLI_RUC").val()
        let CLI_RAZON = $("#CLI_RAZON").val()
        let CLI_NOMBRE = $("#CLI_NOMBRE").val()
        let CLI_PROVINCIA = $("#CLI_PROVINCIA option:selected").text()
        let CLI_PROVINCIA_ID = $("#CLI_PROVINCIA").val()
        let CLI_CIUDADES = $("#CLI_CIUDADES").val()
        let CLI_DIRECCION = $("#CLI_DIRECCION").val()
        let CLI_CORREO = $("#CLI_DIRECCION").val()
        let CLI_TELEFONO = $("#CLI_DIRECCION").val()

        if (CLI_RUC == "") {
            ajax.Mensaje("Debe ingresar un numero de cédula/ruc", "", "error");
        } else if (CLI_NOMBRE == "") {
            ajax.Mensaje("Debe ingresar un nombre de cliente", "", "error");
        } else {
            let param = {
                CLI_RUC: CLI_RUC,
                CLI_RAZON: CLI_RAZON,
                CLI_NOMBRE: CLI_NOMBRE,
                CLI_PROVINCIA: CLI_PROVINCIA,
                CLI_PROVINCIA_ID: CLI_PROVINCIA_ID,
                CLI_CIUDADES: CLI_CIUDADES,
                CLI_DIRECCION: CLI_DIRECCION,
                CLI_CORREO: CLI_CORREO,
                CLI_TELEFONO: CLI_TELEFONO,
            }

            let url = URL + "Nuevo_Cliente"
            ajax.AjaxSendReceiveData(url, param, function (x) {
                console.log('x: ', x);
                if (x[0] == true) {
                    ajax.Mensaje(x[1], "", x[2]);
                    if (x[2] == "success") {
                        setVisible_n(false)
                    }
                } else {
                    ajax.Mensaje(x[1], "", x[2]);
                }
            })

        }
    }


    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <h3>Clientes</h3>
                        <div className='card-toolbar'>
                            <button onClick={() => Cargar_Provincias()} className='btn btn-success text-light fw-bold'>Nuevo +</button>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <div className='col-12 mt-5'>
                            <div className='table-responsive'>
                                <table id='CLI_TABLA_CLIENTES' className='table table-striped'>

                                </table>
                            </div>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
            <CModal size="lg" id='AD_MODAL_NUEVO' backdrop="static" visible={visible_n} onClose={() => setVisible_n(false)}>
                <CModalHeader>
                    <CModalTitle>Clientes</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                        <div className="mb-13 text-center">
                            <h1 className="mb-3">Nuevo Cliente</h1>

                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Cliente Ruc/Cedula *</span>
                            </label>
                            <input id='CLI_RUC' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Razon social </span>
                            </label>
                            <input id='CLI_RAZON' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Nombre </span>
                            </label>
                            <input id='CLI_NOMBRE' type="email" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="required fs-6 fw-semibold mb-2">Provincia</label>
                                <select value={selectedValue} className='form-select' id='CLI_PROVINCIA' onChange={Cambiar_Ciudad}>
                                    <option value="">Seleccione</option>
                                    {provincias.map((option, index) => (
                                        <option key={index} value={option.id}>{option.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Ciudad</label>
                                <select className='form-select' id='CLI_CIUDADES' name="" >
                                    <option value="">Seleccione</option>
                                    {ciudades.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Direccion </span>
                            </label>
                            <input id='CLI_DIRECCION' type="email" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="required fs-6 fw-semibold mb-2">Correo</label>
                                <input id='CLI_CORREO' type="password" className="form-control form-control-solid" placeholder="" name="target_title" />

                            </div>
                            <div className="col-md-6 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Telefono</label>
                                <input id='CLI_TELEFONO' type="password" className="form-control form-control-solid" placeholder="" name="target_title" />

                            </div>
                        </div>

                        <div></div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible_n(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary" onClick={Guardar_Clientes} >Guardar Cambios</CButton>
                </CModalFooter>
            </CModal>
            <CModal size="lg" id='AD_MODAL_EDITAR' backdrop="static" visible={visible_e} onClose={() => setVisible_e(false)}>
                <CModalHeader>
                    <CModalTitle>Clientes</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                        <div className="mb-13 text-center">
                            <h1 className="mb-3">Editar Cliente</h1>
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Cliente Ruc/Cedula *</span>
                            </label>
                            <input id='CLI_EDI_RUC' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Razon social </span>
                            </label>
                            <input id='CLI_EDI_RAZON' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Nombre </span>
                            </label>
                            <input defaultValue={CLI_EDI_NOMBRE} id='CLI_EDI_NOMBRE' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="required fs-6 fw-semibold mb-2">Provincia</label>
                                <select value={selectedValue} className='form-select' id='CLI_EDI_PROVINCIA' onChange={Cambiar_Ciudad}>
                                    <option value="">Seleccione</option>
                                    {provincias.map((option, index) => (
                                        <option key={index} value={option.id}>{option.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Ciudad</label>
                                <select className='form-select' id='CLI_EDI_CIUDADES' name="" >
                                    <option value="">Seleccione</option>
                                    {ciudades.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Direccion </span>
                            </label>
                            <input id='CLI_EDI_DIRECCION' type="email" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="required fs-6 fw-semibold mb-2">Correo</label>
                                <input id='CLI_EDI_CORREO' type="password" className="form-control form-control-solid" placeholder="" name="target_title" />
                            </div>
                            <div className="col-md-6 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Telefono</label>
                                <input id='CLI_EDI_TELEFONO' type="password" className="form-control form-control-solid" placeholder="" name="target_title" />
                            </div>
                        </div>
                        <div></div>
                    </div>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible_e(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary" onClick={Guardar_Clientes} >Guardar Cambios</CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}
export default Clientes
