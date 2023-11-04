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
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import $, { param } from 'jquery';
var URL = "reportes/"

function cargar_datos(param) {
    param = param.param;
    console.log('param: ', param);


    Reporte_Chofer_General();


    function Reporte_Chofer_General() {
        let url = URL + "Reporte_Chofer_General"
        fun.AjaxSendReceiveData(url, param, function (res) {
            console.log('res: ', res);
            Tabla_Reporte_Clientes_General(res)
        });
    }

    function Tabla_Reporte_Clientes_General(datos) {

        $('#REP_CHOFER_TABLA').empty();
        if ($.fn.dataTable.isDataTable('#REP_CHOFER_TABLA')) {
            $('#REP_CHOFER_TABLA').DataTable().destroy();
            $('#REP_CHOFER_TABLA_SECC').empty();
        }
        let tabla = `
        <table id='REP_CHOFER_TABLA' class='table display table-striped'>
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
            },
            {
                data: "PLACA",
                title: "PLACA"
            }, {
                data: "GUIAS_COMPLETAS",
                title: "GUIAS COMPLETAS",

            }, {
                data: "GUIAS_PARCIALES",
                title: "GUIAS PARCIALES",

            }, {
                data: "GUIAS_TOTALES",
                title: "GUIAS TOTALES",
            },
            {
                data: "PROMEDIO_DEMORA_HORAS_TOTAL_MES",
                title: "PROMEDIO DEMORA PERIODO",
                render: $.fn.dataTable.render.number(',', '.', 2, "")
            },
            {
                data: "PROMEDIO_DEMORA_HORAS_TOTAL",
                title: "PROMEDIO DEMORA GENERAL",
                render: $.fn.dataTable.render.number(',', '.', 2, "")
            },
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-7 ");
                $('td', row).eq(1).addClass("fw-bold fs-7 bg-warning bg-opacity-10");
                $('td', row).eq(2).addClass("fw-bold fs-7 ");
                $('td', row).eq(3).addClass("fw-bold fs-7 bg-success bg-opacity-10");
                $('td', row).eq(4).addClass("fw-bold fs-7 bg-info bg-opacity-10");
                $('td', row).eq(5).addClass("fw-bold fs-7");

                if (data["PROMEDIO_DEMORA_HORAS_TOTAL"] == null) {
                    $('td', row).eq(6).html("<span class='text-danger'>Sin registro</span>");

                }


            },
        }).clear().rows.add(datos).draw();
    }

    return (
        <div className="col-12">
            <h4 className="fw-bold bg-light">Reporte por Clientes</h4>

            <div className="col-12 p-3">
                <div className="row">

                    <CCol sm={6} lg={3}>
                        <CWidgetStatsA
                            className="mb-4"
                            color="primary"
                            value={
                                <>
                                    Chofer mas despachos{' '}
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

            <div className="col-12">
                <div className="table-responsive" id="REP_CHOFER_TABLA_SECC">
                    <table id="REP_CHOFER_TABLA" className="table table-striped">

                    </table>
                </div>
            </div>
        </div>
    )

}

export default cargar_datos