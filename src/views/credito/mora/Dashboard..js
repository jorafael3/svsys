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


    function Cargar_Dasboard() {
        let url = "mora/Cargar_Dashboard"
        ajax.AjaxSendReceiveData(url, [], function (x) {


            let EVOLUCION_MOROSIDAD_GRAFICO_ = x["EVOLUCION_MOROSIDAD_GRAFICO"];

            EVOLUCION_MOROSIDAD_GRAFICO(EVOLUCION_MOROSIDAD_GRAFICO_)
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

    function POR_PLAZO(datos) {
        console.log('datos: ', datos);
        let r1 = datos[0];
        let r2 = datos[1];
        let r3 = datos[2];
        let r4 = datos[3];
        let r5 = datos[4];
        let r6 = datos[5];
        let r7 = datos[6];
        let r8 = datos[7];
        let r9 = datos[8];

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

        console.log('ARRAY: ', ARRAY);

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

    function POR_MONTO(datos) {


        let r1 = datos[0];
        let r2 = datos[1];
        let r3 = datos[2];
        let r4 = datos[3];

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

    useEffect(() => {

        Cargar_Dasboard();
        Descripcion_Colocacion();
    }, []);

    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Dashboard</strong>
                </CCardHeader>
                <CCardBody>
                    <div className='bg-warning bg-opacity-50 mb-3'>
                        <h5>EVOLUCIÓN DE LA MOROSIDAD PAR 30</h5>
                    </div>
                    <div className='col-12' id=''>
                        <div className='row'>
                            <div className='col-12'>
                                <div id="chart_evolucion" style={{ height: 500 }}></div>
                            </div>
                            <div className='col-5'>
                                <div className='table-responsive' id='Tabla_Rutas_SECC'>

                                    <table id='Tabla_Rutas' className='display table table-striped'>
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
                                <div className="row g-9 mb-8">
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
                                </div>

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
