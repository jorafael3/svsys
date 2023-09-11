function Datos_Guias() {

    let datos = [{
        ORDEN: "132203201",
        CLIENTE: "6133582 - SALVACERO CIA. LTDA.",
        RUC: "0992681845001",
        SOILICTANTE: "SALVACERO CIA. LTDA",
        DIRECCION_1: "VENEZUWN #3804",
        PARTIDA: "EC.CEM GUAYAQUIL",
        LLEGADA: "GUAYAS - GUAYAQUIL",
        DIRECCION_2: "VENEZUELA ENTRE",

        FECHA_EMISION: "01-09-2023",
        FACTURA: "019-005-001145545",
        TELEFONO: "4-2465",
        FECHA_VALIDEZ: "21-09-2023",

        TIPO_ENTREGA: "RETIRADO",
        PEDIDO_INTERNO: "505364844",
        PEDIDO_COMPRA: "4583089453",
        DETALLE: [
            {
                ORD: "01",
                CODIGO: "100164161",
                DESCRIPCION: "Cemento Holcim Fuerte Tipo GU 50Kg - GU",
                UNIDAD: "SAC",
                CANTIDAD: "400.00",
                DESPACHADA: "",
                ENTREGADA: ""
            }
        ]
    }]
    return datos;
}

function Clientes() {

    let CLIENTES = [{
        ID: "1",
        NOMBRE: "CLIENTE 1",
        TIPO: "DISTRIBUIDOR"
    }, {
        ID: "2",
        NOMBRE: "CLIENTE 2",
        TIPO: "SERVICIO"
    }, {
        ID: "3",
        NOMBRE: "CLIENTE 3",
        TIPO: "DISTRIBUIDOR"
    }, {
        ID: "4",
        NOMBRE: "CLIENTE 4",
        TIPO: "SERVICIO"
    }]
    return CLIENTES;

}


export { Datos_Guias, Clientes };
