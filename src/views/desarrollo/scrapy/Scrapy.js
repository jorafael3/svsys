import {
    CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter
} from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react';
import * as fun from "../../../config/config";
import $, { ajax } from 'jquery';
import '../../../assets/App.css'


function Scrapy() {
    const [datos_correo, setdatos_correo] = useState('');
    const [datos_scrapy, setdatos_scrapy] = useState('');
    const [blocking, setblocking] = useState(false);
    const textArea = useRef();

    function Get_Scrapy() {
        let url = "desarrollo/scrapy_guias"
        let url2 = "desarrollo/scrapy_guias_log"
        let sc = 0;
        setblocking(true);
        fun.AjaxSendReceiveData(url, [], function (x) {
            
            setblocking(false);
            sc = x;
            setdatos_scrapy(x);
            // if (x == "SCRAPY REALIZADO") {
            setTimeout(() => {
                get_insert_datos();
            }, 1000);
            // }
        })
        let c = 0;
        setInterval(() => {
            let texto = ""
            if (sc == 0) {
                if (c == 0) {
                    c = 1
                    texto = "/ REALIZANDO SCRAPY ESPERE POR FAVOR..."
                } else {
                    c = 0
                    texto = "| REALIZANDO SCRAPY ESPERE POR FAVOR....."
                }
                setdatos_scrapy(texto);
            }
        }, 500);

        // setInterval(() => {
        //     if (sc == 0) {
        //         fun.AjaxSendReceiveData(url2, [], function (x) {
        //             x = JSON.stringify(x);
        //             
        //             setdatos_scrapy(x)
        //             const area = textArea.current;
        //             area.scrollTop = area.scrollHeight;
        //             $(document).ready(function () {
        //                 var $content1 = $('#AREA_SCRAPY');
        //                 $content1.scrollTop($content1[0].scrollHeight);
        //             });
        //         })
        //     }
        // }, 1000);


    }

    function get_insert_datos() {
        let url3 = "desarrollo/scrapy_guias_insert"
        let sc = 0;
        setblocking(true);
        fun.AjaxSendReceiveData(url3, [], function (x) {
            
            setblocking(false);
            sc = x;
            setdatos_scrapy(x);

        });
        let c = 0;
        setInterval(() => {
            let texto = ""
            if (sc == 0) {
                if (c == 0) {
                    c = 1
                    texto = "/ INGRESANDO DATOS ESPERE POR FAVOR..."
                } else {
                    c = 0
                    texto = "| INGRESANDO DATOS ESPERE POR FAVOR....."
                }
                setdatos_scrapy(texto);
            }
        }, 500);
    }

    function get_log() {
        let url2 = "desarrollo/scrapy_guias_log"
        fun.AjaxSendReceiveData(url2, [], function (x) {
            
            setdatos_scrapy(x);
            const area = textArea.current;
            area.scrollTop = area.scrollHeight;
            $(document).ready(function () {
                var $content1 = $('#AREA_SCRAPY');
                $content1.scrollTop($content1[0].scrollHeight);
            });

        })
    }

    function Get_Correo() {
        let url = "desarrollo/correos"
        let sc = 0;
        setblocking(true);
        fun.AjaxSendReceiveData(url, [], function (x) {
            
            setblocking(false);
            setdatos_correo(x)
            sc = x;
            const area = textArea.current;
            area.scrollTop = area.scrollHeight;
            $(document).ready(function () {
                var $content1 = $('#AREA_CORREOS');
                $content1.scrollTop($content1[0].scrollHeight);
            });
        })
        let c = 0;
        setInterval(() => {
            let texto = ""
            if (sc == 0) {
                if (c == 0) {
                    c = 1
                    texto = "/ INGRESANDO DATOS ESPERE POR FAVOR..."
                } else {
                    c = 0
                    texto = "| INGRESANDO DATOS ESPERE POR FAVOR....."
                }
                setdatos_correo(texto);
            }
        }, 500);
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <h3>Scrapy Guias</h3>
                    </CCardHeader>
                    <CCardBody>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active fs-6 fw-bold" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Scrapy</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link fs-6 fw-bold" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Correo</a>
                            </li>

                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane  show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className='col-12 p-3'>
                                    <button onClick={Get_Scrapy} className='btn btn-success fw-bold text-light'>Ejecutar Scrapy</button>
                                    <button onClick={get_insert_datos} className='btn btn-danger fw-bold text-light'>Ejecutar ingreso datos</button>
                                    <button onClick={get_log} className='btn btn-info fw-bold text-light'>Ver log</button>
                                    <div className='col-12 p-2'>
                                        <textarea
                                            defaultValue={datos_scrapy}
                                            readOnly={true}
                                            className='form-control '
                                            id="AREA_SCRAPY" cols="20" rows="10"></textarea>
                                    </div>
                                </div>

                            </div>
                            <div className="tab-pane " id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className='col-12 p-3'>
                                    <button onClick={Get_Correo} className='btn btn-primary fw-bold text-light'>Ejecutar correo</button>
                                    <div className='col-12 p-2'>
                                        <textarea
                                            id="AREA_CORREOS"
                                            defaultValue={datos_correo}
                                            readOnly={true}
                                            className='form-control '
                                            cols="20"
                                            ref={textArea}
                                            rows="10">

                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
            {blocking && (
                <div className="block-ui">
                    {/* Mensaje o contenido de bloqueo */}
                    <p>Espere...</p>
                </div>
            )}
        </CRow>

    )
}

export default Scrapy
