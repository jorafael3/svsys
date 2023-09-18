import React from 'react'
import $ from 'jquery';


const host = window.location.hostname;
const protocol = window.location.protocol;
const port = ":8080";

const URL = protocol + "//" + host + port + "/svsysback/"
console.log('URL: ', URL);

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
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

export { AjaxSendReceiveData };