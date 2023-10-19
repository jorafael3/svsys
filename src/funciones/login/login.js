import * as fun from "../../config/config"
var URL = "usuarios/Validar_Usuario"

function LogOut() {
  localStorage.removeItem("DATOS_SESION")
  
  window.location.reload()

}

function Iniciar_sesion(param) {

  if (param.USUARIO == "") {
    fun.Mensaje("Debe ingresar un usuario", "", "error");
  } else if (param.PASS == "") {
    fun.Mensaje("Debe ingresar una contraseña", "", "error");
  } else {
    fun.AjaxSendReceiveDatalogin(URL, param, function (x) {
      console.log('x: ', x);
      
      if (x[0] == true) {
        SESION(x[1][0]);
      } else if (x[0] == false) {
        fun.Mensaje(x[1].toString(), "", "error");
      } else {
        fun.Mensaje(x.toString(), "", "error");

      }
    })
  }

}

function SESION(items) {
  localStorage.setItem('DATOS_SESION', JSON.stringify(items));
  window.location.reload()
}

function GET_DATOS_SESION() {
  const items = JSON.parse(localStorage.getItem('DATOS_SESION'));
  return items;
}


export { LogOut, Iniciar_sesion, GET_DATOS_SESION };
