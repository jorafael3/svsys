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

var TIPO = 1;


function Prueba() {

    const [DATOS_TOTALES, setDATOS_CANCELADOS] = useState([]);


    function Cargar_Datos() {
        let url = "prueba/Datos_credito";

        let param = {
            TIPO: TIPO
        }

        console.log('param: ', param);

        ajax.AjaxSendReceiveData(url, param, function (retorno) {
            console.log('retorno: ', retorno);
            setDATOS_CANCELADOS(retorno);
            Tabla_prueba(retorno);


            
        });


    }

    function filtrar() {

        let filtrados = DATOS_TOTALES.filter(i => parseFloat(i.ValorAPagar) >= 100)
        console.log('filtrados: ', filtrados);

        Tabla_prueba(filtrados);
    }


    function Tabla_prueba(data) {

        $('#Tabla_Prueba').empty();

        if ($.fn.dataTable.isDataTable('#Tabla_Prueba')) {
            $('#Tabla_Prueba').DataTable().destroy();
            $('#SECC_TABLA_PRUEBA').empty();
        }
        let tabla = `
            <table id='Tabla_Prueba' style={{ width: "100%" }} class='table display table-striped'>
            </table>
        `;
        $('#SECC_TABLA_PRUEBA').append(tabla);



        let TABLA_ = $('#Tabla_Prueba').DataTable({
            destroy: true,
            data: data,
            dom: 'Bfrtip',
            // paging: true,
            // info: false,
            // buttons: ["excel"],
            // order: [[0, "desc"]],
            // scrollCollapse: true,
            // scrollX: true,
            // columnDefs: [
            //     { width: 100, targets: 0 },
            //     { width: 300, targets: 2 },
            // ],
            buttons: [{
                extend: 'excelHtml5',
                text: 'TODO',
                action: function (e, dt, node, config) {
                    // Cargar_Usuarios();
                    TIPO = 1;
                    Cargar_Datos();
                },
            }, {
                extend: 'excelHtml5',
                text: 'MAYORES A 100',
                action: function (e, dt, node, config) {
                    // Cargar_Usuarios();
                    TIPO = 2;
                    Cargar_Datos()
                },
            }, {
                extend: 'excelHtml5',
                text: 'MENORES A 100',
                action: function (e, dt, node, config) {
                    // Cargar_Usuarios();
                    TIPO = 3;
                    Cargar_Datos();
                },
            },
            {
                extend: 'excelHtml5',
                text: 'JAVASCRI',
                action: function (e, dt, node, config) {
                    filtrar()
                },
            }],
            columns: [
                {
                    "data": "Cliente",
                    "title": "NOMBRE CLIENTE",
                    // className: "text-start"
                },
                {
                    "data": "FechaCorte",
                    "title": "FechaCorte",
                    // className: "text-center"
                },
                {
                    "data": "Identificacion",
                    "title": "Identificacion",
                    // className: "text-center"
                },
                {
                    "data": "ValorAPagar",
                    "title": "ValorAPagar",
                    // className: "text-center"
                }
            ],
            "createdRow": function (row, data, index) {
                $('td', row).eq(0).addClass("fw-bold fs-7 ");
                $('td', row).eq(1).addClass("fw-bold fs-7 ");
                $('td', row).eq(2).addClass("fw-bold fs-7 bg-danger bg-opacity-10");
                $('td', row).eq(3).addClass("fw-bold fs-7 ");
                $('td', row).eq(4).addClass("fw-bold fs-7 bg-light");
                $('td', row).eq(5).addClass("fw-bold fs-7 bg-warning bg-opacity-10");



            },
        });
        setTimeout(function () {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
        }, 100);
    }

    useEffect(() => {

        Cargar_Datos();

    }, []);

    return (

        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Creditos cancelados</strong>
                </CCardHeader>
                <CCardBody>
                    <div className='table-responsive' id='SECC_TABLA_PRUEBA'>

                        <table style={{ width: "100%" }} id='Tabla_Prueba' className='table table-striped'>

                        </table>

                    </div>
                </CCardBody>
            </CCard>
        </CCol>

    )

}

export default Prueba
