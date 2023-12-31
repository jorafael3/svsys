import React, { Suspense } from 'react';
import * as ajax from "../src/config/config"
import * as funciones from "../src/funciones/login/login"

import Choferes from './views/mantenimiento/choferes/Choferes';


const dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const guias = React.lazy(() => import('./views/despacho/guias/Guias'))
const administracion = React.lazy(() => import('./views/despacho/administrar/Administrar'))
const usuarios = React.lazy(() => import(`./views/mantenimiento/usuarios/Usuarios`))
const scrapy = React.lazy(() => import('./views/desarrollo/scrapy/Scrapy'))
const clientes = React.lazy(() => import('./views/mantenimiento/clientes/Clientes'))
const reportes_guias = React.lazy(() => import('./views/reportes/guias/Guias'))
const rutas = React.lazy(() => import('./views/despacho/rutas/Rutas'))
const mis_rutas = React.lazy(() => import('./views/choferes/mis_rutas/Mis_rutas'))
const mora = React.lazy(() => import('./views/credito/mora/Mora'))

const choferes = Choferes;
// const choferes = React.lazy(() => import('./views/mantenimiento/choferes/Choferes'))
// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))



// const routes = [
//   { path: '/', exact: true, name: 'Home' },
//   { path: '/dashboard', name: 'Dashboard', element: dashboard },
//   { path: '/despacho', name: 'Despacho', exact: true },
//   { path: '/despacho/guias', name: 'Guias', element: guias },
//   { path: '/despacho/administrar', name: 'Administrar', element: administracion },
//   { path: '/mantenimiento', name: 'Mantenimiento', exact: true },
// ]
// 

function Cargar_Rutas(callback) {
  const routes = [
    { path: '/', exact: true, name: 'Home' },
    {
      "path": "/dashboard",
      "name": "Dashboard",
      "element": dashboard,
      "exact": false
    },
    {
      "path": "/despacho",
      "name": "Despacho",
      "exact": true
    },
    {
      "path": "/despacho/guias",
      "name": "Ingresar Guia",
      "element": guias,
      "exact": false
    },
    {
      "path": "/despacho/administrar",
      "name": "Administrar Guias",
      "element": administracion,
      "exact": false
    },
    {
      "path": "/despacho/rutas",
      "name": "Rutas",
      "element": rutas,
      "exact": false
    },
    {
      "path": "/mantenimiento",
      "name": "Mantenimiento",
      "exact": true
    },
    {
      "path": "/mantenimiento/usuarios",
      "name": "Usuarios",
      "element": usuarios,
      "exact": false
    },
    {
      "path": "/mantenimiento/clientes",
      "name": "Clientes",
      "element": clientes,
      "exact": false
    },
    {
      "path": "/mantenimiento/choferes",
      "name": "Choferes",
      "element": choferes,
      "exact": false
    },
    {
      "path": "/desarrollo",
      "name": "Desarrollo",
      "exact": true
    },
    {
      "path": "/desarrollo/scrapy",
      "name": "Scrapys",
      "element": scrapy,
      "exact": false
    },
    {
      "path": "/reportes",
      "name": "reportes",
      "exact": true
    },
    {
      "path": "/reportes/guias",
      "name": "Reportes guias",
      "element": reportes_guias,
      "exact": false
    },{
      "path": "/choferes",
      "name": "Mis Rutas",
      "exact": true
    }, {
      "path": "/choferes/Mis_rutas",
      "name": "Mis Rutas",
      "element": mis_rutas,
      "exact": false
    },{
      "path": "/credito",
      "name": "Credito",
      "exact": true
    }, {
      "path": "/credito/mora",
      "name": "Mora",
      "element": mora,
      "exact": false
    }
  ]
  let url = 'menu/Cargar_Menu'
  let DATOS_SESION = funciones.GET_DATOS_SESION()
  let param = {
    Usuario_ID: DATOS_SESION["Usuario_ID"]
  }
  // ajax.AjaxSendReceiveData(url, param, function (x) {
    
  //   let Menu = [];
  //   Menu.push({ path: '/', exact: true, name: 'Home' });
  //   x.map(function (x) {
  //     let path;
  //     let name;
  //     let exact = false;
  //     let element;
  //     if (x.Ismenu == 1) {
  //       path = x.ruta;
  //       name = x.Nombre;
  //       element = (x.menu_variable).trim()
  //     } else if (x.Ismenu_Drop == 1) {
  //       path = x.ruta;
  //       name = x.Nombre;
  //       element = "";
  //       exact = true;
  //     }
  //     else if (x.IsSubmenu == 1) {
  //       path = x.sub_ruta;
  //       name = x.sub_nombre;
  //       element = (x.sub_variable).trim()
  //     }
  //     // const LazyComponent = React.lazy(() => import(element));
  //     let b = {
  //       path: "/" + path,
  //       name: name,
  //       element: eval(element),
  //       // element: LazyComponent,
  //       exact: exact
  //     }
  //     Menu.push(b)
  //   });
  //   callback(Menu); // Resolve the promise with the Menu data
  // });
  callback(routes);
}



// function Accesos() {
//   return new Promise((resolve, reject) => {
//     let url = 'menu/Cargar_Menu'
//     ajax.AjaxSendReceiveData(url, "", function (x) {

//       let Menu = [];

//       x.map(function (x) {
//         let path;
//         let name;
//         let exact = false;
//         let element;
//         if (x.Ismenu == 1) {
//           path = x.ruta;
//           name = x.Nombre;
//           element = (x.menu_variable).trim()
//         } else if (x.Ismenu_Drop == 1) {
//           path = x.ruta;
//           name = x.Nombre;
//           element = "";
//           exact = true;
//         }
//         else if (x.IsSubmenu == 1) {
//           path = x.sub_ruta;
//           name = x.sub_nombre;
//           element =  (x.sub_variable).trim()
//         }
//         // const LazyComponent = React.lazy(() => import(element));
//         let b = {
//           path: "/" + path,
//           name: name,
//           element: eval(element),
//           // element: LazyComponent,
//           exact: exact
//         }
//         Menu.push(b)
//       });
//       resolve(Menu); // Resolve the promise with the Menu data
//     });
//   });
// }
// Accesos()
// var routes = [];

// Accesos()
//   .then((Menu) => {
//     

//     // Populate the routes array with the Menu data
//     routes.push(...Menu);
//   })
//   .catch((error) => {

//   });



// export default routes

export { Cargar_Rutas };











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
// { path: '/', exact: true, name: 'Home' },
//   { path: '/dashboard', name: 'Dashboard', element: Dashboard },
//   { path: '/despacho', name: 'Despacho', exact: true },
//   { path: '/despacho/guias', name: 'Guias', element: Despacho },
//   { path: '/despacho/administrar', name: 'Administrar', element: Administrar },
//   { path: '/mantenimiento', name: 'Mantenimiento', exact: true },
//   { path: '/mantenimiento/usuarios', name: 'Usuarios', element: React.lazy(() => import('./views/mantenimiento/usuarios/Usuarios')) },
// ]

