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

var URL = "clientes/"

function Clientes() {
    const [visible_n, setVisible_n] = useState(false);
    const [visible_e, setVisible_e] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [ciudades, setciudades] = useState([]);
    const provincias = ajax.Provincias();
    const [prov_select, setprov_select] = useState("");
    const [prov_id_select, setprov_id_select] = useState("");


    const [CLI_EDI_RUC, setCLI_EDI_RUC] = useState('');
    const [CLI_EDI_RAZON, setCLI_EDI_RAZON] = useState('');
    const [CLI_EDI_NOMBRE, setCLI_EDI_NOMBRE] = useState('');
    const [CLI_EDI_PROVINCIA, setCLI_EDI_PROVINCIA] = useState('');
    const [CLI_EDI_CIUDADES, setCLI_EDI_CIUDADES] = useState('');
    const [CLI_EDI_DIRECCION, setCLI_EDI_DIRECCION] = useState('');
    const [CLI_EDI_DIRECCION_DESPACHO, setCLI_EDI_DIRECCION_DESPACHO] = useState('');
    const [CLI_EDI_CORREO, setCLI_EDI_CORREO] = useState('');
    const [CLI_EDI_TELEFONO, setCLI_EDI_TELEFONO] = useState('');
    const [CLI_EDI_CLIENTE_ID, setCLI_EDI_CLIENTE_ID] = useState('');


    useEffect(() => {
        // Cargar_Provincias()
        Cargar_Clientes();
    }, []);

    function Cargar_Clientes() {
        let url = URL + "Cargar_Clientes"
        ajax.AjaxSendReceiveData(url, "", function (x) {
            
            Tabla_Clientes(x)
        })
    }

    function Tabla_Clientes(datos) {

        $('#CLI_TABLA_CLIENTES_SECC').empty();
        if ($.fn.dataTable.isDataTable('#US_TABLA_USUARIOS')) {
            $('#CLI_TABLA_CLIENTES').DataTable().destroy();
            $('#CLI_TABLA_CLIENTES_SECC').empty();
        }

        let tabla = `
        <table id='CLI_TABLA_CLIENTES' class='table display table-striped'>
        </table>
        `;
        $('#CLI_TABLA_CLIENTES_SECC').append(tabla);

        let TABLA_ = $('#CLI_TABLA_CLIENTES').DataTable({
            destroy: true,
            data: datos,
            dom: 'Bfrtip',
            buttons: [
                {
                    text: `<span className"fw-bold"><i class="bi bi-arrow-clockwise fs-4"></i></span>`,
                    className: 'btn btn-info',
                    action: function (e, dt, node, config) {
                        Cargar_Clientes();
                    },
                },
                {
                    text: `<span class"fw-bold"><i class="bi bi-person-plus-fill fs-4"></i></span>`,
                    className: 'btn btn-success',
                    action: function (e, dt, node, config) {
                        setVisible_n(true);
                        // setdept_select("");
                        // setsuc_select("");
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
                data: "CLIENTE_PROVINCIA_NOMBRE",
                title: "PROVINCIA"
            },
            {
                data: "CLIENTE_DIRECCION",
                title: "DIRECCION",
            },
            {
                data: "estado",
                title: "estado",
                render: function (x) {
                    if (x == 1) {
                        x = `
                        <span class="text-success">Activo</span>
                        `
                    } else if (x == 0) {
                        x = `
                        <span class="text-danger">Inactivo</span>
                        `
                    }
                    return x;
                }
            },
            {
                data: null,
                title: "Editar",
                className: "btn_editar text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_editar btn btn-warning text-light"><i class="bi bi-pencil"></i></button>',
                orderable: "",
                width: 20
            },
            {
                data: null,
                title: "Activar",
                className: "btn_activar text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_recibir btn btn-success text-light"><i class="bi bi-check"></i></button>',
                orderable: "",
                width: 20
            },
            {
                data: null,
                title: "Desactivar",
                className: "btn_desactivar text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_recibir btn btn-danger text-light"><i class="bi bi-eraser"></i></button>',
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

                if (data["estado"] == 1) {
                    $('td', row).eq(5).removeClass("btn_activar");
                    $('td', row).eq(5).html("");
                }
                if (data["estado"] == 0) {
                    $('td', row).eq(4).removeClass("btn_editar");
                    $('td', row).eq(4).html("");
                    $('td', row).eq(6).removeClass("btn_desactivar");
                    $('td', row).eq(6).html("");
                }

                let CLIENTE = `
                <div class="d-flex justify-content-start flex-column">
                    <span class="text-gray-700 fw-bold d-block fs-7">`+ data["CLIENTE_RUC"] + `</span>
                    <span class="text-muted d-block fs-7">Nombre:</span>
                    <span class="text-gray-700 fw-bold d-block fs-7">`+ data["CLIENTE_NOMBRE"] + `</span>
                    <span class="text-muted d-block fs-7">Razon Social:</span>
                    <span class="text-gray-700 fw-bold d-block fs-7">`+ data["CLIENTE_NOMBRE"] + `</span>
                </div>`

                let CIUDAD = `
                <div class="d-flex justify-content-start flex-column">
                    <span class="text-gray-700 fw-bold d-block fs-7">`+ data["CLIENTE_PROVINCIA_NOMBRE"] + `</span>
                    <span class="text-muted d-block fs-7">Ciudad:</span>
                    <span class="text-gray-700 fw-bold d-block fs-7">`+ data["CLIENTE_CIUDAD"] + `</span>
                </div>`
                let DIRECCION = `
                <div class="d-flex justify-content-start flex-column">
                    <span class="text-gray-700 fw-bold d-block fs-7">`+ data["CLIENTE_DIRECCION"] + `</span>
                    <span class="text-muted d-block fs-7">Direccion Despacho:</span>
                    <span class="text-gray-700 fw-bold d-block fs-7">`+ data["CLIENTE_DIRECCION_DESPACHO"] + `</span>
                    <span class="text-muted d-block fs-7">Telefono:</span>
                    <span class="text-gray-700 fw-bold d-block fs-7">`+ data["CLIENTE_TELEFONO"] + `</span>
                </div>`

                $('td', row).eq(0).html(CLIENTE);
                $('td', row).eq(1).html(CIUDAD);
                $('td', row).eq(2).html(DIRECCION);



            },
        });
        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 500);
        $('#CLI_TABLA_CLIENTES').on('click', 'td.btn_editar', function (respuesta) {
            var data = TABLA_.row(this).data();
            
            setVisible_e(true);

            setCLI_EDI_RUC(data["CLIENTE_RUC"]);
            setCLI_EDI_NOMBRE(data["CLIENTE_NOMBRE"]);
            setCLI_EDI_RAZON(data["CLIENTE_RAZON_SOCIAL"]);
            setCLI_EDI_DIRECCION(data["CLIENTE_DIRECCION"]);
            setCLI_EDI_DIRECCION_DESPACHO(data["CLIENTE_DIRECCION_DESPACHO"]);
            setCLI_EDI_CORREO(data["CLIENTE_EMAIL"]);
            setCLI_EDI_TELEFONO(data["CLIENTE_TELEFONO"]);
            setCLI_EDI_PROVINCIA(data["CLIENTE_PROVINCIA_ID"]);
            setprov_select(data["CLIENTE_PROVINCIA_NOMBRE"]);
            setprov_id_select(data["CLIENTE_PROVINCIA_ID"]);
            setCLI_EDI_CLIENTE_ID(data["ID"]);
            setCLI_EDI_CIUDADES(data["CLIENTE_CIUDAD"]);
            if (data["CLIENTE_PROVINCIA_ID"] != null) {
                Cambiar_Ciudad(data["CLIENTE_PROVINCIA_ID"]);
            }

        });
        $('#CLI_TABLA_CLIENTES').on('click', 'td.btn_activar', function (respuesta) {
            var data = TABLA_.row(this).data();
            
            data.OPERACION = 1;
            ActivarDesact_Cliente(data);

        });
        $('#CLI_TABLA_CLIENTES').on('click', 'td.btn_desactivar', function (respuesta) {
            var data = TABLA_.row(this).data();
            
            data.OPERACION = 0;
            ActivarDesact_Cliente(data);
        });
    }

    function Cargar_Provincias() {
        setVisible_n(true)
        setciudades([])
        setSelectedValue("")
    }

    function Cambiar_Ciudad(value) {
        // setSelectedValue(event.target.value);
        let pr = $("#CLI_PROVINCIA").val();
        let array_ciudades = ajax.Ciudades(value);
        
        setciudades(array_ciudades)
    }

    //********* GUARDAR */

    function Guardar_Clientes() {
        let CLI_RUC = $("#CLI_RUC").val()
        let CLI_RAZON = $("#CLI_RAZON").val()
        let CLI_NOMBRE = $("#CLI_NOMBRE").val()
        let CLI_PROVINCIA = prov_select;
        // let CLI_PROVINCIA = $("#CLI_PROVINCIA option:selected").text();
        let CLI_PROVINCIA_ID = prov_id_select;
        // let CLI_PROVINCIA_ID = $("#CLI_PROVINCIA").val()
        let CLI_CIUDADES = $("#CLI_CIUDADES").val()
        let CLI_DIRECCION = $("#CLI_DIRECCION").val()
        let CLI_DIRECCION_DESPACHO = $("#CLI_DIRECCION_DESPACHO").val();
        let CLI_CORREO = $("#CLI_CORREO").val()
        let CLI_TELEFONO = $("#CLI_TELEFONO").val()

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
                CLI_DIRECCION_DESPACHO: CLI_DIRECCION_DESPACHO,
                CLI_CORREO: CLI_CORREO,
                CLI_TELEFONO: CLI_TELEFONO,
            }
            

            if ((CLI_RUC.trim()).length < 10 || (CLI_RUC.trim()).length == 11 || (CLI_RUC.trim()).length == 12 || (CLI_RUC.trim()).length > 13) {
                ajax.Mensaje("CEDULA / RUC DEBEN TENER 10 o 13 DIGITOS", "Por favor corregir", "error");
            } else {
                let url = URL + "Nuevo_Cliente"
                ajax.AjaxSendReceiveData(url, param, function (x) {
                    
                    if (x[0] == true) {
                        ajax.Mensaje(x[1], "", x[2]);
                        if (x[2] == "success") {
                            setVisible_n(false);
                            Cargar_Clientes();
                        }
                    } else {
                        ajax.Mensaje(x[1], "", x[2]);
                    }
                })
            }
        }
    }

    //*** ACTUALIZAR ****/
    function Actualizar_Cliente() {
        let CLI_RUC = $("#CLI_EDI_RUC").val()
        let CLI_RAZON = $("#CLI_EDI_RAZON").val()
        let CLI_NOMBRE = $("#CLI_EDI_NOMBRE").val()
        let CLI_PROVINCIA = prov_select;
        // let CLI_PROVINCIA = $("#CLI_PROVINCIA option:selected").text();
        let CLI_PROVINCIA_ID = prov_id_select;
        // let CLI_PROVINCIA_ID = $("#CLI_PROVINCIA").val()
        let CLI_CIUDADES = $("#CLI_EDI_CIUDADES").val()
        let CLI_DIRECCION = $("#CLI_EDI_DIRECCION").val()
        let CLI_DIRECCION_DESPACHO = $("#CLI_EDI_DIRECCION_DES").val();
        let CLI_CORREO = $("#CLI_EDI_CORREO").val()
        let CLI_TELEFONO = $("#CLI_EDI_TELEFONO").val()

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
                CLI_DIRECCION_DESPACHO: CLI_DIRECCION_DESPACHO,
                CLI_CORREO: CLI_CORREO,
                CLI_TELEFONO: CLI_TELEFONO,
                CLI_ID: CLI_EDI_CLIENTE_ID
            }
            

            if ((CLI_RUC.trim()).length < 10 || (CLI_RUC.trim()).length == 11 || (CLI_RUC.trim()).length == 12 || (CLI_RUC.trim()).length > 13) {
                ajax.Mensaje("CEDULA / RUC DEBEN TENER 10 o 13 DIGITOS", "Por favor corregir", "error");
            } else {
                let url = URL + "Actualizar_Cliente"
                ajax.AjaxSendReceiveData(url, param, function (x) {
                    
                    if (x[0] == true) {
                        ajax.Mensaje(x[1], "", x[2]);
                        if (x[2] == "success") {
                            setVisible_e(false);
                            Cargar_Clientes();
                        }
                    } else {
                        ajax.Mensaje(x[1], "", x[2]);
                    }
                })
            }
        }
    }
    //****** ACTIVAR DESACTIVAR*/
    function ActivarDesact_Cliente(data) {
        // 
        let url = 'clientes/ActivarDesact_Cliente'
        ajax.AjaxSendReceiveData(url, data, function (x) {
            
            if (x[0] == 1) {
                ajax.Mensaje(x[1], "", "success");
                Cargar_Clientes();
            } else {
                ajax.Mensaje(x[1].toString(), "", "error");
            }
        });
    }

    function Validar_Input() {

        $("#CLI_RUC").on({
            "focus": function (event) {
                $(event.target).select();
            },
            "keyup": function (event) {
                $(event.target).val(function (index, value) {
                    return value.replace(/\D/g, "")
                });
            }
        });
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <h3>Fichero de Clientes</h3>
                        {/* <div className='card-toolbar'>
                            <button onClick={() => Cargar_Provincias()} className='btn btn-success text-light fw-bold'>Nuevo +</button>
                        </div> */}
                    </CCardHeader>
                    <CCardBody>
                        <div className='col-12 mt-5'>
                            <div className='table-responsive' id='CLI_TABLA_CLIENTES_SECC'>
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
                            <input onKeyUp={Validar_Input} id='CLI_RUC' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
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
                            <input id='CLI_NOMBRE' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="required fs-6 fw-semibold mb-2">Provincia</label>
                                <Select options={provincias}
                                    onChange={(items) => {
                                        setprov_select(items.label);
                                        setprov_id_select(items.value);
                                        Cambiar_Ciudad(items.value);
                                    }}
                                />
                                {/* <select value={selectedValue} className='form-select' id='CLI_PROVINCIA' onChange={Cambiar_Ciudad}>
                                    <option value="">Seleccione</option>
                                    {provincias.map((option, index) => (
                                        <option key={index} value={option.id}>{option.nombre}</option>
                                    ))}
                                </select> */}
                            </div>
                            <div className="col-md-6 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Ciudad</label>
                                <select className='form-select' id='CLI_CIUDADES' name="" >
                                    {/* <option value="">Seleccione</option> */}
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
                            <input id='CLI_DIRECCION' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Direccion Despacho</span>
                            </label>
                            <input id='CLI_DIRECCION_DESPACHO' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="required fs-6 fw-semibold mb-2">Correo</label>
                                <input id='CLI_CORREO' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />

                            </div>
                            <div className="col-md-6 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Telefono</label>
                                <input id='CLI_TELEFONO' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />

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
                            <input defaultValue={CLI_EDI_RUC} id='CLI_EDI_RUC' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Razon social </span>
                            </label>
                            <input defaultValue={CLI_EDI_RAZON} id='CLI_EDI_RAZON' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
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
                                <Select options={provincias}
                                    defaultValue={provincias.find(option => option.value === CLI_EDI_PROVINCIA)}
                                    onChange={(items) => {
                                        setprov_select(items.label);
                                        setprov_id_select(items.value);
                                        Cambiar_Ciudad(items.value);
                                    }}
                                />
                            </div>
                            <div className="col-md-6 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Ciudad</label>
                                <select defaultValue={CLI_EDI_CIUDADES} className='form-select' id='CLI_EDI_CIUDADES' name="" >

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
                            <input defaultValue={CLI_EDI_DIRECCION} id='CLI_EDI_DIRECCION' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Direccion de despacho</span>
                            </label>
                            <input defaultValue={CLI_EDI_DIRECCION_DESPACHO} id='CLI_EDI_DIRECCION_DES' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="required fs-6 fw-semibold mb-2">Correo</label>
                                <input defaultValue={CLI_EDI_CORREO} id='CLI_EDI_CORREO' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                            </div>
                            <div className="col-md-6 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Telefono</label>
                                <input defaultValue={CLI_EDI_TELEFONO} id='CLI_EDI_TELEFONO' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                            </div>
                        </div>
                        <div></div>
                    </div>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible_e(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary" onClick={Actualizar_Cliente} >Guardar Cambios</CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}
export default Clientes
