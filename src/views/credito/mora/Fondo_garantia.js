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

function Fondo_Garantia() {

    function CLIENTES_FONDO_GARANTIA() {
        let url = "mora/CLIENTES_FONDO_GARANTIA"
        ajax.AjaxSendReceiveData(url, [], function (x) {

            TABLA_CLIENTES_FONDO_GARANTIA(x)
        })
    }

    function TABLA_CLIENTES_FONDO_GARANTIA(datos) {
        $('#Tabla_MOROSIDAD_cartera_FONDO_GARANTIA').empty();
        if ($.fn.dataTable.isDataTable('#Tabla_MOROSIDAD_cartera_FONDO_GARANTIA')) {
            $('#Tabla_MOROSIDAD_cartera_FONDO_GARANTIA').DataTable().destroy();
            $('#Tabla_MOROSIDAD_cartera_FONDO_GARANTIA_SECC').empty();
        }

        let tabla = `
            <table id='Tabla_MOROSIDAD_cartera_FONDO_GARANTIA' class='table display table-striped'>
            </table>
        `;
        $('#Tabla_MOROSIDAD_cartera_FONDO_GARANTIA_SECC').append(tabla);
        let TABLA_ = $('#Tabla_MOROSIDAD_cartera_FONDO_GARANTIA').DataTable({
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
                "data": "TipoCartera",
                "title": "NUMERO DE CREDITO",
                visible: false
            },
            {
                "data": "NumeroCredito",
                "title": "NUMERO DE CREDITO",
                // visible: false
            },
            {
                "data": "NumeroCreditoNuevo",
                "title": "NUMERO DE CREDITO NUEVO",
                visible: false
            },
            {
                "data": "Oficina",
                "title": "OFICINA",
                // visible: false

            },
            {
                "data": "OrigenCredito",
                "title": "ORIGEN DEL CREDITO",
                // visible: false
            },
            {
                "data": "EstadoCredito",
                "title": "ESTADO DEL CREDITO"
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
                // if (data["EstadoCredito"] == "VIGENTE") {
                //     $('td', row).eq(2).addClass("text-primary");
                // } else {
                //     $('td', row).eq(2).addClass("text-success");
                // }


                let c2 = `
                <span class="text-muted">`+ data["Identificacion"] + `<span><br>
                <span class="text-dark">`+ data["Cliente"] + `<span><br>
                `
                $('td', row).eq(1).html(c2);

            },
        })
    }

    function MOROSIDAD_CARTERA() {
        let url = "mora/MOROSIDAD_CARTERA"
        let filtro = $("#MO_FILTRO").val()
        let param = {
            tipo: filtro
        }
        ajax.AjaxSendReceiveData(url, param, function (x) {
            x.map(function (x) {
                x.TOTAL = parseInt(x.CARTERABANCO) + parseInt(x.FONDODEGARANTIA)
            })
            MOROSIDAD_CARTERA_TABLA(x)
            const primerYUltimoDato = [x[0], x[x.length - 1]];
            MOROSIDAD_CARTERA_GRAFICO(x, primerYUltimoDato)
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

    function MOROSIDAD_CARTERA_GRAFICO(data, primerYUltimoDato) {
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
            series.name = "FONDO DE GARANTIA"
            series.dataFields.valueY = "FONDODEGARANTIA";
            series.dataFields.dateX = "FechaCorte";
            series.tooltipText = "{FONDODEGARANTIA}"
            series.strokeWidth = 3;
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
            bullet.circle.radius = 3;
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
            chart.legend = new am4charts.Legend();
            chart.legend.parent = chart.plotContainer;
            chart.legend.zIndex = 100;

            function createTrendLine(data) {
                var trend = chart.series.push(new am4charts.LineSeries());
                trend.dataFields.valueY = "FONDODEGARANTIA";
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

        CLIENTES_FONDO_GARANTIA();
        MOROSIDAD_CARTERA()
    }, []);

    return (

        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Creditos cancelados</strong>
                </CCardHeader>
                <CCardBody>

                    <div className='col-12' id=''>

                        <div className='col-12'>
                            <h5>CLIENTES EN FONDO DE GARANTIA</h5>
                            <div className='table-responsive' id='Tabla_MOROSIDAD_cartera_FONDO_GARANTIA_SECC'>
                                <table id='Tabla_MOROSIDAD_cartera_FONDO_GARANTIA' className='display table table-striped'>
                                </table>
                            </div>
                        </div>
                        <div className='col-2'>
                            <h5>Vista</h5>
                            <select onChange={MOROSIDAD_CARTERA} name="" id="MO_FILTRO" className='form-select fs-4 p-2'>
                                <option value="1">Dia</option>
                                <option value="2">Mes</option>
                                <option value="3">Año</option>
                            </select>
                        </div>
                        <div className='row'>

                            <div className='col-7'>
                                <div className='table-responsive' id='Tabla_MOROSIDAD_cartera_SECC'>
                                    <table style={{ width: "100%" }} id='Tabla_MOROSIDAD_cartera' className='display table table-striped'>
                                    </table>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div id="chart_CARTERA" style={{ height: 400 }}></div>
                            </div>
                        </div>

                    </div>

                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default Fondo_Garantia
