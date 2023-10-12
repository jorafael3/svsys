import React, { useEffect, useRef, useState } from 'react';
import {
    CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter
} from '@coreui/react'
import axios from 'axios';
import $, { param } from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import BarcodeReader from '../../../components/BarcodeReader';
import * as ajax from "../../../config/config";
import * as usu from "../../../funciones/usuarios/usuarios";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Swal from 'sweetalert2';
import Select from 'react-select'


var nodes = [];
var CHECKEDS;
var MENUS_ACTIVOS = []
var MENUS_EXPANDIDOS = []

class Tree extends React.Component {
    state = {
        checked: MENUS_ACTIVOS,
        expanded: MENUS_EXPANDIDOS
    };
    onCheck = checked => {
        console.log(checked);
        CHECKEDS = checked;
        this.setState({ checked });
    };
    onExpand = expanded => {
        this.setState({ expanded });
    };
    render() {
        const { checked, expanded } = this.state;
        CHECKEDS = this.state.checked
        // console.log('this.state: ', this.state.checked);
        return (
            <CheckboxTree
                nodes={nodes}
                checked={checked}
                expanded={expanded}
                icons={{
                    check: <span className="rct-icon rct-icon-check" />,
                    uncheck: <span className="rct-icon rct-icon-uncheck" />,
                    halfCheck: <span className="rct-icon rct-icon-half-check" />,
                    expandClose: <span className="rct-icon rct-icon-expand-close" />,
                    expandOpen: <span className="rct-icon rct-icon-expand-open" />,
                    expandAll: <span className="rct-icon rct-icon-expand-all" />,
                    collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                    parentClose: <span className="rct-icon rct-icon-parent-close" />,
                    parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                    leaf: <span className="rct-icon rct-icon-leaf" />,
                }}
                onCheck={this.onCheck}
                onExpand={this.onExpand}
            />
        );
    }
}

function Mensaje(t1, t2, icon) {
    Swal.fire({
        title: t1,
        text: t2,
        icon: icon,
        // iconUrl: 'ruta/a/mi/icono.png'
    });
}


function Usuarios() {
    const [visible, setVisible] = useState(false);
    const [visible_n, setVisible_n] = useState(false);
    const [visible_a, setVisible_a] = useState(false);
    const [Nombre_usuario, setNombre_usuario] = useState('');
    const [usuario_id, setusuario_id] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);

    // NUEVO_USUARIO
    const [departamentos, setdepartamentos] = useState([]);
    const [dept_select, setdept_select] = useState("");
    const [sucursales, setsucursales] = useState([]);
    const [suc_select, setsuc_select] = useState("");


    useEffect(() => {
        Cargar_Usuarios();
        usu.Cargar_Departamentos(function (x) {
            setdepartamentos(x);
        });
        usu.Cargar_Sucursales(function (x) {
            console.log('x: ', x);
            setsucursales(x);
        });
    }, []);

    function Cargar_Usuarios() {
        let url = 'usuarios/Cargar_Usuarios';
        let param = {
            data1: "hola",
            data2: "asdasd"
        }
        ajax.AjaxSendReceiveData(url, param, function (res) {
            console.log('res: ', res);
            Tabla_usuarios(res);
        });
    }

    function Tabla_usuarios(datos) {
        $('#US_TABLA_USUARIOS').empty();
        if ($.fn.dataTable.isDataTable('#US_TABLA_USUARIOS')) {
            $('#US_TABLA_USUARIOS').DataTable().destroy();
            $('#US_TABLA_USUARIOS').empty();
        }
        let TABLA_ = $('#US_TABLA_USUARIOS').DataTable({
            destroy: true,
            data: datos,
            dom: 'Brtip',
            buttons: [
                {
                    text: `<span className"fw-bold"><i class="bi bi-arrow-clockwise"></i></span>`,
                    className: 'btn btn-info',
                    action: function (e, dt, node, config) {
                        Cargar_Usuarios();
                    },
                },
                // {
                //     extend: 'excel',
                //     text: '<i className="fa fa-file-excel"></i> Excel',
                //     className: 'btn btn-primary',
                // }
            ],
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

            let url = 'usuarios/Consultar_Accesos';
            let param = {
                USUARIO_ID: data["Usuario_ID"],
            }
            setusuario_id(data["Usuario_ID"]);
            ajax.AjaxSendReceiveData(url, param, function (x) {
                console.log('x: ', x);
                nodes = x[0][0];
                MENUS_EXPANDIDOS = x[0][1]
                MENUS_ACTIVOS = x[0][2]
                setVisible(false)
                setVisible_a(true)
                // nodes = [
                //     {
                //         value: 'aaa',
                //         label: "Mars",
                //         // checked:true
                //     },
                //     {
                //         value: 'mars',
                //         label: "Mars",
                //         children: [
                //             { value: '1', label: "Phobos" },
                //             { value: '2', label: "Deimos" },
                //         ],
                //     },
                //     {
                //         value: 'tierra',
                //         label: "Earth",
                //         children: [
                //             {
                //                 value: 'USA',
                //                 label: "USA",
                //                 children: [
                //                     { value: 'newyork', label: "New York" },
                //                     { value: 'sanfran', label: "San Francisco" },
                //                 ],
                //             },
                //             { value: 'China', label: "China" },
                //         ],
                //     }
                // ]
                setNombre_usuario(data["Usuario"])
            })
            // setNombreCliente(data["CLIENTE"]);
            // setFecha(data["FECHA_ENTREGA"]);
        })
    }

    function Nuevo_usuario() {
        console.log("asdasd");
        let US_USUARIO = $("#US_USUARIO").val();
        let US_NOMBRE = $("#US_NOMBRE").val();
        let US_EMAIL = $("#US_EMAIL").val();
        let US_PASS = $("#US_PASS").val();
        let US_CONF_PASS = $("#US_CONF_PASS").val();
        console.log('US_USUARIO: ', dept_select);
        // setVisible_n(true);
    }

    function Borrar_Accesos() {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Se eliminaran todos los accesos a este usuario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
        }).then((result) => {
            if (result.isConfirmed) {
                let param = {
                    ACCESOS: 0,
                    USUARIO_ID: usuario_id
                }
                console.log('param: ', param);
                let url = 'usuarios/Guardar_Accesos';
                ajax.AjaxSendReceiveData(url, param, function (x) {
                    console.log('x: ', x);
                    if (x == true) {
                        Mensaje("Accesos Borrados", "para ver los cambios solicitar refrescar la pagina", "success");
                    } else {
                        Mensaje("Error al guardar", "", "error");
                    }
                })
            }
        })

    }

    function Guardar_Accesos() {
        let param = {
            ACCESOS: CHECKEDS.length == 0 ? 0 : CHECKEDS,
            USUARIO_ID: usuario_id
        }
        console.log('param: ', param);
        let url = 'usuarios/Guardar_Accesos';

        ajax.AjaxSendReceiveData(url, param, function (x) {
            console.log('x: ', x);
            if (x == true) {
                Mensaje("Accesos guardados", "para ver los cambios solicitar refrescar la pagina", "success");
            } else {
                Mensaje("Error al guardar", "", "error");
            }
        })
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <h3>Usuarios</h3>
                        <div className='card-toolbar'>
                            <button onClick={() => {
                                setVisible_n(true);
                                setdept_select("");
                                setsuc_select("");
                            }} className='btn btn-success text-light fw-bold'>Nuevo +</button>
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
            <CModal size="lg" id='AD_MODAL_NUEVO' backdrop="static" visible={visible_n} onClose={() => {
                setVisible_n(false)
            }
            }>
                <CModalHeader>
                    <CModalTitle></CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                        <div className="mb-13 text-center">
                            <h3 className="mb-3">Nuevo Usuario</h3>
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
                                <label className="required fs-6 fw-semibold mb-2">Departamento</label>
                                <Select options={departamentos}
                                    onChange={(items) => setdept_select(items.value)}
                                />
                                {/* <select id='US_DEPT' className='form-select'>

                                </select> */}
                            </div>
                            <div className="col-md-6 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Sucursal</label>
                                <Select options={sucursales}
                                    onChange={(items) => setsuc_select(items.value)}
                                />
                            </div>
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
                    <CButton color="primary" onClick={Nuevo_usuario}>Guardar</CButton>
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
                    <div className='row p-2'>
                        <div className='col-6'>
                            <h3>Usuario</h3>
                            <h4 className='text-muted mt-3 mb-3'>{Nombre_usuario}</h4>

                        </div>
                        <div className='col-6'>
                            <Tree>
                            </Tree>
                        </div>
                    </div>

                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" className='text-light fs-5 fw-bold' onClick={Borrar_Accesos}>Borrar todos los accesos <i className="bi bi-trash-fill"></i></CButton>
                    <CButton color="primary" className='text-light fs-5 fw-bold' onClick={Guardar_Accesos}>Guardar Cambios <i className="bi bi-box-arrow-down"></i></CButton>
                    <CButton color="info" className='text-light fs-5 fw-bold' onClick={() => setVisible_a(false)}>
                        Cerrar
                    </CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}

export default Usuarios
