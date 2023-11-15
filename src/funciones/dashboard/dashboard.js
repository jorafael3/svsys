import * as fun from "../../config/config"
var URL = "dashboard/"

function Cargar_Stats(param,callback) {
    let url = URL + "Cargar_Stats"
    fun.AjaxSendReceiveData(url, param, function (x) {
        callback(x);
    });
}

function Cargar_Produts(callback) {
    let url = URL + "Cargar_Productos"
    fun.AjaxSendReceiveData(url, [], function (x) {
        callback(x);
    });
}



export { Cargar_Stats,Cargar_Produts };