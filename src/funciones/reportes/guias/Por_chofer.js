import * as fun from "../../../config/config"
import React, { useEffect, useRef, useState } from 'react';
import {
    CRow,
    CCol,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CWidgetStatsA,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CProgress,
    CTable,
    CTableBody,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import $, { param } from 'jquery';
import ReactDOMServer from 'react-dom/server';
import moment from "moment";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

var URL = "reportes/"


function Cargar_datos(param) {
    param = param.param;
    console.log('param: ', param);
    const [seccion_detalle, setseccion_detalle] = useState(true);
    const [seccion_tabla, setseccion_tabla] = useState(false);

    Reporte_Chofer_General();

    function Reporte_Chofer_General() {
        let url = URL + "Reporte_Chofer_General"
        fun.AjaxSendReceiveData(url, param, function (res) {
            console.log('res: ', res);
            Tabla_Reporte_Clientes_General(res);
            $("#SECC_TABLA").show();
            $("#SECC_DET").hide();
        });
    }

    function Tabla_Reporte_Clientes_General(datos) {

        $('#REP_CHOFER_TABLA').empty();
        if ($.fn.dataTable.isDataTable('#REP_CHOFER_TABLA')) {
            $('#REP_CHOFER_TABLA').DataTable().destroy();
            $('#REP_CHOFER_TABLA_SECC').empty();
        }
        let tabla = `
        <table id='REP_CHOFER_TABLA' style='width:100%' class='table display table-striped'>
        </table>
        `;
        $('#REP_CHOFER_TABLA_SECC').append(tabla);
        let TABLA_ = $('#REP_CHOFER_TABLA').DataTable({
            destroy: true,
            data: datos,
            dom: 'Bfrtip',
            buttons: [
                {
                    text: `<span class"fw-bold"><i class="bi bi-arrow-clockwise fs-4"></i></span>`,
                    className: 'btn btn-success',
                    action: function (e, dt, node, config) {
                        // Cargar_Usuarios();
                    },
                },
                // {
                //     text: `<span class"fw-bold"><i class="bi bi-person-plus-fill fs-4"></i></span>`,
                //     className: 'btn btn-success',
                //     action: function (e, dt, node, config) {
                //         // setVisible_n(true);
                //         // setdept_select("");
                //         // setsuc_select("");
                //     },
                // },
                // {
                //     extend: 'excel',
                //     text: '<i className="fa fa-file-excel"></i> Excel',
                //     className: 'btn btn-primary',
                // }
            ],
            columns: [{
                data: "CHOFER_NOMBRE",
                title: "CHOFER",
                width: 100
            },
            {
                data: "PLACA",
                title: "PLACA",
                width: 100
            }, {
                data: "GUIAS_COMPLETAS",
                title: "DESPACHOS COMPLETOS",
                className: "text-center"
            }, {
                data: "GUIAS_PARCIALES",
                title: "DESPACHOS PARCIALES",
                className: "text-center"

            }, {
                data: "GUIAS_TOTALES",
                title: "DESPACHOS TOTAL",
                className: "text-center",

            },
            {
                data: "PROMEDIO_DEMORA_HORAS_TOTAL_MES",
                title: "PROMEDIO DESPACHO PERIODO",
                render: $.fn.dataTable.render.number(',', '.', 2, "", ' h')
            },
            {
                data: "PROMEDIO_DEMORA_HORAS_TOTAL",
                title: "PROMEDIO DESPACHO GENERAL",
                render: $.fn.dataTable.render.number(',', '.', 2, "", ' h')
            },
            {
                data: null,
                title: "DETALLES",
                className: "btn_detalles text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_recibir btn btn-danger text-light"><i class="bi bi-file-bar-graph fs-3"></i></button>',
                orderable: "",
                width: 20
            }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-7 ");
                $('td', row).eq(1).addClass("fw-bold fs-7 bg-warning bg-opacity-10");
                $('td', row).eq(2).addClass("fw-bold fs-7 ");
                $('td', row).eq(3).addClass("fw-bold fs-7 bg-success bg-opacity-10");
                $('td', row).eq(4).addClass("fw-bold fs-7 bg-info bg-opacity-10");
                $('td', row).eq(5).addClass("fw-bold fs-7");
                $('td', row).eq(6).addClass("fw-bold fs-7 bg-danger bg-opacity-10");

                if (data["PROMEDIO_DEMORA_HORAS_TOTAL"] == null) {
                    $('td', row).eq(6).html("<span class='text-danger'>Sin registro</span>");

                }


            },
        });
        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 500);
        $('#REP_CHOFER_TABLA').on('click', 'td.btn_detalles', function (respuesta) {
            var data = TABLA_.row(this).data();
            console.log('data: ', data);

            $("#SECC_TABLA").hide();
            $("#SECC_DET").show(200);

            $("#CHOFER_NOMBRE").text(" " + data["CHOFER_NOMBRE"]);
            $("#CHOFER_PLACA").text(" " + data["PLACA"]);
            $("#CHOFER_GUIAS_TOTALES").text(data["GUIAS_TOTALES"]);
            $("#CHOFER_GUIAS_ASIGNADAS_TOTALES").text(data["GUIAS_ASIGNADAS_TOTAL"]);
            $("#CHOFER_GUIAS_ASIGNADAS_PERIODO").text(data["GUIAS_ASIGNADAS_PERIODO"]);
            $("#CHOFER_GUIAS_DESPACHADAS_PERIODO").text(data["GUIAS_TOTALES_PERIODO"]);

            Tabla_Detalle_Clientes(data["DATOS_CLIENTE"]);
            createChart(data["DATOS_DESTINO"]);
            grafico_(data["DATOS_GRAFICO"]);
        });
    }


    function Tabla_Detalle_Clientes(datos) {
        // $('#TABLA_CLIENTES').empty();

        let TABLA_ = $('#TABLA_CLIENTES').DataTable({
            destroy: true,
            data: datos,
            dom: 'frtip',
            columns: [{
                data: "CLIENTE_NOMBRE",
                title: "CLIENTE",
                width: 200
            },
            {
                data: "CANTIDAD_ENTREGAS_PERIODO",
                title: "DESPACHOS",
            },
            {
                data: "CLIENTE_NOMBRE",
                title: "TIEMPO ESTIMADO",
            },
            {
                data: "ULTIMO_DESPACHO",
                title: "ACTIVIDAD",
            }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fs-7 ");
                // $('td', row).eq(1).addClass("fw-bold fs-7 bg-warning bg-opacity-10");
                // $('td', row).eq(2).addClass("fw-bold fs-7 ");
                // $('td', row).eq(3).addClass("fw-bold fs-7 bg-success bg-opacity-10");
                // $('td', row).eq(4).addClass("fw-bold fs-7 bg-info bg-opacity-10");
                // $('td', row).eq(5).addClass("fw-bold fs-7");
                // $('td', row).eq(6).addClass("fw-bold fs-7 bg-danger bg-opacity-10");


                let CL_NEW = data["CANTIDAD_ENTREGAS_TOTAL"] >= 1 && data["CANTIDAD_ENTREGAS_TOTAL"] < 3 ? "Nuevo" :
                    data["CANTIDAD_ENTREGAS_TOTAL"] == 0 ? "N/A" : "Recurrente"
                let col1 = `
                <div class="fw-bold">`+ data["CLIENTE_NOMBRE"] + `</div>
                <div class="small text-medium-emphasis">
                <span>`+ CL_NEW + `</span> 
                | Registrado: `+ moment(data["CLIENTE_FECHA_REGISTRO"]).format("MMM D, YYYY") + `</div>
                `
                $('td', row).eq(0).html(col1);



                let color = parseFloat(data["CANTIDAD_PARCIAL_PORCENTAJE"]) < 50 ? "bg-warning" :
                    parseFloat(data["CANTIDAD_PARCIAL_PORCENTAJE"]) >= 50 && parseFloat(data["CANTIDAD_PARCIAL_PORCENTAJE"]) < 100 ? "bg-sucess" : "bg-primary";
                let col2 = `
                
                <div class="clearfix"><div class="float-start">
                    <strong>`+ parseFloat(data["CANTIDAD_PARCIAL_PORCENTAJE"]).toFixed(2) + `%
                    (`+ parseFloat(data["CANTIDAD_ENTREGAS_PERIODO"]).toFixed(0) + `) de (` + parseFloat(data["CANTIDAD_ENTREGAS_TOTAL_OTROS_CHOFERES"]).toFixed(0) + `)
                    </strong>
                </div>
                <div class="float-end">
                    <small class="text-medium-emphasis">`+ moment(param["FECHA_INI"]).format("MMM D, YYYY") + ` - ` + moment(param["FECHA_FIN"]).format("MMM D, YYYY") + `</small>
                </div></div>
                <div class="progress progress-thin" role="progressbar" aria-valuenow="10" 
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar `+ color + `" style="width: ` + data["CANTIDAD_PARCIAL_PORCENTAJE"] + `%;">
                    </div>
                </div>
                `
                $('td', row).eq(1).html(col2);

                let col3 = `
                <div class="small text-medium-emphasis">Ultimo despacho</div>
                <strong>`+ (data["ULTIMO_DESPACHO"]).split("|")[0] + `</strong>
                `
                $('td', row).eq(3).html(col3);

                let col_t = `
                <div class="col mb-sm-2 mb-0">
                    <div class="text-medium-emphasis">Tiempo promedio</div>
                    <strong>`+ parseFloat(data["TIEMPO_ESTIMADO_DESPACHO_GENERAL"]).toFixed(2) + ` h</strong>
                </div>
                
                `
                $('td', row).eq(2).html(col_t);


            },
        });
        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 500);

    }

    const createChart = (datos) => {
        // Inicializar gráfico
        let chart = am4core.create("chartdiv", am4charts.PieChart);
        chart.padding(10, 10, 10, 10); // Ajusta el espacio para el título
        let title = chart.titles.create();
        title.text = "Destinos"; // Contenido del título
        title.fontSize = 20; // Tamaño de fuente
        title.marginBottom = 10; // Margen inferior

        // Configura los datos
        chart.data = datos

        // Configura la serie de pastel
        let series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "CANTIDAD_TOTAL";
        series.dataFields.category = "TipoDestino";
        series.slices.template.strokeOpacity = 1;
        // Etiquetas y leyendas
        chart.legend = new am4charts.Legend();

        // Limpieza al desmontar el componente
        return () => {
            chart.dispose();
        };
    };

    function grafico_(datos) {

        // Create chart instance
        var chart = am4core.create("chartdiv2", am4charts.XYChart);
        chart.padding(10, 10, 10, 10); // Ajusta el espacio para el título
        let title = chart.titles.create();
        title.text = "Despachos"; // Contenido del título
        title.fontSize = 20; // Tamaño de fuente
        title.marginBottom = 10; // Margen inferior
        // Add data
        chart.data = datos

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 50;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.logarithmic = true;
        valueAxis.renderer.minGridDistance = 20;

        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "cantidad";
        series.dataFields.dateX = "fecha";
        series.tooltipText = "Despachos: {cantidad}"
        series.tensionX = 0.8;
        series.strokeWidth = 3;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.fill = am4core.color("#fff");
        bullet.circle.strokeWidth = 3;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.fullWidthLineX = true;
        chart.cursor.xAxis = dateAxis;
        chart.cursor.lineX.strokeWidth = 0;
        chart.cursor.lineX.fill = am4core.color("#000");
        chart.cursor.lineX.fillOpacity = 0.1;

        // Add scrollbar
        chart.scrollbarX = new am4core.Scrollbar();

        // Add a guide
        let range = valueAxis.axisRanges.create();
        range.value = 90.4;
        range.grid.stroke = am4core.color("#396478");
        range.grid.strokeWidth = 1;
        range.grid.strokeOpacity = 1;
        range.grid.strokeDasharray = "3,3";
        range.label.inside = true;
        range.label.text = "Average";
        range.label.fill = range.grid.stroke;
        range.label.verticalCenter = "bottom";

}

return (
    <div className="col-12">
        <h4 className="fw-bold bg-light">Reporte por Chofer</h4>

        <div className="col-12">
            <div className="col-12" id="SECC_TABLA">
                <div className="table-responsive" id="REP_CHOFER_TABLA_SECC">
                    <table id="REP_CHOFER_TABLA" className="table table-striped" >

                    </table>
                </div>
            </div>


            <div className="col-12 mt-4" id="SECC_DET">

                <CRow>
                    <CCol xs>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <div className="row">
                                    <div className="col-1">
                                        <button onClick={() => {

                                            $("#SECC_TABLA").show(100);
                                            $("#SECC_DET").hide();
                                        }} className="btn btn-info text-light"><i className="bi bi-backspace-fill fs-6"></i></button>
                                    </div>
                                    <div className="col-4 mt-2">
                                        <h5 className="fw-bold text-muted">Datos por chofer</h5>
                                    </div>
                                </div>
                            </CCardHeader>
                            <CCardBody>
                                <h5 className="text-muted">Nombre:
                                    <span id="CHOFER_NOMBRE"></span>
                                </h5>
                                <h5 className="text-muted">Placa:
                                    <span id="CHOFER_PLACA"></span>
                                </h5>
                                <CRow>

                                    <CCol xs={12} md={6} xl={6}>

                                        <CRow>
                                            <CCol sm={6}>
                                                <div className="border-start border-start-4 border-start-info py-1 px-3">
                                                    <div className="text-medium-emphasis small">Total guias asignadas</div>
                                                    <div className="fs-5 fw-semibold" id="CHOFER_GUIAS_ASIGNADAS_TOTALES"></div>
                                                </div>
                                            </CCol>
                                            <CCol sm={6}>
                                                <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                                    <div className="text-medium-emphasis small">Guias asignadas periodo</div>
                                                    <div className="fs-5 fw-semibold" id="CHOFER_GUIAS_ASIGNADAS_PERIODO">78,623</div>
                                                </div>
                                            </CCol>

                                        </CRow>

                                    </CCol>

                                    <CCol xs={12} md={6} xl={6}>
                                        <CRow>
                                            <CCol sm={6}>
                                                <div className="border-start border-start-4 border-start-danger py-1 px-3">
                                                    <div className="text-medium-emphasis small">Total guias despachadas</div>
                                                    <div className="fs-5 fw-semibold" id="CHOFER_GUIAS_TOTALES"></div>
                                                </div>
                                            </CCol>
                                            <CCol sm={6}>
                                                <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                                    <div className="text-medium-emphasis small">Guias desp. periodo</div>
                                                    <div className="fs-5 fw-semibold" id="CHOFER_GUIAS_DESPACHADAS_PERIODO">49,123</div>
                                                </div>
                                            </CCol>
                                        </CRow>


                                    </CCol>
                                </CRow>

                                <br />
                                <div className="row">
                                    <div className="col-5">
                                        <div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
                                    </div>
                                    <div className="col-7">
                                        <div id="chartdiv2" style={{ width: "100%", height: "300px" }}></div>
                                    </div>
                                </div>
                               

                                <div className="col-12 mt-3">
                                    <div className="table-resposive">
                                        <table id="TABLA_CLIENTES" className="table " style={{ width: "100%" }}>
                                            <thead className="table-light">

                                            </thead>
                                        </table>
                                    </div>
                                </div>

                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>

            </div>

        </div>
    </div>
)

}

export default Cargar_datos