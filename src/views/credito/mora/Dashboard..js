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


function Dashboard() {

    const options = {
        style: 'currency',
        currency: 'USD', // Puedes cambiar a la moneda que desees (por ejemplo, 'EUR' para euros)
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    const options2 = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    const [DATOS_TOTALES, setDATOS_TOTALES] = useState([]);
    const [DATOS_TOTALES_CORTE, setDATOS_TOTALES_CORTE] = useState([]);



    function Cargar_Dasboard() {
        let url = "mora/Cargar_Dashboard"

        ajax.AjaxSendReceiveData(url, [], function (x) {


            let cliCreditosMora = x;
            // // Función para obtener el número de filas para cada registro
            const obtenerRowNum = (registro) => {
                return cliCreditosMora.filter(cr => cr.Identificacion === registro.Identificacion && new Date(cr.FechaCorte) >= new Date(registro.FechaCorte)).length;
            };
            // // Agregar la columna RowNum a cada registro
            const resultados = cliCreditosMora.map(cr => ({
                ...cr,
                RowNum: obtenerRowNum(cr),
            }));

            let datos = resultados
                .filter(r => r.RowNum === 1 && r.EstadoCredito === "VIGENTE" && !resultados.some(r2 => r2.Identificacion === r.Identificacion && r2.RowNum > r.RowNum && r2.EstadoCredito === "CANCELADO"));


            setDATOS_TOTALES(resultados);
            setDATOS_TOTALES_CORTE(datos);


            EVOLUCION_MOROSIDAD_TABLA(datos);
            POR_PLAZO(datos)
            POR_MONTO(datos)
            // let EVOLUCION_MOROSIDAD_GRAFICO_ = x["EVOLUCION_MOROSIDAD_GRAFICO"];
            // let EVOLUCION_MOROSIDAD_TABLA_ = x["EVOLUCION_MOROSIDAD_TABLA"];
            // let CARTERA_POR_ESTADO_ = x["CARTERA_POR_ESTADO"];

            // EVOLUCION_MOROSIDAD_GRAFICO(EVOLUCION_MOROSIDAD_GRAFICO_);
            // EVOLUCION_MOROSIDAD_TABLA(EVOLUCION_MOROSIDAD_TABLA_);
            // CARTERA_POR_ESTADO(EVOLUCION_MOROSIDAD_TABLA_)
        })

    }

    //** */ EVOLUCION MOROCIDAD

    function CARGAR_EVOLUCION_MOROSIDAD_GRAFICO() {
        let url = "mora/CARGAR_EVOLUCION_MOROSIDAD_GRAFICO"
        ajax.AjaxSendReceiveData(url, [], function (x) {


            EVOLUCION_MOROSIDAD_GRAFICO(x)
        });
    }

    function EVOLUCION_MOROSIDAD_GRAFICO(datos) {

        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart
            var chart = am4core.create("chart_evolucion", am4charts.XYChart);

            var data = [];
            var price1 = 1000, price2 = 1200;
            var quantity = 30000;
            for (var i = 0; i < 360; i++) {
                price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
                data.push({ date1: new Date(2015, 0, i), price1: price1 });
            }
            for (var i = 0; i < 360; i++) {
                price2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
                data.push({ date2: new Date(2017, 0, i), price2: price2 });
            }

            chart.data = datos;

            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.labels.template.fill = am4core.color("#e59165");

            var dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis2.renderer.grid.template.location = 0;
            dateAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.labels.template.fill = am4core.color("#e59165");

            valueAxis.renderer.minWidth = 60;

            var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis2.tooltip.disabled = true;
            valueAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
            valueAxis2.renderer.minWidth = 60;
            valueAxis2.syncWithAxis = valueAxis;

            var series = chart.series.push(new am4charts.LineSeries());
            series.name = "saldo";
            series.dataFields.dateX = "ReportDate";
            series.dataFields.valueY = "Saldo";
            series.tooltipText = "{valueY.value}";
            series.fill = am4core.color("#52BE80");
            series.stroke = am4core.color("#52BE80");
            //series.strokeWidth = 3;
            series.fillOpacity = 0.3;

            var series2 = chart.series.push(new am4charts.LineSeries());
            series2.name = "Mora 30";
            series2.dataFields.dateX = "ReportDate";
            series2.dataFields.valueY = "Atraso30";
            series2.yAxis = valueAxis2;
            series2.xAxis = dateAxis2;
            series2.tooltipText = "{valueY.value}";
            series2.fill = am4core.color("#dfcc64");
            series2.stroke = am4core.color("#dfcc64");
            series2.strokeWidth = 3;
            series2.showOnInit = true;
            var bullet = series2.bullets.push(new am4charts.CircleBullet());
            bullet.circle.fill = am4core.color("#fff");
            bullet.circle.strokeWidth = 1;
            bullet.circle.radius = 3;
            bullet.label = new am4core.Label();
            bullet.label.text = "{Atraso30}";
            bullet.label.fill = am4core.color("#000");
            bullet.label.fontSize = 10;
            bullet.label.dy = -15;


            chart.cursor = new am4charts.XYCursor();
            chart.cursor.xAxis = dateAxis2;

            var scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            chart.scrollbarX = scrollbarX;

            chart.legend = new am4charts.Legend();
            chart.legend.parent = chart.plotContainer;
            chart.legend.zIndex = 100;

            valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
            dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
            dateAxis.renderer.grid.template.strokeOpacity = 0.07;
            valueAxis.renderer.grid.template.strokeOpacity = 0.07;

        }); // end am4core.ready()
    }

    function CARGAR_EVOLUCION_MOROSIDAD_TABLA() {
        let url = "mora/CARGAR_EVOLUCION_MOROSIDAD_TABLA"
        ajax.AjaxSendReceiveData(url, [], function (x) {

            EVOLUCION_MOROSIDAD_TABLA(x)
        });

    }

    function EVOLUCION_MOROSIDAD_TABLA(ARRAY) {

        const newarray = JSON.parse(JSON.stringify(ARRAY));

        function calcularRango(registro) {
            const rangoDias = Math.abs((new Date(registro.FechaVencimiento) - new Date(registro.FechaCorte)) / (1000 * 60 * 60 * 24));

            switch (true) {
                case rangoDias >= 1 && rangoDias <= 8:
                    return "DE 1 A 8 DIAS";
                case rangoDias >= 9 && rangoDias <= 15:
                    return "DE 8 A 15 DIAS";
                case rangoDias >= 16 && rangoDias <= 30:
                    return "DE 15 A 30 DIAS";
                case rangoDias >= 31 && rangoDias <= 45:
                    return "DE 30 A 45 DIAS";
                case rangoDias >= 46 && rangoDias <= 70:
                    return "DE 45 A 70 DIAS";
                case rangoDias >= 71 && rangoDias <= 90:
                    return "DE 70 A 90 DIAS";
                case rangoDias >= 91 && rangoDias <= 120:
                    return "DE 90 A 120 DIAS";
                case rangoDias >= 121 && rangoDias <= 150:
                    return "DE 120 A 150 DIAS";
                case rangoDias >= 151 && rangoDias <= 180:
                    return "DE 150 A 180 DIAS";
                case rangoDias >= 181:
                    return "DE 180 DIAS";
                default:
                    return null;
            }
        };

        let datos = newarray.map(r => ({ ...r, Rango: calcularRango(r) }));


        let r1 = datos.filter(item => item.Rango == "DE 1 A 8 DIAS");
        let r1_operaciones = r1.length;
        let r1_saldo = 0;

        r1.map(function (x) {
            r1_saldo = r1_saldo + parseFloat(x.Saldo);
        });


        let r2 = datos.filter(item => item.Rango == "DE 8 A 15 DIAS");
        let r2_operaciones = r2.length;
        let r2_saldo = 0;

        r2.map(function (x) {
            r2_saldo = r2_saldo + parseFloat(x.Saldo);
        });

        let r3 = datos.filter(item => item.Rango == "DE 15 A 30 DIAS");
        let r3_operaciones = r3.length;
        let r3_saldo = 0;

        r3.map(function (x) {
            r3_saldo = r3_saldo + parseFloat(x.Saldo);
        });

        // Continúa replicando el bloque anterior cambiando los índices hasta llegar a 8...

        let r4 = datos.filter(item => item.Rango == "DE 30 A 45 DIAS");
        let r4_operaciones = r4.length;
        let r4_saldo = 0;

        r4.map(function (x) {
            r4_saldo = r4_saldo + parseFloat(x.Saldo);
        });

        let r5 = datos.filter(item => item.Rango == "DE 45 A 70 DIAS");
        let r5_operaciones = r5.length;
        let r5_saldo = 0;

        r5.map(function (x) {
            r5_saldo = r5_saldo + parseFloat(x.Saldo);
        });

        let r6 = datos.filter(item => item.Rango == "DE 70 A 90 DIAS");
        let r6_operaciones = r6.length;
        let r6_saldo = 0;

        r6.map(function (x) {
            r6_saldo = r6_saldo + parseFloat(x.Saldo);
        });

        let r7 = datos.filter(item => item.Rango == "DE 90 A 120 DIAS");
        let r7_operaciones = r7.length;
        let r7_saldo = 0;

        r7.map(function (x) {
            r7_saldo = r7_saldo + parseFloat(x.Saldo);
        });

        let r8 = datos.filter(item => item.Rango == "DE 120 A 150 DIAS");
        let r8_operaciones = r8.length;
        let r8_saldo = 0;

        r8.map(function (x) {
            r8_saldo = r8_saldo + parseFloat(x.Saldo);
        });

        let r9 = datos.filter(item => item.Rango == "DE 150 A 180 DIAS");
        let r9_operaciones = r9.length;
        let r9_saldo = 0;
        r9.map(function (x) {
            r9_saldo = r9_saldo + parseFloat(x.Saldo);
        });

        let r10 = datos.filter(item => item.Rango == "DE 180 DIAS");
        let r10_operaciones = r10.length;
        let r10_saldo = 0;
        r10.map(function (x) {
            r10_saldo = r10_saldo + parseFloat(x.Saldo);
        });


        let TOTAL_SALDO = r1_saldo + r2_saldo + r3_saldo + r4_saldo + r5_saldo + r6_saldo + r7_saldo + r8_saldo + r9_saldo + r10_saldo;
        let TOTAL_OPERACIONES = r1_operaciones + r2_operaciones + r3_operaciones + r4_operaciones + r5_operaciones + r6_operaciones + r7_operaciones + r8_operaciones + r9_operaciones + r10_operaciones;


        let b = [
            {
                "pos": 1,
                "RANGO": r1[0]["Rango"],
                "SALDO": r1_saldo,
                "OPERACIONES": r1_operaciones
            },
            {
                "pos": 2,
                "RANGO": r2[0]["Rango"],
                "SALDO": r2_saldo,
                "OPERACIONES": r2_operaciones
            },
            {
                "pos": 3,
                "RANGO": r3[0]["Rango"],
                "SALDO": r3_saldo,
                "OPERACIONES": r3_operaciones
            },
            // Repite este patrón para los rangos restantes hasta el rango 10...
            {
                "pos": 4,
                "RANGO": r4[0]["Rango"],
                "SALDO": r4_saldo,
                "OPERACIONES": r4_operaciones
            },
            {
                "pos": 5,
                "RANGO": r5[0]["Rango"],
                "SALDO": r5_saldo,
                "OPERACIONES": r5_operaciones
            },
            {
                "pos": 6,
                "RANGO": r6[0]["Rango"],
                "SALDO": r6_saldo,
                "OPERACIONES": r6_operaciones
            },
            {
                "pos": 7,
                "RANGO": r7[0]["Rango"],
                "SALDO": r7_saldo,
                "OPERACIONES": r7_operaciones
            },
            {
                "pos": 8,
                "RANGO": r8[0]["Rango"],
                "SALDO": r8_saldo,
                "OPERACIONES": r8_operaciones
            },
            {
                "pos": 9,
                "RANGO": r9[0]["Rango"],
                "SALDO": r9_saldo,
                "OPERACIONES": r9_operaciones
            },
            {
                "pos": 10,
                "RANGO": r10[0]["Rango"],
                "SALDO": r10_saldo,
                "OPERACIONES": r10_operaciones
            },
            {
                "pos": 11,
                "RANGO": "TOTAL",
                "SALDO": TOTAL_SALDO,
                "OPERACIONES": TOTAL_OPERACIONES
            }
        ];



        $('#Tabla_Evo').empty();
        if ($.fn.dataTable.isDataTable('#Tabla_Evo')) {
            $('#Tabla_Evo').DataTable().destroy();
            $('#Tabla_Evo_SECC').empty();
        }
        let tabla = `
            <table id='Tabla_Evo' class='table display table-striped'>
            </table>
        `;
        $('#Tabla_Evo_SECC').append(tabla);
        let TABLA_ = $('#Tabla_Evo').DataTable({
            destroy: true,
            data: b,
            dom: 'rtip',
            paging: false,
            info: false,
            // buttons: ['colvis', "excel"],
            // scrollCollapse: true,
            // scrollX: true,
            // columnDefs: [
            //     { width: 100, targets: 0 },
            //     { width: 300, targets: 2 },
            // ],
            order: [[0, "asc"]],
            columns: [
                {
                    "data": "pos",
                    "title": "RANGO MORA",
                    className: "text-start",
                    visible: false
                },
                {
                    "data": "RANGO",
                    "title": "RANGO MORA",
                    className: "text-start"
                },
                {
                    "data": "SALDO",
                    "title": "SALDO",
                    className: "text-end",
                    render: $.fn.dataTable.render.number(',', '.', 2, "$")

                },
                {
                    "data": "OPERACIONES",
                    "title": "OPERACIONES",
                    className: "text-end"

                }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-6 ");
                $('td', row).eq(1).addClass("fw-bold fs-6 ");
                $('td', row).eq(2).addClass("fw-bold fs-6 ");
                $('td', row).eq(3).addClass("fw-bold fs-6 ");
                if (data["RANGO"] == "TOTAL") {
                    $('td', row).eq(0).addClass("bg-success bg-opacity-50");
                    $('td', row).eq(1).addClass("bg-success bg-opacity-50");
                    $('td', row).eq(2).addClass("bg-success bg-opacity-50");
                }

            },
        })

    }

    //****************************************** */

    //** */ DESCRIPCION COLOCACION


    function CARTERA_POR_ESTADO(datos) {


    }

    const [FECHA_INI_DC, setFECHA_INI_DC] = useState(moment().startOf("month").format("YYYY-MM"));

    function Descripcion_Colocacion() {
        let param = {
            FECHA_INI: moment(FECHA_INI_DC).format("YYYYMMDD"),
            FECHA_FIN: moment(FECHA_INI_DC).endOf("month").format("YYYYMMDD"),
        }
        let url = "mora/Descripcion_Colocacion"
        ajax.AjaxSendReceiveData(url, param, function (x) {

            let PORMONTO = x["DESCRIPCION_POR_MONTO"];
            let PORPLAZO = x["DESCRIPCION_POR_PLAZO"];
            POR_MONTO(PORMONTO)
            POR_PLAZO(PORPLAZO)
        })
    }

    function CARGAR_POR_PLAZO() {
        let url = "mora/CARGAR_POR_PLAZO"
        ajax.AjaxSendReceiveData(url, [], function (x) {

            POR_PLAZO(x)
        })
    }

    function POR_PLAZO(ARRAY_) {


        let datos = JSON.parse(JSON.stringify(ARRAY_));

        let r1 = datos[0]
        let r2 = datos[1]
        let r3 = datos[2]
        let r4 = datos[3]
        let r5 = datos[4]
        let r6 = datos[5]
        let r7 = datos[6]
        let r8 = datos[7]
        let r9 = datos[8]

        let r1_operaciones = r1.length;
        let r2_operaciones = r2.length;
        let r3_operaciones = r3.length;
        let r4_operaciones = r4.length;
        let r5_operaciones = r5.length;
        let r6_operaciones = r6.length;
        let r7_operaciones = r7.length;
        let r8_operaciones = r8.length;
        let r9_operaciones = r9.length;

        let total_operaciones = r1_operaciones + r2_operaciones + r3_operaciones + r4_operaciones + r5_operaciones + r6_operaciones + r7_operaciones + r8_operaciones + r9_operaciones;

        let por_op1 = parseFloat((r1_operaciones / total_operaciones) * 100).toFixed(2);
        let por_op2 = parseFloat((r2_operaciones / total_operaciones) * 100).toFixed(2);
        let por_op3 = parseFloat((r3_operaciones / total_operaciones) * 100).toFixed(2);
        let por_op4 = parseFloat((r4_operaciones / total_operaciones) * 100).toFixed(2);
        let por_op5 = parseFloat((r5_operaciones / total_operaciones) * 100).toFixed(2);
        let por_op6 = parseFloat((r6_operaciones / total_operaciones) * 100).toFixed(2);
        let por_op7 = parseFloat((r7_operaciones / total_operaciones) * 100).toFixed(2);
        let por_op8 = parseFloat((r8_operaciones / total_operaciones) * 100).toFixed(2);
        let por_op9 = parseFloat((r9_operaciones / total_operaciones) * 100).toFixed(2);

        let r1_monto = 0;
        r1.map(function (x) {
            r1_monto = r1_monto + parseFloat(x.MontoOriginal);
        });

        let r2_monto = 0;
        r2.map(function (x) {
            r2_monto = r2_monto + parseFloat(x.MontoOriginal);
        });

        let r3_monto = 0;
        r3.map(function (x) {
            r3_monto = r3_monto + parseFloat(x.MontoOriginal);
        });

        let r4_monto = 0;
        r4.map(function (x) {
            r4_monto = r4_monto + parseFloat(x.MontoOriginal);
        });

        let r5_monto = 0;
        r5.map(function (x) {
            r5_monto = r5_monto + parseFloat(x.MontoOriginal);
        });

        let r6_monto = 0;
        r6.map(function (x) {
            r6_monto = r6_monto + parseFloat(x.MontoOriginal);
        });

        let r7_monto = 0;
        r7.map(function (x) {
            r7_monto = r7_monto + parseFloat(x.MontoOriginal);
        });

        let r8_monto = 0;
        r8.map(function (x) {
            r8_monto = r8_monto + parseFloat(x.MontoOriginal);
        });

        let r9_monto = 0;
        r9.map(function (x) {
            r9_monto = r9_monto + parseFloat(x.MontoOriginal);
        });

        let monto_total = r1_monto + r2_monto + r3_monto + r4_monto + r5_monto + r6_monto + r7_monto + r8_monto + r9_monto;

        let por_mo1 = parseFloat((r1_monto / monto_total) * 100).toFixed(2);
        let por_mo2 = parseFloat((r2_monto / monto_total) * 100).toFixed(2);
        let por_mo3 = parseFloat((r3_monto / monto_total) * 100).toFixed(2);
        let por_mo4 = parseFloat((r4_monto / monto_total) * 100).toFixed(2);
        let por_mo5 = parseFloat((r5_monto / monto_total) * 100).toFixed(2);
        let por_mo6 = parseFloat((r6_monto / monto_total) * 100).toFixed(2);
        let por_mo7 = parseFloat((r7_monto / monto_total) * 100).toFixed(2);
        let por_mo8 = parseFloat((r8_monto / monto_total) * 100).toFixed(2);
        let por_mo9 = parseFloat((r9_monto / monto_total) * 100).toFixed(2);


        let ARRAY = [
            {
                "RANGO": "a. De 0 - 2",
                "OPERACIONES": por_op1 + " %",
                "MONTO": por_mo1 + " %",
            },
            {
                "RANGO": "b. De 3 - 5",
                "OPERACIONES": por_op2 + " %",
                "MONTO": por_mo2 + " %",
            },
            {
                "RANGO": "c. De 6 - 8",
                "OPERACIONES": por_op3 + " %",
                "MONTO": por_mo3 + " %",
            },
            {
                "RANGO": "d. De 9 - 11",
                "OPERACIONES": por_op4 + " %",
                "MONTO": por_mo4 + " %",
            },
            {
                "RANGO": "e. De 12 - 14",
                "OPERACIONES": por_op5 + " %",  // Asegúrate de tener por_op5 definido
                "MONTO": por_mo5 + " %",  // Asegúrate de tener por_mo5 definido
            },
            {
                "RANGO": "f. De 15 - 17",
                "OPERACIONES": por_op6 + " %",  // Asegúrate de tener por_op6 definido
                "MONTO": por_mo6 + " %",  // Asegúrate de tener por_mo6 definido
            },
            {
                "RANGO": "g. De 18 - 20",
                "OPERACIONES": por_op7 + " %",  // Asegúrate de tener por_op7 definido
                "MONTO": por_mo7 + " %",  // Asegúrate de tener por_mo7 definido
            },
            {
                "RANGO": "h. De 21 - 23",
                "OPERACIONES": por_op8 + " %",  // Asegúrate de tener por_op8 definido
                "MONTO": por_mo8 + " %",  // Asegúrate de tener por_mo8 definido
            },
            {
                "RANGO": "i. De 24 - 26",
                "OPERACIONES": por_op9 + " %",  // Asegúrate de tener por_op9 definido
                "MONTO": por_mo9 + " %",  // Asegúrate de tener por_mo9 definido
            },
            {
                "RANGO": "Total general",
                "OPERACIONES": total_operaciones.toLocaleString('en-US', options2),
                "MONTO": monto_total.toLocaleString('en-US', options),
            }
        ];



        $('#DESC_POR_PLAZO').empty();
        if ($.fn.dataTable.isDataTable('#DESC_POR_PLAZO')) {
            $('#DESC_POR_PLAZO').DataTable().destroy();
            $('#DESC_POR_PLAZO_SECC').empty();
        }
        let tabla = `
            <table id='DESC_POR_PLAZO' class='table display table-striped'>
            </table>
        `;
        $('#DESC_POR_PLAZO_SECC').append(tabla);
        let TABLA_ = $('#DESC_POR_PLAZO').DataTable({
            destroy: true,
            data: ARRAY,
            dom: 'rtip',
            paging: false,
            info: false,
            // buttons: ['colvis', "excel"],
            // scrollCollapse: true,
            // scrollX: true,
            // columnDefs: [
            //     { width: 100, targets: 0 },
            //     { width: 300, targets: 2 },
            // ],
            columns: [
                {
                    "data": "RANGO",
                    "title": "RANGO PLAZO",
                    className: "text-start"
                },
                {
                    "data": "OPERACIONES",
                    "title": "OPERACIONES",
                    className: "text-end"

                },
                {
                    "data": "MONTO",
                    "title": "MONTO",
                    className: "text-end"

                },
                {
                    "data": "MONTO",
                    "title": "PER PROY",
                    className: "text-end"

                }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-7 ");
                $('td', row).eq(1).addClass("fw-bold fs-7 ");
                $('td', row).eq(2).addClass("fw-bold fs-7 ");
                $('td', row).eq(3).addClass("fw-bold fs-7 ");

                if (parseFloat(data["OPERACIONES"]) >= 15 && parseFloat(data["OPERACIONES"]) < 30) {
                    $('td', row).eq(1).addClass("bg-success bg-opacity-25");
                }
                if (parseFloat(data["OPERACIONES"]) >= 30 && parseFloat(data["OPERACIONES"]) < 50) {
                    $('td', row).eq(1).addClass("bg-success bg-opacity-50");
                }
                if (parseFloat(data["OPERACIONES"]) > 50) {
                    $('td', row).eq(1).addClass("bg-success bg-opacity-100");
                }

                if (parseFloat(data["MONTO"]) >= 15 && parseFloat(data["MONTO"]) < 30) {
                    $('td', row).eq(2).addClass("bg-success bg-opacity-25");
                }
                if (parseFloat(data["MONTO"]) >= 30 && parseFloat(data["MONTO"]) < 50) {
                    $('td', row).eq(2).addClass("bg-success bg-opacity-50");
                }
                if (parseFloat(data["MONTO"]) > 50) {
                    $('td', row).eq(2).addClass("bg-success bg-opacity-100");
                }
            },
        })

    }

    function CARGAR_POR_MONTO() {
        let url = "mora/CARGAR_POR_MONTO"
        ajax.AjaxSendReceiveData(url, [], function (x) {

            POR_MONTO(x)
        })
    }

    function POR_MONTO(ARRAY_) {

        let datos = JSON.parse(JSON.stringify(ARRAY_));

        let r1 = datos[1]
        let r2 = datos[2]
        let r3 = datos[3]
        let r4 = datos[4]

        let r1_operaciones = r1.length;
        let r2_operaciones = r2.length;
        let r3_operaciones = r3.length;
        let r4_operaciones = r4.length;
        let total_operaciones = r1_operaciones + r2_operaciones + r3_operaciones + r4_operaciones

        let por_op1 = parseFloat((r1_operaciones / total_operaciones) * 100).toFixed(2);
        let por_op2 = parseFloat((r2_operaciones / total_operaciones) * 100).toFixed(2);
        let por_op3 = parseFloat((r3_operaciones / total_operaciones) * 100).toFixed(2);
        let por_op4 = parseFloat((r4_operaciones / total_operaciones) * 100).toFixed(2);

        let r1_monto = 0;
        r1.map(function (x) {
            r1_monto = r1_monto + parseFloat(x.MontoOriginal)
        })

        let r2_monto = 0;
        r2.map(function (x) {
            r2_monto = r2_monto + parseFloat(x.MontoOriginal)
        })

        let r3_monto = 0;
        r3.map(function (x) {
            r3_monto = r3_monto + parseFloat(x.MontoOriginal)
        })

        let r4_monto = 0;
        r4.map(function (x) {
            r4_monto = r4_monto + parseFloat(x.MontoOriginal)
        })

        let monto_total = r1_monto + r2_monto + r3_monto + r4_monto

        let por_mo1 = parseFloat((r1_monto / monto_total) * 100).toFixed(2);
        let por_mo2 = parseFloat((r2_monto / monto_total) * 100).toFixed(2);
        let por_mo3 = parseFloat((r3_monto / monto_total) * 100).toFixed(2);
        let por_mo4 = parseFloat((r4_monto / monto_total) * 100).toFixed(2);




        let ARRAY = [{
            "RANGO": "a. < 1000",
            "OPERACIONES": por_op1 + " %",
            "MONTO": por_mo1 + " %",
        }, {
            "RANGO": "b. 1000 < 1200",
            "OPERACIONES": por_op2 + " %",
            "MONTO": por_mo2 + " %",
        }, {
            "RANGO": "c. 1200 < 1500",
            "OPERACIONES": por_op3 + " %",
            "MONTO": por_mo3 + " %",
        }, {
            "RANGO": "d. 1500 < 4000",
            "OPERACIONES": por_op4 + " %",
            "MONTO": por_mo4 + " %",
        }, {
            "RANGO": "Total general",
            "OPERACIONES": total_operaciones.toLocaleString('en-US', options2),
            "MONTO": monto_total.toLocaleString('en-US', options),
        }]



        $('#DESC_POR_MONTO').empty();
        if ($.fn.dataTable.isDataTable('#DESC_POR_MONTO')) {
            $('#DESC_POR_MONTO').DataTable().destroy();
            $('#DESC_POR_MONTO_SECC').empty();
        }
        let tabla = `
            <table id='DESC_POR_MONTO' class='table display table-striped'>
            </table>
        `;
        $('#DESC_POR_MONTO_SECC').append(tabla);
        let TABLA_ = $('#DESC_POR_MONTO').DataTable({
            destroy: true,
            data: ARRAY,
            dom: 'rtip',
            paging: false,
            info: false,
            // buttons: ['colvis', "excel"],
            // scrollCollapse: true,
            // scrollX: true,
            // columnDefs: [
            //     { width: 100, targets: 0 },
            //     { width: 300, targets: 2 },
            // ],
            columns: [
                {
                    "data": "RANGO",
                    "title": "RANGO MONTO",
                    className: "text-start"
                },
                {
                    "data": "OPERACIONES",
                    "title": "OPERACIONES",
                    className: "text-end"

                },
                {
                    "data": "MONTO",
                    "title": "MONTO",
                    className: "text-end"

                },
                {
                    "data": "MONTO",
                    "title": "PER PROY",
                    className: "text-end"

                }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-7 ");
                $('td', row).eq(1).addClass("fw-bold fs-7 ");
                $('td', row).eq(2).addClass("fw-bold fs-7 ");
                $('td', row).eq(3).addClass("fw-bold fs-7 ");

                if (parseFloat(data["OPERACIONES"]) >= 15 && parseFloat(data["OPERACIONES"]) < 30) {
                    $('td', row).eq(1).addClass("bg-success bg-opacity-25");
                }
                if (parseFloat(data["OPERACIONES"]) >= 30 && parseFloat(data["OPERACIONES"]) < 50) {
                    $('td', row).eq(1).addClass("bg-success bg-opacity-50");
                }
                if (parseFloat(data["OPERACIONES"]) > 50) {
                    $('td', row).eq(1).addClass("bg-success bg-opacity-100");
                }

                if (parseFloat(data["MONTO"]) >= 15 && parseFloat(data["MONTO"]) < 30) {
                    $('td', row).eq(2).addClass("bg-success bg-opacity-25");
                }
                if (parseFloat(data["MONTO"]) >= 30 && parseFloat(data["MONTO"]) < 50) {
                    $('td', row).eq(2).addClass("bg-success bg-opacity-50");
                }
                if (parseFloat(data["MONTO"]) > 50) {
                    $('td', row).eq(2).addClass("bg-success bg-opacity-100");
                }
            },
        })

    }


    //** CREDITOS CANCELADOS */

    const [DATOS_CANCELADOS, setDATOS_CANCELADOS] = useState([]);


    function Cargar_Creditos_Cancelados() {

        let url = "mora/Cargar_Creditos_Cancelados"
        ajax.AjaxSendReceiveData(url, [], function (x) {

            let datos = x.filter(item => item.EstadoCredito == "CANCELADO" || (item.CuotasRestantes <= 1 && item.EstadoCredito == "VIGENTE"));

            // TIPO_CANCELACION
            setDATOS_CANCELADOS(datos);

            x.map(function (obj) {
                let a = obj.TipoCancelacion
                if (a != null || a != "") {
                    a = a.replace(" ", '-')
                    a = a.replace(", ", '-')
                }
                obj.TipoCancelacion = a

            })

            let uniqueChoferIdsMap = new Map();
            x.forEach(item => {
                uniqueChoferIdsMap.set(item.TipoCancelacion, item);
            });
            // Obteniendo un array de objetos únicos
            let uniqueObjects = Array.from(uniqueChoferIdsMap.values());
            $("#TIPO_CANCELACION").empty()
            $("#TIPO_CANCELACION").append("<option value='TODO'>TODO</option>")
            uniqueObjects.map(function (x) {
                if ((x.TipoCancelacion).trim() == "") {
                    x.TipoCancelacion = "SIN-DEFINIR"
                }
                $("#TIPO_CANCELACION").append("<option value=" + x.TipoCancelacion + ">" + x.TipoCancelacion + "</option>")
            })

            Tabla_Creditos_Cancelados(datos);
            Pie_Cancelados(datos);
            line_cancelados(datos);
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
        let TABLA_ = $('#TABLA_CR_CANCELADOS').DataTable({
            destroy: true,
            data: datos,
            dom: 'frtip',
            paging: true,
            pageLength: 5,
            // info: false,
            // buttons: ['colvis', "excel"],
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
                "title": "ESTADO DEL CREDITO"
            },
            {
                "data": "TipoCancelacion",
                "title": "TIPO DE CANCELACION"
            },
            {
                "data": "MontoOriginal",
                "title": "MONTO ORIGINAL"
            },
            {
                "data": "CuotasRestantes",
                "title": "CUOTAS RESTANTES"
            },
            {
                "data": "PlazoOriginal",
                "title": "PLAZO ORIGINAL"
            },
            {
                "data": "FechaDesembolso",
                "title": "FECHA DESEMBOLSO"
            },
            {
                "data": "FechaCancelacion",
                "title": "FECHA CANCELACION"
            },
            {
                "data": "Atraso",
                "title": "ATRASO",
                visible: false

            },

            {
                "data": "DispositivoNotificacion",
                "title": "DISPOSITIVO DE NOTIFICACION"
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
            }
                // {
                //     data: "FACTURADO",
                //     title: "FACTURADO TOTAL",
                //     render: $.fn.dataTable.render.number(',', '.', 2, "$")
                // },
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
                if (data["EstadoCredito"] == "VIGENTE") {
                    $('td', row).eq(2).addClass("text-primary");
                } else {
                    $('td', row).eq(2).addClass("text-success");
                }


                let c2 = `
                <span class="text-muted">`+ data["Identificacion"] + `<span><br>
                <span class="text-dark">`+ data["Cliente"] + `<span><br>
                `
                $('td', row).eq(1).html(c2);

            },
        })
    }

    function filtrar_Cancelados() {
        let ESTADO = $("#TIPO_CANCELACION").val()
        let datafiltrada = DATOS_CANCELADOS

        if (ESTADO != "TODO") {
            if (ESTADO == "SIN-DEFINIR") {
                ESTADO = ""
            }
            datafiltrada = datafiltrada.filter(item => (item.TipoCancelacion).trim() == ESTADO)
        }

        Tabla_Creditos_Cancelados(datafiltrada)
    }

    function Pie_Cancelados(data) {

        let unique = [...new Set(data.map(item => item.TipoCancelacion))];
        console.log('unique: ', unique);
        let ARRAY = []
        unique.map(function (x) {
            let fil = data.filter(item => item.TipoCancelacion == x)
            if (x == "") x = "SIN-DEFINIR"
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
        console.log('ARRAY: ', ARRAY);

        ARRAY.sort((a, b) => {
            if (a.FECHA < b.FECHA) {
                return -1;
            }
            if (a.FECHA > b.FECHA) {
                return 1;
            }

            // names must be equal
            return 0;
        });

        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end



            // Create chart instance
            var chart = am4core.create("CANCELADOS_LINE", am4charts.XYChart);

            // Add data
            chart.data = ARRAY;

            // Create axes
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

    //** MOROSIDAD */

    function MOROSIDAD_POR_DIA() {
        let url = "mora/MOROSIDAD_POR_DIA"
        ajax.AjaxSendReceiveData(url, [], function (x) {


            x.map(function (x) {
                let total = parseInt(x.CANCELADO) + parseInt(x.VENCIDO) + parseInt(x.VIGENTE)
                x.TOTAL = total
                x.TOTAL_POR = parseFloat((parseInt(x.VENCIDO) / total) * 100).toFixed(2)
            })
            const primerYUltimoDato = [x[0], x[x.length - 1]];


            MOROSIDAD_POR_DIA_TABLA(x);
            MOROSIDAD_POR_DIA_GRAFICO(x, primerYUltimoDato);
        })
    }

    function MOROSIDAD_POR_DIA_TABLA(data) {



        $('#Tabla_MOROSIDAD').empty();
        if ($.fn.dataTable.isDataTable('#Tabla_MOROSIDAD')) {
            $('#Tabla_MOROSIDAD').DataTable().destroy();
            $('#Tabla_MOROSIDAD_SECC').empty();
        }
        let tabla = `
            <table id='Tabla_MOROSIDAD' class='table display table-striped'>
               
            </table>
        `;
        $('#Tabla_MOROSIDAD_SECC').append(tabla);
        let TABLA_ = $('#Tabla_MOROSIDAD').DataTable({
            destroy: true,
            data: data,
            dom: 'rtip',
            paging: true,
            info: false,
            buttons: ["excel"],
            order: [[0, "desc"]],
            // scrollCollapse: true,
            // scrollX: true,
            // columnDefs: [
            //     { width: 100, targets: 0 },
            //     { width: 300, targets: 2 },
            // ],
            columns: [
                {
                    "data": "FechaCorte",
                    "title": "FECHA",
                    className: "text-start"
                },
                {
                    "data": "CANCELADO",
                    "title": "CANCELADOS",
                    className: "text-center"

                },
                {
                    "data": "VENCIDO",
                    "title": "VENCIDOS",
                    className: "text-center"

                },
                {
                    "data": "VIGENTE",
                    "title": "VIGENTES",
                    className: "text-center"
                },
                {
                    "data": "TOTAL",
                    "title": "TOTAL",
                    className: "text-center",
                },
                {
                    "data": "TOTAL_POR",
                    "title": "TOTAL %",
                    className: "text-center",
                }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-7 ");
                $('td', row).eq(1).addClass("fw-bold fs-7 ");
                $('td', row).eq(2).addClass("fw-bold fs-7 bg-danger bg-opacity-10");
                $('td', row).eq(3).addClass("fw-bold fs-7 ");
                $('td', row).eq(4).addClass("fw-bold fs-7 bg-light");
                $('td', row).eq(5).addClass("fw-bold fs-7 bg-warning bg-opacity-10");
                $('td', row).eq(5).html(data["TOTAL_POR"] + "%");
            },
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api();

                // Suma de la columna 5
                var totalColumna5 = api.column(5, {
                    page: 'current'
                }).data().reduce(function (a, b) {
                    return parseFloat(a) + parseFloat(b);
                }, 0);
                $('#Tabla_MOROSIDAD > tfoot').empty()
                $('#Tabla_MOROSIDAD').append(`
                    <tfoot >
                        <tr>
                            <th  class="fw-bold fs-5 text-center">TOTAL</th>
                            <th  class="fw-bold fs-5 text-center" id="TM_CANCELADOS"></th>
                            <th  class="fw-bold fs-5 text-center" id="TM_VENCIDOS"></th>
                            <th  class="fw-bold fs-5 text-center" id="TM_VIGENTES"></th>
                            <th  class="fw-bold fs-5 text-center" id="TM_TOTALES"></th>
                            <th  class="fw-bold fs-5 text-center" ></th>
                        </tr>    
                    </tfoot>
                `);

                let cancelados = data.reduce((acumulador, objeto) => acumulador + parseInt(objeto["CANCELADO"]), 0);
                let VENCIDO = data.reduce((acumulador, objeto) => acumulador + parseInt(objeto["VENCIDO"]), 0);
                let VIGENTE = data.reduce((acumulador, objeto) => acumulador + parseInt(objeto["VIGENTE"]), 0);
                let TOTAL = data.reduce((acumulador, objeto) => acumulador + parseInt(objeto["TOTAL"]), 0);


                $("#TM_CANCELADOS").text(cancelados);
                $("#TM_VENCIDOS").text(VENCIDO);
                $("#TM_VIGENTES").text(VIGENTE);
                $("#TM_TOTALES").text(TOTAL);
            },
        })
    }

    function MOROSIDAD_POR_DIA_GRAFICO(data, primerYUltimoDato) {
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chart_MOROSIDAD", am4charts.XYChart);

            // Add data
            chart.data = data

            // Set input format for the dates
            chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "TOTAL_POR";
            series.dataFields.dateX = "FechaCorte";
            series.tooltipText = "{TOTAL_POR}"
            series.strokeWidth = 2;
            series.minBulletDistance = 15;

            // Drop-shaped tooltips
            series.tooltip.background.cornerRadius = 20;
            series.tooltip.background.strokeOpacity = 0;
            series.tooltip.pointerOrientation = "vertical";
            series.tooltip.label.minWidth = 40;
            series.tooltip.label.minHeight = 40;
            series.tooltip.label.textAlign = "middle";
            series.tooltip.label.textValign = "middle";

            // Make bullets grow on hover
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.strokeWidth = 2;
            bullet.circle.radius = 4;
            bullet.circle.fill = am4core.color("#fff");
            let labelBullet = series.bullets.push(new am4charts.LabelBullet());
            labelBullet.label.text = "{TOTAL_POR}";
            labelBullet.label.dy = -20;
            var bullethover = bullet.states.create("hover");
            bullethover.properties.scale = 1.3;

            // Make a panning cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "panXY";
            chart.cursor.xAxis = dateAxis;
            chart.cursor.snapToSeries = series;

            // Create vertical scrollbar and place it before the value axis
            chart.scrollbarY = new am4core.Scrollbar();
            chart.scrollbarY.parent = chart.leftAxesContainer;
            chart.scrollbarY.toBack();

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            // dateAxis.start = 0.79;
            dateAxis.keepSelection = true;

            function createTrendLine(data) {
                var trend = chart.series.push(new am4charts.LineSeries());
                trend.dataFields.valueY = "TOTAL_POR";
                trend.dataFields.dateX = "FechaCorte";
                trend.strokeWidth = 2
                trend.stroke = trend.fill = am4core.color("#c00");
                trend.data = data;

                var bullet = trend.bullets.push(new am4charts.CircleBullet());
                // bullet.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
                bullet.strokeWidth = 2;
                bullet.stroke = am4core.color("#fff")
                bullet.circle.fill = trend.stroke;

                var hoverState = bullet.states.create("hover");
                hoverState.properties.scale = 1.7;

                return trend;
            };

            createTrendLine(primerYUltimoDato);

        });
    }

    function MOROSIDAD_CARTERA() {
        let url = "mora/MOROSIDAD_CARTERA"
        ajax.AjaxSendReceiveData(url, [], function (x) {

            x.map(function (x) {
                x.TOTAL = parseInt(x.CARTERABANCO) + parseInt(x.FONDODEGARANTIA)
            })
            MOROSIDAD_CARTERA_TABLA(x)
            MOROSIDAD_CARTERA_GRAFICO(x)
        })
    }


    function MOROSIDAD_CARTERA_TABLA(data) {
        $('#Tabla_MOROSIDAD_cartera').empty();
        if ($.fn.dataTable.isDataTable('#Tabla_MOROSIDAD_cartera')) {
            $('#Tabla_MOROSIDAD_cartera').DataTable().destroy();
            $('#Tabla_MOROSIDAD_cartera_SECC').empty();
        }
        let tabla = `
            <table id='Tabla_MOROSIDAD_cartera' class='table display table-striped'>
            </table>
        `;
        $('#Tabla_MOROSIDAD_cartera_SECC').append(tabla);
        let TABLA_ = $('#Tabla_MOROSIDAD_cartera').DataTable({
            destroy: true,
            data: data,
            dom: 'rtip',
            paging: true,
            pageLength: 5,
            info: false,
            buttons: ["excel"],
            order: [[0, "desc"]],
            // scrollCollapse: true,
            // scrollX: true,
            // columnDefs: [
            //     { width: 100, targets: 0 },
            //     { width: 300, targets: 2 },
            // ],
            columns: [
                {
                    "data": "FechaCorte",
                    "title": "FECHA",
                    className: "text-start"
                },
                {
                    "data": "CARTERABANCO",
                    "title": "CARTERA BANCO",
                    className: "text-center"

                },
                {
                    "data": "FONDODEGARANTIA",
                    "title": "FONDO DE GARANTIA",
                    className: "text-center"

                },
                {
                    "data": "SALDO",
                    "title": "SALDO",
                    className: "text-center",
                    render: $.fn.dataTable.render.number(',', '.', 2, "$"),

                },
                {
                    "data": "TOTAL",
                    "title": "TOTAL",
                    className: "text-center",
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

    function MOROSIDAD_CARTERA_GRAFICO(data) {
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chart_CARTERA", am4charts.XYChart);

            // Add data
            chart.data = data

            // Set input format for the dates
            chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.logarithmic = true;
            // valueAxis.renderer.minGridDistance = 0;
            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "FONDODEGARANTIA";
            series.dataFields.dateX = "FechaCorte";
            series.tooltipText = "{FONDODEGARANTIA}"
            series.strokeWidth = 2;
            series.minBulletDistance = 5;

            // Drop-shaped tooltips
            series.tooltip.background.cornerRadius = 20;
            series.tooltip.background.strokeOpacity = 0;
            series.tooltip.pointerOrientation = "vertical";
            series.tooltip.label.minWidth = 40;
            series.tooltip.label.minHeight = 40;
            series.tooltip.label.textAlign = "middle";
            series.fill = am4core.color("#22941E");
            series.stroke = am4core.color("#22941E");



            // var series2 = chart.series.push(new am4charts.LineSeries());
            // series2.name = "saldo";
            // series2.dataFields.dateX = "FechaCorte";
            // series2.dataFields.valueY = "CARTERABANCO";
            // series2.tooltipText = "{valueY.value}";
            // series2.fill = am4core.color("#52BE80");
            // series2.stroke = am4core.color("#52BE80");
            // //series.strokeWidth = 3;
            // series2.fillOpacity = 0.3;

            // Make bullets grow on hover
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.strokeWidth = 2;
            bullet.circle.radius = 2;
            bullet.circle.fill = am4core.color("#fff");
            let labelBullet = series.bullets.push(new am4charts.LabelBullet());
            // labelBullet.label.text = "{FONDODEGARANTIA}";
            // labelBullet.label.dy = -20;
            var bullethover = bullet.states.create("hover");
            bullethover.properties.scale = 1.3;





            // Make a panning cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "panXY";
            chart.cursor.xAxis = dateAxis;
            chart.cursor.snapToSeries = series;

            // Create vertical scrollbar and place it before the value axis
            // chart.scrollbarY = new am4core.Scrollbar();
            // chart.scrollbarY.parent = chart.leftAxesContainer;
            // chart.scrollbarY.toBack();

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            // dateAxis.start = 0.79;
            dateAxis.keepSelection = true;



        });
    }

    //*** COMPORTAMIENTO */

    function COMPORTAMIENTO() {
        let url = "mora/COMPORTAMIENTO"
        ajax.AjaxSendReceiveData(url, [], function (x) {

            COMPORTAMIENTO_TABLA(x)
        })
    }

    function COMPORTAMIENTO_TABLA(data) {
        $('#Tabla_COMPORTAMIENTO').empty();
        if ($.fn.dataTable.isDataTable('#Tabla_COMPORTAMIENTO')) {
            $('#Tabla_COMPORTAMIENTO').DataTable().destroy();
            $('#Tabla_COMPORTAMIENTO_SECC').empty();
        }
        let tabla = `
            <table id='Tabla_COMPORTAMIENTO' class='table display table-striped'>
            </table>
        `;
        $('#Tabla_COMPORTAMIENTO_SECC').append(tabla);
        let TABLA_ = $('#Tabla_COMPORTAMIENTO').DataTable({
            destroy: true,
            data: data,
            dom: 'rtip',
            paging: true,
            pageLength: 10,
            info: false,
            buttons: ["excel"],
            order: [[0, "desc"]],
            // scrollCollapse: true,
            // scrollX: true,
            // columnDefs: [
            //     { width: 100, targets: 0 },
            //     { width: 300, targets: 2 },
            // ],
            columns: [
                {
                    "data": "FechaCorte",
                    "title": "FECHA",
                    className: "text-start"
                },
                {
                    "data": "NUEVO",
                    "title": "NUEVO",
                    className: "text-center"

                },
                {
                    "data": "REESTRUCTURA",
                    "title": "REESTRUCTURA",
                    className: "text-center"

                },
                {
                    "data": "REFINANCIAMIENTO",
                    "title": "REFINANCIAMIENTO",
                    className: "text-center",
                },
                {
                    "data": "REPRESTAMO",
                    "title": "REPRESTAMO",
                    className: "text-center",
                }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-7 ");
                $('td', row).eq(1).addClass("fw-bold fs-7 bg-success bg-opacity-10");
                $('td', row).eq(2).addClass("fw-bold fs-7 ");
                $('td', row).eq(3).addClass("fw-bold fs-7 bg-warning bg-opacity-10");
                $('td', row).eq(4).addClass("fw-bold fs-7 bg-light");
                $('td', row).eq(5).addClass("fw-bold fs-7 ");
            },
        })
    }



    useEffect(() => {
        // CARGAR_EVOLUCION_MOROSIDAD_TABLA();
        // CARGAR_EVOLUCION_MOROSIDAD_GRAFICO();
        // CARGAR_POR_PLAZO();
        // CARGAR_POR_MONTO();
        Cargar_Creditos_Cancelados();
        MOROSIDAD_POR_DIA();
        MOROSIDAD_CARTERA();
        COMPORTAMIENTO();

    }, []);

    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Dashboard</strong>
                </CCardHeader>
                <CCardBody>
                    <div className='bg-warning bg-opacity-50 mb-3'>
                        <h5>CREDITOS CANCELADOS</h5>
                    </div>
                    <div className='col-12 mb-2'>
                        <div className='col-4' >
                            <h6>Tipo de Cancelacion</h6>
                            <select onChange={filtrar_Cancelados} className='form-select' id="TIPO_CANCELACION">

                            </select>
                        </div>
                        <div className='col-12'>
                            <div className='table-responsive' id='SECC_TABLA_CR_CANCELADOS'>
                                <table id='TABLA_CR_CANCELADOS' className='table display table-striped'>

                                </table>
                            </div>
                        </div>
                        <div className='row p-5'>
                            <div className='col-6'>
                                <div id='CANCELADOS_PIE' style={{ height: 300 }}></div>
                            </div>
                            <div className='col-6'>
                                <div id='CANCELADOS_LINE' style={{ height: 300 }}></div>
                            </div>
                        </div>


                    </div>

                    <div className='bg-warning bg-opacity-50 mb-3'>
                        <h5>EVOLUCIÓN DE LA MOROSIDAD</h5>
                    </div>

                    <div className='col-12' id=''>
                        {/* <button onClick={Cargar_Dasboard} className='btn btn-success text-light fw-bold'>Cargar</button> */}

                        <div className='row'>
                            <div className='col-12'>
                                <div className='table-responsive' id='Tabla_MOROSIDAD_SECC'>
                                    <table id='Tabla_MOROSIDAD' className='display table table-striped'>
                                        <tfoot >
                                            <tr>
                                                <th className="fw-bold fs-5">TOTAL</th>
                                                <th className="fw-bold fs-5"></th>
                                                <th className="fw-bold fs-5"></th>
                                                <th className="fw-bold fs-5"></th>
                                                <th className="fw-bold fs-5"></th>
                                                <th className="fw-bold fs-5"></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div id="chart_MOROSIDAD" style={{ height: 400 }}></div>
                        </div>
                    </div>

                    <div className='col-12' id=''>
                        {/* <button onClick={Cargar_Dasboard} className='btn btn-success text-light fw-bold'>Cargar</button> */}

                        <div className='row'>
                            <div className='col-7'>
                                <div className='table-responsive' id='Tabla_MOROSIDAD_cartera_SECC'>
                                    <table id='Tabla_MOROSIDAD_cartera' className='display table table-striped'>
                                    </table>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div id="chart_CARTERA" style={{ height: 400 }}></div>
                            </div>
                        </div>

                    </div>



                    <div className='col-12 d-none' id=''>
                        {/* <button onClick={Cargar_Dasboard} className='btn btn-success text-light fw-bold'>Cargar</button> */}

                        <div className='row'>
                            <div className='col-7'>
                                <div id="chart_evolucion" style={{ height: 500 }}></div>
                            </div>
                            <div className='col-5'>
                                <div className='table-responsive' id='Tabla_Evo_SECC'>
                                    <table id='Tabla_Evo' className='display table table-striped'>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className='bg-warning bg-opacity-50 mb-3'>
                        <h5>COMPORTAMIENTO</h5>
                    </div>

                    <div className='col-12' id=''>
                        {/* <button onClick={Cargar_Dasboard} className='btn btn-success text-light fw-bold'>Cargar</button> */}

                        <div className='row'>
                            <div className='col-8'>
                                <div className='table-responsive' id='Tabla_COMPORTAMIENTO_SECC'>
                                    <table id='Tabla_COMPORTAMIENTO' className='display table table-striped'>
                                        <tfoot >
                                            <tr>
                                                <th className="fw-bold fs-5">TOTAL</th>
                                                <th className="fw-bold fs-5"></th>
                                                <th className="fw-bold fs-5"></th>
                                                <th className="fw-bold fs-5"></th>
                                                <th className="fw-bold fs-5"></th>
                                                <th className="fw-bold fs-5"></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div id="chart_COMPORTAMIENTO" style={{ height: 400 }}></div>
                        </div>
                    </div>

                    <div className='col-12 '>

                        <div className='row'>
                            <div className='col-12'>
                                {/* <div className="row g-9 mb-8">
                                    <div className="col-md-3 fv-row">
                                        <label className="required fs-6 fw-semibold mb-2">Fecha Inicio</label>
                                        <input
                                            onChange={(item) => {
                                                // 
                                                setFECHA_INI_DC(item.target.value)
                                            }}
                                            defaultValue={FECHA_INI_DC}
                                            id='AD_FECHA_INI' type="month" className="form-control form-control-solid ps-12 flatpickr-input active" />
                                    </div>
                                    <div className="col-md-3">
                                        <button
                                            onClick={Descripcion_Colocacion}
                                            className='btn btn-success text-light fw-bold mt-4'><i className="bi bi-search fw-bold fs-5"></i></button>
                                    </div>
                                </div> */}

                            </div>
                            <div className='col-9'>
                                <div className='table-responsive' id='DESC_POR_MONTO_SECC'>
                                    <table id='DESC_POR_MONTO' className='display table table-striped'>
                                    </table>
                                </div>
                            </div>
                            <div className='col-9 mt-3'>
                                <div className='table-responsive' id='DESC_POR_PLAZO_SECC'>
                                    <table id='DESC_POR_PLAZO' className='display table table-striped'>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    )
}
export default Dashboard
