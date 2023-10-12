import React, { Suspense } from 'react';
import * as ajax from "../src/config/config"

const dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const guias = React.lazy(() => import('./views/despacho/guias/Guias'))
const administracion = React.lazy(() => import('./views/despacho/administrar/Administrar'))
const usuarios = React.lazy(() => import(`./views/mantenimiento/usuarios/Usuarios`))
const scrapy = React.lazy(() => import('./views/desarrollo/scrapy/Scrapy'))
const clientes = React.lazy(() => import('./views/mantenimiento/clientes/Clientes'))
// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

function Accesos() {
  return new Promise((resolve, reject) => {
    let url = 'menu/Cargar_Menu'
    ajax.AjaxSendReceiveData(url, "", function (x) {
      
      let Menu = [];

      x.map(function (x) {
        let path;
        let name;
        let exact = false;
        let element;
        if (x.Ismenu == 1) {
          path = x.ruta;
          name = x.Nombre;
          element = (x.menu_variable).trim()
        } else if (x.Ismenu_Drop == 1) {
          path = x.ruta;
          name = x.Nombre;
          element = "";
          exact = true;
        }
        else if (x.IsSubmenu == 1) {
          path = x.sub_ruta;
          name = x.sub_nombre;
          element =  (x.sub_variable).trim()
        }
        // const LazyComponent = React.lazy(() => import(element));
        let b = {
          path: "/" + path,
          name: name,
          element: eval(element),
          // element: LazyComponent,
          exact: exact
        }
        Menu.push(b)
      });
      resolve(Menu); // Resolve the promise with the Menu data
    });
  });
}
Accesos()
var routes = [];

Accesos()
  .then((Menu) => {
    
    // Populate the routes array with the Menu data
    routes.push(...Menu);
  })
  .catch((error) => {
    
  });

export default routes

// async function getMenu() {
//   try {
//     const acc = await Acessos();
//     
//   } catch (error) {
//     
//   }
// }
// 

// const routes = [
//   // { path: '/', exact: true, name: 'Home' },
//   { path: '/dashboard', name: 'Dashboard', element: Dashboard },
//   { path: '/despacho', name: 'Despacho', exact: true },
//   { path: '/despacho/guias', name: 'Guias', element: Despacho },
//   { path: '/despacho/administrar', name: 'Administrar', element: Administrar },
//   { path: '/mantenimiento', name: 'Mantenimiento', exact: true },
//   { path: '/mantenimiento/usuarios', name: 'Usuarios', element: React.lazy(() => import('./views/mantenimiento/usuarios/Usuarios')) },
// ]

