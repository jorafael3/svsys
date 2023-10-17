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


function Choferes() {
    const [visible_n, setVisible_n] = useState(false);
    const [visible_e, setVisible_e] = useState(false);
    const [usuarios, setusuarios] = useState([]);

    const [usuario_id, setusuario_id] = useState("");
    const [placa, setplaca] = useState("");


    useEffect(() => {
        Cargar_Usuarios();
        Cargar_Choferes();
    }, []);

    function Cargar_Choferes() {
        let url = "choferes/Cargar_Choferes";
        console.log('url: ', url);
        ajax.AjaxSendReceiveData(url, [], function (x) {
            console.log('x: ', x);
            Tabla_Choferes(x);
        })
    }

    function Cargar_Usuarios() {
        let url = "choferes/Cargar_Usuarios";
        console.log('url: ', url);
        ajax.AjaxSendReceiveData(url, [], function (x) {
            console.log('x: ', x);
            setusuarios(x);
        })
    }

    function Tabla_Choferes(datos) {
        $('#CH_TABLA_CHOFERES_SECC').empty();
        if ($.fn.dataTable.isDataTable('#US_TABLA_USUARIOS')) {
            $('#CH_TABLA_CHOFERES').DataTable().destroy();
            $('#CH_TABLA_CHOFERES_SECC').empty();
        }

        let tabla = `
        <table id='CH_TABLA_CHOFERES' class='table display table-striped'>
        </table>
        `;
        $('#CH_TABLA_CHOFERES_SECC').append(tabla);

        let TABLA_ = $('#CH_TABLA_CHOFERES').DataTable({
            destroy: true,
            data: datos,
            dom: 'Bfrtip',
            buttons: [
                {
                    text: `<span className"fw-bold"><i class="bi bi-arrow-clockwise fs-4"></i></span>`,
                    className: 'btn btn-info',
                    action: function (e, dt, node, config) {
                        Cargar_Choferes();
                    },
                },
                {
                    text: `<span class"fw-bold"><i class="bi bi-person-plus-fill fs-4"></i></span>`,
                    className: 'btn btn-success',
                    action: function (e, dt, node, config) {
                        setVisible_n(true);
                        setusuario_id("");
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
                data: "Nombre",
                title: "Nombre",
            },
            {
                data: "placa",
                title: "PLACA"
            },
            {
                data: "Estado",
                title: "Estado",
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

                if (data["Estado"] == 1) {
                    $('td', row).eq(4).removeClass("btn_activar");
                    $('td', row).eq(4).html("");
                }
                if (data["Estado"] == 0) {
                    $('td', row).eq(3).removeClass("btn_editar");
                    $('td', row).eq(3).html("");
                    $('td', row).eq(5).removeClass("btn_desactivar");
                    $('td', row).eq(5).html("");
                }


            },
        });
        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 500);

        $('#CH_TABLA_CHOFERES').on('click', 'td.btn_activar', function (respuesta) {
            var data = TABLA_.row(this).data();
            console.log('data: ', data);
            data.OPERACION = 1;
            ActivarDesact_Chofer(data);

        });
        $('#CH_TABLA_CHOFERES').on('click', 'td.btn_desactivar', function (respuesta) {
            var data = TABLA_.row(this).data();
            console.log('data: ', data);
            data.OPERACION = 0;
            ActivarDesact_Chofer(data);
        });

        $('#CH_TABLA_CHOFERES').on('click', 'td.btn_editar', function (respuesta) {
            var data = TABLA_.row(this).data();
            console.log('data: ', data);
            setplaca(data["placa"]);
            setusuario_id(data["ID"]);
            setVisible_e(true);
            // data.OPERACION = 0;
            // ActivarDesact_Chofer(data);
        });
    }

    function ActivarDesact_Chofer(data) {
        // console.log('data: ', data);
        let url = 'choferes/ActivarDesact_Chofer'
        ajax.AjaxSendReceiveData(url, data, function (x) {
            console.log('x: ', x);
            if (x[0] == 1) {
                ajax.Mensaje(x[1], "", "success");
                Cargar_Choferes();
            } else {
                ajax.Mensaje(x[1].toString(), "", "error");
            }
        });
    }

    function Guardar_Chofer() {
        let USUARIO_ID = usuario_id;
        let PLACA = $("#CH_PLACA").val();

        if (USUARIO_ID == "") {
            ajax.Mensaje("SELECCION UN USUARIO", "", "error");
        } else if (PLACA == "") {
            ajax.Mensaje("INGRESE NUMERO DE PLACA", "", "error");
        } else {

            if (PLACA.includes("-")) {
                let p1 = PLACA.split("-")[0];
                let p2 = PLACA.split("-")[1];
                if (p1.length == 3) {
                    if (p2.length == 3 || p2.length == 4) {
                        let param = {
                            ID: USUARIO_ID,
                            PLACA: PLACA,
                        }
                        console.log('param: ', param);

                        let url = "choferes/Nuevo_Chofer";
                        ajax.AjaxSendReceiveData(url, param, function (x) {
                            console.log('x: ', x);
                            if (x[0] == 1) {
                                ajax.Mensaje(x[1], "", "success");
                                setVisible_n(false);
                                Cargar_Choferes();
                            } else {
                                ajax.Mensaje(x[1], "", "error");
                            }
                        })
                    } else {
                        ajax.Mensaje("FORMATO DE PLACA NO VALIDO", "(ABC-123) o (ABC-1234) ", "error");
                    }
                } else {

                    ajax.Mensaje("FORMATO DE PLACA NO VALIDO", "(ABC-123) o (ABC-1234) ", "error");
                }
            } else {
                ajax.Mensaje("FORMATO DE PLACA NO VALIDO", "(ABC-123) o (ABC-1234) ", "error");
            }
        }
    }

    function Actualizar_Chofer() {
        let USUARIO_ID = usuario_id;
        let PLACA = $("#CH_PLACA_EDI").val();
        console.log('PLACA: ', PLACA);
        if (PLACA == "") {
            ajax.Mensaje("INGRESE NUMERO DE PLACA", "", "error");
        } else {

            if (PLACA.includes("-")) {
                let p1 = PLACA.split("-")[0];
                let p2 = PLACA.split("-")[1];
                if (p1.length == 3) {
                    if (p2.length == 3 || p2.length == 4) {
                        let param = {
                            ID: USUARIO_ID,
                            PLACA: PLACA,
                        }
                        console.log('param: ', param);
                        let url = "choferes/Actualizar_Chofer";
                        ajax.AjaxSendReceiveData(url, param, function (x) {
                            console.log('x: ', x);
                            if (x[0] == 1) {
                                ajax.Mensaje(x[1], "", "success");
                                setVisible_e(false);
                                Cargar_Choferes();
                            } else {
                                ajax.Mensaje(x[1], "", "error");
                            }
                        })
                    } else {
                        ajax.Mensaje("FORMATO DE PLACA NO VALIDO", "(ABC-123) o (ABC-1234) ", "error");
                    }
                } else {
                    ajax.Mensaje("FORMATO DE PLACA NO VALIDO", "(ABC-123) o (ABC-1234) ", "error");
                }
            } else {
                ajax.Mensaje("FORMATO DE PLACA NO VALIDO", "(ABC-123) o (ABC-1234) ", "error");
            }
        }
    }


    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <h3>Choferes Registrados</h3>
                        {/* <div className='card-toolbar'>
                            <button onClick={() => Cargar_Provincias()} className='btn btn-success text-light fw-bold'>Nuevo +</button>
                        </div> */}
                    </CCardHeader>
                    <CCardBody>
                        <div className='col-12 mt-5'>
                            <div className='table-responsive' id='CH_TABLA_CHOFERES_SECC'>
                                <table id='CH_TABLA_CHOFERES' className='table table-striped'>

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
                            <h1 className="mb-3">Nuevo Chofer</h1>

                        </div>

                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Usuario a asignar como chofer</span>
                            </label>
                            <Select options={usuarios}
                                onChange={(items) => {
                                    setusuario_id(items.value);
                                    // setprov_id_select(items.value);
                                    // Cambiar_Ciudad(items.value);
                                }}
                            />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Placa (ABC-1234)</span>
                            </label>
                            <input id='CH_PLACA' type="text" className="form-control form-control-solid" placeholder="ABC-1234" name="target_title" />
                        </div>

                        <div></div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible_n(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary" onClick={Guardar_Chofer} >Guardar Cambios</CButton>
                </CModalFooter>
            </CModal>
            <CModal size="lg" id='AD_MODAL_EDITAR' backdrop="static" visible={visible_e} onClose={() => setVisible_e(false)}>
                <CModalHeader>
                    <CModalTitle>Choferes</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                        <div className="mb-13 text-center">
                            <h1 className="mb-3">Editar Chofer</h1>

                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Placa (ABC-1234)</span>
                            </label>
                            <input defaultValue={placa} id='CH_PLACA_EDI' type="text" className="form-control form-control-solid" placeholder="ABC-1234" name="target_title" />
                        </div>

                        <div></div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible_e(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary" onClick={Actualizar_Chofer} >Guardar Cambios</CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )

}
export default Choferes
