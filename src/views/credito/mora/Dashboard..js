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
            console.log('x: ', x);

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
            console.log('resultados: ', datos);

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

        console.log('resultados: ', datos);
        let r1 = datos.filter(item => item.Rango == "DE 1 A 8 DIAS");
        let r1_operaciones = r1.length;
        let r1_saldo = 0;

        r1.map(function (x) {
            r1_saldo = r1_saldo + parseFloat(x.Saldo);
        });
        console.log('r1: ', r1);

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

    function POR_PLAZO(ARRAY_) {

        let datos = JSON.parse(JSON.stringify(ARRAY_));

        let r1 = datos.filter(item => parseInt(item.PlazoOriginal) >= 0 && parseInt(item.PlazoOriginal) <= 2);
        let r2 = datos.filter(item => parseInt(item.PlazoOriginal) >= 3 && parseInt(item.PlazoOriginal) <= 5);
        let r3 = datos.filter(item => parseInt(item.PlazoOriginal) >= 6 && parseInt(item.PlazoOriginal) <= 8);
        let r4 = datos.filter(item => parseInt(item.PlazoOriginal) >= 9 && parseInt(item.PlazoOriginal) <= 11);
        let r5 = datos.filter(item => parseInt(item.PlazoOriginal) >= 12 && parseInt(item.PlazoOriginal) <= 14);
        let r6 = datos.filter(item => parseInt(item.PlazoOriginal) >= 15 && parseInt(item.PlazoOriginal) <= 17);
        let r7 = datos.filter(item => parseInt(item.PlazoOriginal) >= 18 && parseInt(item.PlazoOriginal) <= 20);
        let r8 = datos.filter(item => parseInt(item.PlazoOriginal) >= 21 && parseInt(item.PlazoOriginal) <= 23);
        let r9 = datos.filter(item => parseInt(item.PlazoOriginal) >= 24 && parseInt(item.PlazoOriginal) <= 26);

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

    function POR_MONTO(ARRAY_) {

        let datos = JSON.parse(JSON.stringify(ARRAY_));

        let r1 = datos.filter(item => parseFloat(item.MontoOriginal) < 1000);
        let r2 = datos.filter(item => parseFloat(item.MontoOriginal) >= 1000 && parseFloat(item.MontoOriginal) < 1200);
        let r3 = datos.filter(item => parseFloat(item.MontoOriginal) >= 1200 && parseFloat(item.MontoOriginal) < 1500);
        let r4 = datos.filter(item => parseFloat(item.MontoOriginal) >= 1500 && parseFloat(item.MontoOriginal) <= 4000);

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

    function Cargar_Creditos_Cancelados() {

        let url = "mora/Cargar_Creditos_Cancelados"
        ajax.AjaxSendReceiveData(url, [], function (x) {
            console.log('x: ', x);

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
                data: x,
                dom: 'rtip',
                paging: true,
                // info: false,
                // buttons: ['colvis', "excel"],
                scrollCollapse: true,
                scrollX: true,
                columnDefs: [
                    { width: 100, targets: 0 },
                    { width: 300, targets: 2 },
                ],
                columns: [{
                    data: "FechaCorte",
                    title: "FECHA CORTE",
                    // width: 130
                },
                {
                    "data": "Identificacion",
                    "title": "IDENTIFICACION"
                },
                {
                    "data": "Cliente",
                    "title": "CLIENTE"
                },
                {
                    "data": "NumeroCredito",
                    "title": "NUMERO DE CREDITO"
                },
                {
                    "data": "NumeroCreditoNuevo",
                    "title": "NUMERO DE CREDITO NUEVO"
                },
                {
                    "data": "Oficina",
                    "title": "OFICINA"
                },
                {
                    "data": "OrigenCredito",
                    "title": "ORIGEN DEL CREDITO"
                },
                {
                    "data": "EstadoCredito",
                    "title": "ESTADO DEL CREDITO"
                },
                {
                    "data": "TipoCartera",
                    "title": "TIPO DE CARTERA"
                },
                {
                    "data": "TipoTablaAmortizacion",
                    "title": "TIPO DE TABLA DE AMORTIZACION"
                },
                {
                    "data": "TipoGracia",
                    "title": "TIPO DE GRACIA"
                },
                {
                    "data": "PeriodosGracia",
                    "title": "PERIODOS DE GRACIA"
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
                    "title": "SALDO"
                },
                {
                    "data": "ValorAPagar",
                    "title": "VALOR A PAGAR"
                },
                {
                    "data": "ValorCuota",
                    "title": "VALOR CUOTA"
                },
                {
                    "data": "FechaDesembolso",
                    "title": "FECHA DESEMBOLSO"
                },
                {
                    "data": "FechaPrimerVencimiento",
                    "title": "FECHA PRIMER VENCIMIENTO"
                },
                {
                    "data": "FechaVencimiento",
                    "title": "FECHA VENCIMIENTO"
                },
                {
                    "data": "FechaCancelacion",
                    "title": "FECHA CANCELACION"
                },
                {
                    "data": "Atraso",
                    "title": "ATRASO"
                },
                {
                    "data": "AtrasoMaximo",
                    "title": "ATRASO MAXIMO"
                },
                {
                    "data": "CuotasRestantes",
                    "title": "CUOTAS RESTANTES"
                },
                {
                    "data": "CuotaImpaga",
                    "title": "CUOTA IMPAGA"
                },
                {
                    "data": "TipoCancelacion",
                    "title": "TIPO DE CANCELACION"
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
                    $('td', row).eq(5).addClass("fw-bold fs-7 ");
                    $('td', row).eq(6).addClass("fw-bold fs-7 ");
                    $('td', row).eq(7).addClass("fw-bold fs-7 text-success");


                },
            })
        });
    }

    useEffect(() => {
        // Cargar_Creditos_Cancelados()
        // Cargar_Dasboard();
        // Descripcion_Colocacion();
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
                        <button onClick={Cargar_Creditos_Cancelados} className='btn btn-success text-light fw-bold'>Cargar</button>
                        <div className='table-responsive' id='SECC_TABLA_CR_CANCELADOS'>
                            <table id='TABLA_CR_CANCELADOS' className='table display table-striped'>

                            </table>

                        </div>
                    </div>
                    <div className='bg-warning bg-opacity-50 mb-3'>
                        <h5>EVOLUCIÓN DE LA MOROSIDAD PAR 30</h5>
                    </div>

                    <div className='col-12' id=''>
                        <button onClick={Cargar_Dasboard} className='btn btn-success text-light fw-bold'>Cargar</button>

                        <div className='row'>
                            <div className='col-6'>
                                <div id="chart_evolucion" style={{ height: 500 }}></div>
                            </div>
                            <div className='col-6'>
                                <div className='table-responsive' id='Tabla_Evo_SECC'>
                                    <table id='Tabla_Evo' className='display table table-striped'>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className='bg-warning bg-opacity-50 mb-3'>
                        <h5>DESCRIPCION COLOCACION</h5>
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
