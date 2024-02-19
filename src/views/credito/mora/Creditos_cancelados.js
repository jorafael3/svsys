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
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { func } from 'prop-types';

var TIPO_CARTERA = 2;

function Creditos_Cancelados() {

    const [DATOS_CANCELADOS, setDATOS_CANCELADOS] = useState([]);
    const [DATOS_CANCELADOS_SMS, setDATOS_CANCELADOS_SMS] = useState([]);
    const [DATOS_CANCELADOS_PREDICTIVA, setDATOS_CANCELADOS_PREDICTIVA] = useState([]);
    const [DATOS_CANCELADOS_WHAT, setDATOS_CANCELADOS_WHAT] = useState([]);

    // const [TIPO_CARTERA, setTIPO_CARTERA] = useState(1);


    function Cargar_Creditos_Cancelados() {

        let url = "mora/Cargar_Creditos_Cancelados"
        let param = {
            TIPO_CARTERA: TIPO_CARTERA
        }
        console.log('param: ', param);
        ajax.AjaxSendReceiveData(url, param, function (x) {
            console.log('x: ', x);
            $("#SECC_INFO").show();

            x.map(function (obj) {
                let a = (obj.TipoCancelacion).trim()
                if (a != null || a != "") {
                    if (obj.EstadoCredito == "VIGENTE") {
                        if (a == "-1" || a == "") {
                            a = "1-CUOTA-RESTANTE"
                        }
                    }
                    if (a == "PRECANCELACIÓN" || a == "PRECANCELACI�N") {
                        a = "PRECANCELACION"
                    }
                    a = a.replace(" ", '-')
                    a = a.replace(", ", '-')
                }
                obj.TipoCancelacion = a

                if (a == "VENTA-CARTERA-PASIVA" || a == "VENTA-CARTERA,-PASIVA" || a == "VENTA-CARTERA") {
                    obj.TipoCancelacion_filtro = "FONDO_GARANTIA"
                } else if (a == "PRECANCELACION") {
                    obj.TipoCancelacion_filtro = "ANULADOS"
                } else if (a == "REESTRUCTURA") {
                    obj.TipoCancelacion_filtro = "REFINANCIAMIENTO"
                } else {
                    obj.TipoCancelacion_filtro = a
                }
                //** PLANTILLA SMS */

                obj.telefono = obj.DispositivoNotificacion == -1 ? "" : obj.DispositivoNotificacion
                obj.cuota = obj.ValorCuota
                obj.contrato = obj.NumeroCredito == -1 ? "" : obj.NumeroCredito

                //** PREDICTIVA */
                obj.pr_nombre = obj.Cliente
                obj.pr_apellido = ""
                obj.pr_tipoid = "cc"
                obj.pr_id = obj.Identificacion
                obj.pr_edad = ""
                obj.pr_sexo = ""
                obj.pr_pais = ""
                obj.pr_departamento = ""
                obj.pr_ciudad = ""
                obj.pr_zona = ""
                obj.pr_direccion = ""
                obj.pr_opt1 = obj.NumeroCredito == -1 ? "" : obj.NumeroCredito
                obj.pr_opt2 = obj.ValorCuota
                obj.pr_opt4 = ""
                obj.pr_opt5 = ""
                obj.pr_opt6 = ""
                obj.pr_opt7 = ""
                obj.pr_opt8 = ""
                obj.pr_opt9 = ""
                obj.pr_opt10 = ""
                obj.pr_opt11 = ""
                obj.pr_opt12 = ""
                obj.pr_tel1 = obj.DispositivoNotificacion == -1 ? "" : obj.DispositivoNotificacion
                obj.pr_tel2 = obj.TelefonoDomicilio_01 == -1 ? "" : obj.TelefonoDomicilio_01
                obj.pr_tel4 = obj.TelefonoDomicilio_02 == -1 ? "" : obj.TelefonoDomicilio_02
                obj.pr_tel5 = obj.TelefonoDomicilio_03 == -1 ? "" : obj.TelefonoDomicilio_03
                obj.pr_tel6 = obj.TelefonoLaboral_01 == -1 ? "" : obj.TelefonoLaboral_01
                obj.pr_tel7 = obj.TelefonoLaboral_02 == -1 ? "" : obj.TelefonoLaboral_02
                obj.pr_tel8 = obj.TelefonoLaboral_03 == -1 ? "" : obj.TelefonoLaboral_03
                obj.pr_tel9 = obj.TelefonoNegocio_01 == -1 ? "" : obj.TelefonoNegocio_01
                obj.pr_tel10 = obj.TelefonoNegocio_02 == -1 ? "" : obj.TelefonoNegocio_02
                obj.pr_tel11 = obj.TelefonoNegocio_03 == -1 ? "" : obj.TelefonoNegocio_03
                obj.pr_email = ""

                //*** WHATP */

                obj.w_nombre = obj.Cliente
                obj.w_tel = obj.DispositivoNotificacion == -1 ? "" : obj.DispositivoNotificacion
                obj.w_contrato = obj.NumeroCredito == -1 ? "" : obj.NumeroCredito
                obj.w_cuota = obj.ValorCuota
                obj.w_variable3 = ""
                obj.w_variable4 = ""
                obj.w_variable5 = ""
                obj.w_variable6 = ""
                obj.w_variable7 = ""
                obj.w_variable8 = ""
                obj.w_variable9 = ""
                obj.w_variable10 = ""

            })

            // x.map(function(obj){

            // })





            let datos = x.filter(item => item.EstadoCredito == "CANCELADO" || (item.CuotasRestantes <= 1 && item.EstadoCredito == "VIGENTE"));
            setDATOS_CANCELADOS(datos);

            // let uniqueChoferIdsMap = new Map();
            // x.forEach(item => {
            //     uniqueChoferIdsMap.set(item.TipoCancelacion, item);
            // });
            // // Obteniendo un array de objetos únicos
            // let uniqueObjects = Array.from(uniqueChoferIdsMap.values());

            let unique = [...new Set(datos.map(item => item.TipoCancelacion_filtro))];


            let ARRAY_TIPOS_CANCELACION = [];
            unique.map(function (x) {
                let texto = x;
                // if (x == "VENTA-CARTERA-PASIVA" || x == "VENTA-CARTERA") {
                //     texto = "FONDO DE GARANTIA";
                // } else if (x == "REESTRUCTURA") {
                //     texto = "REFINANCIAMIENTO";
                // }
                let b = {
                    value: x,
                    texto: texto
                }
                ARRAY_TIPOS_CANCELACION.push(b)
            });




            $("#TIPO_CANCELACION").empty()
            // $("#TIPO_CANCELACION").append("<option class='fw-bold fs-5' value='TODO'>TODO</option>")
            ARRAY_TIPOS_CANCELACION.map(function (x) {
                // if ((x.TipoCancelacion).trim() == "") {
                //     x.TipoCancelacion = "1-CUOTA-RESTANTE"
                // }
                $("#TIPO_CANCELACION").append("<option class='fw-bold fs-5' value=" + x.value + ">" + x.texto + "</option>")
            });

            $("#TIPO_CANCELACION").val("NORMAL").trigger("change")

            let datafiltrada = datos.filter(item => (item.TipoCancelacion).trim() == "NORMAL")

            Tabla_Creditos_Cancelados(datafiltrada);
            Pie_Cancelados(datos);
            line_cancelados(datafiltrada);
            Pie_Plazo(datafiltrada);
            Tabla_Rango_Monto(datos);
        });
    }

    function Tabla_Creditos_Cancelados(datos) {


        $('#TABLA_CR_CANCELADOS').empty();
        if ($.fn.dataTable.isDataTable('#TABLA_CR_CANCELADOS')) {
            $('#TABLA_CR_CANCELADOS').DataTable().destroy();
            $('#SECC_TABLA_CR_CANCELADOS').empty();
        }
        let tabla = `
            <table id='TABLA_CR_CANCELADOS' class='table display table-striped'>
            </table>
        `;
        $('#SECC_TABLA_CR_CANCELADOS').append(tabla);

        var allColumns = Array.from({ length: 41 }, (_, i) => i);
        var sms = Array.from({ length: 3 }, (_, i) => i + 41);
        var predic = Array.from({ length: 32 }, (_, i) => i + 44);
        var what = Array.from({ length: 12 }, (_, i) => i + 76);

        let TABLA_ = $('#TABLA_CR_CANCELADOS').DataTable({
            destroy: true,
            data: datos,
            dom: 'Bfrtip',
            paging: true,
            pageLength: 5,
            // info: false,
            buttons: [{
                extend: 'excelHtml5',
                text: 'EXCEL COMPLETO',
                exportOptions: {
                    columns: allColumns // Exportar solo las columnas 0, 1 y 2
                }
            },
            {
                extend: 'excelHtml5',
                text: 'SMS',
                exportOptions: {
                    columns: sms // Exportar solo las columnas 0, 1 y 2
                }
            },
            {
                extend: 'excelHtml5',
                text: 'PREDICTIVO',
                exportOptions: {
                    columns: predic // Exportar solo las columnas 0, 1 y 2
                }
            },
            {
                extend: 'excelHtml5',
                text: 'WHATSAPP',
                exportOptions: {
                    columns: what // Exportar solo las columnas 0, 1 y 2
                }
                // action: function (e, dt, node, config) {
                //     var dataToExport = datos.map(function(row) {
                //         return {
                //             Name: row.Identificacion,
                //             Age: row.NumeroCredito,
                //         };
                //     });
                //     console.log('dataToExport: ', dataToExport);
                //     $.fn.dataTable.ext.buttons.excelHtml5.action.call(this, e, dt, node, config, dataToExport);

                // }
            }],
            scrollCollapse: true,
            scrollX: true,
            order: [[0, "desc"]],
            columnDefs: [
                { width: 100, targets: 0 },
                { width: 300, targets: 1 },
            ],
            fixedColumns: {
                left: 2
            },
            columns: [{
                data: "FechaCorte",
                title: "FECHA CORTE",
                // width: 130
            },
            {
                "data": "Identificacion",
                "title": "CLIENTE"
            },
            {
                "data": "Cliente",
                "title": "CLIENTE",
                visible: false
            },
            {
                "data": "NumeroCredito",
                "title": "NUMERO DE CREDITO",
                visible: false
            },
            {
                "data": "NumeroCreditoNuevo",
                "title": "NUMERO DE CREDITO NUEVO",
                visible: false
            },
            {
                "data": "Oficina",
                "title": "OFICINA",
                visible: false
            },

            {
                "data": "OrigenCredito",
                "title": "ORIGEN DEL CREDITO",
                visible: false
            },
            {
                "data": "EstadoCredito",
                "title": "EstadoCredito",
                visible: false
            },
            {
                "data": "TipoCartera",
                "title": "TipoCartera",
                visible: false
            },
            {
                "data": "TipoTablaAmortizacion",
                "title": "TipoTablaAmortizacion",
                visible: false
            },
            {
                "data": "TipoGracia",
                "title": "TipoGracia",
                visible: false
            },
            {
                "data": "PeriodosGracia",
                "title": "PeriodosGracia",
                visible: false
            },
            {
                "data": "DispositivoNotificacion",
                "title": "CELULAR"
            },
            {
                "data": "CuotaImpaga",
                "title": "CUOTA IMPAGA"
            },
            {
                "data": "ValorCuota",
                "title": "VALOR CUOTA"
            },
            {
                "data": "AtrasoMaximo",
                "title": "ATRASO MAX"
            },
            {
                "data": "Atraso",
                "title": "ATRASO",
            },
            {
                "data": "TipoCancelacion",
                "title": "TIPO DE CANCELACION",
                visible: false
            },
            {
                "data": "MontoOriginal",
                "title": "MONTO ORIGINAL"
            },
            {
                "data": "PlazoOriginal",
                "title": "PLAZO ORIGINAL"
            },
            {
                "data": "Saldo",
                "title": "Saldo"
            },
            {
                "data": "ValorAPagar",
                "title": "ValorAPagar"
            },
            {
                "data": "FechaDesembolso",
                "title": "FechaDesembolso"
            },
            {
                "data": "FechaPrimerVencimiento",
                "title": "FechaPrimerVencimiento"
            },
            {
                "data": "FechaVencimiento",
                "title": "FechaVencimiento"
            },
            {
                "data": "FechaCancelacion",
                "title": "FechaCancelacion"
            },
            {
                "data": "CuotasRestantes",
                "title": "CUOTAS RESTANTES"
            },
            {
                "data": "CuotaImpaga",
                "title": "CuotaImpaga"
            },
            {
                "data": "Celular_01",
                "title": "CELULAR 01"
            },
            {
                "data": "Celular_02",
                "title": "CELULAR 02"
            },
            {
                "data": "Celular_03",
                "title": "CELULAR 03"
            },
            {
                "data": "TelefonoNegocio_01",
                "title": "TELEFONO DE NEGOCIO 01"
            },
            {
                "data": "TelefonoNegocio_02",
                "title": "TELEFONO DE NEGOCIO 02"
            },
            {
                "data": "TelefonoNegocio_03",
                "title": "TELEFONO DE NEGOCIO 03"
            },
            {
                "data": "TelefonoDomicilio_01",
                "title": "TELEFONO DOMICILIO 01"
            },
            {
                "data": "TelefonoDomicilio_02",
                "title": "TELEFONO DOMICILIO 02"
            },
            {
                "data": "TelefonoDomicilio_03",
                "title": "TELEFONO DOMICILIO 03"
            },
            {
                "data": "TelefonoLaboral_01",
                "title": "TELEFONO LABORAL 01"
            },
            {
                "data": "TelefonoLaboral_02",
                "title": "TELEFONO LABORAL 02"
            },
            {
                "data": "TelefonoLaboral_03",
                "title": "TELEFONO LABORAL 03"
            },
            {
                "data": "telefono",
                "title": "TELEFONO LABORAL 03"
            },

            //** SMS */
            { visible: false, data: 'telefono', title: 'Teléfono' },
            { visible: false, data: 'cuota', title: 'Cuota' },
            { visible: false, data: 'contrato', title: 'Contrato' },
                //* PREDICTIVA  */
            { visible: false, data: 'pr_nombre', title: 'Nombre' },
            { visible: false, data: 'pr_apellido', title: 'Apellido' },
            { visible: false, data: 'pr_tipoid', title: 'Tipo de ID' },
            { visible: false, data: 'pr_id', title: 'ID' },
            { visible: false, data: 'pr_edad', title: 'Edad' },
            { visible: false, data: 'pr_sexo', title: 'Sexo' },
            { visible: false, data: 'pr_pais', title: 'País' },
            { visible: false, data: 'pr_departamento', title: 'Departamento' },
            { visible: false, data: 'pr_ciudad', title: 'Ciudad' },
            { visible: false, data: 'pr_zona', title: 'Zona' },
            { visible: false, data: 'pr_direccion', title: 'Dirección' },
            { visible: false, data: 'pr_opt1', title: 'Opt1' },
            { visible: false, data: 'pr_opt2', title: 'Opt2' },
            { visible: false, data: 'pr_opt4', title: 'Opt4' },
            { visible: false, data: 'pr_opt5', title: 'Opt5' },
            { visible: false, data: 'pr_opt6', title: 'Opt6' },
            { visible: false, data: 'pr_opt7', title: 'Opt7' },
            { visible: false, data: 'pr_opt8', title: 'Opt8' },
            { visible: false, data: 'pr_opt9', title: 'Opt9' },
            { visible: false, data: 'pr_opt10', title: 'Opt10' },
            { visible: false, data: 'pr_opt11', title: 'Opt11' },
            { visible: false, data: 'pr_opt12', title: 'Opt12' },
            { visible: false, data: 'pr_tel1', title: 'Teléfono 1' },
            { visible: false, data: 'pr_tel2', title: 'Teléfono 2' },
            { visible: false, data: 'pr_tel4', title: 'Teléfono 4' },
            { visible: false, data: 'pr_tel5', title: 'Teléfono 5' },
            { visible: false, data: 'pr_tel6', title: 'Teléfono 6' },
            { visible: false, data: 'pr_tel7', title: 'Teléfono 7' },
            { visible: false, data: 'pr_tel8', title: 'Teléfono 8' },
            { visible: false, data: 'pr_tel9', title: 'Teléfono 9' },
            { visible: false, data: 'pr_tel10', title: 'Teléfono 10' },
            { visible: false, data: 'pr_tel11', title: 'Teléfono 11' },
                //** WHATPS */
            { visible: false, data: 'w_nombre', title: 'Nombre' },
            { visible: false, data: 'w_tel', title: 'Teléfono' },
            { visible: false, data: 'w_contrato', title: 'Contrato' },
            { visible: false, data: 'w_cuota', title: 'Cuota' },
            { visible: false, data: 'w_variable3', title: 'Variable 3' },
            { visible: false, data: 'w_variable4', title: 'Variable 4' },
            { visible: false, data: 'w_variable5', title: 'Variable 5' },
            { visible: false, data: 'w_variable6', title: 'Variable 6' },
            { visible: false, data: 'w_variable7', title: 'Variable 7' },
            { visible: false, data: 'w_variable8', title: 'Variable 8' },
            { visible: false, data: 'w_variable9', title: 'Variable 9' },
            { visible: false, data: 'w_variable10', title: 'Variable 10' }

            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-7 ");
                $('td', row).eq(1).addClass("fw-bold fs-7 ");
                $('td', row).eq(2).addClass("fw-bold fs-7 ");
                $('td', row).eq(3).addClass("fw-bold fs-7 ");
                $('td', row).eq(4).addClass("fw-bold fs-7 ");
                $('td', row).eq(5).addClass("fw-bold fs-7 bg-warning bg-opacity-10");
                $('td', row).eq(6).addClass("fw-bold fs-7 ");
                $('td', row).eq(7).addClass("fw-bold fs-7 ");
                for (let i = 6; i <= 40; i++) {
                    $('td', row).eq(i).addClass("fw-bold fs-7");
                }
                // if (data["EstadoCredito"] == "VIGENTE") {
                //     $('td', row).eq(2).addClass("text-primary");
                // } else {
                //     $('td', row).eq(2).addClass("text-success");
                // }
                let c1 = `
                <span class="text-dark">Num. Credito:<span><br>
                <span class="text-dark">`+ data["NumeroCredito"] + `<span><br>
                <span class="text-muted">`+ data["FechaCorte"] + `<span><br>
                `
                let c2 = `
                <span class="text-muted">`+ data["Identificacion"] + `<span><br>
                <span class="text-dark">`+ data["Cliente"] + `<span><br>
                `
                $('td', row).eq(0).html(c1);
                $('td', row).eq(1).html(c2);
            },
        })
    }

    function filtrar_Cancelados() {
        let ESTADO = $("#TIPO_CANCELACION").val()

        let datafiltrada = DATOS_CANCELADOS


        if (ESTADO != "TODO") {
            // if (ESTADO == "1-CUOTA-RESTANTE") {
            //     ESTADO = ""
            // }
            datafiltrada = datafiltrada.filter(item => (item.TipoCancelacion_filtro).trim() == ESTADO)
        }


        Tabla_Creditos_Cancelados(datafiltrada)
        line_cancelados(datafiltrada);
        Pie_Plazo(datafiltrada);

    }

    function Pie_Cancelados(data) {

        let unique = [...new Set(data.map(item => item.TipoCancelacion))];

        let ARRAY = []
        unique.map(function (x) {
            let fil = data.filter(item => item.TipoCancelacion == x)
            if (x == "") x = "1-CUOTA-RESTANTE"
            let b = {
                ESTADO: x,
                CANTIDAD: fil.length
            }
            ARRAY.push(b);
        });




        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            var chart = am4core.create("CANCELADOS_PIE", am4charts.PieChart3D);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

            // chart.legend = new am4charts.Legend();
            chart.legend = new am4charts.Legend();
            chart.legend.position = "right";
            chart.legend.scrollable = true;
            chart.legend.maxHeight = 250;

            chart.data = ARRAY

            var series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "CANTIDAD";
            series.dataFields.category = "ESTADO";
            series.ticks.template.disabled = true;
            series.alignLabels = false;
            series.labels.template.text = "{value.percent.formatNumber('#.0')}%";
            series.labels.template.radius = am4core.percent(-40);
            series.labels.template.fill = am4core.color("white");
            series.colors.list = [
                am4core.color("#845EC2"),
                am4core.color("#D65DB1"),
                am4core.color("#FF6F91"),
                am4core.color("#FF9671"),
                am4core.color("#FFC75F"),
                am4core.color("#F9F871"),
            ];
        }); // end am4core.ready()

    }

    function Pie_Plazo(data) {


        let unique = [...new Set(data.map(item => item.PlazoOriginal))];


        let ARRAY = []
        unique.map(function (x) {
            let fil = data.filter(item => item.PlazoOriginal == x)
            let b = {
                ESTADO: x,
                CANTIDAD: fil.length
            }
            ARRAY.push(b);
        });

        ARRAY.sort(function (a, b) {
            if (parseInt(a.ESTADO) > parseInt(b.ESTADO)) {
                return 1;
            }
            if (parseInt(a.ESTADO) < parseInt(b.ESTADO)) {
                return -1;
            }
            return 0;
        });


        am4core.ready(function () {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            var chart = am4core.create("PLAZO_PIE", am4charts.PieChart3D);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
            // chart.legend = new am4charts.Legend();
            chart.legend = new am4charts.Legend();
            chart.legend.position = "right";
            chart.legend.scrollable = true;
            chart.legend.maxHeight = 250;
            chart.legend.labels.template.text = "Plazo: [bold]{name}[/]({CANTIDAD})";
            chart.data = ARRAY

            var series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "CANTIDAD";
            series.dataFields.category = "ESTADO";
            series.ticks.template.disabled = true;
            series.alignLabels = false;
            series.labels.template.text = "{value.percent.formatNumber('#.0')}%";
            series.labels.template.radius = am4core.percent(-40);
            series.labels.template.fill = am4core.color("white");
            // series.colors.list = [
            //     am4core.color("#845EC2"),
            //     am4core.color("#D65DB1"),
            //     am4core.color("#FF6F91"),
            //     am4core.color("#FF9671"),
            //     am4core.color("#FFC75F"),
            //     am4core.color("#F9F871"),
            // ];
        }); // end am4core.ready()

    }

    function line_cancelados(data) {

        let ARRAY = [];
        let unique = [...new Set(data.map(item => item.FechaCorte))];

        unique.map(function (x) {
            let can = data.filter(i => i.FechaCorte == x && i.EstadoCredito == "CANCELADO")
            let vig = data.filter(i => i.FechaCorte == x && i.EstadoCredito == "VIGENTE")

            let b = {
                FECHA: x,
                CANCELADOS: can.length,
                VIGENTES: vig.length,
            }
            ARRAY.push(b)
        });

        ARRAY.sort((a, b) => {
            if (a.FECHA < b.FECHA) {
                return -1;
            }
            if (a.FECHA > b.FECHA) {
                return 1;
            }
            return 0;
        });

        am4core.ready(function () {

            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("CANCELADOS_LINE", am4charts.XYChart);

            chart.data = ARRAY;

            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 50;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.logarithmic = true;
            valueAxis.renderer.minGridDistance = 20;

            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.name = "Cancelados"
            series.dataFields.valueY = "CANCELADOS";
            series.dataFields.dateX = "FECHA";
            series.tensionX = 0.8;
            series.strokeWidth = 2;
            series.stroke = am4core.color("#4680ff");
            series.tooltipText = `{CANCELADOS}`;
            series.fill = am4core.color("#4680ff");


            var series2 = chart.series.push(new am4charts.LineSeries());
            series2.name = "1 cuota restante"
            series2.dataFields.valueY = "VIGENTES";
            series2.dataFields.dateX = "FECHA";
            series2.tensionX = 0.8;
            series2.strokeWidth = 2;
            series2.stroke = am4core.color("#F39C12");
            series2.tooltipText = `{VIGENTES}`;
            series2.fill = am4core.color("#F39C12");

            // var bullet = series.bullets.push(new am4charts.CircleBullet());
            // bullet.circle.fill = am4core.color("#fff");
            // bullet.circle.strokeWidth = 1;

            // Add cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = dateAxis;
            chart.cursor.lineX.strokeWidth = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.chartContainer.wheelable = true;
            // Add scrollbar
            chart.scrollbarX = new am4core.Scrollbar();

            chart.legend = new am4charts.Legend();
            chart.legend.parent = chart.plotContainer;
            chart.legend.zIndex = 100;
            // Add a guide
            // let range = valueAxis.axisRanges.create();
            // range.value = 90.4;
            // range.grid.stroke = am4core.color("#396478");
            // range.grid.strokeWidth = 1;
            // range.grid.strokeOpacity = 1;
            // range.grid.strokeDasharray = "3,3";
            // range.label.inside = true;
            // range.label.text = "Average";
            // range.label.fill = range.grid.stroke;
            // range.label.verticalCenter = "bottom";

        }); // end am4core.ready()
    }

    function Tabla_Rango_Monto(data) {

        let unique = [...new Set(data.map(item => item.RANGO))];

        let ARRAY = [];
        unique.map(function (x) {
            let fil = data.filter(i => i.RANGO == x);
            let pos = 0
            if (x == "500-1000") {
                pos = 1;
            } else if (x == "1000-1500") {
                pos = 2;
            } else if (x == "1500-2000") {
                pos = 3;
            } else if (x == "2000 >") {
                pos = 4;
            }
            let b = {
                RANGO: x,
                CANTIDAD: fil.length,
                POS: pos
            }
            ARRAY.push(b)
        })



        $('#TABLA_CR_CANCELADOS_RANGO').empty();
        if ($.fn.dataTable.isDataTable('#TABLA_CR_CANCELADOS_RANGO')) {
            $('#TABLA_CR_CANCELADOS_RANGO').DataTable().destroy();
            $('#SECC_TABLA_CR_CANCELADOS_RANGO').empty();
        }
        let tabla = `
            <table id='TABLA_CR_CANCELADOS_RANGO' class='table display table-striped'>
            </table>
        `;
        $('#SECC_TABLA_CR_CANCELADOS_RANGO').append(tabla);
        let TABLA_ = $('#TABLA_CR_CANCELADOS_RANGO').DataTable({
            destroy: true,
            data: ARRAY,
            dom: 'rtip',
            paging: false,
            pageLength: 5,
            info: false,
            buttons: ["excel"],
            order: [[2, "asc"]],
            // scrollCollapse: true,
            // scrollX: true,
            // columnDefs: [
            //     { width: 100, targets: 0 },
            //     { width: 300, targets: 2 },
            // ],
            columns: [
                {
                    "data": "RANGO",
                    "title": "MONTO ORIGINAL",
                    className: "text-start"
                },
                {
                    "data": "CANTIDAD",
                    "title": "CANTIDAD",
                    className: "text-center"
                },
                {
                    "data": "POS",
                    "title": "POS",
                    className: "text-center",
                    visible: false
                }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-7 ");
                $('td', row).eq(1).addClass("fw-bold fs-7 ");
                $('td', row).eq(2).addClass("fw-bold fs-7 ");
                $('td', row).eq(3).addClass("fw-bold fs-7 bg-warning bg-opacity-10");
                $('td', row).eq(4).addClass("fw-bold fs-7 bg-light");
                $('td', row).eq(5).addClass("fw-bold fs-7 ");
            },
        })
    }

    useEffect(() => {

        Cargar_Creditos_Cancelados();

    }, []);

    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Creditos cancelados</strong>
                </CCardHeader>
                <CCardBody>

                    <div className='col-12 mb-2'>
                        <div className='col-12 mb-3'>
                            <h4>Cartera</h4>
                            <button onClick={() => {
                                TIPO_CARTERA = 1
                                Cargar_Creditos_Cancelados()
                            }} className='btn btn-outline-success fw-bold fs-4'>CARTERA 1</button>
                            <button onClick={() => {
                                TIPO_CARTERA = 2
                                Cargar_Creditos_Cancelados()
                            }} className='btn btn-outline-info fw-bold m-2 fs-4'>CARTERA 2</button>
                        </div>
                        <div id='SECC_INFO' style={{ display: "none" }}>
                            <div className='col-3' >
                                <h6>Tipo de Cancelacion</h6>
                                <select onChange={filtrar_Cancelados} className='form-select' id="TIPO_CANCELACION">

                                </select>
                            </div>
                            <div className='col-12 mt-4'>
                                <div className='table-responsive' id='SECC_TABLA_CR_CANCELADOS'>
                                    <table id='TABLA_CR_CANCELADOS' className='table display table-striped'>

                                    </table>
                                </div>
                            </div>
                            <div className='row p-5'>
                                <div className='col-6'>
                                    <h5> TIPO DE CANCELACION</h5>
                                    <div id='CANCELADOS_PIE' style={{ height: 300 }}></div>
                                </div>
                                <div className='col-6'>
                                    <h5>PLAZO</h5>
                                    <div id='PLAZO_PIE' style={{ height: 300 }}></div>
                                </div>
                                <div className='col-6'>
                                    <div id='CANCELADOS_LINE' style={{ height: 300 }}></div>
                                </div>
                                <div className='col-6'>
                                    <div className='table-responsive' id='SECC_TABLA_CR_CANCELADOS_RANGO'>
                                        <table id='TABLA_CR_CANCELADOS_RANGO' className='table display table-striped'>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>

                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default Creditos_Cancelados
