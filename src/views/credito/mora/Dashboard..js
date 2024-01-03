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


    function Cargar_Dasboard() {
        let url = "mora/Cargar_Dashboard"
        ajax.AjaxSendReceiveData(url, [], function (x) {

            let EVOLUCION_MOROSIDAD_GRAFICO_ = x["EVOLUCION_MOROSIDAD_GRAFICO"];



            EVOLUCION_MOROSIDAD_GRAFICO(EVOLUCION_MOROSIDAD_GRAFICO_)
        })

    }

    function EVOLUCION_MOROSIDAD_GRAFICO(datos) {
        console.log('datos: ', datos);
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
            series2.name = "2017";
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

    useEffect(() => {

        Cargar_Dasboard();

    }, []);

    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Dashboard</strong>
                </CCardHeader>
                <CCardBody>
                    <div className='col-12' id=''>
                        <div className='row'>
                            <div className='col-7'>
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
                </CCardBody>
            </CCard>
        </CCol>
    )
}
export default Dashboard
