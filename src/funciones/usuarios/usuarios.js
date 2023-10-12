import * as fun from "../../config/config"

let url_depart = "usuarios/Cargar_Departamentos";
let url_suc = "usuarios/Cargar_Sucursales";

function Cargar_Departamentos(callback) {
    fun.AjaxSendReceiveData(url_depart, [], function (x) {
        callback(x)
    })
}

function Cargar_Sucursales(callback) {
    fun.AjaxSendReceiveData(url_suc, [], function (x) {
        callback(x)
    })
}

export { Cargar_Departamentos, Cargar_Sucursales };