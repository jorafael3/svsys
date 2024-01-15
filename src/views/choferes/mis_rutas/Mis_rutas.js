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

var ID_RUTA_GEN = ""

function Mis_rutas() {

    const [visible_d, setvisible_d] = useState(false);
    const [visible_img, setvisible_img] = useState(false);


    const [USUARIO, setUSUARIO] = useState("");
    const [PLACA, setPLACA] = useState("");
    const [SECC_TABLA, setSECC_TABLA] = useState(true);
    const [SECC_TABLA_DETALLE, setSECC_TABLA_DETALLE] = useState(false);
    var d = sesion.GET_DATOS_SESION();




    function Cargar_Mis_Rutas() {
        setUSUARIO(d["Usuario"])
        setPLACA(d["PLACA"])


        let param = {
            USUARIO: d["Usuario_ID"]
        }


        let url = "misrutas/Cargar_Mis_Rutas"
        ajax.AjaxSendReceiveData(url, param, function (x) {


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
                setSECC_TABLA(false);
                setSECC_TABLA_DETALLE(true);
                ID_RUTA_GEN = (data["ID"]);
                Cargar_Mis_Rutas_Detalle(data["ID"])
            });
        })


    }


    const [D_ID, setD_ID] = useState("");
    const [D_ID_DT, setD_ID_DT] = useState("");
    const [D_GUIA, setD_GUIA] = useState("");
    const [D_CLIENTE, setD_CLIENTE] = useState("");
    const [D_DESTINO, setD_DESTINO] = useState("");
    const [D_PRODUCTO, setD_PRODUCTO] = useState("");
    const [D_CANTIDAD, setD_CANTIDAD] = useState("");
    const [D_BODEGA, setD_BODEGA] = useState("");
    const [D_PRODUCTO_F, setD_PRODUCTO_F] = useState("");
    const [D_CANTIDAD_F, setD_CANTIDAD_F] = useState("");


    function Cargar_Mis_Rutas_Detalle(data) {
        console.log('data: ', data);

        let param = {
            RUTA: data,
            USUARIO: d["Usuario_ID"]
        }


        let url = "misrutas/Cargar_Mis_Rutas_Detalle"
        ajax.AjaxSendReceiveData(url, param, function (x) {

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
                        </button><br>
                        <button type="button" class="btn_despacho btn btn-success text-light mt-1">
                            <i class="bi bi-check-circle-fill fs-5"></i>
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
                            <span  class="`+ (data["GUIA"] == "" ? "text-danger" : "") + `">` + (data["GUIA"] == "" ? "No Asiganda" : data["GUIA"]) + `</span> 
                        </div>
                        <span class="fs-6 text-muted">Cliente</span>
                        <div class="fs-6 `+ (data["CLIENTE_NOMBRE"] == null ? "text-danger" : "") + `">` + (data["CLIENTE_NOMBRE"] == null ? "SIN ASIGNAR" : data["CLIENTE_NOMBRE"]) + `</div>
                        <span class="fs-6 text-muted">Destino</span>
                        <div class="fs-6 `+ (data["CLIENTE_SUCURSAL"] == null ? "text-danger" : "") + `">` + (data["CLIENTE_SUCURSAL"] == null ? "SIN ASIGNAR" : data["CLIENTE_SUCURSAL"]) + `</div>
                        <span class="fs-6 text-muted">Producto</span>
                        <div class="fs-6 `+ (data["PRODUCTO_NOMBRE"] == null ? "text-danger" : "") + `">` + (data["PRODUCTO_NOMBRE"] == null ? "SIN ASIGNAR" : data["PRODUCTO_NOMBRE"]) + `</div>
                        <div class="small text-medium-emphasis">
                            <span class="fs-6">Cantidad</span> | `+ data["HOLCIM"] + `
                        </div>
                        <span class="fs-6 text-muted">Estado</span><br>
                        <span class="fs-6 `+ (data["despachado"] == 0 ? "text-danger" : "text-success") + `">
                            `+ (data["despachado"] == 0 ? "ENTREGA PENDIENTE" : "ENTREGADO") + `
                        </span>

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


                setD_ID(data["ID"]);
                setD_ID_DT(data["RUTA_DETALLE_ID"]);
                setD_GUIA(data["GUIA"]);
                setD_CLIENTE(data["CLIENTE_NOMBRE"]);
                setD_DESTINO(data["CLIENTE_SUCURSAL"]);
                setD_PRODUCTO(data["PRODUCTO_NOMBRE"]);
                setD_CANTIDAD(data["HOLCIM"]);
                setD_BODEGA(data["BODEGA"]);
                setD_PRODUCTO_F(data["FLETE_PRODUCTO"]);
                setD_CANTIDAD_F(data["FLETE_PRODUCTO_CANT"]);

                setvisible_d(true);
            });
            $('#Tabla_Rutas_detalle').on('click', '.btn_Asignar .btn_img', function () {
                var data = TABLA_.row($(this).closest('tr')).data();

                setD_ID(data["ID"]);
                setD_ID_DT(data["RUTA_DETALLE_ID"]);
                setvisible_img(true);

                setTimeout(() => {
                    Cargar_imagenes(data["ID"], data["RUTA_DETALLE_ID"]);
                }, 500);

            });

            $('#Tabla_Rutas_detalle').on('click', '.btn_Asignar .btn_despacho', function () {
                var data = TABLA_.row($(this).closest('tr')).data();
                console.log('data: ', data);

                if (data["despachado"] == 1) {
                    ajax.Mensaje("Pedido ya entregado", "", "info")
                } else {
                    let param = {
                        ID: data["RUTA_DETALLE_ID"],
                        CREADO: d["Usuario_ID"],
                    }
                    Swal.fire({
                        title: "Se marcara la orden como entregada, estas seguro!",
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: "Si, guardar",
                        denyButtonText: `Don't save`
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            let url = "misrutas/Actualizar_Despacho"
                            ajax.AjaxSendReceiveData(url, param, function (x) {
                                console.log('x: ', x);
                                if (x[0] == 1) {
                                    ajax.Mensaje("Orden despachada", "", "success");
                                    Cargar_Mis_Rutas_Detalle(ID_RUTA_GEN)
                                } else {
                                    ajax.Mensaje("Error al Guardar", "", "error");
                                }
                            });
                        }
                    });
                }


            });
        });

    }

    function Guardar_Imagen() {
        let archivoInput = document.getElementById('DOCUMENTO');
        let archivo = archivoInput.files[0];

        if (archivo == undefined) {
            ajax.Mensaje("Debe seleccionar una imagen", "", "error");
        } else {
            let EXT = ["PNG", "JPG", "JPEG"];
            let extension = archivo.type.split("/")[1];
            if (EXT.includes(extension.toUpperCase())) {
                let nombreArchivo = D_ID + "_" + moment().format("YYYYMMDDhhmmss") + "." + extension;
                archivo = renameFile(archivo, nombreArchivo);


                convertToBase64(archivo, function (base64String) {
                    // 
                    let param = {
                        ID: D_ID,
                        ID_DT: D_ID_DT,
                        IMG: base64String,
                        IMG_NOMBRE: nombreArchivo,
                        TIPO: extension.toUpperCase(),
                        CREADO: d["Usuario_ID"]
                    }


                    let url = "misrutas/Guardar_Documento"
                    ajax.AjaxSendReceiveData(url, param, function (x) {
                        console.log('x: ', x);


                        if (x[0] == 1) {
                            ajax.Mensaje("Imagen subida", "", "success");
                            Cargar_imagenes(D_ID, D_ID_DT);
                        } else {

                            ajax.Mensaje("Error al subir", x[1], "error");
                        }

                    })

                });
            } else {
                ajax.Mensaje("Formato no permitido", "", "error");
            }

        }



    }

    function Cargar_imagenes(D_ID, D_ID_DT) {
        let param = {
            ID: D_ID,
            D_ID_DT: D_ID_DT,
        }

        const host = window.location.hostname;
        const port = window.location.port;
        const protocol = window.location.protocol;

        let url = "misrutas/Cargar_Documento"
        ajax.AjaxSendReceiveData(url, param, function (x) {

            if (x[0] == 1) {
                let DATA = x[1];

                $('#SECC_TABLA_DOCUMENTOS').empty();
                if ($.fn.dataTable.isDataTable('#TABLA_DOCUMENTOS')) {
                    $('#TABLA_DOCUMENTOS').DataTable().destroy();
                    $('#SECC_TABLA_DOCUMENTOS').empty();
                }
                let tabla = `
                    <table id='TABLA_DOCUMENTOS' class=' display table table-striped'>
                    </table>
                    `;
                $('#SECC_TABLA_DOCUMENTOS').append(tabla);
                let TABLA_ = $('#TABLA_DOCUMENTOS').DataTable({
                    destroy: true,
                    data: DATA,
                    dom: 'rtip',
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
                        data: "nombre",
                        title: "nombre",
                    },
                    {
                        data: null,
                        title: "",
                        className: "btn_Asignar text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                        defaultContent: '<button type="button" class="btn_Asignar btn btn-danger text-light"><i class="bi bi-trash fs-5 fw-bold"></i></button>',
                        orderable: "",
                        width: 20
                    },
                    ],
                    "createdRow": function (row, data, index) {
                        $('td', row).eq(0).addClass("fw-bold fs-5");
                        $('td', row).eq(1).addClass("fw-bold fs-6 ");
                        $('td', row).eq(2).addClass("fw-bold fs-6 ");

                        let fir = protocol + "//" + host + "/" + "svsysback/recursos/guias_subidas/"

                        let link = fir + data["nombre"];

                        let d = `
                        <div class="">
                            <img style="height:200px;width:200px" class="" src="`+ link + `" alt="a">
                        </div>
                        `;
                        $('td', row).eq(0).html(d);
                    },
                });
                setTimeout(function () {
                    $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
                }, 500);

                $('#TABLA_DOCUMENTOS').on('click', 'td.btn_Asignar', function (respuesta) {
                    var data = TABLA_.row(this).data();


                    let param = {
                        ID: data["ID"]
                    }
                    let url = "misrutas/Eliminar_Documento"
                    ajax.AjaxSendReceiveData(url, param, function (x) {
                        if (x[0] == 1) {
                            ajax.Mensaje("Imagen Eliminada", "", "success");
                            Cargar_imagenes(D_ID, D_ID_DT);
                        } else {
                            ajax.Mensaje("Error al eliminar", "", "error");
                        }
                    })

                });
            }

        })
    }

    function renameFile(originalFile, newName) {
        return new File([originalFile], newName, {
            type: originalFile.type,
        });
    }

    function convertToBase64(file, callback) {
        let reader = new FileReader();
        reader.onloadend = function () {
            // The result property contains the base64 encoded string
            let base64String = reader.result.split(',')[1];
            callback(base64String);
        };
        reader.readAsDataURL(file);
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

            <CModal size="lg" id='AD_MODAL_DETALLES' backdrop="static" visible={visible_d} onClose={() => setvisible_d(false)}>
                <CModalHeader>
                    <CModalTitle>Detalles</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">


                        <span className="fs-6 text-muted fw-bold">Guia</span>
                        <div className={D_GUIA == "" ? "fs-6 text-danger" : "fs-6"}>{D_GUIA == "" ? "SIN ASIGNAR" : D_GUIA}</div>
                        <span className="fs-6 text-muted fw-bold">Cliente</span>
                        <div className="fs-6 ">{D_CLIENTE}</div>
                        <span className="fs-6 text-muted fw-bold">Destino</span>
                        <div className={D_DESTINO == null ? "fs-6 text-danger" : "fs-6"}>{D_DESTINO == null ? "SIN ASIGNAR" : D_DESTINO}</div>
                        <span className="fs-6 text-muted fw-bold">Producto</span>
                        <div className={D_PRODUCTO == null ? "fs-6 text-danger" : "fs-6"}>{D_PRODUCTO == null ? "SIN ASIGNAR" : D_PRODUCTO}</div>
                        <div className="small text-medium-emphasis">
                            <span className="fs-6">Cantidad</span> | {D_CANTIDAD}
                        </div>
                        <div className="small text-medium-emphasis">
                            <span className="fs-6">bodega</span> | {D_BODEGA}
                        </div>
                        <span className="fs-6 text-muted fw-bold">Flete Producto</span>
                        <div className="fs-6 ">{D_PRODUCTO_F}</div>
                        <div className="small text-medium-emphasis">
                            <span className="fs-6">Flete Cantidad</span> | {D_CANTIDAD_F}
                        </div>
                    </div >

                </CModalBody >
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setvisible_d(false)}>
                        Cerrar
                    </CButton>
                    {/* <CButton color="primary">Guardar Cambios</CButton> */}
                </CModalFooter>
            </CModal >
            <CModal size="lg" id='AD_MODAL_IMG' backdrop="static" visible={visible_img} onClose={() => setvisible_img(false)}>
                <CModalHeader>
                    <CModalTitle>Imagenes</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">

                        <div className='col-12'>
                            <div className='row'>

                                <div className='col-10'>
                                    <input id='DOCUMENTO' type="file" className='form-control' />

                                </div>
                                <div className='col-2'>
                                    <CButton color="primary" onClick={Guardar_Imagen}><i className="bi bi-cloud-upload"></i></CButton>
                                </div>
                            </div>
                        </div>
                        <div className='col-12'>

                            <div id='SECC_TABLA_DOCUMENTOS'>
                                <table id='TABLA_DOCUMENTOS'>

                                </table>
                            </div>


                        </div>
                    </div>
                </CModalBody >
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setvisible_img(false)}>
                        Cerrar
                    </CButton>
                    {/* <CButton color="primary">Guardar Cambios</CButton> */}
                </CModalFooter>
            </CModal >
        </CRow >

    )

}

export default Mis_rutas