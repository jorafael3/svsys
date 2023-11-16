import React from 'react'
import $ from 'jquery';
import Swal from 'sweetalert2';
import * as fun from "../funciones/login/login"


const host = window.location.hostname;
// const host = "192.168.0.104";
const protocol = window.location.protocol;
const port = ":80";

// const URL = protocol + "//" + host + port + "/svsysback/"
// const URL = "http://192.168.0.104:8080/svsysback/"
const URL = "https://salvacero.com.ec/svsysback/"

// https://lcaimport.com/svsysback/usuarios/Validar_Usuario_movil
function AjaxSendReceiveData(url, param, callback) {
    let DATOS_SESION = fun.GET_DATOS_SESION();
    // 
    if (DATOS_SESION == null || DATOS_SESION == undefined || DATOS_SESION.length == 0) {
        Mensaje("LA SESION HA CADUCADO", "Por favor iniciar sesion nuevamente", "success");
    } else {
        let token = "My0Ua8GDgEMPbpTZhiOEwjrzy5s4r9GFBOO7RWgwDA1kP2ZixULX0GpVHh99erfm";
        if (param.length == 0) {
            param = {
                TOKEN: token,
                USUARIO: DATOS_SESION["Usuario"],
                USUARIO_ID: DATOS_SESION["Usuario_ID"],
                SUCURSAL_ID: DATOS_SESION["sucursal_id"],
            }
        } else {
            param.TOKEN = token;
            param.USUARIO_ID = DATOS_SESION["Usuario_ID"];
            param.SUCURSAL_ID = DATOS_SESION["sucursal_id"];
            param.USUARIO = DATOS_SESION["Usuario"];

        }
        $.ajax({
            url: URL + url,
            method: 'POST',
            dataType: 'json',
            data: {
                param
            },
            success: function (data) {
                callback(data);
            },
            error: function (error) {
                callback(error)
            }
        });
    }

}

// function AjaxSendReceiveData(url, param, callback) {

//     let token = "My0Ua8GDgEMPbpTZhiOEwjrzy5s4r9GFBOO7RWgwDA1kP2ZixULX0GpVHh99erfm";
//     if (param.length == 0) {
//         param = {
//             TOKEN: token,
//             USUARIO: "jorge",
//             USUARIO_ID: "1",
//             SUCURSAL_ID: "1",
//         }
//     } else {
//         param.TOKEN = token;
//         param.USUARIO_ID = "1";
//         param.SUCURSAL_ID = "1";
//         param.USUARIO = "jorge";

//     }
//     $.ajax({
//         url: URL + url,
//         method: 'POST',
//         dataType: 'json',
//         data: {
//             param
//         },
//         success: function (data) {
//             callback(data);

//         },
//         error: function (error) {
//             callback(error)
//         }
//     });

// }

function AjaxSendReceiveDatalogin(url, param, callback) {
    let DATOS_SESION = fun.GET_DATOS_SESION();
    

    let token = "My0Ua8GDgEMPbpTZhiOEwjrzy5s4r9GFBOO7RWgwDA1kP2ZixULX0GpVHh99erfm";
    if (param.length == 0) {
        param = {
            TOKEN: token,
        }
    } else {
        param.TOKEN = token;
    }
    

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
            console.log('error: ', error);
            
        }
    });
}

function Mensaje(t1, t2, icon) {
    Swal.fire({
        title: t1,
        text: t2,
        icon: icon,
        // iconUrl: 'ruta/a/mi/icono.png'
    });
}

function Provincias() {
    let provincias = [
        { value: "01", label: "Azuay" },
        { value: "02", label: "Bolívar" },
        { value: "03", label: "Cañar" },
        { value: "04", label: "Carchi" },
        { value: "05", label: "Chimborazo" },
        { value: "06", label: "Cotopaxi" },
        { value: "07", label: "El Oro" },
        { value: "08", label: "Esmeraldas" },
        { value: "09", label: "Galápagos" },
        { value: "10", label: "Guayas" },
        { value: "11", label: "Imbabura" },
        { value: "12", label: "Loja" },
        { value: "13", label: "Los Ríos" },
        { value: "14", label: "Manabí" },
        { value: "15", label: "Morona Santiago" },
        { value: "16", label: "Napo" },
        { value: "17", label: "Orellana" },
        { value: "18", label: "Pastaza" },
        { value: "19", label: "Pichincha" },
        { value: "20", label: "Santa Elena" },
        { value: "21", label: "Santo Domingo de los Tsáchilas" },
        { value: "22", label: "Sucumbíos" },
        { value: "23", label: "Tungurahua" },
        { value: "24", label: "Zamora Chinchipe" }
    ];
    return provincias;
}

function Ciudades(value) {
    var ciudadesPorProvincia = {
        '01': ['Cuenca', 'Gualaceo', 'Chordeleg', 'Paute'], // Azuay
        '02': ['Guaranda', 'Chillanes', 'San Miguel'], // Bolívar
        '03': ['Cañar', 'Azogues', 'Biblián'], // Cañar
        '04': ['Tulcán', 'Bolívar', 'Espejo'], // Carchi
        '05': ['Riobamba', 'Colta', 'Guano'], // Chimborazo
        '06': ['Latacunga', 'La Maná', 'Pujilí'], // Cotopaxi
        '07': ['Machala', 'Santa Rosa', 'Huaquillas'], // El Oro
        '08': ['Esmeraldas', 'Atacames', 'Muisne'], // Esmeraldas
        '09': ['Puerto Baquerizo Moreno', 'Puerto Ayora', 'Santa Cruz'], // Galápagos
        '10': ["Guayaquil",
            "Durán",
            "Samborondón",
            "Milagro",
            "Daule",
            "Playas Villamil",
            "Nobol",
            "Yaguachi",
            "Santa Elena",
            "Balzar",
            "Pedro Carbo",
            "El Triunfo",
            "El Empalme"
        ], // Guayas
        '11': ['Ibarra', 'Cotacachi', 'Otavalo'], // Imbabura
        '12': ['Loja', 'Catamayo', 'Cariamanga'], // Loja
        '13': ['Babahoyo', 'Quevedo', 'Vinces'], // Los Ríos
        '14': ['Portoviejo', 'Manta', 'Jaramijó'], // Manabí
        '15': ['Macas', 'Morona', 'Palora'], // Morona Santiago
        '16': ['Tena', 'Archidona', 'El Chaco'], // Napo
        '17': ['Orellana', 'La Joya de los Sachas', 'Francisco de Orellana'], // Orellana
        '18': ['Puyo', 'Shell', 'Arajuno'], // Pastaza
        '19': ["Quito",
            "Santo Domingo de los Colorados",
            "Cayambe",
            "Machachi",
            "Sangolquí",
            "Tumbaco",
            "Puembo",
            "Pedro Vicente Maldonado",
            "San Miguel de los Bancos",
            "Cumbayá",
            "Tabacundo",
            "Calderón",
            "La Merced",
            "Pomasqui",
            "Conocoto"
        ], // Pichincha
        '20': ['Salinas', 'Santa Elena', 'La Libertad'], // Santa Elena
        '21': ['Santo Domingo', 'La Concordia', 'Alluriquín'], // Santo Domingo de los Tsáchilas
        '22': ['Lago Agrio', 'Shushufindi', 'Nueva Loja'], // Sucumbíos
        '23': ['Ambato', 'Baños', 'Pelileo'], // Tungurahua
        '24': ['Zamora', 'Yantzaza', 'Zamora'], // Zamora Chinchipe
        // Puedes agregar más ciudades para cada provincia aquí si es necesario
    };
    return ciudadesPorProvincia[value];
}

export { AjaxSendReceiveData, Mensaje, Ciudades, Provincias, AjaxSendReceiveDatalogin };