import * as fun from "../../../config/config"
import React, { useEffect, useRef, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import $, { param } from 'jquery';


var URL = "reportes/"
var LABELS = []
var DATOS = []

function Cargar_datos(param) {
    param = param.param;
    const [total_facturado, settotal_facturado] = useState(0);
    const [datos_totales, setdatos_totales] = useState([]);
    const [gr_facturado_label, setgr_facturado_label] = useState(0);
    const [gr_facturado_data, setgr_facturado_data] = useState(0);


    Reporte_Clientes_General();

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    function Reporte_Clientes_General() {
        let url = URL + "Reporte_Clientes_General"
        fun.AjaxSendReceiveData(url, param, function (res) {
            console.log('res: ', res);
            // 
            // let data = JSON.parse(JSON.stringify(res));
            // setdatos_totales(data);
            // let reporte = res[0];
            // let servicios = res[1];
            // reporte.map(function (x) {
            //     let filtro = servicios.filter(item => item.CLIENTE_ENTREGA_ID == x.CLIENTE_ID)[0];
            //     const keys = Object.keys(filtro);
            //     for (const key of keys) {
            //         const value = filtro[key];
            //         x[key] = value
            //     }
            // });

            // Tabla_Reporte_Clientes_General(res);
            // FATURADO(reporte);

        });
    }

    function Tabla_Reporte_Clientes_General(datos) {
        $('#REP_CLIENTE_TABLA').empty();
        if ($.fn.dataTable.isDataTable('#REP_CLIENTE_TABLA')) {
            $('#REP_CLIENTE_TABLA').DataTable().destroy();
            $('#REP_CLIENTE_TABLA_SECC').empty();
        }
        let tabla = `
        <table id='REP_CLIENTE_TABLA' class='table display table-striped'>
        </table>
        `;
        $('#REP_CLIENTE_TABLA_SECC').append(tabla);
        let TABLA_ = $('#REP_CLIENTE_TABLA').DataTable({
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
                data: "CLIENTE_NOMBRE",
                title: "CLIENTE NOMBRE",
            },
            {
                data: "GUIAS_ASIGNADAS",
                title: "GUIAS ASIGNADAS"
            }, {
                data: "CEMENTO_DESPACHADO",
                title: "CEMENTO",

            }, {
                data: "GUIAS_RETIRADAS",
                title: "GUIAS RETIRADAS",

            }, {
                data: "GUIAS_DESPACHADAS",
                title: "GUIAS DESPACHADAS",
            },
            {
                data: null,
                title: "DETALLES",
                className: "btn_detalles text-left", // Centrar la columna "Detalles" y aplicar la clase "btn_detalles"
                defaultContent: '<button type="button" class="btn_recibir btn btn-sm btn-danger text-light"><i class="bi bi-file-bar-graph fs-5"></i></button>',
                orderable: "",
                width: 20
            }
                // {
                //     data: "FACTURADO",
                //     title: "FACTURADO TOTAL",
                //     render: $.fn.dataTable.render.number(',', '.', 2, "$")
                // },
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-7 ");
                $('td', row).eq(1).addClass("fw-bold fs-7 bg-warning bg-opacity-10");
                $('td', row).eq(2).addClass("fw-bold fs-7 ");
                $('td', row).eq(3).addClass("fw-bold fs-7 bg-success bg-opacity-10");
                $('td', row).eq(4).addClass("fw-bold fs-7 bg-info bg-opacity-10");
                $('td', row).eq(5).addClass("fw-bold fs-7");
            },
        }).clear().rows.add(datos).draw();

        $('#REP_CLIENTE_TABLA').on('click', 'td.btn_detalles', function (respuesta) {
            var data = TABLA_.row(this).data();
            console.log('data: ', data);
            $("#SECC_TABLA").hide();
            $("#SECC_DET").show(200);
        });

    }

    function FATURADO(arr) {
        let data = JSON.parse(JSON.stringify(arr));
        var result = data.reduce(function (acc, obj) { return acc + parseFloat(obj.FACTURADO); }, 0);
        settotal_facturado(USDollar.format(result));
        data.sort((a, b) => parseFloat(a.FACTURADO) - parseFloat(b.FACTURADO));
        const primeros5Objetos = data.slice(0, 5);
        let etiquetas = primeros5Objetos.map(item => item.CLIENTE_NOMBRE);
        // setgr_facturado_label(etiquetas);
        LABELS = etiquetas;
        const datosFacturados = primeros5Objetos.map(item => parseFloat(item.FACTURADO));
        DATOS = datosFacturados

        // setgr_facturado_data(datosFacturados); = 
    }


    return (
        <div className="col-12">
            <h4 className="fw-bold bg-light">Reporte por Clientes</h4>

            <div className="col-12 p-3 d-none">
                <div className="row">
                    <CCol sm={6} lg={3}>
                        <CWidgetStatsA
                            className="mb-4"
                            color="primary"
                            value={
                                <>
                                    Facturado{' '}
                                    <span className="fs-6 fw-normal">
                                        (-12.4% <CIcon icon={cilArrowBottom} />)
                                    </span>
                                </>
                            }
                            title={
                                <>
                                    <span className="fs-5 fw-bold">
                                        {total_facturado}
                                    </span>
                                </>
                            }

                            chart={
                                <CChartLine
                                    className="mt-3 mx-3"
                                    style={{ height: '60px' }}
                                    data={{
                                        labels: LABELS,
                                        datasets: [
                                            {
                                                label: 'Facturado',
                                                backgroundColor: 'transparent',
                                                borderColor: 'rgba(255,255,255,.55)',
                                                pointBackgroundColor: getStyle('--cui-primary'),
                                                data: DATOS,
                                            },

                                        ],
                                    }}
                                    options={{
                                        plugins: {
                                            legend: {
                                                display: false,
                                            },
                                        },
                                        maintainAspectRatio: false,
                                        scales: {
                                            x: {
                                                grid: {
                                                    display: false,
                                                    drawBorder: false,
                                                },
                                                ticks: {
                                                    display: false,
                                                },
                                            },
                                            y: {
                                                // min: 0,
                                                // max: 100,
                                                display: false,
                                                grid: {
                                                    display: false,
                                                },
                                                ticks: {
                                                    display: false,
                                                },
                                            },
                                        },
                                        elements: {
                                            line: {
                                                borderWidth: 2,
                                                tension: 0.4,
                                            },
                                            point: {
                                                radius: 5,
                                                hitRadius: 10,
                                                hoverRadius: 4,
                                            },
                                        },
                                    }}
                                />
                            }
                        />
                    </CCol>
                    <CCol sm={6} lg={3}>
                        <CWidgetStatsA
                            className="mb-4"
                            color="primary"
                            value={
                                <>
                                    Clientes{' '}
                                    {/* <span className="fs-6 fw-normal">
                                    (-12.4% <CIcon icon={cilArrowBottom} />)
                                </span> */}
                                </>
                            }
                            title="Clientes"

                            chart={
                                <CChartLine
                                    className="mt-3 mx-3"
                                    style={{ height: '60px' }}
                                    data={{
                                        labels: ['Enero', 'Febrero', 'Marzo', 'April', 'May', 'June', 'July'],
                                        datasets: [
                                            {
                                                label: 'My First dataset',
                                                backgroundColor: 'transparent',
                                                borderColor: 'rgba(255,255,255,.55)',
                                                pointBackgroundColor: getStyle('--cui-primary'),
                                                data: [75, 6, 2, 4, 5, 1, 3],
                                            },
                                        ],
                                    }}
                                    options={{
                                        plugins: {
                                            legend: {
                                                display: false,
                                            },
                                        },
                                        maintainAspectRatio: false,
                                        scales: {
                                            x: {
                                                grid: {
                                                    display: false,
                                                    drawBorder: false,
                                                },
                                                ticks: {
                                                    display: false,
                                                },
                                            },
                                            y: {
                                                min: 0,
                                                max: 100,
                                                display: false,
                                                grid: {
                                                    display: false,
                                                },
                                                ticks: {
                                                    display: false,
                                                },
                                            },
                                        },
                                        elements: {
                                            line: {
                                                borderWidth: 1,
                                                tension: 0.4,
                                            },
                                            point: {
                                                radius: 4,
                                                hitRadius: 10,
                                                hoverRadius: 4,
                                            },
                                        },
                                    }}
                                />
                            }
                        />
                    </CCol>
                </div>

            </div>

            <div className="col-12" id="SECC_TABLA">
                <div className="table-responsive" id="REP_CLIENTE_TABLA_SECC">
                    <table id="REP_CLIENTE_TABLA" className="table table-striped">

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
                                    {/* <div className="col-7">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button onClick={() => CAMBIAR_GRAFICO(1)} type="button" className="btn btn-light">Dia</button>
                                            <button onClick={() => CAMBIAR_GRAFICO(2)} type="button" className="btn btn-light">Mes</button>
                                            <button onClick={() => CAMBIAR_GRAFICO(3)} type="button" className="btn btn-light">Año</button>
                                        </div>
                                        <div id="chartdiv2" style={{ width: "100%", height: "400px" }}></div>
                                    </div> */}
                                </div>
                                <div className="row">
                                    <div className="col-5">
                                        <div className="fw-bold fs-4"> Tiempo promedio de despacho</div>
                                        {/* <div className="small text-medium-emphasis">
                                            <span className="fs-5 fw-bold text-muted">MES {moment(param.FECHA_INI).format("MMM YYYY")} | </span>
                                            <span id="CH_PROM_H_MES" className="fs-5 fw-bold text-muted">

                                            </span>
                                        </div> */}
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


                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        </div>
    )

}

export default Cargar_datos