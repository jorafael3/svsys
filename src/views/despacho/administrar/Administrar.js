import React, { useEffect, useRef, useState, CNav, CNavItem, CNavLink } from 'react';
import {
    CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CWidgetStatsA
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
import * as fun from "../../../config/config"

function Administrar() {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible_h, setVisible_h] = useState(false);
    const [visible_f, setVisible_f] = useState(false);
    const [barra_visible, setbarra_visible] = useState(false);
    const [Guias_Retiradas_Form, setGuias_Retiradas_Form] = useState(true);


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
    const [estado_despacho, setestado_despacho] = useState('');
    const [estado_despacho_texto, setestado_despacho_texto] = useState('');

    //******* FACTURA */
    const [parametros, setparametros] = useState([]);
    const [parametros_iva, setparametros_iva] = useState("");
    const [F_IVA, setF_IVA] = useState("0.00");
    const [F_TOTAL, setF_TOTAL] = useState("0.00");
    const [F_SUBTOTAL_0, setF_SUBTOTAL_0] = useState("0.00");
    const [F_SUBTOTAL_12, setF_SUBTOTAL_12] = useState("0.00");

    const [filtro_chofer_state, setfiltro_chofer_state] = useState(0);

    //*** EN PROCESO */
    const [PRO_SACOS_POR_DESP, setPRO_SACOS_POR_DESP] = useState(0);


    function Cargar_Datos() {
        let FECHA_INI = $("#AD_FECHA_INI").val();
        let FECHA_FIN = $("#AD_FECHA_FIN").val();
        let POR_RETIRO = $("#flexSwitchCheckDefault").is(":checked") == true ? 1 : 0;
        console.log('POR_RETIRO: ', POR_RETIRO);

        // let ESTADO = $("#SEL_ESTADO_PEDIDO").val();
        let param = {
            FECHA_INI: moment(FECHA_INI).format("YYYYMMDD"),
            FECHA_FIN: moment(FECHA_FIN).format("YYYYMMDD")
        }

        if (POR_RETIRO == 0) {
            let DATOS = funciones.Cargar_Guias_Sin_Despachar(param, function (x) {
                Tabla_guias_sin_despachar(x)
            });
            funciones.Guias_Despachadas_General(param, function (x) {

                let Estado = $("#GUI_DES_ESTADO").val();
                let Chofer = $("#GUI_DES_CHOFERES").val();


                let datafiltrada;
                if (Estado == "") {
                    datafiltrada = x
                } else {
                    datafiltrada = x.filter(item => item.ESTADO_DESPACHO == Estado);
                }

                if (Chofer == "" || Chofer == null) {

                } else {
                    datafiltrada = datafiltrada.filter(item => item.usuario_id == Chofer);
                }

                Tabla_guias_despachadas_general(datafiltrada);
                if (filtro_chofer_state == 0) {
                    setfiltro_chofer_state(1);
                    Cargar_Filtro_Choferes(x);
                }
            });

            funciones.Guias_En_Proceso(param, function (x) {
                console.log('x: ', x);
                Cargar_Guias_Proceso_Despacho(x);
                var VAL = x.reduce((sum, value) => (sum + parseFloat(value.POR_DESPACHAR)), 0);
                setPRO_SACOS_POR_DESP(VAL);
            })
            setGuias_Retiradas_Form(false);
            setbarra_visible(true);
        } else {
            setbarra_visible(false);
            setGuias_Retiradas_Form(true);
            Cargar_Guias_Retiradas();
        }


    }

    //****** GUIAS SIN DESPACHAR ******/

    function Tabla_guias_sin_despachar(datos) {

        $('#AD_TABLA_DATOS_SECC').empty();
        if ($.fn.dataTable.isDataTable('#AD_TABLA_DATOS')) {
            $('#AD_TABLA_DATOS').DataTable().destroy();
            $('#AD_TABLA_DATOS_SECC').empty();
        }

        let tabla = `
        <table id='AD_TABLA_DATOS' class=' display table table-striped'>
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
                data: "placa",
                title: "PLACA",
                render: function (x, y, r) {
                    if (x == null) {
                        x = `
                        <span class="text-danger">SIN ASIGNAR</span>
                        `;
                    } else {
                        x = `
                        <span>`+ x + `</span><br>
                        <span>`+ r.chofer_nombre + `</span>
                        `;
                    }

                    return x;
                }
            },
            {
                data: "TOTAL_FACTURAS",
                title: "TOTAL FACT.",
                render: $.fn.dataTable.render.number(',', '.', 2, "$")
            },
            {
                data: "VENCIDO",
                title: "ESTADO",
                render: function (x, y, r) {
                    const diferenciaEnDias = (moment(r.FECHA_VALIDEZ)).diff(moment(), 'days');

                    if (x == 1) {
                        x = `
                        <span class="text-success">Vigente</span><br>
                        <span class="text-muted">`+ r.FECHA_VALIDEZ + `</span><br>
                        <span class="text-muted">`+ diferenciaEnDias + ` días </span>
                        `
                    } else {
                        x = `
                        <span class="text-danger">Vencida</span><br>
                        <span class="text-muted">`+ r.FECHA_VALIDEZ + `</span><br>
                        <span class="text-muted">`+ diferenciaEnDias + ` días</span>
                        `
                    }
                    return x;
                }
            },
            {
                data: null,
                title: "MAS",
                className: "btn_recibir text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_recibir btn btn-primary"><i class="bi bi-plus-circle fs-4"></i></button>',
                orderable: "",
                width: 20
            }, {
                data: null,
                title: "INGRESAR FACTURA",
                className: "btn_factura text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_factura btn btn-warning"><i class="bi bi-receipt-cutoff fw-bold fs-4"></i></button>',
                orderable: "",
                width: 20
            }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6 ");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(4).addClass("fw-bold fs-6");
                $('td', row).eq(5).addClass("fw-bold fs-6");
            },
        });

        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 500);
        $('#AD_TABLA_DATOS').on('click', 'td.btn_recibir', function (respuesta) {
            var data = TABLA_.row(this).data();


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

                Tabla_guias_sin_despachar_detalles(x)
            })
        });
        $('#AD_TABLA_DATOS').on('click', 'td.btn_factura', function (respuesta) {
            var data = TABLA_.row(this).data();

            setVisible_f(true);
            setPedido(data["PEDIDO_INTERNO"]);
            funciones.Obtener_Parametros(function (x) {
                let iva = x.filter(item => item.parametro_nombre = "IVA");
                setparametros_iva(iva[0]["paramentro_valor"]);
            })

            Cargar_facturas_Pedido(data["PEDIDO_INTERNO"]);

        });



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

        funciones.Reasignar_Nueva_placa(param);
        Cargar_Datos();
    }

    //****** GUIAS DESPACHADAS *********/

    function Tabla_guias_despachadas_general(datos) {

        $('#AD_TABLA_GUIAS_DESPACHADAS_GENERAL_SECC').empty();
        if ($.fn.dataTable.isDataTable('#AD_TABLA_DATOS')) {
            $('#AD_TABLA_GUIAS_DESPACHADAS_GENERAL').DataTable().destroy();
            $('#AD_TABLA_GUIAS_DESPACHADAS_GENERAL_SECC').empty();
        }

        var total = datos.reduce(function (acc, obj) { return acc + (obj.TOTAL_FACTURAS == null ? 0 : parseFloat(obj.TOTAL_FACTURAS)); }, 0);



        let tabla = `
        <table id='AD_TABLA_GUIAS_DESPACHADAS_GENERAL' class='table display table-striped' style="width:100%">
            <tfoot>
                <tr>
                    <th style="font-size: 16px;" class="font-weight-bolder ">TOTAL</th>
                    <th style="font-size: 16px;" class="font-weight-bolder "></th>
                    <th style="font-size: 16px;" class="font-weight-bolder "></th>
                    <th style="font-size: 16px;" class="font-weight-bolder "></th>
                    <th style="font-size: 16px;" class="font-weight-bolder ">$`+ parseFloat(total).toFixed(2) + `</th>
                </tr>
            </tfoot>
        </table>
        `;
        $('#AD_TABLA_GUIAS_DESPACHADAS_GENERAL_SECC').append(tabla);
        let TABLA_ = $('#AD_TABLA_GUIAS_DESPACHADAS_GENERAL').DataTable({
            destroy: true,
            data: datos,
            dom: 'Bfrtip',
            order: [[0, "desc"]],
            drawCallback: function () {

            },
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
            }, {
                data: "FECHA_CREADO",
                title: "FECHA DE GENERADA",
            },
            {
                data: "PEDIDO_INTERNO",
                title: "PEDIDO INTERNO"
            },
            {
                data: "PEDIDO_CREADO_POR",
                title: "PEDIDO CREADO POR"
            },
            {
                data: "TOTAL_FACTURAS",
                title: "TOTAL FACTURAS",
                render: $.fn.dataTable.render.number(',', '.', 2, "$")

            },
            {
                data: "ESTADO_DESPACHO_TEXTO",
                title: "ESTADO DESPACHO",
                render: function (x, y, r) {

                    if (r.ESTADO_DESPACHO == 1) {
                        x = `<span class="text-danger">` + x + `</span>`
                    } else {
                        x = `<span class="text-success">` + x + `</span><br>
                        <span>` + r.FECHA_COMPLETADO + `</span>
                        `
                    }
                    return x;
                }
                // render: function (x, y, r) {
                //     const diferenciaEnDias = (moment(r.FECHA_VALIDEZ)).diff(moment(), 'days');

                //     if (x == 1) {
                //         x = `
                //         <span class="text-success">Vigente</span><br>
                //         <span class="text-muted">`+ r.FECHA_VALIDEZ + `</span><br>
                //         <span class="text-muted">`+ diferenciaEnDias + ` días </span>
                //         `
                //     } else {
                //         x = `
                //         <span class="text-danger">Vencida</span><br>
                //         <span class="text-muted">`+ r.FECHA_VALIDEZ + `</span><br>
                //         <span class="text-muted">`+ diferenciaEnDias + ` días</span>
                //         `
                //     }
                //     return x;
                // }
            },
            {
                data: null,
                title: "DETALLES",
                className: "btn_detalles text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_recibir btn btn-primary"><i class="bi bi-ticket-detailed fw-bold fs-4"></i></button>',
                orderable: "",
                width: 20
            },
            {
                data: null,
                title: "HISTORIAL",
                className: "btn_historial text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_recibir btn btn-success"><i class="bi bi-clock-history fw-bold fs-4"></i></button>',
                orderable: "",
                width: 20,

            },
            {
                data: null,
                title: "INGRESAR FACTURA",
                className: "btn_factura text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_factura btn btn-warning"><i class="bi bi-receipt-cutoff fw-bold fs-4"></i></button>',
                orderable: "",
                width: 20
            }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6 ");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6");
                $('td', row).eq(4).addClass("fw-bold fs-6  bg-warning bg-opacity-10");
                $('td', row).eq(5).addClass("fw-bold fs-6");
            },
        });

        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 500);

        $('#AD_TABLA_GUIAS_DESPACHADAS_GENERAL').on('click', 'td.btn_detalles', function (respuesta) {
            var data = TABLA_.row(this).data();

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

            funciones.Guias_Despachadas_General_detalle(param, function (x) {


                Tabla_guias_despachadas_general_detalle(x)
            })
        });

        $('#AD_TABLA_GUIAS_DESPACHADAS_GENERAL').on('click', 'td.btn_historial', function (respuesta) {
            var data = TABLA_.row(this).data();

            setVisible_h(true);
            setPedido(data["PEDIDO_INTERNO"]);
            setestado_despacho(data["ESTADO_DESPACHO"]);
            setestado_despacho_texto(data["ESTADO_DESPACHO_TEXTO"]);

            let param = {
                PEDIDO_INTERNO: data["PEDIDO_INTERNO"],
            }


            funciones.Guias_Despachadas_Historial(param, function (x) {

                Tabla_Guias_Despachadas_Historial(x);
            })

        });

        $('#AD_TABLA_GUIAS_DESPACHADAS_GENERAL').on('click', 'td.btn_factura', function (respuesta) {
            var data = TABLA_.row(this).data();

            setVisible_f(true);
            setPedido(data["PEDIDO_INTERNO"]);
            funciones.Obtener_Parametros(function (x) {
                let iva = x.filter(item => item.parametro_nombre = "IVA");
                setparametros_iva(iva[0]["paramentro_valor"]);
            })

            Cargar_facturas_Pedido(data["PEDIDO_INTERNO"]);
            let param = {
                PEDIDO_INTERNO: data["PEDIDO_INTERNO"],
            }
            funciones.Guias_Despachadas_Historial(param, function (x) {

                $("#FACT_CLIENTES").empty();
                $("#FACT_CLIENTES").append("<option value=''>Seleccione</option>");
                x.map(function (x) {
                    $("#FACT_CLIENTES").append("<option value='" + x.CLIENTE_ID + "'>" + x.CLIENTE_NOMBRE + "</option>");
                })
            })

        });

    }

    function Tabla_guias_despachadas_general_detalle(datos) {
        let TABLA_ = $('#DES_TABLA_GUIAS_DETALLE').DataTable({
            destroy: true,
            data: datos,
            dom: 'rtip',
            order: [[0, "asc"]],
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
                title: "DESPACHADA",
                render: function (x) {
                    return parseFloat(x).toFixed(2)
                }
            }, {
                data: "RESTANTE",
                title: "RESTANTE"
            }, {
                data: "ENTREGADA",
                title: "ENTREGADA"
            }

            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6 ");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6 ");
                $('td', row).eq(4).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(5).addClass("fw-bold fs-6 bg-primary bg-opacity-10");
                $('td', row).eq(6).addClass("fw-bold fs-6");
                $('td', row).eq(7).addClass("fw-bold fs-6 bg-success bg-opacity-10");


            },
        });
    }

    function Tabla_Guias_Despachadas_Historial(datos) {
        let TABLA_ = $('#DES_TABLA_GUIAS_DESPACHADAS_HISTORIAL').DataTable({
            destroy: true,
            data: datos,
            dom: 'rtip',
            order: [[0, "asc"]],
            columns: [{
                data: "FECHA_CREADO",
                title: "FECHA DESPACHO",
            },
            {
                data: "CLIENTE_NOMBRE",
                title: "CLIENTE"
            },
            {
                data: "DESTINO",
                title: "DESTINO"
            }, {
                data: "SERVICIO",
                title: "SERVICIO"
            }, {
                data: "DESPACHADO_POR",
                title: "DESPACHADO POR"
            }, {
                data: "UBICACION",
                title: "UBICACION",
                className: "btn_ubicacion link-success",
                render: function (x, y, r) {
                    x = `<button class='btn btn-outline-success fw-bold'><i class="bi bi-geo-alt-fill"></i></button>
                        `
                    return x;
                }
            }, {
                data: "PLACA",
                title: "PLACA",
                render: function (x, y, r) {
                    if (r.PLACA_CAMBIADA == 1) {
                        x = `<span class='text-dark'>` + r.PLACA_CAMBIADA_NUMERO + `</span><br>
                            <span class='text-danger'>(PLACA CAMBIADA)</span><br>
                        `
                    }
                    return x;
                }
            }, {
                data: "PARCIAL",
                title: "ESTADO ENTREGA",
                render: function (x) {
                    if (x == 1) {
                        x = "<span class='text-danger'>ENTREGA PARCIAL</span>"
                    } else {
                        x = "<span class='text-success'>ENTREGA COMPLETA</span>"

                    }
                    return x;
                }
            }, {
                data: null,
                title: "DETALLE",
                className: "btn_historial text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_historial btn btn-info"><i class="bi bi-card-list"></i></button>',
                orderable: "",
                width: 20
            }

            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6 ");
                $('td', row).eq(1).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6 ");
                $('td', row).eq(4).addClass("fw-bold fs-6 ");
                $('td', row).eq(5).addClass("fw-bold fs-6 ");
                $('td', row).eq(6).addClass("fw-bold fs-6 ");
                $('td', row).eq(7).addClass("fw-bold fs-6 ");


            },
        });
        $('#DES_TABLA_GUIAS_DESPACHADAS_HISTORIAL').on('click', 'td.btn_historial', function (respuesta) {
            var data = TABLA_.row(this).data();

            let param = {
                PEDIDO_INTERNO: data["PEDIDO_INTERNO"],
                despacho_ID: data["despacho_ID"],
            }

            funciones.Guias_Despachadas_Historial_detalle(param, function (x) {

                x = x.filter(item => (item.PARCIAL == 1 ? item.CANTIDAD_PARCIAL : item.CANTIDAD_TOTAL) != 0)
                Tabla_Guias_Despachadas_Historial_detalle(x);
            })
        });

        $('#DES_TABLA_GUIAS_DESPACHADAS_HISTORIAL').on('click', 'td.btn_ubicacion', function (respuesta) {
            var data = TABLA_.row(this).data();


            var url = "https://www.google.com/maps/search/?api=1&query=" + data["UBICACION"];
            window.open(url, "_blank");
        });

    }

    function Tabla_Guias_Despachadas_Historial_detalle(datos) {
        let TABLA_ = $('#DES_TABLA_GUIAS_DESPACHADAS_HISTORIAL_DETALLE').DataTable({
            destroy: true,
            data: datos,
            dom: 'rtip',
            order: [[0, "asc"]],
            columns: [
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
                },
                //  {
                //     data: "POR_DESPACHAR",
                //     title: "RESTANTE",
                //     render: function (x, y, r) {
                //         x = parseFloat(r.POR_DESPACHAR) - parseFloat((r.PARCIAL == 1 ? r.CANTIDAD_PARCIAL : r.CANTIDAD_TOTAL))
                //         return parseFloat(x).toFixed(2)
                //     }
                // }, 
                {
                    data: null,
                    title: "DESPACHADA",
                    render: function (x, y, r) {
                        if (r.PARCIAL == 1) {
                            x = r.CANTIDAD_PARCIAL
                        } else {
                            x = r.CANTIDAD_TOTAL
                        }
                        return parseFloat(x).toFixed(2)
                    }
                }

            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6 ");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6 ");
                $('td', row).eq(4).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(5).addClass("fw-bold fs-6 bg-primary bg-opacity-10");
                $('td', row).eq(6).addClass("fw-bold fs-6");
                $('td', row).eq(7).addClass("fw-bold fs-6 bg-success bg-opacity-10");


            },
        });
    }

    function Cargar_Filtro_Choferes(datos) {

        const result = Object.values(
            datos.reduce((acc, obj) => ({ ...acc, [obj.usuario_id]: obj }), {})
        );
        $("#GUI_DES_CHOFERES").empty();
        $("#GUI_DES_CHOFERES").append('<option value="">Todo</option>');
        result.map(function (x) {

            $("#GUI_DES_CHOFERES").append(
                ' <option value="' + x.usuario_id + '">' + x.chofer_nombre + '</option>'
            )
        })

    }

    //**** GUIAS EN PROCESO DE DESPACHO *****//

    function Cargar_Guias_Proceso_Despacho(datos) {

        $('#AD_TABLA_DATOS_EN_PROCESO_SECC').empty();
        if ($.fn.dataTable.isDataTable('#AD_TABLA_DATOS_EN_PROCESO')) {
            $('#AD_TABLA_DATOS_EN_PROCESO').DataTable().destroy();
            $('#AD_TABLA_DATOS_EN_PROCESO_SECC').empty();
        }

        let tabla = `
        <table id='AD_TABLA_DATOS_EN_PROCESO' class=' display table table-striped'>
        </table>
        `;
        $('#AD_TABLA_DATOS_EN_PROCESO_SECC').append(tabla);
        let TABLA_ = $('#AD_TABLA_DATOS_EN_PROCESO').DataTable({
            destroy: true,
            data: datos,
            dom: 'Bfrtip',
            order: [[0, "desc"]],
            buttons: [
                // {
                //     text: `<span class"fw-bold"><i class="bi bi-arrow-clockwise fs-4"></i></span>`,
                //     className: 'btn btn-info',
                //     action: function (e, dt, node, config) {
                //         Cargar_Datos();
                //     },
                // },
                {
                    extend: 'excel',
                    text: '<i class="bi bi-file-earmark-excel fs-4"></i>',
                    className: 'btn btn-primary',
                }],
            columns: [{
                data: "FECHA_SALE_PLANTA",
                title: "FECHA SALE PLANTA"
            },
            {
                data: "PEDIDO_INTERNO",
                title: "PEDIDO INTERNO"
            },
            {
                data: "Nombre",
                title: "CHOFER"
            },
            {
                data: "placa",
                title: "PLACA",

            },
            {
                data: null,
                title: "MAS",
                className: "btn_recibir text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_recibir btn btn-primary"><i class="bi bi-plus-circle fs-4"></i></button>',
                orderable: "",
                width: 20
            }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6 ");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(4).addClass("fw-bold fs-6");
                $('td', row).eq(5).addClass("fw-bold fs-6");
                let col1 = `
                    <div>`+ moment(data["FECHA_SALE_PLANTA"]).format("YYYY-MM-DD") + `</div>
                    <div class="small text-medium-emphasis">
                        <span>`+ moment(data["FECHA_SALE_PLANTA"]).format("hh:mm") + `</span>
                    </div>
                `;
                $('td', row).eq(0).html(col1);

            },
        });

        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 500);
        $('#AD_TABLA_DATOS_EN_PROCESO').on('click', 'td.btn_recibir', function (respuesta) {
            var data = TABLA_.row(this).data();


            setVisible2(true);
            setPedido(data["PEDIDO_INTERNO"]);
            // setNombreCliente(data["CLIENTE"] + " (" + data["CLIENTE_RUC"] + ")");
            // setFecha(data["FECHA_DE_EMISION"]);
            // setsolicitante(data["SOLICITANTE"]);
            // setdireccion(data["DIRECCION_1"]);
            // setpartida(data["PTO_DE_PARTIDA"]);
            // setllegada(data["PTO_DE_LLEGADA"]);
            // setdireccion2(data["DIRECCION_2"]);
            // setfactura(data["FACTURA"]);
            // settelefono(data["TELEFONO"]);
            // setvalidez(data["FECHA_VALIDEZ"]);
            // setentrega(data["TIPO_DE_ENTREGA"]);
            // setcompra(data["PED_COMPRA"]);
            // setvigente(data["VENCIDO"] == 1 ? "VIGENTE" : "VENCIDA");
            // setplaca(data["placa"] != null ? data["placa"] : "SIN ASIGNAR");
            // setchofer(data["chofer_nombre"] ? data["chofer_nombre"] : "SIN ASIGNAR");

            let param = {
                PEDIDO_INTERNO: data["PEDIDO_INTERNO"]
            }

            funciones.Cargar_Guias_Sin_Despachar_detalle(param, function (x) {

                Tabla_guias_sin_despachar_detalles(x)
            })
        });

    }

    //********* FACTURAS ******//
    function Calcular_Valor(item) {

        let SUBTOTAL_0 = $("#SUBTOTAL_0").val();
        SUBTOTAL_0 = parseFloat(SUBTOTAL_0);

        let SUBTOTAL_12 = $("#SUBTOTAL_12").val();
        SUBTOTAL_12 = parseFloat(SUBTOTAL_12);


        if (isNaN(SUBTOTAL_0) || SUBTOTAL_0 < 0) {
            SUBTOTAL_0 = 0;
        }
        if (isNaN(SUBTOTAL_12) || SUBTOTAL_12 < 0) {
            SUBTOTAL_12 = 0;
        }

        setF_SUBTOTAL_0(SUBTOTAL_0);
        setF_SUBTOTAL_12(SUBTOTAL_12);

        let iva = SUBTOTAL_12 * (parametros_iva / 100)
        iva = parseFloat(iva).toFixed(2);
        setF_IVA(iva);

        let total = parseFloat(SUBTOTAL_12) + parseFloat(iva) + parseFloat(SUBTOTAL_0);
        total = parseFloat(total).toFixed(2);

        setF_TOTAL(total);


    }

    function Cargar_facturas_Pedido(pedido) {
        let param = {
            PEDIDO_INTERNO: pedido
        }
        funciones.Cargar_facturas_Pedido(param, function (x) {

            Tabla_Cargar_facturas_Pedido(x);
        })

    }

    function Tabla_Cargar_facturas_Pedido(datos) {
        $('#DES_TABLA_GUIAS_DESPACHADAS_FACTURAS_SECC').empty();
        if ($.fn.dataTable.isDataTable('#AD_TABLA_DATOS')) {
            $('#DES_TABLA_GUIAS_DESPACHADAS_FACTURAS').DataTable().destroy();
            $('#DES_TABLA_GUIAS_DESPACHADAS_FACTURAS_SECC').empty();
        }

        var sub_0 = datos.reduce(function (acc, obj) { return acc + parseFloat(obj.factura_subtotal_0); }, 0);
        var sub_12 = datos.reduce(function (acc, obj) { return acc + parseFloat(obj.factura_subtotal_12); }, 0);
        var imp = datos.reduce(function (acc, obj) { return acc + parseFloat(obj.factura_impuesto); }, 0);
        var total = datos.reduce(function (acc, obj) { return acc + parseFloat(obj.factura_total); }, 0);

        let tabla = `
            <table id='DES_TABLA_GUIAS_DESPACHADAS_FACTURAS' class='table display table-striped' style="width:100%">
                <tfoot>
                    <tr>
                        <th style="font-size: 16px;" class="font-weight-bolder ">TOTAL</th>
                        <th style="font-size: 16px;" class="font-weight-bolder "></th>
                        <th style="font-size: 16px;" class="font-weight-bolder "></th>
                        <th style="font-size: 16px;" class="font-weight-bolder "></th>
                        <th style="font-size: 16px;" class="font-weight-bolder "></th>
                        <th style="font-size: 16px;" class="font-weight-bolder ">$`+ parseFloat(sub_0).toFixed(2) + `</th>
                        <th style="font-size: 16px;" class="font-weight-bolder ">$`+ parseFloat(sub_12).toFixed(2) + `</th>
                        <th style="font-size: 16px;" class="font-weight-bolder ">$`+ parseFloat(imp).toFixed(2) + `</th>
                        <th style="font-size: 16px;" class="font-weight-bolder ">$`+ parseFloat(total).toFixed(2) + `</th>
                    </tr>
                </tfoot>
            </table>
            `;

        $('#DES_TABLA_GUIAS_DESPACHADAS_FACTURAS_SECC').append(tabla);

        let TABLA_ = $('#DES_TABLA_GUIAS_DESPACHADAS_FACTURAS').DataTable({
            destroy: true,
            data: datos,
            dom: 'rtip',
            "pageLength": 5,
            order: [[0, "asc"]],
            columns: [{
                data: "FECHA_CREADO",
                title: "FECHA INGRESO",
            },
            {
                data: "factura_fecha",
                title: "FECHA FACTURA"
            },
            {
                data: "factura_nombre",
                title: "NOMBRE"
            }, {
                data: "factura_nota",
                title: "NOTA"
            }, {
                data: "CLIENTE_NOMBRE",
                title: "CLIENTE"
            }, {
                data: "factura_subtotal_0",
                title: "SUB 0",
                render: $.fn.dataTable.render.number(',', '.', 2, "$")

            }, {
                data: "factura_subtotal_12",
                title: "SUB 12",
                render: $.fn.dataTable.render.number(',', '.', 2, "$")
            }, {
                data: "factura_impuesto",
                title: "IMP.",
                render: $.fn.dataTable.render.number(',', '.', 2, "$")
            },
            {
                data: "factura_total",
                title: "TOTAL",
                render: $.fn.dataTable.render.number(',', '.', 2, "$")
            }

            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6 ");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6 ");
                $('td', row).eq(4).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(5).addClass("fw-bold fs-6 bg-primary bg-opacity-10");
                $('td', row).eq(6).addClass("fw-bold fs-6");
                $('td', row).eq(7).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(8).addClass("fw-bold fs-6");


            },
        });
    }

    function Guardar_Factura() {
        let FECHA = $("#FECHA_FACTURA").val();
        let SECUENCIA = $("#SECUENCIA").val();
        let FACT_NOMBRE = $("#FACT_NOMBRE").val();
        let FACT_CLIENTES = $("#FACT_CLIENTES").val();
        let NOTA = $("#NOTA").val();

        if (FECHA == "") {
            fun.Mensaje("INGRESE UNA FECHA VALIDA", "", "error");
        } else if (SECUENCIA == "") {
            fun.Mensaje("INGRESE NUMERO DE SECUENCIA", "", "error");

        } else if (FACT_NOMBRE == "") {
            fun.Mensaje("INGRESE UN NOMBRE", "", "error");
        } else if (FACT_CLIENTES == "") {
            fun.Mensaje("SELECCIONE UN CLIENTE", "", "error");
        } else {

            if (parseFloat(F_TOTAL) <= 0) {
                fun.Mensaje("EL TOTAL DE LA FACTURA NO PUEDE SER 0", "", "error");
            } else {
                let param = {
                    PEDIDO_INTERNO: Pedido,
                    FECHA: FECHA,
                    SECUENCIA: SECUENCIA,
                    FACT_NOMBRE: FACT_NOMBRE,
                    NOTA: NOTA,
                    SUBTOTAL_0: F_SUBTOTAL_0,
                    SUBTOTAL_12: F_SUBTOTAL_12,
                    IVA: F_IVA,
                    TOTAL: F_TOTAL,
                    FACT_CLIENTES: FACT_CLIENTES,
                }


                Swal.fire({
                    title: 'Estas seguro?',
                    text: "antes de continuar confirma que los datos ingreados sean los correctos!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Continuar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        funciones.Guardar_Factura(param, function (x) {

                            if (x[0] == 1) {
                                fun.Mensaje(x[1], "", "success");
                                Cargar_facturas_Pedido(Pedido);
                                Cargar_Datos();
                                $("#SECUENCIA").val("");
                                $("#FACT_NOMBRE").val("");
                                $("#NOTA").val();
                                $("#SUBTOTAL_0").val(0);
                                $("#SUBTOTAL_12").val(0);
                                setF_SUBTOTAL_0(0);
                                setF_SUBTOTAL_12(0);
                                setF_IVA("0.00");
                                setF_TOTAL("0.00");

                            } else {
                                fun.Mensaje("ERROR AL GUARDAR", x[1].toString(), "error");

                            }
                        })
                    }
                })


            }
        }
    }



    useEffect(() => {
        // Coloca aquí la lógica que deseas ejecutar cuando la página se carga
        let hoy = moment().format("YYYY-MM-DD");
        let inicio_mes = moment().startOf("month").format("YYYY-MM-DD");
        $("#AD_FECHA_INI").val(inicio_mes);
        $("#AD_FECHA_FIN").val(hoy);
        setGuias_Retiradas_Form(true);
        Cargar_Guias_Retiradas();
    }, []);
    function ajustar(item) {
        Cargar_Datos();
    }


    //******************************************************************** */
    //******************************************************************** */
    //******************************************************************** */
    //** GUIAS RETIRADAS */

    const [DATOS_RETIRADAS, setDATOS_RETIRADAS] = useState([]);


    function Cargar_Guias_Retiradas() {
        let f_ini = $("#AD_FECHA_INI").val();
        let f_fin = $("#AD_FECHA_FIN").val();
        let Estado = $("#ESTADO_RETIRADAS").val() == undefined ? 1 : $("#ESTADO_RETIRADAS").val();

        let param = {
            inicio_mes: f_ini,
            fin_mes: f_fin,
            Estado: Estado
        }
        console.log('param: ', param);
        if ($.fn.dataTable.isDataTable('#AD_TABLA_GUIAS_RETIRADAS')) {
            $('#AD_TABLA_GUIAS_RETIRADAS').DataTable().destroy();
            $('#AD_TABLA_GUIAS_RETIRADAS_SECC').empty();
        }
        let tabla = `
            <table id='AD_TABLA_GUIAS_RETIRADAS' class='table table-striped'>

            </table>
        `;
        $('#AD_TABLA_GUIAS_RETIRADAS_SECC').append(tabla);
        $('#MEN_NO_RETIRADAS').text("");
        if (Estado == 1) {
            funciones.Cargar_Guias_Retiradas_Vigentes(param, function (x) {
                // Tabla_Cargar_facturas_Pedido(x);
                Tabla_Retiradas_Vigentes(x);
            })
        } else if (Estado == 2) {
            funciones.Cargar_Guias_retiradas_Entregas(param, function (x) {
                // Tabla_Cargar_facturas_Pedido(x);
                Tabla_Retiradas_Entregas(x);
            })
        } else if (Estado == 3) {
           
            $('#MEN_NO_RETIRADAS').text("* La guias se retiraron pero no estan ingresadas");
            funciones.Cargar_Guias_retiradas_No_Ingresadas(param, function (x) {
                // Tabla_Cargar_facturas_Pedido(x);
                Tabla_Retiradas_No_Ingresadas(x);
            })
        }
    }

    function Tabla_Retiradas_Vigentes(datos) {

        let TABLA_ = $('#AD_TABLA_GUIAS_RETIRADAS').DataTable({
            destroy: true,
            data: datos,
            dom: 'rtip',
            // "pageLength": 5,
            order: [[0, "desc"]],
            columns: [{
                data: "FECHA_DE_EMISION",
                title: "FECHA_DE_EMISION",
            },
            {
                data: "PEDIDO_INTERNO",
                title: "PEDIDO_INTERNO"
            },
            {
                data: "FECHA_VALIDEZ",
                title: "FECHA_VALIDEZ"
            }, {
                data: "VENCIDO",
                title: "VENCIDO",
                render: function (x, y, r) {
                    const diferenciaEnDias = (moment(r.FECHA_VALIDEZ)).diff(moment(), 'days');

                    if (x == 1) {
                        x = `
                        <span class="text-success">Vigente</span><br>
                        <span class="text-muted">`+ r.FECHA_VALIDEZ + `</span><br>
                        <span class="text-muted">`+ diferenciaEnDias + ` días </span>
                        `
                    } else {
                        x = `
                        <span class="text-danger">Vencida</span><br>
                        <span class="text-muted">`+ r.FECHA_VALIDEZ + `</span><br>
                        <span class="text-muted">`+ diferenciaEnDias + ` días</span>
                        `
                    }
                    return x;
                }
            },
            {
                data: null,
                title: "DETALLES",
                className: "btn_detalle text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_detalle btn btn-warning"><i class="bi bi-receipt-cutoff fw-bold fs-4"></i></button>',
                orderable: "",
                width: 20
            }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6 ");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6 ");
                $('td', row).eq(4).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(5).addClass("fw-bold fs-6 bg-primary bg-opacity-10");
                $('td', row).eq(6).addClass("fw-bold fs-6");
                $('td', row).eq(7).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(8).addClass("fw-bold fs-6");

            },
        });

        $('#AD_TABLA_GUIAS_RETIRADAS').on('click', 'td.btn_detalle', function (respuesta) {
            var data = TABLA_.row(this).data();
            setVisible2(true);
            setPedido(data["PEDIDO_INTERNO"]);
            let param = {
                PEDIDO_INTERNO: data["PEDIDO_INTERNO"]
            }
            funciones.Cargar_Guias_Sin_Despachar_detalle(param, function (x) {
                Tabla_guias_sin_despachar_detalles(x)
            })
        });
    }

    function Tabla_Retiradas_Entregas(datos) {
        console.log('datos: ', datos);

        let TABLA_ = $('#AD_TABLA_GUIAS_RETIRADAS').DataTable({
            destroy: true,
            data: datos,
            dom: 'rtip',
            // "pageLength": 5,
            order: [[0, "desc"]],
            columns: [{
                data: "FECHA_DE_EMISION",
                title: "FECHA_DE_EMISION",
            },
            {
                data: "FECHA_SALE_PLANTA",
                title: "FECHA DE RETIRO",
                render: function (x, y, r) {
                    const diferenciaEnDias = (moment(r.FECHA_VALIDEZ)).diff(moment(), 'days');

                    x = `
                        <span class="text-muted">`+ moment(x).format("YYYY-MM-DD") + `</span><br>
                        <span class="text-muted">`+ moment(x).format("HH:mm A") + ` </span>
                        `
                    return x;
                }
            },
            {
                data: "PEDIDO_INTERNO",
                title: "PEDIDO_INTERNO"
            }, {
                data: "Nombre",
                title: "RETIRADO POR",

            }, {
                data: "placa",
                title: "PLACA",
            },
            {
                data: null,
                title: "DETALLES",
                className: "btn_detalle text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_detalle btn btn-warning"><i class="bi bi-receipt-cutoff fw-bold fs-4"></i></button>',
                orderable: "",
                width: 20
            }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6 ");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6 ");
                $('td', row).eq(4).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(5).addClass("fw-bold fs-6 bg-primary bg-opacity-10");
                $('td', row).eq(6).addClass("fw-bold fs-6");
                $('td', row).eq(7).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(8).addClass("fw-bold fs-6");

            },
        });

        $('#AD_TABLA_GUIAS_RETIRADAS').on('click', 'td.btn_detalle', function (respuesta) {
            var data = TABLA_.row(this).data();
            setVisible2(true);
            setPedido(data["PEDIDO_INTERNO"]);
            let param = {
                PEDIDO_INTERNO: data["PEDIDO_INTERNO"]
            }
            funciones.Cargar_Guias_Sin_Despachar_detalle(param, function (x) {
                Tabla_guias_sin_despachar_detalles(x)
            })
        });
    }

    function Tabla_Retiradas_No_Ingresadas(datos) {
        console.log('datos: ', datos);

        let TABLA_ = $('#AD_TABLA_GUIAS_RETIRADAS').DataTable({
            destroy: true,
            data: datos,
            dom: 'rtip',
            // "pageLength": 5,
            order: [[0, "desc"]],
            columns: [
                {
                    data: "FECHA_SALE_PLANTA",
                    title: "FECHA DE RETIRO",
                    render: function (x, y, r) {
                        const diferenciaEnDias = (moment(r.FECHA_VALIDEZ)).diff(moment(), 'days');

                        x = `
                        <span class="text-muted">`+ moment(x).format("YYYY-MM-DD") + `</span><br>
                        <span class="text-muted">`+ moment(x).format("hh:mm") + ` </span>
                        `
                        return x;
                    }
                },
                {
                    data: "pedido_interno",
                    title: "PEDIDO_INTERNO"
                }, {
                    data: "Nombre",
                    title: "RETIRADO POR",

                }, {
                    data: "placa",
                    title: "PLACA",
                },
                {
                    data: null,
                    title: "DETALLES",
                    className: "btn_detalle text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                    defaultContent: '<button type="button" class="btn_detalle btn btn-warning"><i class="bi bi-receipt-cutoff fw-bold fs-4"></i></button>',
                    orderable: "",
                    width: 20
                }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6 ");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6 ");
                $('td', row).eq(4).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(5).addClass("fw-bold fs-6 bg-primary bg-opacity-10");
                $('td', row).eq(6).addClass("fw-bold fs-6");
                $('td', row).eq(7).addClass("fw-bold fs-6 bg-warning bg-opacity-10");
                $('td', row).eq(8).addClass("fw-bold fs-6");

            },
        });

        $('#AD_TABLA_GUIAS_RETIRADAS').on('click', 'td.btn_detalle', function (respuesta) {
            var data = TABLA_.row(this).data();
            setVisible2(true);
            setPedido(data["PEDIDO_INTERNO"]);
            let param = {
                PEDIDO_INTERNO: data["PEDIDO_INTERNO"]
            }
            funciones.Cargar_Guias_Sin_Despachar_detalle(param, function (x) {
                Tabla_guias_sin_despachar_detalles(x)
            })
        });
    }





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
                                    <label className="required fs-6 fw-bold mb-2">Pedido estado</label>
                                    <select id='SEL_ESTADO_PEDIDO' className="form-select form-select-solid" >
                                        <option value="" className='fw-bold'>Seleccione</option>
                                        <option value="1" className='fw-bold'>SIN DESPACHAR</option>
                                        <option value="2" className='fw-bold'>DESPACHADAS</option>
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
                            <div className='mt-3 m-3'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input fs-5" name='a' type="radio" id="flexSwitchCheckDefault" defaultChecked />
                                    <label className="form-check-label fw-bold" >Por Retiro de planta</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input fs-5" name='a' type="radio" id="flexSwitchCheckChecked" />
                                    <label className="form-check-label fw-bold">Por despacho</label>
                                </div>
                            </div>
                        </div>
                        {
                            barra_visible == true && (
                                <div className='col-12 mt-3'>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a onClick={(item) => ajustar(item)} className="nav-link active fs-6 fw-bold" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">VIGENTES</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a onClick={(item) => ajustar(item)} className="nav-link fs-6 fw-bold text-danger" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">EN PROCESO DE DESPACHO</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link fs-6 fw-bold" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">DESPACHADAS</a>
                                        </li>

                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane  show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div className='col-12 mt-5'>
                                                <div className='table-responsive' id='AD_TABLA_DATOS_SECC'>
                                                    <table id='AD_TABLA_DATOS' className='table table-striped'>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane " id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className='col-12 mt-4'>
                                                <div className='row'>
                                                    <div className='col-3'>
                                                        <label className="required fs-6 fw-semibold mb-1">Estado</label>
                                                        <select name="" id="GUI_DES_ESTADO" className='form-select'>
                                                            <option value="">Todo</option>
                                                            <option value="0">Completo</option>
                                                            <option value="1">Parcial</option>
                                                        </select>
                                                    </div>
                                                    <div className='col-3'>
                                                        <label className="required fs-6 fw-semibold mb-1">Chofer</label>
                                                        <select name="" id="GUI_DES_CHOFERES" className='form-select'>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='col-12 mt-4'>
                                                    <div className='table-responsive' id='AD_TABLA_GUIAS_DESPACHADAS_GENERAL_SECC'>
                                                        <table id='AD_TABLA_GUIAS_DESPACHADAS_GENERAL' className='table table-striped'>

                                                        </table>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="tab-pane " id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                            <div className='col-12 p-2 mt-3'>

                                                <CCol sm={6} lg={4}>
                                                    <CWidgetStatsA
                                                        className="mb-5 p-2"
                                                        color="info"
                                                        value={
                                                            <>
                                                                <span className="fs-5 fw-bold">
                                                                    SAC por despachar
                                                                </span>

                                                            </>
                                                        }
                                                        title={
                                                            <>
                                                                {/* <span className="fs-6 fw-bold">Producto</span><br /> */}
                                                                <span className="fs-4 fw-bold">{PRO_SACOS_POR_DESP}</span>
                                                                <span className="fs-6 fw-bold"></span>
                                                            </>
                                                        }


                                                    />
                                                </CCol>

                                                <div className='col-12 mt-5'>
                                                    <div className='table-responsive' id='AD_TABLA_DATOS_EN_PROCESO_SECC'>
                                                        <table id='AD_TABLA_DATOS_EN_PROCESO' className='table table-striped'>

                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            Guias_Retiradas_Form == true && (


                                <div className='col-12 mt-4'>
                                    <div className='col-4'>
                                        <select onChange={Cargar_Guias_Retiradas} className='form-select' id='ESTADO_RETIRADAS'>
                                            <option value="1" className='fs-4 fw-bold'>Vigentes</option>
                                            <option value="2" className='fs-4 fw-bold'>Retiradas</option>
                                            <option value="3" className='text-danger fs-4 fw-bold'>No ingresadas !</option>
                                        </select>
                                    </div>
                                    <h4 className='text-danger fw-bold mt-2' id='MEN_NO_RETIRADAS'></h4>
                                    <div className='table-responsive mt-3' id='AD_TABLA_GUIAS_RETIRADAS_SECC'>
                                        <table id='AD_TABLA_GUIAS_RETIRADAS' className='table table-striped'>

                                        </table>
                                    </div>
                                </div>
                            )
                        }

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
                                            <table id='DES_TABLA_GUIAS_DETALLE' className='display table table-striped'>

                                            </table>
                                        </div>

                                    </div>
                                </div>


                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Cerrar
                                </CButton>
                                {/* <CButton color="primary">Guardar Cambios</CButton> */}
                            </CModalFooter>
                        </CModal>
                        <CModal size="xl" id='AD_MODAL_DETALLES2' backdrop="static" visible={visible2} onClose={() => setVisible2(false)}>
                            <CModalHeader>
                                <CModalTitle>DETALLES</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <div className='row'>
                                    <h4 className="mb-2 mb-3">Pedido Interno #
                                        <span className="text-gray-700" id="ORDEN_NUM">{Pedido}</span>
                                    </h4>

                                    <div className='col-12' >
                                        <div className='table-responsive'>
                                            <table id='DES_TABLA_GUIAS_DETALLE' className='display table table-striped'>

                                            </table>
                                        </div>

                                    </div>
                                </div>


                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible2(false)}>
                                    Cerrar
                                </CButton>
                                {/* <CButton color="primary">Guardar Cambios</CButton> */}
                            </CModalFooter>
                        </CModal>
                        <CModal size="xl" id='AD_MODAL_HISTORIAL' backdrop="static" visible={visible_h} onClose={() => setVisible_h(false)}>
                            <CModalHeader>
                                <CModalTitle>Historial de entrega</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <div className='row'>
                                    <h4 className="mb-2 mb-3">Pedido Interno #
                                        <span className="text-gray-700" id="ORDEN_NUM">{Pedido}</span>
                                    </h4>
                                    <h4 className="mb-2 mb-3">Estado:
                                        <span className={estado_despacho == 1 ? "text-danger" : "text-success"} id="ORDEN_NUM">{estado_despacho_texto}</span>
                                    </h4>

                                    <div className='col-12' >
                                        <div className='table-responsive'>
                                            <table id='DES_TABLA_GUIAS_DESPACHADAS_HISTORIAL' className='display table table-striped'>

                                            </table>
                                        </div>

                                    </div>

                                    <div className='col-12' >
                                        <div className='table-responsive'>
                                            <table id='DES_TABLA_GUIAS_DESPACHADAS_HISTORIAL_DETALLE' className='display table table-striped'>

                                            </table>
                                        </div>

                                    </div>
                                </div>

                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible_h(false)}>
                                    Cerrar
                                </CButton>
                                {/* <CButton color="primary">Guardar Cambios</CButton> */}
                            </CModalFooter>
                        </CModal>
                        <CModal size="xl" id='AD_MODAL_FACTURAS' backdrop="static" visible={visible_f} onClose={() => setVisible_f(false)}>
                            <CModalHeader>
                                <CModalTitle>Ingresar Factura</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <h4 className="mb-2 mb-3">Pedido Interno #
                                    <span className="text-gray-700" id="ORDEN_NUM">{Pedido}</span>
                                </h4>
                                <div className='row'>
                                    <div className='col-4'>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">FECHA FACTURA</label>
                                                <input id="FECHA_FACTURA" type="date" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">SECUENCIA</label>
                                                <input type="text" className="form-control" id="SECUENCIA" />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-bold">FACTURA NOMBRE</label>
                                                <input type="text" className="form-control" id="FACT_NOMBRE" placeholder="" />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-bold">CLIENTE</label>
                                                <select name="" id="FACT_CLIENTES" className='form-select'>
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-bold">NOTA</label>
                                                <input type="text" className="form-control" id="NOTA" placeholder="" />
                                            </div>

                                            <table className="table m-2">
                                                <tbody>
                                                    <tr >
                                                        <td className='fw-bold'>SUBTOTAL 0</td>
                                                        <td className="text-muted fw-bold fs-7">
                                                            <input onChange={Calcular_Valor} step={0.01} defaultValue={0} id='SUBTOTAL_0' onKeyUp={(item) => Calcular_Valor(item)} type="number" className='form-control' />
                                                        </td>
                                                    </tr>
                                                    <tr >
                                                        <td className='fw-bold'>SUBTOTAL 12</td>
                                                        <td className="text-muted fw-bold fs-7">
                                                            <input onChange={Calcular_Valor} step={0.01} defaultValue={0} id='SUBTOTAL_12' onKeyUp={(item) => Calcular_Valor(item)} type="number" className='form-control' />
                                                        </td>
                                                    </tr>
                                                    <tr >
                                                        <td className='fw-bold'>IVA</td>
                                                        <td className="text-muted fw-bold fs-5 text-end">$
                                                            <span id='IVA'>{F_IVA}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='fw-bold'>TOTAL</td>
                                                        <td className="text-muted fw-bold fs-5 text-end">$
                                                            <span id='TOTAL'>{F_TOTAL}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>

                                            </table>

                                            <div className="col-12">
                                                <button onClick={Guardar_Factura} className="btn btn-primary">Guardar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-8'>
                                        <h4>Faturas Ingresadas</h4>
                                        <div className='col-12' >
                                            <div className='table-responsive' id='DES_TABLA_GUIAS_DESPACHADAS_FACTURAS_SECC'>
                                                <table id='DES_TABLA_GUIAS_DESPACHADAS_FACTURAS' className='display table table-striped'>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible_f(false)}>
                                    Cerrar
                                </CButton>
                            </CModalFooter>
                        </CModal>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

    )

}

export default Administrar
