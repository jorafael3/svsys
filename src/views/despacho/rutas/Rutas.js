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

var RUTA_ID = "";

function Rutas() {

    const [visible_n, setVisible_n] = useState(false);
    const [visible_nc, setVisible_nc] = useState(false);
    const [visible_ne, setvisible_ne] = useState(false);
    const [visible_i, setVisible_i] = useState(false);
    const [visible_nr, setVisible_nr] = useState(false);
    // const [RUTA_ID, setRUTA_ID] = useState("");


    function Cargar_Rutas() {
        let url = "rutas/Cargar_Rutas";
        ajax.AjaxSendReceiveData(url, [], function (x) {

            Tabla_Rutas(x)
        })
    }

    function Tabla_Rutas(datos) {

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
                        // Nueva_Ruta();
                        setVisible_nr(true);
                    },
                },
            ],
            columns: [{
                data: "fecha",
                title: "FECHA",
                render: function (x) {
                    return moment(x).format("YYYY MMMM DD")
                }
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
            RUTA_ID = (data["ID"]);
            let ID = data["ID"]
            Cargar_Rutas_dia(ID);
        });

    }

    function Cargar_Rutas_dia(data) {
        let param = {
            ID: data
        }
        RUTA_ID = (data);


        let url = "rutas/Cargar_Rutas_dia";
        ajax.AjaxSendReceiveData(url, param, function (x) {

            Tabla_Rutas_dia(x)
        })
    }


    const [E_FACTURA, setE_FACTURA] = useState("");
    const [E_CLIENTE, setE_CLIENTE] = useState("");
    const [E_CLIENTE_DES, setE_CLIENTE_DES] = useState("");
    const [E_PRODUCTO, setE_PRODUCTO] = useState("");
    const [E_HOLCIM, setE_HOLCIM] = useState("");
    const [E_BODEGA, setE_BODEGA] = useState("");
    const [E_FLETE_CANT, setE_FLETE_CANT] = useState("");
    const [E_FLETE_PROD, setE_FLETE_PROD] = useState("");
    const [E_RUTA_DET_ID, setE_RUTA_DET_ID] = useState("");
    const [E_GUIA, setE_GUIA] = useState("");
    const [D_ID, setD_ID] = useState("");
    const [D_ID_DT, setD_ID_DT] = useState("");


    function Tabla_Rutas_dia(datos) {
        console.log('datos: ', datos);



        $('#Tabla_Rutas_dia_SECC').empty();
        if ($.fn.dataTable.isDataTable('#Tabla_Rutas_dia')) {
            $('#Tabla_Rutas_dia').DataTable().destroy();
            $('#Tabla_Rutas_dia_SECC').empty();
        }
        let tabla = `
            <table id='Tabla_Rutas_dia' class=' display table table-striped'>
                <tfoot >
                    <tr>
                        <th  class="fw-bold fs-5"></th>
                        <th  class="fw-bold fs-5"></th>
                        <th  class="fw-bold fs-5"></th>
                        <th  class="fw-bold fs-5"></th>
                        <th  class="fw-bold fs-5"></th>
                        <th  class="fw-bold fs-5 bg-warning bg-opacity-10 text-end"></th>
                        <th  class="fw-bold fs-5 bg-warning bg-opacity-10 text-end"></th>
                        <th  class="fw-bold fs-5 bg-warning bg-opacity-10 text-end"></th>
                        <th  class="fw-bold fs-5"></th>
                        <th  class="fw-bold fs-5"></th>
                    </tr>
                    <tr>
                        <th  class="fw-bold fs-5"></th>
                        <th  class="fw-bold fs-5"></th>
                        <th  class="fw-bold fs-5"></th>
                        <th  class="fw-bold fs-5"></th>
                        <th  class="fw-bold fs-5 bg-success bg-opacity-10 text-end">TOTAL</th>
                        <th  id="RD_TOTAL" colspan="3" class="fw-bold fs-5 bg-success bg-opacity-10 text-center"></th>
                        <th  class="fw-bold fs-5"></th>
                        <th  class="fw-bold fs-5"></th>
                        <th  class="fw-bold fs-5"></th>
                    </tr>
                </tfoot>
            </table>
        `;
        $('#Tabla_Rutas_dia_SECC').append(tabla);

        let TABLA_ = $('#Tabla_Rutas_dia').DataTable({
            destroy: true,
            data: datos,
            dom: 'Brtip',
            // "pageLength": 20,
            // fixedColumns: true,
            paging: false,
            scrollCollapse: true,
            scrollX: true,
            // scrollY: 300,
            // order: [[2, "desc"]],
            // responsive: true,
            // fixedHeader: true,
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;

                api.column(0, { page: 'current' })
                    .data()
                    .each(function (group, i, r) {
                        console.log('group: ', group);
                        var additionalInfo = api.cell({ row: r, column: 2 }).data(); // Obtener datos de la columna 2


                        if (last !== group) {

                            let ID = group.split("/")
                            console.log('ID: ', ID);


                            const reactString = ReactDOMServer.renderToString(
                                <tr className="group">
                                    <td colSpan="1" className="bg-warning bg-opacity-25 fw-bold fs-6">
                                        {ID[0]}
                                    </td>
                                    <td colSpan="1" className="fw-bold fs-6">
                                        <button
                                            onClick={() => Agregar_Ruta_Cliente(ID[1])}
                                            className="btn btn-primary btn-sm"
                                        >
                                            <i className="bi bi-node-plus-fill"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                            // Convert the string to HTML and insert it before the current row
                            const newRow = $(reactString).insertBefore(rows[i]);

                            // Attach event handlers if needed
                            $(newRow).find('button').on('click', () => Agregar_Ruta_Cliente(ID[1]));

                            last = group;
                        }
                    });
            },
            buttons: [
                {
                    text: `<span className"fw-bold"><i class="bi bi-arrow-clockwise fs-4"></i></span>`,
                    className: 'btn btn-info',
                    action: function (e, dt, node, config) {
                        Cargar_Rutas_dia(RUTA_ID);

                    },
                },
                {
                    text: `<span class"fw-bold"><i class="bi bi-plus-circle-fill fs-4"></i></span>`,
                    className: 'btn btn-success',
                    action: function (e, dt, node, config) {
                        setVisible_nc(true)
                    },
                },
            ],
            columnDefs: [
                { width: 100, targets: 2 },
                { width: 120, targets: 3 },
                { width: 180, targets: 5 },
                { width: 180, targets: 9 },
                { width: 200, targets: 10 },
            ],
            // columnDefs: [{ width: 160, targets: 3 }],
            columns: [{
                data: "CHOFER",
                title: "PLACA",
                visible: false,
                // width: 200
            },
            {
                data: "factura",
                title: "FACTURA",
                // width: 200,
                visible: false,
            },
            {
                data: "pedido_interno",
                title: "GUIA #",
                // width: 150
            },
            {
                data: "CLIENTE_NOMBRE",
                title: "CLIENTE",
                // width: 300
            },
            {
                data: "destino_nombre",
                title: "DESTINO",
                // width: 180
            },
            {
                data: "producto_nombre",
                title: "PRODUCTO",
                // width: 300
            }, {
                data: "holcim",
                title: "HOLCIM",
                className: "text-end"
            }, {
                data: "bodega",
                title: "BODEGA",
                className: "text-end"

            }, {
                data: "flete_cant",
                title: "FLETE CANT.",
                className: "text-end"

            }, {
                data: "flete_producto_nombre",
                title: "FLETE PROD.",
                // width: 300
            }, {
                data: "pedido_interno",
                title: "ESTADO",
                // width: 300
            }, {
                data: "despachado",
                title: "DESPACHO",
                // width: 300
            }, {
                data: null,
                title: "Detalles",
                className: "btn_detalles",
                defaultContent: '<button type="button" id="btn_detalles" class="btn_detalles btn btn-light"><i class="bi bi-images fs-5"></i></button>',
                orderable: "",
                // width: 20
            }, {
                data: null,
                title: "Modificar",
                className: "btn_Modificar",
                defaultContent: '<button type="button" id="btn_Modificar" class="btn_Modificar btn btn-warning"><i class="bi bi-pencil fs-5"></i></button>',
                orderable: "",
                // width: 20
            }, {
                data: null,
                title: "Eliminar",
                className: "btn_eliminar",
                defaultContent: '<button type="button" id="btn_eliminar" class="btn_eliminar btn btn-danger"><i class="bi bi-trash fs-5"></i></button>',
                orderable: "",
                // width: 20
            }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(4).addClass("fw-bold fs-6 ");
                $('td', row).eq(5).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(6).addClass("fw-bold fs-6 ");
                $('td', row).eq(7).addClass("fw-bold fs-6 ");

                if (data["pedido_interno"] != "") {
                    if (data["FECHA_SALE_PLANTA"] == null) {
                        let a = `
                        <span class ="text-danger fw-bold fs-6">guia pendiente retiro</span><br>
                        `;
                        $('td', row).eq(8).html(a);
                        // $('td', row).eq(8).html("");

                    } else {
                        let a = `
                            <span class ="fw-bold text-success">Retirada</span>
                            <span class ="fw-bold text-dark"> (`+ data["PLACA_RETIRO"] + `)</span>
                            <br>
                            <span class ="fw-bold fs-6">`+ moment(data["FECHA_SALE_PLANTA"]).format("YYYY-MM-DD hh:mm A") + `</span><br>
                        `;
                        $('td', row).eq(8).html(a);
                    }
                }

                if (data["despachado"] == 0) {
                    let a = `
                    <span class ="fw-bold text-danger">Pendiente despacho</span>
                    <br>
                `;
                    $('td', row).eq(9).html(a);
                } else {
                    let a = `
                    <span class ="fw-bold text-success">Despachada</span>
                    <br>
                    <span class ="fw-bold fs-6">`+ moment(data["despachado_fecha"]).format("YYYY-MM-DD hh:mm A") + `</span><br>
                `;
                    $('td', row).eq(9).html(a);
                }


                if (data["cliente_id"] == null) {
                    $('td', row).eq(10).removeClass("btn_detalles");
                    $('td', row).eq(11).removeClass("btn_Modificar");
                    $('td', row).eq(12).removeClass("btn_eliminar");
                    $('td', row).eq(10).html("");
                    $('td', row).eq(11).html("");
                    $('td', row).eq(12).html("");
                    $('td', row).eq(8).html("");
                    $('td', row).eq(9).html("");
                }


            },
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api(),
                    data;
                var intVal = function (i) {
                    return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                            i : 0;
                };
                var holcim = api
                    .column(6)
                    .data()
                    .reduce(function (a, b) {
                        return (intVal(a) + intVal(b));

                    }, 0);
                var bodega = api
                    .column(7)
                    .data()
                    .reduce(function (a, b) {
                        return (intVal(a) + intVal(b));

                    }, 0);
                var fletes = api
                    .column(8)
                    .data()
                    .reduce(function (a, b) {
                        return (intVal(a) + intVal(b));

                    }, 0);
                let formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });
                $(api.column(0).footer()).html('Total');
                $(api.column(5).footer()).html((holcim));
                $(api.column(6).footer()).html((bodega));
                $(api.column(7).footer()).html((fletes));

                $("#RD_TOTAL").text(parseFloat(holcim) + parseFloat(bodega) + parseFloat(fletes))
                //$(api.column(3).footer()).html(format(wedTotal));
            }
        });
        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 500);
        $('#Tabla_Rutas_dia').on('click', 'td.btn_detalles', function (respuesta) {
            var data = TABLA_.row(this).data();

            setVisible_i(true);
            setD_ID(data["ID"]);
            setD_ID_DT(data["RUTA_DETALLE_ID"]);
            setTimeout(() => {
                Cargar_imagenes(data["ID"], data["RUTA_DET_ID"]);
            }, 500);

        });

        $('#Tabla_Rutas_dia').on('click', 'td.btn_eliminar', function (respuesta) {
            var data = TABLA_.row(this).data();

            if (data["despachado"] == 0) {
                Eliminar_ruta_dia_detalle(data["RUTA_DET_ID"])
            } else {
                ajax.Mensaje("No se puede eliminar", "Ruta ya ha sido despachada", "info")
            }
        });

        $('#Tabla_Rutas_dia').on('click', 'td.btn_Modificar', function (respuesta) {
            var data = TABLA_.row(this).data();



            setvisible_ne(true);
            setvisible_ne(false);
            setvisible_ne(true);
            $("#N_FACTURA_E").val(data["factura"]);
            setE_FACTURA(data["factura"]);
            setE_CLIENTE(data["cliente_id"]);
            setE_PRODUCTO(data["producto_id"]);
            setE_HOLCIM(data["holcim"]);
            setE_BODEGA(data["bodega"]);
            setE_FLETE_CANT(data["flete_cant"]);
            setE_FLETE_PROD(data["flete_producto"]);
            setE_CLIENTE_DES(data["cliente_destino_id"]);
            setE_RUTA_DET_ID(data["RUTA_DET_ID"]);
            setE_GUIA(data["pedido_interno"]);
            Cambiar_Sucursal(data["cliente_id"])
            Cambiar_Sucursal(data["cliente_id"])

        });

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
                    dom: 'Brtip',
                    "pageLength": 3,
                    // paging: false,
                    info: false,
                    order: [[0, "desc"]],
                    buttons: [
                        {
                            text: `<span class"fw-bold"><i class="bi bi-arrow-clockwise fs-5"></i></span>`,
                            className: 'btn btn-info btn-sm',
                            action: function (e, dt, node, config) {
                                Cargar_imagenes(D_ID, D_ID_DT);
                            },
                        },
                    ],
                    columns: [{
                        data: "nombre",
                        title: "nombre",
                    },
                        // {
                        //     data: null,
                        //     title: "",
                        //     className: "btn_Asignar text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                        //     defaultContent: '<button type="button" class="btn_Asignar btn btn-danger text-light"><i class="bi bi-trash fs-5 fw-bold"></i></button>',
                        //     orderable: "",
                        //     width: 20
                        // },
                    ],
                    "createdRow": function (row, data, index) {
                        $('td', row).eq(0).addClass("fw-bold fs-5");
                        $('td', row).eq(1).addClass("fw-bold fs-6 ");
                        $('td', row).eq(2).addClass("fw-bold fs-6 ");

                        let fir = protocol + "//" + host + "/" + "svsysback/recursos/guias_subidas/"

                        let link = fir + data["nombre"];

                        let d = `
                        <div class="">
                            <img style="height:500px;width:100%" class="" src="`+ link + `" alt="a">
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

    function Nueva_Ruta() {
        let url = "rutas/Nueva_Ruta";
        let FECHA = $("#FECHA_NUEVA_RUTA").val();
        let param = {
            CREADO_POR: sesion.GET_DATOS_SESION()["Usuario"],
            FECHA_NUEVA_RUTA: moment(FECHA).format("YYYYMMDD")
        }
        console.log('param: ', param);

        ajax.AjaxSendReceiveData(url, param, function (x) {

            if (x[0] == 1) {
                ajax.Mensaje(x[1], "", "success")
                Cargar_Rutas();
            } else {
                ajax.Mensaje(x[1], "", "error")

            }

        })

    }

    //**** NUEVA RUTA */


    const [N_chofer_id, setN_chofer_id] = useState("");

    function Nueva_Ruta_Dia() {

        let param = {
            CHOFER: N_chofer_id,
            RUTA_ID: RUTA_ID
        }


        if (N_chofer_id == "") {
            ajax.Mensaje("Debe seleccionar un chofer", "", "error");
        } else {
            let url = "rutas/Nueva_Ruta_Dia";

            ajax.AjaxSendReceiveData(url, param, function (x) {

                if (x[0] == 1) {
                    ajax.Mensaje(x[1], "", "success")
                    // Cargar_Rutas();
                    Cargar_Rutas_dia(RUTA_ID);
                    setVisible_nc(false);

                } else {
                    ajax.Mensaje(x[1], "", "error")

                }
            })
        }

    }

    const [N_ruta_dia_id, setN_ruta_dia_id] = useState("");

    function Agregar_Ruta_Cliente(ID) {
        setN_ruta_dia_id(ID);
        setVisible_n(true);
        setN_cliente_id("");
        setN_producto_flete_id("");
        setN_producto_id("");
    }

    const [SUCURSALES, setSUCURSALES] = useState([]);


    function Cambiar_Sucursal(ID) {
        let param = {
            CLIENTE: ID
        }

        let url = "rutas/Cargar_Clientes_Sucursales"
        ajax.AjaxSendReceiveData(url, param, function (x) {

            setSUCURSALES(x)
        })
    }

    const [N_ruta_dia_detalle_sucursal, setN_ruta_dia_detalle_sucursal] = useState("");
    const [N_cliente_id, setN_cliente_id] = useState("");
    const [N_producto_id, setN_producto_id] = useState("");
    const [N_guia_id, setN_guia_id] = useState("");
    const [N_producto_flete_id, setN_producto_flete_id] = useState("");

    function Nueva_ruta_dia_detalle() {

        let param = {
            RUTA_DIA_ID: N_ruta_dia_id,
            FACTURA: $("#N_FACTURA").val(),
            CLIENTE: N_cliente_id,
            // CLIENTE_DESTINO: N_ruta_dia_detalle_sucursal,
            PRODUCTO: N_producto_id,
            CLIENTE_DESTINO: $("#N_CLI_DESTINO").val(),
            HOLCIM: $("#N_HOLCIM").val(),
            BODEGA: $("#N_BODEGA").val(),
            FLETE_CANT: $("#N_FLETE_CANT").val(),
            FLETE_PROD: N_producto_flete_id,
            GUIA: N_guia_id,

        }



        if (N_cliente_id == "") {
            ajax.Mensaje("Debe seleccionar un cliente");
        } else {
            let url = "rutas/Nueva_Ruta_Dia_detalle"
            ajax.AjaxSendReceiveData(url, param, function (x) {


                if (x[0] == 1) {
                    ajax.Mensaje(x[1], "", "success");
                    Cargar_Rutas_dia(RUTA_ID);

                    setVisible_n(false);
                } else {
                    ajax.Mensaje(x[1].toString(), "", "error")

                }
            })

        }

    }

    function Actualizar_ruta_dia_detalle() {

        let param = {
            RUTA_DIA_ID: E_RUTA_DET_ID,
            FACTURA: $("#N_FACTURA_E").val(),
            CLIENTE: E_CLIENTE,
            PRODUCTO: E_PRODUCTO,
            CLIENTE_DESTINO: E_CLIENTE_DES,
            HOLCIM: $("#N_HOLCIM_E").val(),
            BODEGA: $("#N_BODEGA_E").val(),
            FLETE_CANT: $("#N_FLETE_CANT_E").val(),
            FLETE_PROD: E_FLETE_PROD,
            GUIA: E_GUIA,

        }




        if (E_CLIENTE == "") {
            ajax.Mensaje("Debe seleccionar un cliente");
        } else {
            let url = "rutas/Actualizar_Ruta_Dia_detalle"
            ajax.AjaxSendReceiveData(url, param, function (x) {

                if (x[0] == 1) {
                    ajax.Mensaje(x[1], "", "success");
                    Cargar_Rutas_dia(RUTA_ID);
                    setVisible_n(false);
                } else {
                    ajax.Mensaje(x[1].toString(), "", "error")

                }
            })

        }

    }

    function Eliminar_ruta_dia_detalle(ID) {

        let param = {
            RUTA_DIA_ID: ID,
        }


        Swal.fire({
            title: "Se eliminara esta ruta, estas seguro?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Continuar",
            denyButtonText: `Cancelar`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                let url = "rutas/Eliminar_Ruta_Dia_detalle"
                ajax.AjaxSendReceiveData(url, param, function (x) {

                    if (x[0] == 1) {
                        ajax.Mensaje(x[1], "", "success");
                        Cargar_Rutas_dia(RUTA_ID);

                    } else {
                        ajax.Mensaje(x[1].toString(), "", "error")
                    }
                })
            }
        });
    }

    //***************** ONLOAD */

    const [CLIENTES, setCLIENTES] = useState([]);
    const [PRODUCTOS, setPRODUCTOS] = useState([]);
    const [CHOFERES, setCHOFERES] = useState([]);
    const [GUIAS, setGUIAS] = useState([]);

    useEffect(() => {
        Cargar_Rutas();
        sesion.GET_DATOS_SESION();


        let url_c = "rutas/Cargar_Clientes"
        ajax.AjaxSendReceiveData(url_c, [], function (x) {
            setCLIENTES(x);
        });

        let url_p = "rutas/Cargar_Productos"
        ajax.AjaxSendReceiveData(url_p, [], function (x) {

            const clearOption = { value: null, label: 'N/A' };
            const optionsWithClear = [clearOption, ...x.map(option => ({ value: option.value, label: option.label }))];
            setPRODUCTOS(optionsWithClear);
        });

        let url_ch = "rutas/Cargar_Chofer"
        ajax.AjaxSendReceiveData(url_ch, [], function (x) {
            setCHOFERES(x);
        });

        let url_gui = "rutas/Cargar_Guias"
        let pa = {
            FECHA_INI: moment().subtract(1, "month").format("YYYYMMDD"),
            FECHA_FIN: moment().format("YYYYMMDD"),
        }


        ajax.AjaxSendReceiveData(url_gui, pa, function (x) {
            x.map(function (x) {
                x.value = x.PEDIDO_INTERNO
                x.label = x.FECHA_DE_EMISION + "-" + x.PEDIDO_INTERNO + "-" + x.DESCRIPCION + "-" + x.POR_DESPACHAR
            })


            setGUIAS(x);
        });


    }, []);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Rutas</strong>
                    </CCardHeader>
                    <CCardBody>
                        <div className='col-12' id=''>
                            <div className='table-responsive' id='Tabla_Rutas_SECC'>

                                <table id='Tabla_Rutas' className='display table table-striped'>
                                </table>
                            </div>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={12}>
                <CCard className="mb-4" >
                    <CCardBody>
                        <div className='col-12'>
                            <div className='table-responsive' id='Tabla_Rutas_dia_SECC'>
                                <table id='Tabla_Rutas_dia' className='display table nowrap'>

                                </table>
                            </div>

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
                                <span className="required">FACTURA</span>
                            </label>
                            <input id='N_FACTURA' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>

                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">CLIENTE</span>
                                </label>
                                <Select options={CLIENTES}
                                    // defaultValue={provincias.find(option => option.value === CLI_EDI_PROVINCIA)}
                                    onChange={(items) => {
                                        // setprov_select(items.label);
                                        setN_cliente_id(items.value);
                                        Cambiar_Sucursal(items.value);
                                    }}
                                />
                            </div>
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">CLIENTE DESTINO</span>
                                </label>
                                <select className='form-select' id='N_CLI_DESTINO' name="" >
                                    <option value="null">N/A</option>
                                    {SUCURSALES.map((option, index) => (
                                        <option key={index} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                {/* <Select options={SUCURSALES}
                                    // defaultValue={provincias.find(option => option.value === CLI_EDI_PROVINCIA)}
                                    onChange={(items) => {
                                        
                                        // setprov_select(items.label);
                                        setN_ruta_dia_detalle_sucursal(items.value);
                                    }}
                                /> */}
                            </div>
                        </div>
                        {/* <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">PRODUCTO</span>
                            </label>
                            <Select options={PRODUCTOS}
                                // defaultValue={PRODUCTOS.filter(option => option.value === null)}
                                onChange={(items) => {

                                    setN_producto_id(items.value);
                                }}
                            />
                        </div> */}
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required bg-light mt-1">GUIA #</span>
                            </label>
                            <Select options={GUIAS}
                                // defaultValue={PRODUCTOS.filter(option => option.value === null)}
                                onChange={(items) => {

                                    $("#N_HOLCIM").val(items.POR_DESPACHAR)
                                    setN_guia_id(items.value);
                                    setN_producto_id(items.ID);
                                }}
                            />
                            {/* <input id='N_GUIA' type="text" className="form-control form-control-solid" placeholder="" name="target_title" /> */}
                        </div>
                        <div className="row g-9 mb-8">

                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">HOLCIM</span>
                                </label>
                                <input id='N_HOLCIM' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                            </div>
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">BODEGA</span>
                                </label>
                                <input id='N_BODEGA' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                            </div>
                        </div>
                        <h4 className='bg-light mt-3'>FLETE</h4>
                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">FLETE PRODUCTO</span>
                                </label>
                                <Select options={PRODUCTOS}
                                    // defaultValue={PRODUCTOS.filter(option => option.value === null)}
                                    onChange={(items) => {
                                        setN_producto_flete_id(items.value);
                                    }}
                                />
                            </div>
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">FLETE CANTIDAD</span>
                                </label>
                                <input id='N_FLETE_CANT' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                            </div>

                        </div>



                    </div>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible_n(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary" onClick={Nueva_ruta_dia_detalle} >Guardar Cambios</CButton>
                </CModalFooter>
            </CModal>
            <CModal size="lg" id='AD_MODAL_EDITAR' backdrop="static" visible={visible_ne} onClose={() => setvisible_ne(false)}>
                <CModalHeader>
                    <CModalTitle>Actualizar Ruta</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">FACTURA</span>
                            </label>
                            <input defaultValue={E_FACTURA} id='N_FACTURA_E' type="text" className="form-control form-control-solid" placeholder="" name="target_title" />
                        </div>

                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">CLIENTE</span>
                                </label>
                                <Select options={CLIENTES}
                                    defaultValue={CLIENTES.find(option => option.value === E_CLIENTE)}
                                    onChange={(items) => {
                                        // setprov_select(items.label);
                                        setE_CLIENTE(items.value);
                                        Cambiar_Sucursal(items.value);
                                    }}
                                />
                            </div>
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">CLIENTE DESTINO</span>
                                </label>
                                <select value={E_CLIENTE_DES} onChange={(items) => {

                                    // setprov_select(items.label);
                                    setE_CLIENTE_DES(items.target.value);
                                }} className='form-select' id='N_CLI_DESTINO_E' name="" >
                                    <option value="null">N/A</option>
                                    {SUCURSALES.map((option, index) => (
                                        <option key={index} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                {/* <Select options={SUCURSALES}
                                    defaultValue={SUCURSALES.find(option => option.value === E_CLIENTE_DES)}
                                    onChange={(items) => {
                                        
                                        // setprov_select(items.label);
                                        // setN_ruta_dia_detalle_sucursal(items.value);
                                    }}
                                /> */}
                            </div>
                        </div>
                        {/* <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">PRODUCTO</span>
                            </label>
                            <Select options={PRODUCTOS}
                                defaultValue={PRODUCTOS.filter(option => option.value === E_PRODUCTO)}
                                onChange={(items) => {
                                    setE_PRODUCTO(items.value);
                                }}
                            />
                        </div> */}
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required bg-light mt-1">GUIA #</span>
                            </label>
                            <Select options={GUIAS}
                                defaultValue={GUIAS.filter(option => option.value === E_GUIA)}
                                onChange={(items) => {

                                    $("#N_HOLCIM_E").val(items.POR_DESPACHAR)
                                    setE_GUIA(items.value);
                                    setE_PRODUCTO(items.ID);
                                }}
                            />
                            {/* <input id='N_GUIA' type="text" className="form-control form-control-solid" placeholder="" name="target_title" /> */}
                        </div>
                        <div className="row g-9 mb-8">

                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">HOLCIM</span>
                                </label>
                                <input defaultValue={E_HOLCIM} id='N_HOLCIM_E' type="number" className="form-control form-control-solid" placeholder="" name="target_title" />
                            </div>
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">BODEGA</span>
                                </label>
                                <input defaultValue={E_BODEGA} id='N_BODEGA_E' type="number" className="form-control form-control-solid" placeholder="" name="target_title" />
                            </div>
                        </div>
                        <h4 className='bg-light mt-3'>FLETE</h4>

                        <div className="row g-9 mb-8">
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">FLETE PRODUCTO</span>
                                </label>
                                <Select options={PRODUCTOS}
                                    defaultValue={PRODUCTOS.filter(option => option.value === E_FLETE_PROD)}
                                    onChange={(items) => {
                                        setE_FLETE_PROD(items.value);
                                    }}
                                />
                            </div>
                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">FLETE CANTIDAD</span>
                                </label>
                                <input defaultValue={E_FLETE_CANT} id='N_FLETE_CANT_E' type="number" className="form-control form-control-solid" placeholder="" name="target_title" />
                            </div>

                        </div>


                    </div>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setvisible_ne(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary" onClick={Actualizar_ruta_dia_detalle} >Guardar Cambios</CButton>
                </CModalFooter>
            </CModal>
            <CModal size="lg" id='AD_MODAL_NUEVO_CHOFER' backdrop="static" visible={visible_nc} onClose={() => setVisible_nc(false)}>
                <CModalHeader>
                    <CModalTitle>Nueva Ruta</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">CHOFER</span>
                            </label>
                            <Select options={CHOFERES}
                                // defaultValue={provincias.find(option => option.value === CLI_EDI_PROVINCIA)}
                                onChange={(items) => {
                                    // setprov_select(items.label);
                                    setN_chofer_id(items.value);
                                }}
                            />
                        </div>
                    </div>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible_nc(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary" onClick={Nueva_Ruta_Dia} >Guardar Cambios</CButton>
                </CModalFooter>
            </CModal>

            <CModal size="lg" id='AD_MODAL_IMG' backdrop="static" visible={visible_i} onClose={() => setVisible_i(false)}>
                <CModalHeader>
                    <CModalTitle>Imagenes</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">

                        <div className='col-12'>

                            <div id='SECC_TABLA_DOCUMENTOS'>
                                <table id='TABLA_DOCUMENTOS'>

                                </table>
                            </div>


                        </div>

                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible_i(false)}>
                        Cerrar
                    </CButton>
                    {/* <CButton color="primary" onClick={Nueva_ruta_dia_detalle} >Guardar Cambios</CButton> */}
                </CModalFooter>
            </CModal>

            <CModal size="sm" id='AD_MODAL_NUEVA_RUTA' backdrop="static" visible={visible_nr} onClose={() => setVisible_nr(false)}>
                <CModalHeader>
                    <CModalTitle>Nueva Ruta</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div id="kt_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">

                        <div className='col-12 p-3'>
                            <h5>Fecha de la ruta</h5>
                            <input defaultValue={
                                moment().format("YYYY-MM-DD")
                            } id='FECHA_NUEVA_RUTA' type="date" className='form-control' />
                        </div>

                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible_nr(false)}>
                        Cerrar
                    </CButton>
                    <CButton color="primary" onClick={Nueva_Ruta} >Guardar</CButton>
                </CModalFooter>
            </CModal>
        </CRow>

    )
}

export default Rutas