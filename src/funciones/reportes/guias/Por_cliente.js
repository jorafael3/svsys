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
var URL = "reportes/"

function cargar_datos(param) {
    param = param.param;
    console.log('param: ', param);


    return (
        <div className="col-12">
            <h4 className="fw-bold bg-light">Reporte por Clientes</h4>

            <div className="col-12 p-3">
                <CCol sm={6} lg={3}>
                    <CWidgetStatsA
                        className="mb-4"
                        color="primary"
                        value={
                            <>
                                26K{' '}
                                <span className="fs-6 fw-normal">
                                    (-12.4% <CIcon icon={cilArrowBottom} />)
                                </span>
                            </>
                        }
                        title="Clientes"

                        chart={
                            <CChartLine
                                className="mt-3 mx-3"
                                style={{ height: '60px' }}
                                data={{
                                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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

            <div className="col-12">
                <div className="table-responsive">
                    <table id="REP_CLIENTE_TABLA">

                    </table>
                </div>
            </div>
        </div>
    )

}

export default cargar_datos