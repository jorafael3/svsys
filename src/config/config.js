import React from 'react'
import $ from 'jquery';


const URL = "http://127.0.0.1:8080/svsysback/"



function AjaxSendReceiveData(url, param, callback) {


    $.ajax({
        url: URL + url,
        method: 'POST',
        dataType: 'json',
        data: {
            param
        },
        success: function (data) {
            callback(data)
            //Tabla_usuarios(data)
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

export { AjaxSendReceiveData };