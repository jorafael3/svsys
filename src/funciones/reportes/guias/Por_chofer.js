import * as fun from "../../../config/config"
import React, { useEffect, useRef, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CProgress,
    CButtonGroup,
    CButton
} from '@coreui/react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import $, { param } from 'jquery';
import moment from "moment";




var URL = "reportes/"
var grafico_dia = []
var grafico_mes = []

function Cargar_datos(param) {

    am4core.useTheme(am4themes_animated);
    param = param.param;
    console.log('param: ', param);

    const [seccion_detalle, setseccion_detalle] = useState(true);
    const [seccion_tabla, setseccion_tabla] = useState(false);


    Reporte_Chofer_General();


    function Reporte_Chofer_General() {
        let url = URL + "Reporte_Chofer_General"
        fun.AjaxSendReceiveData(url, param, function (res) {

            Tabla_Reporte_Clientes_General(res);
            $("#SECC_TABLA").show();
            $("#SECC_DET").hide();
            GRAFICO_PISTA(res);
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
                width: 150
            }, {
                data: null,
                title: "CEMENTO DESPACHADO",
                render: function (x, t, r) {
                    let datos = r["DATOS_CODIGOS_DESPACHADOS"];
                    let d = "SIN REGISTRO"
                    let cemento = datos.filter(item => item.ESCEMENTO == 1);
                    if (cemento.length > 0) {
                        cemento = cemento[0];
                        d = `
                        <div class="small text-medium-emphasis">`+ cemento["DESCRIPCION"] + `</div>
                        <span>TOTAL: `+ cemento["DESPACHADO_CODIGO_TOTAL"] + ` ` + cemento["UNIDAD"] + `</span><br>
                        <span >ESTE MES: `+ cemento["DESPACHADO_CODIGO_MES"] + ` ` + cemento["UNIDAD"] + `</span>
                        `
                    }

                    return d
                },
                width: 250
            },
            {
                data: "PLACA",
                title: "PLACA",
                width: 100,
                visible: false
            }, {
                data: "GUIAS_DESPACHADAS_MES",
                title: "DESPACHOS MES",
                // className: "text-center",
                render: function (x, t, r) {
                    let datos = r["DATOS_CODIGOS_DESPACHADOS"];
                    let d = "SIN REGISTRO"
                    let cemento = datos.filter(item => item.ESCEMENTO == 1);
                    if (cemento.length > 0) {
                        cemento = cemento[0];
                        d = `
                        <div class="medium text-medium-emphasis">DESPACHO TOTAL: `+ r["GUIAS_DESPACHADAS_MES"] + `</div>
                        <div class="medium text-medium-emphasis">DESPACHO CEMENTO: `+ cemento["CANTIDAD_DE_DESPACHOS_CODIGO_MES"] + `</div><br>
                        `
                    }
                    return d
                },
                width: 250

            }, {
                data: "GUIAS_DESPACHADAS_TOTAL",
                title: "DESPACHOS TOTAL",
                // className: "text-center",
                render: function (x, t, r) {
                    let datos = r["DATOS_CODIGOS_DESPACHADOS"];
                    let d = "SIN REGISTRO"
                    d = `
                        <div class="medium text-medium-emphasis">TOTAL DESPACHADAS: `+ r["GUIAS_DESPACHADAS_TOTAL"] + `</div>
                        <div class="medium text-medium-emphasis">TOTAL CEMENTO: `+ r["CANTIDAD_TOTAL_GUIAS_CEMENTO"] + `</div><br>
                        `
                    return d
                },
                width: 250

            },
            {
                data: "PROMEDIO_DEMORA_HORAS_TOTAL_MES",
                title: "PROM. TIEMPO DESPACHO MES",
                render: $.fn.dataTable.render.number(',', '.', 2, "", ' h'),
                visible: false
            },
            {
                data: "PROMEDIO_DEMORA_HORAS_TOTAL",
                title: "TIEMPO DESPACHO",
                // render: $.fn.dataTable.render.number(',', '.', 2, "", ' h')
                render: function (x, t, r) {
                    let datos = r["DATOS_CODIGOS_DESPACHADOS"];
                    let d = "SIN REGISTRO"
                    d = `
                        <div class="medium text-medium-emphasis">
                            PROMEDIO MES: `+ parseFloat(r["PROMEDIO_DEMORA_HORAS_TOTAL_MES"]).toFixed(2) + ` h</div>
                        <div class="medium text-medium-emphasis">
                            PROMEDIO GENERAL: `+ parseFloat(r["PROMEDIO_DEMORA_HORAS_TOTAL"]).toFixed(2) + ` h</div><br>
                        `
                    return d
                },
                width: 350
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

                let col1 = `
                    <div>`+ data["CHOFER_NOMBRE"] + `</div>
                    <div class="small text-medium-emphasis">
                        <span>Placa</span> | `+ data["PLACA"] + `
                    </div>
                `
                $('td', row).eq(0).html(col1);


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
            $("#CHOFER_GUIAS_ASIGNADAS_PERIODO").text(data["GUIAS_ASIGNADAS_MES"]);
            $("#CHOFER_GUIAS_DESPACHADAS_PERIODO").text(data["GUIAS_DESPACHADAS_MES"]);
            $("#CH_PROM_H_MES").text(parseFloat(data["PROMEDIO_DEMORA_HORAS_TOTAL_MES"]).toFixed(2));
            $("#CH_PROM_H_GEN").text(parseFloat(data["PROMEDIO_DEMORA_HORAS_TOTAL"]).toFixed(2));

            Tabla_Detalle_Clientes(data["DATOS_CLIENTE"]);
            createChart(data["DATOS_DESTINO"]);
            grafico_(data["DATOS_GRAFICO"]);
            grafico_dia = (data["DATOS_GRAFICO"]);
            grafico_mes = (data["DATOS_GRAFICO_MES"]);
            // Grafico_mes()
            Tabla_Chofer_Codigos_Despachados(data["DATOS_CODIGOS_DESPACHADOS"])
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

    function Tabla_Chofer_Codigos_Despachados(datos) {
        let TABLA_ = $('#TABLA_CODIGOS').DataTable({
            destroy: true,
            data: datos,
            dom: 'frtip',
            "pageLength": 5,
            order: [[3, "desc"]],
            columns: [{
                data: "DESCRIPCION",
                title: "DESCRIPCION",
                width: 200
            }, {
                data: "UNIDAD",
                title: "UNIDAD",
            },
            {
                data: "DESPACHADO_CODIGO_MES",
                title: "ESTE MES",
            },
            {
                data: "DESPACHADO_CODIGO_TOTAL",
                title: "GENERAL",
            }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-7 ");
                $('td', row).eq(1).addClass("fw-bold fs-7 bg-warning bg-opacity-10");
                $('td', row).eq(2).addClass("fw-bold fs-7 ");
                $('td', row).eq(3).addClass("fw-bold fs-7 bg-success bg-opacity-10");
                // $('td', row).eq(4).addClass("fw-bold fs-7 bg-info bg-opacity-10");
                // $('td', row).eq(5).addClass("fw-bold fs-7");
                // $('td', row).eq(6).addClass("fw-bold fs-7 bg-danger bg-opacity-10");

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

        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartdiv2", am4charts.XYChart);

            // Enable chart cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineX.disabled = true;
            chart.cursor.lineY.disabled = true;
            chart.numberFormatter.numberFormat = "#,###.##";
            // Enable scrollbar
            chart.scrollbarX = new am4core.Scrollbar();

            // Add data
            chart.data = datos;

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0.5;
            // dateAxis.dateFormatter.inputDateFormat = "yyyy-mm-dd";
            dateAxis.renderer.minGridDistance = 80;
            // dateAxis.tooltipDateFormat = "yyyy-mm-dd";
            //dateAxis.dateFormats.setKey("day", "dd");

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.tooltipText = "[bold font-size: 16px]{fecha}\n---------------\n[bold font-size: 17px] Despachos: {cantidad}[/]";
            series.tooltip.pointerOrientation = "vertical";
            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color("#ffffff");
            series.tooltip.label.fill = am4core.color("#000000");

            series.dataFields.valueY = "cantidad";
            series.dataFields.dateX = "fecha";
            //series.strokeDasharray = 3;
            series.strokeWidth = 3
            series.stroke = series.fill = am4core.color("#1151C2");
            series.name = "asdasd"
            //series.strokeOpacity = 0.3;
            // series.strokeDasharray = "3,3"

            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.strokeWidth = 2;
            bullet.stroke = am4core.color("#fff");
            bullet.setStateOnChildren = true;
            bullet.propertyFields.fillOpacity = "opacity";
            bullet.propertyFields.strokeOpacity = "opacity";

            var hoverState = bullet.states.create("hover");
            hoverState.properties.scale = 1.7;

            function createTrendLine(data) {
                var trend = chart.series.push(new am4charts.LineSeries());
                trend.dataFields.valueY = "cantidad";
                trend.dataFields.dateX = "fecha";
                trend.strokeWidth = 2
                trend.strokeDasharray = 3
                trend.stroke = trend.fill = am4core.color("#E65100");
                trend.data = data;
                trend.name = "Linea de tendencia"

                var bullet = trend.bullets.push(new am4charts.CircleBullet());
                //  bullet.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
                bullet.strokeWidth = 2;
                bullet.stroke = am4core.color("#fff")
                bullet.circle.fill = trend.stroke;

                var hoverState = bullet.states.create("hover");
                hoverState.properties.scale = 1.7;

                return trend;
            };
            // var y = lr.slope * (tamanio) + lr.intercept;

            // createTrendLine([{
            //     "date": minDate + "-01-01",
            //     "value": lr.intercept
            // },
            // {
            //     "date": maxDate + "-01-01",
            //     "value": y
            // }
            // ]);


            /* var lastTrend = createTrendLine([{
                     "date": minDate + "-01-01",
                     "value": lr.intercept
                 },
                 {
                     "date": maxDate + "-01-01",
                     "value": y
                 }
             ]);*/

            chart.legend = new am4charts.Legend();
            var scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            scrollbarX.background.fill = am4core.color("#1151C2");
            scrollbarX.background.fillOpacity = 0.2;
            scrollbarX.minHeight = 30;
            chart.scrollbarX = scrollbarX;

            chart.scrollbarX.paddingRight = 100;
            chart.scrollbarX.paddingLeft = 20;
            // chart.exporting.menu = new am4core.ExportMenu();

            // Initial zoom once chart is ready
            //  lastTrend.events.once("datavalidated", function() {
            //     series.xAxis.zoomToDates(new Date(2012, 0, 2), new Date(2012, 0, 13));
            // });

        }); // end am4core.ready()

    }

    function Grafico_mes(datos) {
        am4core.ready(function () {
            // Temas
            am4core.useTheme(am4themes_animated);

            // Crear instancia del gráfico
            var chart = am4core.create("chartdiv2", am4charts.XYChart);

            // Obtener los datos de la tabla MySQL y ajustar el formato de las fechas
            var data = datos

            // Convertir fechas a objetos Date
            data.forEach(function (item) {
                item.FECHA_CREADO = new Date(item.FECHA_CREADO);
                item.FECHA_COMPLETADO = new Date(item.FECHA_COMPLETADO);
            });

            // Agrupar los datos por mes
            var groupedData = groupDataByMonth(data);

            // Agregar los datos al gráfico
            chart.data = groupedData;

            // Crear ejes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "monthYear";
            categoryAxis.title.text = "Mes";
            categoryAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Número de Pedidos";

            // Crear la serie de barras
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "count";
            series.dataFields.categoryX = "monthYear";
            series.name = "Pedidos por Mes";
            series.columns.template.tooltipText = "Mes: {categoryX}\nPedidos: {valueY}";

            // Agregar la leyenda
            chart.legend = new am4charts.Legend();

            // Función para agrupar los datos por mes
            function groupDataByMonth(data) {
                var groupedData = {};
                data.forEach(function (item) {
                    var monthYear = item.FECHA_CREADO.getFullYear() + "-" + (item.FECHA_CREADO.getMonth() + 1);
                    if (!groupedData[monthYear]) {
                        groupedData[monthYear] = {
                            monthYear: monthYear,
                            count: 0
                        };
                    }
                    groupedData[monthYear].count++;
                });

                // Convertir el objeto en un array
                var result = Object.keys(groupedData).map(function (key) {
                    return groupedData[key];
                });

                return result;
            }
        });
    }

    function CAMBIAR_GRAFICO(t) {

        if (t == 1) {
            grafico_(grafico_dia)
        } else if (t == 2) {
            Grafico_mes(grafico_mes)
        }

    }

    function GRAFICO_PISTA(datos) {
        let ARRAY = [];
        datos.map(function (x, i) {
            let datos = x["DATOS_CODIGOS_DESPACHADOS"];
            let d = "SIN REGISTRO"
            let cemento = datos.filter(item => item.ESCEMENTO == 1);
            if (cemento.length > 0) {
                cemento = cemento[0];
            }
            let b = {
                track: i + 1,
                "name": x["CHOFER_NOMBRE"],
                value: cemento["DESPACHADO_CODIGO_MES"]
            }
            ARRAY.push(b);
        })

        console.log('ARRAY: ', ARRAY);

        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            var insterfaceColors = new am4core.InterfaceColorSet();
            var lineColor = insterfaceColors.getFor("background");

            var chart = am4core.create("GRAFICO_PISTA", am4plugins_timeline.CurveChart);
            chart.curveContainer.padding(20, 20, 20, 20);

            chart.data = ARRAY;

            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "name";
            categoryAxis.renderer.minGridDistance = 10;
            categoryAxis.renderer.innerRadius = 5;
            categoryAxis.renderer.radius = 145;
            categoryAxis.renderer.line.stroke = lineColor;
            categoryAxis.renderer.line.strokeWidth = 5;
            categoryAxis.renderer.line.strokeOpacity = 1;

            var labelTemplate = categoryAxis.renderer.labels.template;
            labelTemplate.fill = lineColor;
            labelTemplate.fontWeight = 600;
            labelTemplate.fontSize = 11;

            var gridTemplate = categoryAxis.renderer.grid.template;
            gridTemplate.strokeWidth = 1;
            gridTemplate.strokeOpacity = 1;
            gridTemplate.stroke = lineColor;
            gridTemplate.location = 0;
            gridTemplate.above = true;

            var fillTemplate = categoryAxis.renderer.axisFills.template;
            fillTemplate.disabled = false;
            fillTemplate.fill = am4core.color("#b84f49");
            fillTemplate.fillOpacity = 1;

            categoryAxis.fillRule = function (dataItem) {
                dataItem.axisFill.__disabled = false;
                dataItem.axisFill.opacity = 1;
            }

            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.max = 20000;
            valueAxis.renderer.points = [{ x: 0, y: -100 }, { x: 200, y: -100 }, { x: 200, y: 100 }, { x: 0, y: 100 }, { x: -200, y: 100 }, { x: -200, y: -100 }, { x: 0, y: -100 }];
            valueAxis.renderer.polyspline.tensionX = 0.4;
            valueAxis.renderer.line.strokeOpacity = 0.1;
            valueAxis.renderer.line.strokeWidth = 10;
            valueAxis.renderer.maxLabelPosition = 0.98;
            valueAxis.renderer.minLabelPosition = 0.02;

            // Flag bullet
            var flagRange = valueAxis.axisRanges.create();
            flagRange.value = 0;
            var flagBullet = new am4plugins_bullets.FlagBullet();
            flagBullet.label.text = "START";
            flagRange.bullet = flagBullet;
            //flagBullet.dy = -145;
            flagBullet.adapter.add("dy", function (dy, target) {
                return -categoryAxis.renderer.radius;
            })

            var valueLabelTemplate = valueAxis.renderer.labels.template;
            valueLabelTemplate.fill = lineColor;
            valueLabelTemplate.fontSize = 12;
            valueLabelTemplate.fontWeight = 600;
            valueLabelTemplate.fillOpacity = 1;
            valueLabelTemplate.horizontalCenter = "right";
            valueLabelTemplate.verticalCenter = "bottom";
            valueLabelTemplate.padding(0, 6, 0, 0);
            valueLabelTemplate.adapter.add("rotation", function (rotation, target) {
                var value = target.dataItem.value;
                var position = valueAxis.valueToPosition(value);

                var angle = valueAxis.renderer.positionToAngle(position);
                return angle;
            })

            var valueGridTemplate = valueAxis.renderer.grid.template;
            valueGridTemplate.strokeOpacity = 0.3;
            valueGridTemplate.stroke = lineColor;


            // SERIES
            var series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
            series.dataFields.categoryY = "name";
            series.stroke = lineColor;
            series.fill = lineColor;
            series.dataFields.valueX = "value";
            series.defaultState.transitionDuration = 4000;

            var columnTemplate = series.columns.template;
            columnTemplate.fill = lineColor;
            columnTemplate.strokeOpacity = 0;
            columnTemplate.fillOpacity = 0.3;
            columnTemplate.height = am4core.percent(100);

            var hoverState = columnTemplate.states.create("hover");
            hoverState.properties.fillOpacity = 0.9;

            var bullet = series.bullets.push(new am4charts.CircleBullet())
            bullet.fill = lineColor;

            // LEGEND
            chart.legend = new am4charts.Legend();
            chart.legend.data = chart.data;
            chart.legend.parent = chart.curveContainer;
            chart.legend.width = 360;
            chart.legend.horizontalCenter = "middle";
            chart.legend.verticalCenter = "middle";

            var markerTemplate = chart.legend.markers.template;
            markerTemplate.width = 30;
            markerTemplate.height = 30;

            chart.legend.itemContainers.template.events.on("over", function (event) {
                series.dataItems.each(function (dataItem) {
                    if (dataItem.dataContext == event.target.dataItem.dataContext) {
                        dataItem.column.isHover = true;
                    }
                    else {
                        dataItem.column.isHover = false;
                    }
                })
            })

            chart.legend.itemContainers.template.events.on("hit", function (event) {
                series.dataItems.each(function (dataItem) {
                    if (dataItem.dataContext == event.target.dataItem.dataContext) {
                        if (dataItem.visible) {
                            dataItem.hide(1000, 0, 0, ["valueX"]);
                        }
                        else {
                            dataItem.show(1000, 0, ["valueX"]);
                        }
                    }
                })
            })

            var rect = markerTemplate.children.getIndex(0);
            rect.cornerRadius(20, 20, 20, 20);

            var as = markerTemplate.states.create("active");
            as.properties.opacity = 0.5;

            // var image = markerTemplate.createChild(am4core.Image)
            // image.propertyFields.href = "file";
            // image.width = 30;
            // image.height = 30;
            // image.filters.push(new am4core.DesaturateFilter());

            // image.events.on("inited", function (event) {
            //     var image = event.target;
            //     var parent = image.parent;
            //     image.mask = parent.children.getIndex(0);
            // })

        }); // end am4core.ready()
    }

    return (
        <div className="col-12">
            <h4 className="fw-bold bg-light">Reporte por Chofer</h4>

            <div className="col-12">
                <div className="col-12" id="SECC_TABLA">

                    <div className="p-3">
                        <div id="GRAFICO_PISTA" style={{ width: "100%", height: 600 }}></div>
                    </div>


                    <div className="table-responsive" id="REP_CHOFER_TABLA_SECC">
                        <table id="REP_CHOFER_TABLA" className="table table-striped" >

                        </table>
                    </div>
                </div>


                <div className="col-12 mt-4" id="SECC_DET" style={{ display: "none" }}>

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
                                                        <div className="text-medium-emphasis small">Guias asignadas Mes</div>
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
                                                        <div className="text-medium-emphasis small">Guias despachadas Mes</div>
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
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button onClick={() => CAMBIAR_GRAFICO(1)} type="button" className="btn btn-light">Dia</button>
                                                <button onClick={() => CAMBIAR_GRAFICO(2)} type="button" className="btn btn-light">Mes</button>
                                                <button onClick={() => CAMBIAR_GRAFICO(3)} type="button" className="btn btn-light">Año</button>
                                            </div>
                                            <div id="chartdiv2" style={{ width: "100%", height: "400px" }}></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="fw-bold fs-4"> Tiempo promedio de despacho</div>
                                            <div className="small text-medium-emphasis">
                                                <span className="fs-5 fw-bold text-muted">MES {moment(param.FECHA_INI).format("MMM YYYY")} | </span>
                                                <span id="CH_PROM_H_MES" className="fs-5 fw-bold text-muted">

                                                </span>
                                            </div>
                                            <div className="small text-medium-emphasis">
                                                <span className="fs-5 fw-bold text-muted">GENERAL     | </span>
                                                <span id="CH_PROM_H_GEN" className="fs-5 fw-bold text-muted">

                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-7">
                                            <div className="table-resposive">
                                                <table id="TABLA_CODIGOS" className="table " style={{ width: "100%" }}>
                                                    <thead className="table-light">

                                                    </thead>
                                                </table>
                                            </div>
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