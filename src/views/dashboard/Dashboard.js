import React, { useEffect, useRef, useState } from 'react';

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsA
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilArrowBottom,
  cilArrowTop
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import $, { param } from 'jquery';

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import * as des from '../../funciones/dashboard/dashboard'
import moment from 'moment';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { func } from 'prop-types';

import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/plugins/monthSelect/style.css'; // Import the plugin styles
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js'; // Import the monthSelect plugin


const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  const [cantidad_cemento_mes, setcantidad_cemento_mes] = useState("");
  const [cantidad_cemento_mes_pr, setcantidad_cemento_mes_pr] = useState("");
  const [CM_GR_LABELS, setCM_GR_LABELS] = useState({});
  const [CM_GR_LABELS_por, setCM_GR_LABELS_por] = useState(0);

  const [STCHOFER_SACOS, setSTC_SACOS] = useState(0);
  const [STCHOFER_NOMBRE, setSTCHOFER_NOMBRE] = useState("");
  const [STCHOFER_POR, setSTCHOFER_POR] = useState("");
  const [STCHOFER_GRAFICO, setSTCHOFER_GRAFICO] = useState({});

  const [DATOS_COMPLETOS, setDATOS_COMPLETOS] = useState([]);

  function Cargar_Productos() {
    des.Cargar_Produts(function (x) {
      console.log('x: ', x);
      $("#SEL_PRODUCTOS").empty();
      x.map(function (y) {
        $("#SEL_PRODUCTOS").append("<option value='" + y.CODIGO + "'>" + y.DESCRIPCION + "</option>")
      });

      $("#SEL_PRODUCTOS").val("10016416").change()
    })
  }

  function Cargar_Stats(param) {

    des.Cargar_Stats(param, function (x) {
      console.log('x: ', x);

      let SACOS = x["SACOS"];
      let CHOFER = x["CHOFER"];
      let GUIAS_DESP = x["GUIAS_DESPACHADAS"];
      STATS_SACOS(SACOS);
      STATS_CHOFER(CHOFER);
      POR_DIA(GUIAS_DESP);
      setDATOS_COMPLETOS(GUIAS_DESP);
      console.log('GUIAS_DESP: ', GUIAS_DESP);
    });
  }

  function STATS_SACOS(datos) {
    let DATOS = datos["DATOS"][0];
    let gr = datos["GRAFICO"];

    setcantidad_cemento_mes(DATOS["CANTIDAD_CEMENTO_MES_ACTUAL"] + " " + DATOS["UNIDAD"])
    setcantidad_cemento_mes_pr(DATOS["DESCRIPCION"]);
    let por = ((parseFloat(DATOS["CANTIDAD_CEMENTO_MES_ACTUAL"]) - parseFloat(DATOS["CANTIDAD_CEMENTO_MES_ANTERIOR"])) / parseFloat(DATOS["CANTIDAD_CEMENTO_MES_ANTERIOR"]))
    por = por * 100
    setCM_GR_LABELS_por(por)

    //*** GRAFICO ***/
    gr.map(function (x) {
      x.mes = moment(x.AnioMes).format("MMMM");
      x.mes_numero = moment(x.AnioMes).format("MM");
    });
    gr.sort(function (a, b) {
      return a.mes_numero - b.mes_numero;
    });

    let GRA_CEMENTO_labels = [];
    let GRA_CEMENTO_data = [];
    gr.map(function (x) {
      GRA_CEMENTO_labels.push(x.mes);
      GRA_CEMENTO_data.push(x.CantidadTotalDespachada);
    })


    let t = {
      labels: GRA_CEMENTO_labels,
      datasets: [
        {
          label: 'SAC',
          backgroundColor: 'transparent',
          borderColor: 'rgba(255,255,255,.55)',
          pointBackgroundColor: getStyle('--cui-primary'),
          data: GRA_CEMENTO_data,
        },
      ],
    }

    setCM_GR_LABELS(t);
  }

  function STATS_CHOFER(datos) {
    let DATOS = datos["DATOS"][0];

    let gr = datos["GRAFICO"];

    let mesant = moment().subtract(1, "month").format("YYYY-MM")
    setSTCHOFER_NOMBRE(DATOS["Nombre"]);
    setSTC_SACOS(DATOS["CANT_CEMENTO"]);
    let DES_MES_ANT = gr.filter(item => item.MES == mesant)[0]["CANTIDAD"];

    let por = ((parseFloat(DATOS["CANT_CEMENTO"]) - parseFloat(DES_MES_ANT)) / parseFloat(DES_MES_ANT))
    por = por * 100
    setSTCHOFER_POR(por)
    //*** GRAFIXCO */

    gr.map(function (x) {
      x.mes = moment(x.MES).format("MMMM");
      x.mes_numero = moment(x.MES).format("MM");
    });

    gr.sort(function (a, b) {
      return a.mes_numero - b.mes_numero;
    });

    let GRA_CEMENTO_labels = [];
    let GRA_CEMENTO_data = [];
    gr.map(function (x) {
      GRA_CEMENTO_labels.push(x.mes);
      GRA_CEMENTO_data.push(x.CANTIDAD);
    })
    let t = {
      labels: GRA_CEMENTO_labels,
      datasets: [
        {
          label: 'SAC',
          backgroundColor: 'transparent',
          borderColor: 'rgba(255,255,255,.55)',
          pointBackgroundColor: getStyle('--cui-primary'),
          data: GRA_CEMENTO_data,
        },
      ],
    }
    setSTCHOFER_GRAFICO(t);


  }

  //** POR DIA */
  function POR_DIA(datos) {
    let PORDIA = datos["POR_DIA"]["DATOS"];
    let PORDIA_MESANT = datos["POR_DIA_MES_ANT"]["DATOS"];

    if (PORDIA.length > 0) {
      let ultimodia_mes_actual = moment(PORDIA[0]["FECHA"]).endOf("month").format("DD");
      let con = 1
      while (con <= parseInt(ultimodia_mes_actual)) {
        // 
        let dia = PORDIA.filter(item => parseInt(moment(item.FECHA).format("DD")) == con);
        if (dia.length == 0) {
          let f = moment(PORDIA[0]["FECHA"]).format("YYYY-MM-") + con;
          let b = {
            FECHA: moment(f).format("YYYY-MM-DD"),
            cantidad: 0,
          }
          PORDIA.push(b);
        }
        con++;
      }
      PORDIA.map(function (x) {
        x.NUM = parseInt(moment(x.FECHA).format("DD"));
      })
      PORDIA.sort((a, b) => a.NUM - b.NUM);
    }

    if (PORDIA_MESANT.length > 0) {
      let ultimodia_mes_ant = moment(PORDIA_MESANT[0]["FECHA_ANT"]).endOf("month").format("DD");

      let con2 = 1
      while (con2 <= parseInt(ultimodia_mes_ant)) {
        // 
        let dia = PORDIA_MESANT.filter(item => parseInt(moment(item.FECHA_ANT).format("DD")) == con2);
        if (dia.length == 0) {
          let f = moment(PORDIA_MESANT[0]["FECHA_ANT"]).format("YYYY-MM-") + con2;
          let b = {
            FECHA_ANT: moment(f).format("YYYY-MM-DD"),
            cantidad: 0,
          }
          PORDIA_MESANT.push(b);
        }
        con2++;
      }
      PORDIA_MESANT.map(function (x) {
        x.NUM = parseInt(moment(x.FECHA_ANT).format("DD"));
      })
      PORDIA_MESANT.sort((a, b) => a.NUM - b.NUM);
    }


    GRAFICO_DIARIO(PORDIA.concat(PORDIA_MESANT));

  }

  function GRAFICO_DIARIO(datos) {

    am4core.ready(function () {

      let datos_ant = datos.filter(item => item.TIPO == 1 && item.cantidad > 0);
      var totaldolar = datos_ant.reduce((sum, value) => (sum + parseFloat(value.cantidad)), 0);
      totaldolar = totaldolar / datos_ant.length
      console.log('totaldolar: ', totaldolar);

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart
      var chart = am4core.create("GRAFICO_DIARIO", am4charts.XYChart);

      chart.data = datos;
      // 

      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.labels.template.fill = am4core.color("#4680ff");

      var dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis2.renderer.grid.template.location = 0;
      dateAxis2.renderer.labels.template.fill = am4core.color("#22941E");

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.labels.template.fill = am4core.color("#4680ff");

      valueAxis.renderer.minWidth = 60;

      var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis2.tooltip.disabled = true;
      valueAxis2.renderer.labels.template.fill = am4core.color("#22941E");
      valueAxis2.renderer.minWidth = 60;
      valueAxis2.syncWithAxis = valueAxis;

      var series = chart.series.push(new am4charts.LineSeries());
      series.name = "MES ACTUAL";
      series.dataFields.dateX = "FECHA";
      series.dataFields.valueY = "cantidad";
      series.tooltipText = `Mes Actual
                  ---------------------------------------
                  [bold]DESPACHADO: {cantidad}`;
      series.fill = am4core.color("#4680ff");
      series.stroke = am4core.color("#4680ff");
      series.strokeWidth = 4;
      series.tensionX = 0.77;
      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.fill = am4core.color("#4680ff");

      var series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "MES ANTERIOR";
      series2.dataFields.dateX = "FECHA_ANT";
      series2.dataFields.valueY = "cantidad";
      series2.yAxis = valueAxis2;
      series2.xAxis = dateAxis2;
      series2.tooltipText = `Mes Anterior
                  ---------------------------------------
                  [bold]DESPACHADO: {cantidad}`;
      series2.fill = am4core.color("#22941E");
      series2.stroke = am4core.color("#22941E");
      series2.strokeWidth = 4;
      series2.tensionX = 0.77;
      var bullet = series2.bullets.push(new am4charts.CircleBullet());
      bullet.circle.fill = am4core.color("#22941E");

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis2;

      var scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      chart.legend = new am4charts.Legend();
      chart.legend.parent = chart.plotContainer;
      chart.legend.zIndex = 100;

      let range = valueAxis.axisRanges.create();
      range.value = parseFloat(totaldolar).toFixed(2);
      range.grid.stroke = am4core.color("#396478");
      range.grid.strokeWidth = 3;
      range.grid.strokeOpacity = 1;
      range.grid.strokeDasharray = "3,3";
      range.label.inside = true;
      range.label.text = "--------- Promedio " +parseFloat(totaldolar).toFixed(2);
      range.label.fill = range.grid.stroke;
      range.label.verticalCenter = "bottom";

      // valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
      // dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
      // dateAxis.renderer.grid.template.strokeOpacity = 0.07;
      // valueAxis.renderer.grid.template.strokeOpacity = 0.07;

    }); // end am4core.ready()
  }

  //** POR MES */
  function POR_MES(datos) {
    let DATOS_MES = datos["POR_MES"]["DATOS"]
    console.log('DATOS_MES: ', DATOS_MES);
    DATOS_MES.map(function (x) {
      x.NUM = parseInt(moment(x.MES).format("MM"));
    });

    DATOS_MES.sort((a, b) => a.NUM - b.NUM);


    GRAFICO_MES(DATOS_MES)
  }

  function GRAFICO_MES(datos) {

    var totaldolar = datos.reduce((sum, value) => (sum + parseFloat(value.cantidad)), 0);
    totaldolar = totaldolar / datos.length
    console.log('totaldolar: ', totaldolar);

    am4core.ready(function () {
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end



      // Create chart instance
      var chart = am4core.create("GRAFICO_DIARIO", am4charts.XYChart);

      // Add data
      chart.data = datos;

      // Create axes
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.labels.template.fill = am4core.color("#4680ff");
      dateAxis.dateFormats.setKey("month", "MM-YYYY");

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.labels.template.fill = am4core.color("#4680ff");
      valueAxis.renderer.minWidth = 60;
      // Create series

      var series = chart.series.push(new am4charts.LineSeries());
      series.name = "MES ACTUAL";
      series.dataFields.dateX = "FECHA";
      series.dataFields.valueY = "cantidad";
      series.tooltipText = `[bold]DESPACHADO: {cantidad}`;
      series.fill = am4core.color("#4680ff");
      series.stroke = am4core.color("#4680ff");
      series.strokeWidth = 4;
      series.tensionX = 0.77;
      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.fill = am4core.color("#4680ff");

      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.fill = am4core.color("#fff");
      bullet.circle.strokeWidth = 3;

      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.fullWidthLineX = true;
      chart.cursor.xAxis = dateAxis;
      chart.cursor.lineX.strokeWidth = 0;
      chart.cursor.lineX.fill = am4core.color("#000");
      chart.cursor.lineX.fillOpacity = 0.1;

      // Add scrollbar
      chart.scrollbarX = new am4charts.XYChartScrollbar();
      chart.scrollbarX.series.push(series);


      // Add a guide
      let range = valueAxis.axisRanges.create();
      range.value = parseFloat(totaldolar).toFixed(2);
      range.grid.stroke = am4core.color("#396478");
      range.grid.strokeWidth = 2;
      range.grid.strokeOpacity = 1;
      range.grid.strokeDasharray = "3,3";
      range.label.inside = true;
      range.label.text = "Promedio " + parseFloat(totaldolar).toFixed(2);
      range.label.fill = range.grid.stroke;
      range.label.verticalCenter = "bottom";
      chart.exporting.menu = new am4core.ExportMenu();


      chart.legend = new am4charts.Legend();
      chart.legend.parent = chart.plotContainer;
      chart.legend.zIndex = 100;
    }); // end am4core.ready()
  }

  // ** POR AÑO

  function POR_ANIO(datos) {
    let DATOS_ANIO = datos["POR_ANIO"]["DATOS"]
    DATOS_ANIO.sort((a, b) => parseInt(a.FECHA) - parseInt(b.FECHA));
    let a = [
      {
        "CODIGO": "10016416",
        "PEDIDO_INTERNO": "505695873",
        "FECHA": "2019",
        "cantidad": "53455"
      }, {
        "CODIGO": "10016416",
        "PEDIDO_INTERNO": "505695873",
        "FECHA": "2021",
        "cantidad": "34523"
      }, {
        "CODIGO": "10016416",
        "PEDIDO_INTERNO": "505695873",
        "FECHA": "2022",
        "cantidad": "45004"
      }, {
        "CODIGO": "10016416",
        "PEDIDO_INTERNO": "505695873",
        "FECHA": "2023",
        "cantidad": "86000"
      }
    ]
    GRAFICO_ANIO(a)
  }

  function GRAFICO_ANIO(datos) {
    am4core.ready(function () {

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart
      var chart = am4core.create("GRAFICO_DIARIO", am4charts.XYChart);

      chart.data = datos;
      // 

      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "FECHA";
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.grid.template.location = 0.5;
      categoryAxis.startLocation = 0.5;
      categoryAxis.endLocation = 0.5;


      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.baseValue = 0;

      // Create series
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "cantidad";
      series.dataFields.categoryX = "FECHA";
      series.tooltipText = `[bold]DESPACHADO: {cantidad}`;
      series.fill = am4core.color("#4680ff");
      series.stroke = am4core.color("#4680ff");
      series.strokeWidth = 4;
      series.tensionX = 0.77;
      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.fill = am4core.color("#4680ff");


      chart.cursor = new am4charts.XYCursor();

      var scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      chart.legend = new am4charts.Legend();
      chart.legend.parent = chart.plotContainer;
      chart.legend.zIndex = 100;

      // dateAxis.renderer.grid.template.strokeOpacity = 0.07;
      valueAxis.renderer.grid.template.strokeOpacity = 0.07;

    }); // end am4core.ready()
  }

  function CAMBIAR_MES() {
    let mes = $("#myDatePicker").val();

    let inicio_mes = moment(mes).startOf("month").format("YYYY-MM-DD");
    let fin_mes = moment(mes).endOf("month").format("YYYY-MM-DD");
    let inicio_mes_a = moment(inicio_mes).subtract(1, "month").startOf("month").format("YYYY-MM-DD");
    let fin_mes_a = moment(inicio_mes_a).endOf("month").format("YYYY-MM-DD");
    let param = {
      inicio_mes: inicio_mes,
      fin_mes: fin_mes,
      inicio_mes_a: inicio_mes_a,
      fin_mes_a: fin_mes_a,
    }
    console.log('param: ', param);
    Cargar_Stats(param)
  }

  useEffect(() => {
    let inicio_mes = moment().startOf("month").format("YYYY-MM-DD");
    let fin_mes = moment().endOf("month").format("YYYY-MM-DD");
    let inicio_mes_a = moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD");
    let fin_mes_a = moment(inicio_mes_a).endOf("month").format("YYYY-MM-DD");
    let param = {
      inicio_mes: inicio_mes,
      fin_mes: fin_mes,
      inicio_mes_a: inicio_mes_a,
      fin_mes_a: fin_mes_a,
    }
    Cargar_Stats(param);
    Cargar_Productos();
    const options = {
      dateFormat: 'Y-m-d', // Customize the date format
      onChange: (selectedDates, dateStr) => {
        // let inicio = moment(new Date(selectedDates[0])).startOf("month").format("YYYY-MM-DD");
        // let fin = moment(inicio).endOf("month").format("YYYY-MM-DD");
        // setfecha_ini(inicio);
        // setfecha_fin(fin);
        CAMBIAR_MES();
      },
      defaultDate: 'today',
      plugins: [
        new monthSelectPlugin({
          shorthand: true, //defaults to false
          dateFormat: "M-Y", //defaults to "F Y"
          altFormat: "F Y", //defaults to "F Y"
          theme: "dark" // defaults to "light"
        })
      ]
    };
    flatpickr('#myDatePicker', options);

  }, []);


  return (
    <>
      {/* <WidgetsDropdown /> */}
      <div className='row mb-4'>
        <div className='col-lg-4 col-sm-6'>
          <label className="required fs-5 fw-bold mb-2">Mes</label>
          {/* <input defaultValue={moment("20231001").format("YYYY-MM-DD")} id='AD_FECHA_INI' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" /> */}
          <input type="text" id="myDatePicker" className='form-control' placeholder="Select Date" />

        </div>
        <div className='col-lg-5 col-sm-6'>
          <label className="required fs-5 fw-bold mb-2">Producto</label>
          {/* <input defaultValue={moment("20231001").format("YYYY-MM-DD")} id='AD_FECHA_INI' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" /> */}
          <select id='SEL_PRODUCTOS' className='form-select'>
          </select>

        </div>
      </div>
      <div className='row'>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
              <>
                {cantidad_cemento_mes}{' '}
                <span className="fs-6 fw-bold">
                  ({parseFloat(CM_GR_LABELS_por).toFixed(2)}% <CIcon icon={CM_GR_LABELS_por > 0 ? cilArrowTop : cilArrowBottom} />)
                </span>
              </>
            }
            title={cantidad_cemento_mes_pr}

            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={CM_GR_LABELS}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: -9,
                      max: 100000,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4"
            color="success"
            value={
              <>
                {STCHOFER_SACOS}{' '}
                <span className="fs-6 fw-bold">
                  ({parseFloat(STCHOFER_POR).toFixed(2)}% <CIcon icon={CM_GR_LABELS_por > 0 ? cilArrowTop : cilArrowBottom} />)
                </span>
              </>
            }
            title={
              <>

                <span>{STCHOFER_NOMBRE}</span><br />
                <span>Mas sacos despachados</span>
              </>
            }

            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={STCHOFER_GRAFICO}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: -9,
                      max: 10000,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
      </div>
      <CCard className="mb-4">
        <CCardBody>

          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              {/* <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton> */}
              {/* <CButtonGroup className="float-end me-3">
                {['Dia', 'Mes', 'Año'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Dia'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup> */}
              <div className="btn-group float-end" role="group" aria-label="Basic example">
                <button onClick={() => {
                  POR_DIA(DATOS_COMPLETOS);
                }} type="button" className="btn btn-light">Dia</button>
                <button onClick={() => {
                  POR_MES(DATOS_COMPLETOS);
                }} type="button" className="btn btn-light">Mes</button>
                <button onClick={() => {
                  POR_ANIO(DATOS_COMPLETOS);
                }} type="button" className="btn btn-light">Año</button>
              </div>
            </CCol>
          </CRow>
          <div id='GRAFICO_DIARIO' style={{ height: 500 }}></div>

        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <WidgetsBrand withCharts />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Recurring Clients</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                    <CTableHeaderCell>Usage</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">Last login</div>
                        <strong>{item.activity}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
