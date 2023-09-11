import React, { useEffect, useRef } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import axios from 'axios';
import $ from 'jquery';
import BarcodeReader from '../../../components/BarcodeReader';

function Usuarios() {
    useEffect(() => {
        let url = 'http://10.5.0.238:8080/svsys/principal/Guardar_datos'

        let param = {
            data1: "hola",
            data2: "asdasd"
        }
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: {
                param
            },
            success: function (data) {
                console.log('Data:', data);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }, []);
    return (
        <div className="App">
            <h1>Aplicación de Lectura de Códigos de Barras</h1>
            <BarcodeReader />
        </div>
    )
}

export default Usuarios
