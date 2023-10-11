function LogOut() {
    localStorage.removeItem("DATOS_SESION")
    console.log("asdasd");
    window.location.reload()

}

function Iniciar_sesion() {
    console.log("sdasdasd");
    let items = {
      ID: "123456",
      NOMBRE: "JORGE",
    }
    localStorage.setItem('DATOS_SESION', JSON.stringify(items));
    window.location.reload()

}


export { LogOut, Iniciar_sesion };
