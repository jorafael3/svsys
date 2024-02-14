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

function Morisidad() {

    function MOROSIDAD_POR_DIA() {
        let url = "mora/MOROSIDAD_POR_DIA"
        let filtro = $("#EV_FILTRO").val()

        let param = {
            tipo: filtro,
            TIPO_CARTERA: TIPO_CARTERA
        }
        ajax.AjaxSendReceiveData(url, param, function (x) {


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
        });
        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 100);
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
                trend.strokeWidth = 1
                trend.stroke = trend.fill = am4core.color("#c00");
                trend.data = data;

                var bullet = trend.bullets.push(new am4charts.CircleBullet());
                // bullet.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
                bullet.strokeWidth = 1;
                bullet.stroke = am4core.color("#fff")
                bullet.circle.fill = trend.stroke;

                var hoverState = bullet.states.create("hover");
                hoverState.properties.scale = 1.7;

                return trend;
            };

            createTrendLine(primerYUltimoDato);

        });
    }

    useEffect(() => {

        MOROSIDAD_POR_DIA();

    }, []);

    return (

        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Evolucion de la morosidad</strong>
                </CCardHeader>
                <CCardBody>
                    <div className='col-12' id=''>
                        {/* <button onClick={Cargar_Dasboard} className='btn btn-success text-light fw-bold'>Cargar</button> */}
                        <div className='col-12 mb-3'>
                            <h4>Cartera</h4>
                            <button onClick={() => {
                                TIPO_CARTERA = 1
                                MOROSIDAD_POR_DIA()
                            }} className='btn btn-outline-success fw-bold fs-4'>CARTERA 1</button>
                            <button onClick={() => {
                                TIPO_CARTERA = 2
                                MOROSIDAD_POR_DIA()
                            }} className='btn btn-outline-info fw-bold m-2 fs-4'>CARTERA 2</button>
                        </div>
                        <div className='col-2'>
                            <h5>Vista</h5>
                            <select onChange={MOROSIDAD_POR_DIA} name="" id="EV_FILTRO" className='form-select fs-4 p-2'>
                                <option value="1">Dia</option>
                                <option value="2">Mes</option>
                                <option value="3">Año</option>
                            </select>
                        </div>


                        <div className='col-12'>
                            <div className='table-responsive' id='Tabla_MOROSIDAD_SECC'>
                                <table style={{ width: "100%" }} id='Tabla_MOROSIDAD' className='display table table-striped'>
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
                        <div className='col-12'>
                            <div id="chart_MOROSIDAD" style={{ height: 400 }}></div>
                        </div>
                    </div>

                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default Morisidad
