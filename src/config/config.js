import React from 'react'
import $ from 'jquery';
import Swal from 'sweetalert2';


const host = window.location.hostname;
const protocol = window.location.protocol;
const port = ":8080";

const URL = protocol + "//" + host + port + "/svsysback/"


function AjaxSendReceiveData(url, param, callback) {
    let token = "My0Ua8GDgEMPbpTZhiOEwjrzy5s4r9GFBOO7RWgwDA1kP2ZixULX0GpVHh99erfm";
    if (param.length == 0) {
        param = {
            TOKEN: token
        }
    } else {
        param.TOKEN = token
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
        { id: "01", nombre: "Azuay" },
        { id: "02", nombre: "Bolívar" },
        { id: "03", nombre: "Cañar" },
        { id: "04", nombre: "Carchi" },
        { id: "05", nombre: "Chimborazo" },
        { id: "06", nombre: "Cotopaxi" },
        { id: "07", nombre: "El Oro" },
        { id: "08", nombre: "Esmeraldas" },
        { id: "09", nombre: "Galápagos" },
        { id: "10", nombre: "Guayas" },
        { id: "11", nombre: "Imbabura" },
        { id: "12", nombre: "Loja" },
        { id: "13", nombre: "Los Ríos" },
        { id: "14", nombre: "Manabí" },
        { id: "15", nombre: "Morona Santiago" },
        { id: "16", nombre: "Napo" },
        { id: "17", nombre: "Orellana" },
        { id: "18", nombre: "Pastaza" },
        { id: "19", nombre: "Pichincha" },
        { id: "20", nombre: "Santa Elena" },
        { id: "21", nombre: "Santo Domingo de los Tsáchilas" },
        { id: "22", nombre: "Sucumbíos" },
        { id: "23", nombre: "Tungurahua" },
        { id: "24", nombre: "Zamora Chinchipe" }
    ];
    return provincias;
}

function Ciudades(id) {
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
    return ciudadesPorProvincia[id];
}

export { AjaxSendReceiveData, Mensaje, Ciudades, Provincias };