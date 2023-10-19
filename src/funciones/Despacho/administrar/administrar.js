import * as fun from "../../../config/config"
var URL = "despacho/"


function Cargar_Guias_Sin_Despachar(param, callback) {
    let url = URL + 'Cargar_Guias_Sin_Despachar'
    fun.AjaxSendReceiveData(url, param, function (x) {
        callback(x);
    });
}

function Cargar_Guias_Sin_Despachar_detalle(param, callback) {
    let url = URL + 'Cargar_Guias_Sin_Despachar_detalle'
    fun.AjaxSendReceiveData(url, param, function (x) {
        callback(x);
    });
}

function Reasignar_Nueva_placa(param) {
    let url = URL + 'Reasignar_Nueva_placa'
    fun.AjaxSendReceiveData(url, param, function (x) {
        console.log('x: ', x);

    });
}

//******* GUIAS DESPACHDAS */

function Guias_Despachadas_General(param, callback) {
    let url = URL + 'Guias_Despachadas_General'
    fun.AjaxSendReceiveData(url, param, function (x) {
        callback(x);
    });
}

function Guias_Despachadas_General_detalle(param, callback) {
    let url = URL + 'Guias_Despachadas_General_detalle'
    fun.AjaxSendReceiveData(url, param, function (x) {
        callback(x);
    });
}

function Guias_Despachadas_Historial(param, callback) {
    let url = URL + 'Guias_Despachadas_Historial'
    fun.AjaxSendReceiveData(url, param, function (x) {
        callback(x);
    });
}

function Guias_Despachadas_Historial_detalle(param, callback) {
    let url = URL + 'Guias_Despachadas_Historial_detalle'
    fun.AjaxSendReceiveData(url, param, function (x) {
        callback(x);
    });
}

function Obtener_Parametros(callback) {
    let url = URL + 'Obtener_Parametros'
    fun.AjaxSendReceiveData(url, [], function (x) {
        callback(x);
    });
}

function Cargar_facturas_Pedido(param, callback) {
    let url = URL + 'Cargar_facturas_Pedido'
    fun.AjaxSendReceiveData(url, param, function (x) {
        callback(x);
    });
}

function Guardar_Factura(param, callback) {
    let url = URL + 'Guardar_Factura'
    fun.AjaxSendReceiveData(url, param, function (x) {
        callback(x);
    });
}



export {
    Cargar_Guias_Sin_Despachar,
    Cargar_Guias_Sin_Despachar_detalle,
    Reasignar_Nueva_placa,
    Guias_Despachadas_General,
    Guias_Despachadas_General_detalle,
    Guias_Despachadas_Historial,
    Guias_Despachadas_Historial_detalle,
    Obtener_Parametros,
    Guardar_Factura,
    Cargar_facturas_Pedido
};
