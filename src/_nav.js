import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import * as ajax from "../src/config/config"
import * as funciones from '../src/funciones/login/login';

function Accesos_vista() {

  return new Promise((resolve, reject) => {
    let url = 'menu/Cargar_Menu';
    let DATOS_SESION = funciones.GET_DATOS_SESION()
    let param = {
      Usuario_ID: DATOS_SESION["Usuario_ID"]
    }
    console.log('param: ', param);

    ajax.AjaxSendReceiveData(url, param, function (res) {
      console.log('res: ', res);

      let Menu = [];

      res.map(function (x) {
        let component;
        let name;
        let to;
        let sub = [];
        if (x.Ismenu == 1) {
          component = CNavItem;
          name = x.Nombre;
          to = "/" + x.ruta;
          let b = {
            component: component,
            name: name,
            to: to,
            icon: <CIcon icon={(cilSpeedometer)} customClassName="nav-icon" />,
          }
          Menu.push(b)
        } else if (x.Ismenu_Drop == 1) {
          component = CNavGroup;
          name = x.Nombre;
          to = "/" + x.ruta;
          let b = {
            component: component,
            name: name,
            to: to,
            icon: <CIcon icon={(cilSpeedometer)} customClassName="nav-icon" />,
            // items: sub
          }
          let items = [];
          let menu_filter = res.filter(function (f) {
            if (f.IsSubmenu == 1 && f.menu_ID == x.menu_ID) {
              let b = {
                component: CNavItem,
                name: f.sub_nombre,
                to: "/" + f.sub_ruta,
              }
              items.push(b);
              return b;
            }
          })
          b.items = items
          Menu.push(b)

          // items = items;

        }
        // else if (x.IsSubmenu == 1) {

        // }

      });
      resolve(Menu); // Resolve the promise with the Menu data
    });
  });

  // const _nav = [
  //   {
  //     component: CNavItem,
  //     name: 'Dashboard',
  //     to: '/dashboard',
  //     icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //     // badge: {
  //     //   color: 'info',
  //     //   text: 'NEW',
  //     // },
  //   },
  //   {
  //     component: CNavTitle,
  //     name: 'App',
  //   },
  //   {
  //     component: CNavGroup,
  //     name: 'Despacho',
  //     to: '/despacho',
  //     icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //     items: [
  //       {
  //         component: CNavItem,
  //         name: 'Guias',
  //         to: '/despacho/guias',
  //         icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //       },
  //       {
  //         component: CNavItem,
  //         name: 'Administrar',
  //         to: '/despacho/administrar',
  //       },

  //     ],
  //   },
  //   {
  //     component: CNavGroup,
  //     name: 'Mantenimiento',
  //     to: '/mantenimiento',
  //     icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //     items: [
  //       {
  //         component: CNavItem,
  //         name: 'Usuarios',
  //         to: '/mantenimiento/Usuarios',
  //       },
  //     ]
  //   }
  // ];
}
// Accesos_vista()
var routes = [];

Accesos_vista()
  .then((Menu) => {
    console.log('Menu: ', Menu);

    // Populate the routes array with the Menu data
    routes.push(...Menu);
  })
  .catch((error) => {

  });

export default routes
