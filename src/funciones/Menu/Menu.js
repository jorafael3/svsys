import * as funciones from "../../../src/funciones/login/login"
import * as ajax from "../../../src/config/config"
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

function Cargar_Menu(callback) {
    let url = 'menu/Cargar_Menu';
    let DATOS_SESION = funciones.GET_DATOS_SESION()
    let param = {
        Usuario_ID: DATOS_SESION["Usuario_ID"]
    }

    ajax.AjaxSendReceiveData(url, param, function (res) {

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
                            icon: <i style={{ fontSize: 9 }} className="bi bi-circle-fill">_</i>,

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
        callback(Menu);
    });
}

export { Cargar_Menu };
