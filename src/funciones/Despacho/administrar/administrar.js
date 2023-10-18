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


export { Cargar_Guias_Sin_Despachar, Cargar_Guias_Sin_Despachar_detalle,Reasignar_Nueva_placa };
