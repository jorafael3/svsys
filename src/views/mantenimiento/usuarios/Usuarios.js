import React, { useEffect, useRef, useState } from 'react';
import {
    CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter
} from '@coreui/react'
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BarcodeReader from '../../../components/BarcodeReader';

function Usuarios() {
    const [visible, setVisible] = useState(false);
    const [visible_n, setVisible_n] = useState(false);
    const [visible_a, setVisible_a] = useState(false);
    const [nombreCliente, setNombreCliente] = useState('');
    const [fecha, setFecha] = useState('');
    useEffect(() => {
        Cargar_Usuarios();
    }, []);

    function Cargar_Usuarios() {
        let url = 'http://10.5.0.238:8080/svsysback/usuarios/Cargar_Usuarios'

        let param = {
            data1: "hola",
            data2: "asdasd"
        }
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: {
                param
            },
            success: function (data) {
                console.log('Data:', data);
                Tabla_usuarios(data)
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }

    function Tabla_usuarios(datos) {
        $('#US_TABLA_USUARIOS').empty();
        let TABLA_ = $('#US_TABLA_USUARIOS').DataTable({
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
                data: "Usuario",
                title: "Usuario",
            },
            {
                data: "Nombre",
                title: "Nombre"
            },
            {
                data: "Estado",
                title: "Estado",
                render: function (x) {
                    if (x == 1) {
                        x = `
                        <span className="text-success">Activo</span>
                        `
                    } else if (x == 0) {
                        x = `
                        <span className="text-danger">Inactivo</span>
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
                title: "Desactivar",
                className: "btn_recibir text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_recibir btn btn-danger text-light"><i class="bi bi-eraser"></i></button>',
                orderable: "",
                width: 20
            },
            {
                data: null,
                title: "Accesos",
                className: "btn_accesos text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_accesos btn btn-success text-light"><i class="bi bi-eraser"></i></button>',
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
        $('#US_TABLA_USUARIOS').on('click', 'td.btn_editar', function (respuesta) {
            var data = TABLA_.row(this).data();
            console.log('data: ', data);
            setVisible(true)
            // setNombreCliente(data["CLIENTE"]);
            // setFecha(data["FECHA_ENTREGA"]);
        })
        $('#US_TABLA_USUARIOS').on('click', 'td.btn_accesos', function (respuesta) {
            var data = TABLA_.row(this).data();
            console.log('data: ', data);
            setVisible(false)
            setVisible_a(true)
            // setNombreCliente(data["CLIENTE"]);
            // setFecha(data["FECHA_ENTREGA"]);
        })
    }

    function Nuevo_usuario(){
        console.log("asdasd");
        setVisible_n(true);
    }
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <h3>Usuarios</h3>
                        <div className='card-toolbar'>
                            <button onClick={() => setVisible_n(true)} className='btn btn-success text-light fw-bold'>Nuevo +</button>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <div className='col-12 mt-5'>
                            <div className='table-responsive'>
                                <table id='US_TABLA_USUARIOS' className='table table-striped'>

                                </table>
                            </div>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
            <CModal size="lg" id='AD_MODAL_DETALLES' backdrop="static" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>DETALLES</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                        <div className="mb-13 text-center">
                            <h1 className="mb-3">Editar Usuario</h1>
                            <div className="text-muted fw-semibold fs-5">If you need more info, please check
                                <a href="#" className="fw-bold link-primary">Project Guidelines</a>.
                            </div>
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Usuario *</span>
                            </label>
                            <input id='US_USUARIO' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Nombre *</span>
                            </label>
                            <input id='US_NOMBRE' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Email</span>
                            </label>
                            <input id='US_EMAIL' type="email" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="required fs-6 fw-semibold mb-2">Contraseña *</label>
                                <input id='US_PASS' type="password" className="form-control form-control-solid" placeholder="" name="target_title" />

                            </div>
                            <div className="col-md-6 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Confirmar contraseña *</label>
                                <input id='US_CONF_PASS' type="password" className="form-control form-control-solid" placeholder="" name="target_title" />

                            </div>
                        </div>

                        <div></div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary">Guardar Cambios</CButton>
                </CModalFooter>
            </CModal>
            <CModal size="lg" id='AD_MODAL_NUEVO' backdrop="static" visible={visible_n} onClose={() => setVisible_n(false)}>
                <CModalHeader>
                    <CModalTitle>DETALLES</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                        <div className="mb-13 text-center">
                            <h1 className="mb-3">Nuevo Usuario</h1>
                            
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Usuario *</span>
                            </label>
                            <input id='US_USUARIO' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Nombre *</span>
                            </label>
                            <input id='US_NOMBRE' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Email</span>
                            </label>
                            <input id='US_EMAIL' type="email" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>
                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="required fs-6 fw-semibold mb-2">Contraseña *</label>
                                <input id='US_PASS' type="password" className="form-control form-control-solid" placeholder="" name="target_title" />

                            </div>
                            <div className="col-md-6 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Confirmar contraseña *</label>
                                <input id='US_CONF_PASS' type="password" className="form-control form-control-solid" placeholder="" name="target_title" />

                            </div>
                        </div>

                        <div></div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible_n(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary">Guardar Cambios</CButton>
                </CModalFooter>
            </CModal>
            <CModal size="lg" id='AD_MODAL_ACCESOS' backdrop="static" visible={visible_a} onClose={() => setVisible_a(false)}>
                <CModalHeader>
                    <CModalTitle>DETALLES</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                        <div className="mb-13 text-center">
                            <h1 className="mb-3">Accesos Usuario</h1>
                        </div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible_a(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary">Guardar Cambios</CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}

export default Usuarios
