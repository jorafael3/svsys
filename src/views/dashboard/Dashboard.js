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
  const [FECHA_INICIO, setFECHA_INICIO] = useState(0);
  const [FECHA_FIN, setFECHA_FIN] = useState(0);

  const [STCHOFER_SACOS, setSTC_SACOS] = useState(0);
  const [STATS_UNIDAD, setSTATS_UNIDAD] = useState("");
  const [STCHOFER_NOMBRE, setSTCHOFER_NOMBRE] = useState("Sin registro");
  const [STCHOFER_POR, setSTCHOFER_POR] = useState(0);
  const [STCHOFER_GRAFICO, setSTCHOFER_GRAFICO] = useState({});
  const [STCHOFER_UNIDAD, setSTCHOFER_UNIDAD] = useState("");
  const [DATOS_COMPLETOS, setDATOS_COMPLETOS] = useState([]);
  const [STVIGENTES, setSTVIGENTES] = useState(0);
  const [STPROC_DESPACHO, setSTPROC_DESPACHO] = useState(0);


  const [PROMEDIO_DESPACHO, setPROMEDIO_DESPACHO] = useState(0);
  const [PORYECCION_DESPACHO, setPORYECCION_DESPACHO] = useState(0);


  function Cargar_Productos() {
    des.Cargar_Produts(function (x) {

      $("#SEL_PRODUCTOS").empty();
      // $("#SEL_PRODUCTOS").append("<option value='TODO'>TODO</option>")
      x.map(function (y) {
        $("#SEL_PRODUCTOS").append("<option value='" + y.CODIGO + "'>" + y.DESCRIPCION + "</option>")
      });

      $("#SEL_PRODUCTOS").val("10016416").change()
    })
  }

  function Cargar_Stats(param) {



    des.Cargar_Stats(param, function (x) {
      console.log('x: ', x);


      let CARD_GUIAS_TOT = x["CARD_GUIAS_TOTALES"];
      let CARD_CHOFER_MAS_RET = x["CARD_CHOFER_MAS_RETIROS"];
      let CARD_DIA_RECOR = x["CARD_DIA_RECORD"];
      let GUIAS_RETIRADAS_POR_DIA = x["GUIAS_RETIRADAS_POR_DIA"];

      let GUIAS_RETIRADAS_POR_MES = x["GUIAS_RETIRADAS_POR_MES"];
      let GR_CAR_1 = x["GR_CARD_1"];

      // let SACOS = x["SACOS"];
      // let CHOFER = x["CHOFER"];
      // let GUIAS_DESP = x["GUIAS_DESPACHADAS"];
      // let GUIAS_VIG = x["GUIAS_VIGENTES"];
      // let GUIAS_EN_PROCESO_DESPACHO = x["GUIAS_EN_PROCESO_DESPACHO"];
      // STATS_SACOS(SACOS);
      // STATS_CHOFER(CHOFER);
      // POR_DIA(GUIAS_DESP);
      // STATS_VIGENTE(GUIAS_VIG);
      // STATS_PROCESO_DESPACHO(GUIAS_EN_PROCESO_DESPACHO);
      // setDATOS_COMPLETOS(GUIAS_DESP);
      // CALCULAR_PROYECCION();
      CARD_GUIAS_TOTALES(CARD_GUIAS_TOT)
      CARD_CHOFER_MAS_RETIROS(CARD_CHOFER_MAS_RET)
      CARD_DIA_RECORD(CARD_DIA_RECOR)
      POR_DIA(GUIAS_RETIRADAS_POR_DIA);
      setDATOS_GR_MES(GUIAS_RETIRADAS_POR_MES);
      GR_CARD_1(GR_CAR_1)
    });
  }

  const [CAR_GT_PORCENTAJE, setCAR_GT_PORCENTAJE] = useState(0);


  function CARD_GUIAS_TOTALES(datos) {
    let DATOS = datos["DATOS"];

    let RETIRADAS_ESTE_MES = DATOS[0];
    let CORRESPONDEN_AL_MES_PASADO = DATOS[1];
    let FUE_RETIRADA_MES_SGT = DATOS[2];
    let GUIAS_EMITIDAS_MES_TOTAL = DATOS[3];
    let RESTANTE_DE_RETIRAR = DATOS[4];
    let RETIRADAS_MES_ANTERIOR = DATOS[5];
    let GUIAS_RETIRADAS_NO_INGRESADAS = DATOS[6];
    let POR_RETIRAR_CEMENTO = DATOS[7];
    let POR_RETIRAR_OTROS = DATOS[8];

    $("#CARD_GT_TOTAL").text(parseInt(RETIRADAS_ESTE_MES["cantidad"]) + parseInt(CORRESPONDEN_AL_MES_PASADO["cantidad"]) + parseInt(GUIAS_RETIRADAS_NO_INGRESADAS["cantidad"]));
    $("#CARD_GT_RETIRADAS_MES_ANT").text(CORRESPONDEN_AL_MES_PASADO["cantidad"]);
    $("#CARD_GT_RETIRADAS_ESTE_MES").text(RETIRADAS_ESTE_MES["cantidad"]);
    $("#CARD_GT_COMPRADAS").text(GUIAS_EMITIDAS_MES_TOTAL["cantidad"]);
    $("#CARD_GT_POR_RETIRAR").text(RESTANTE_DE_RETIRAR["cantidad"]);
    $("#CARD_GT_RETIRADAS_NO_INGRESADAS").text(GUIAS_RETIRADAS_NO_INGRESADAS["cantidad"]);
    $("#CARD_GT_POR_RETIRAR_CEMENTO").text(POR_RETIRAR_CEMENTO["cantidad"]);
    $("#CARD_GT_POR_RETIRAR_OTROS").text(POR_RETIRAR_OTROS["cantidad"]);

    let por = ((parseFloat(RETIRADAS_ESTE_MES["cantidad"]) - parseFloat(RETIRADAS_MES_ANTERIOR["cantidad"])) / parseFloat(parseFloat(RETIRADAS_MES_ANTERIOR["cantidad"])))
    por = por * 100

    setCAR_GT_PORCENTAJE(parseFloat(por).toFixed(2));
    let total_pr = parseInt(RETIRADAS_ESTE_MES["cantidad"]) + parseInt(CORRESPONDEN_AL_MES_PASADO["cantidad"])

    let p = CALCULAR_PROYECCION(total_pr, "chartdiv_proyeccion_g");

    setTimeout(() => {
      $("#CD_RECORD_PROYECCION").text(p);

    }, 500);

    // let gr = datos["GRAFICO"];

    // setcantidad_cemento_mes(DATOS["CANTIDAD_CEMENTO_MES_ACTUAL"])
    // setcantidad_cemento_mes_pr(DATOS["DESCRIPCION"]);
    // if (parseFloat(DATOS["CANTIDAD_CEMENTO_MES_ANTERIOR"]) > 0) {
    //   let por = ((parseFloat(DATOS["CANTIDAD_CEMENTO_MES_ACTUAL"]) - parseFloat(DATOS["CANTIDAD_CEMENTO_MES_ANTERIOR"])) / parseFloat(DATOS["CANTIDAD_CEMENTO_MES_ANTERIOR"]))
    //   por = por * 100


    //   setCM_GR_LABELS_por(isNaN(por) ? 0 : por);
    // } else {
    //   setCM_GR_LABELS_por(0);

    // }

    // let check_producto = $("#check_producto").is(":checked") == false ? 0 : "p";
    // let check_guia = $("#check_guia").is(":checked") == false ? 0 : "g";

    // if (check_producto == "p") {
    //   setSTATS_UNIDAD(DATOS["UNIDAD"]);
    // } else {
    //   setSTATS_UNIDAD("GUIAS");

    // }


  }

  function CARD_CHOFER_MAS_RETIROS(datos) {
    let DATOS = datos["DATOS"];


    $("#CARD_CHOFER_TOTAL").text(DATOS[0]["cantidad_total"]);
    $("#CARD_CHOFER_SACOS").text(DATOS[0]["SACOS_CEMENTO"]);
    $("#CARD_CHOFER_NOMBRE").text(DATOS[0]["Nombre"]);
    $("#CARD_CHOFER_PLACA").text(" (" + DATOS[0]["placa"] + ")");
    $("#CARD_CHOFER_PR_GUIAS").text(DATOS[0]["SACOS_CEMENTO_GUIAS"]);

  }

  const [CAR_DR_F_GEN, setCAR_DR_F_GEN] = useState('');
  const [CAR_DR_F_MES, setCAR_DR_F_MES] = useState('');


  function CARD_DIA_RECORD(datos) {
    let DATOS = datos["DATOS"];


    $("#CD_RECORD_TOTAL").text(DATOS[0]["cantidad"]);
    $("#CD_RECORD_DIA_TOTAL").text(moment(DATOS[0]["fecha"]).format("MMMM DD, YYYY"));
    $("#CARD_DIAR_GENERAL").text(DATOS[2]["cantidad"]);
    $("#CARD_DIAR_MES").text(DATOS[3]["cantidad"]);
    setCAR_DR_F_GEN(moment(DATOS[2]["fecha"]).format("MMMM DD, YYYY"));
    setCAR_DR_F_MES(moment(DATOS[3]["fecha"]).format("MMMM DD, YYYY"));


  }

  function STATS_CHOFER(datos) {



    var VAL = datos["DATOS"].reduce((sum, value) => (sum + parseFloat(value.CANT_CEMENTO)), 0);
    if (VAL > 0) {
      let DATOS = datos["DATOS"][0];
      let gr = datos["GRAFICO"];

      let mesant = moment().subtract(1, "month").format("YYYY-MM");

      setSTCHOFER_NOMBRE(DATOS["Nombre"]);
      setSTC_SACOS(DATOS["CANT_CEMENTO"]);
      setSTCHOFER_UNIDAD("Con más " + STATS_UNIDAD + " despachadas");

      if (gr.length > 0) {
        let DES_MES_ANT = gr.filter(item => item.MES == mesant)

        if (DES_MES_ANT.length > 0) {
          DES_MES_ANT = DES_MES_ANT[0]["CANTIDAD"]
          let por = ((parseFloat(DATOS["CANT_CEMENTO"]) - parseFloat(DES_MES_ANT)) / parseFloat(DES_MES_ANT))
          por = por * 100

          setSTCHOFER_POR(por);
        } else {
          setSTCHOFER_POR(0);

        }

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
    } else {
      setSTCHOFER_POR(0);
      setSTC_SACOS(0);
      setSTCHOFER_NOMBRE("Sin registro");
      setSTCHOFER_GRAFICO({});

    }

    //*** GRAFIXCO */



  }

  function STATS_VIGENTE(datos) {


    let DATOS = datos["DATOS"]
    var total = DATOS.reduce((sum, value) => (sum + parseFloat(value.cantidad)), 0);
    setSTVIGENTES(total);


  }

  function STATS_PROCESO_DESPACHO(datos) {

    let DATOS = datos["DATOS"]
    let check_producto = $("#check_producto").is(":checked") == false ? 0 : "p";
    if (check_producto == 0) {
      setSTPROC_DESPACHO(DATOS.length);

    } else {
      var total = DATOS.reduce((sum, value) => (sum + parseFloat(value.POR_DESPACHAR)), 0);
      setSTPROC_DESPACHO(total);

    }

  }

  //** POR DIA */
  const [DATOS_GR_DIA, setDATOS_GR_DIA] = useState([]);


  function POR_DIA(datos) {


    let MES_ACTUAL = datos["DATOS"].filter(item => item.MES == "MES_ACT");
    let MES_ANTERIOR = datos["DATOS"].filter(item => item.MES == "MES_ANT");
    setDATOS_GR_DIA(datos);



    let ARRAY_ANT = []
    MES_ANTERIOR.map(function (x) {
      let b = {
        FECHA_ANT: x.FECHA,
        cantidad: x.cantidad,
        MES: x.MES
      }
      ARRAY_ANT.push(b);
    })



    // let PORDIA = datos["POR_DIA"]["DATOS"];
    // let PORDIA_MESANT = datos["POR_DIA_MES_ANT"]["DATOS"];

    if (MES_ACTUAL.length > 0) {
      let ultimodia_mes_actual = moment(MES_ACTUAL[0]["FECHA"]).endOf("month").format("DD");
      let con = 1
      while (con <= parseInt(ultimodia_mes_actual)) {
        // 
        let dia = MES_ACTUAL.filter(item => parseInt(moment(item.FECHA).format("DD")) == con);
        if (dia.length == 0) {

          let f = moment(MES_ACTUAL[0]["FECHA"]).format("YYYY-MM-") + con;

          let b = {
            FECHA: moment(f).format("YYYY-MM-DD"),
            cantidad: 0,
            MES: "MES_ACT"
          }
          MES_ACTUAL.push(b);

        }
        con++;
      }
      MES_ACTUAL.map(function (x) {
        x.NUM = parseInt(moment(x.FECHA).format("DD"));
      })
      MES_ACTUAL.sort((a, b) => a.NUM - b.NUM);
    }

    if (ARRAY_ANT.length > 0) {
      let ultimodia_mes_ant = moment(ARRAY_ANT[0]["FECHA_ANT"]).endOf("month").format("DD");

      let con2 = 1
      while (con2 <= parseInt(ultimodia_mes_ant)) {
        // 
        let dia = ARRAY_ANT.filter(item => parseInt(moment(item.FECHA_ANT).format("DD")) == con2);
        if (dia.length == 0) {
          let f = moment(ARRAY_ANT[0]["FECHA_ANT"]).format("YYYY-MM-") + con2;
          let b = {
            FECHA_ANT: moment(new Date(f)).format("YYYY-MM-DD"),
            cantidad: 0,
          }
          ARRAY_ANT.push(b);
        }
        con2++;
      }
      ARRAY_ANT.map(function (x) {
        x.NUM = parseInt(moment(x.FECHA_ANT).format("DD"));
        // x.FECHA_ANT = x.FECHA
      })
      ARRAY_ANT.sort((a, b) => a.NUM - b.NUM);


    }

    // 

    GRAFICO_DIARIO(MES_ACTUAL.concat(ARRAY_ANT));


  }

  function GRAFICO_DIARIO(datos) {




    am4core.ready(function () {

      let datos_ant = datos.filter(item => item.MES == "MES_ACT" && item.cantidad > 0);
      var totaldolar = datos_ant.reduce((sum, value) => (sum + parseFloat(value.cantidad)), 0);
      let valor_completo = totaldolar
      totaldolar = totaldolar / datos_ant.length
      setPROMEDIO_DESPACHO(totaldolar);


      var total_pr = datos_ant.reduce((sum, value) => (sum + parseFloat(value.cantidad)), 0);

      let p = CALCULAR_PROYECCION(total_pr, "chartdiv_proyeccion");




      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart
      var chart = am4core.create("GRAFICO_DIARIO", am4charts.XYChart);
      chart.width = am4core.percent(100);
      chart.height = am4core.percent(100);
      chart.data = datos;
      // 
      chart.responsive.enabled = true;
      chart.padding(20, 20, 20, 20);
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
      range.label.text = "--------- Promedio " + parseFloat(totaldolar).toFixed(2);
      range.label.fill = range.grid.stroke;
      range.label.verticalCenter = "bottom";

      function createTrendLine(data) {
        var trend = chart.series.push(new am4charts.LineSeries());
        trend.dataFields.valueY = "value";
        trend.dataFields.dateX = "date";
        trend.strokeWidth = 2
        trend.stroke = trend.fill = am4core.color("#c00");
        trend.data = data;
        trend.name = "PROYECCION"

        var bullet = trend.bullets.push(new am4charts.CircleBullet());
        bullet.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
        bullet.strokeWidth = 2;
        bullet.stroke = am4core.color("#fff")
        bullet.circle.fill = trend.stroke;

        var hoverState = bullet.states.create("hover");
        hoverState.properties.scale = 1.7;

        return trend;
      };
      let mes = $("#myDatePicker").val();

      // createTrendLine([
      //   { "date": moment(mes).startOf("month").format("YYYY-MM-DD"), "value": 0 },
      //   { "date": moment(mes).endOf("month").format("YYYY-MM-DD"), "value": 21120 },
      // ]);

      // valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
      // dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
      // dateAxis.renderer.grid.template.strokeOpacity = 0.07;
      // valueAxis.renderer.grid.template.strokeOpacity = 0.07;

    }); // end am4core.ready()
  }

  //** POR MES */

  const [DATOS_GR_MES, setDATOS_GR_MES] = useState([]);


  function POR_MES(datos) {
    let DATOS_MES = datos["DATOS"]

    DATOS_MES.map(function (x) {
      x.NUM = parseInt(moment(x.MES).format("MM"));
    });

    DATOS_MES.sort((a, b) => a.NUM - b.NUM);



    GRAFICO_MES(DATOS_MES)
  }

  function GRAFICO_MES(datos) {

    var totaldolar = datos.reduce((sum, value) => (sum + parseFloat(value.cantidad)), 0);
    totaldolar = totaldolar / datos.length


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
    // let a = [
    //   {
    //     "CODIGO": "10016416",
    //     "PEDIDO_INTERNO": "505695873",
    //     "FECHA": "2019",
    //     "cantidad": "53455"
    //   }, {
    //     "CODIGO": "10016416",
    //     "PEDIDO_INTERNO": "505695873",
    //     "FECHA": "2021",
    //     "cantidad": "34523"
    //   }, {
    //     "CODIGO": "10016416",
    //     "PEDIDO_INTERNO": "505695873",
    //     "FECHA": "2022",
    //     "cantidad": "45004"
    //   }, {
    //     "CODIGO": "10016416",
    //     "PEDIDO_INTERNO": "505695873",
    //     "FECHA": "2023",
    //     "cantidad": "86000"
    //   }
    // ]
    GRAFICO_ANIO(DATOS_ANIO)
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

  const [TIPO_ESTADO, setTIPO_ESTADO] = useState(true);

  function CAMBIAR_MES() {
    let mes = $("#myDatePicker").val();
    let prod = $("#SEL_PRODUCTOS").val();

    if (prod == "TODO") {
      setTIPO_ESTADO(true);
      $("#check_producto").prop("disabled", true);
    } else {
      $("#check_producto").prop("disabled", false);
      // $("#check_guia").prop("checked", false);
    }

    let inicio_mes = moment(mes).startOf("month").format("YYYY-MM-DD");
    let fin_mes = moment(mes).endOf("month").format("YYYY-MM-DD");
    let inicio_mes_a = moment(inicio_mes).subtract(1, "month").startOf("month").format("YYYY-MM-DD");
    let fin_mes_a = moment(inicio_mes_a).endOf("month").format("YYYY-MM-DD");
    let inicio_mes_s = moment().add(1, "month").startOf("month").format("YYYY-MM-DD");
    let fin_mes_s = moment(inicio_mes_s).endOf("month").format("YYYY-MM-DD");
    let check_producto = $("#check_producto").is(":checked") == false ? 0 : "p";
    let check_guia = $("#check_guia").is(":checked") == false ? 0 : "g";

    let param = {
      inicio_mes: inicio_mes,
      fin_mes: fin_mes,
      inicio_mes_a: inicio_mes_a,
      fin_mes_a: fin_mes_a,
      inicio_mes_s: inicio_mes_s,
      fin_mes_s: fin_mes_s,
      producto: prod.trim(),
      tipo: check_producto == 0 ? check_guia : check_producto
    }




    setFECHA_INICIO(inicio_mes);
    setFECHA_FIN(fin_mes);

    Cargar_Stats(param)
  }

  function CALCULAR_PROYECCION(totalret, label) {



    function domingosEnMes(anio, mes) {
      const primerDia = new Date(anio, mes - 1, 1);
      const ultimoDia = new Date(anio, mes, 0);
      let domingos = 0;
      for (let dia = primerDia; dia <= ultimoDia; dia.setDate(dia.getDate() + 1)) {
        if (dia.getDay() === 0) {
          domingos++;
        }
      }
      return domingos;
    }

    function sabadosEnMes(anio, mes) {
      const primerDia = new Date(anio, mes - 1, 1);
      const ultimoDia = new Date(anio, mes, 0);
      let sabados = 0;
      for (let dia = primerDia; dia <= ultimoDia; dia.setDate(dia.getDate() + 1)) {
        if (dia.getDay() === 6) {
          sabados += 0.5;
        }
      }
      return sabados;
    }

    let m = $("#myDatePicker").val();
    const anio = moment(m).format("YYYY");
    const mes = moment(m).format("MM"); // Noviembre
    const cantidadDomingos = domingosEnMes(anio, mes);
    const cantidadSabados = sabadosEnMes(anio, mes);
    let DIAS_ENEL_MES = moment(m).endOf("month").format("DD");
    let DIAS_LABORABLES = parseInt(DIAS_ENEL_MES) - parseInt(cantidadDomingos) - parseFloat(cantidadSabados)

    let PROYECCION = (totalret / DIAS_LABORABLES) * DIAS_ENEL_MES
    let porc = (totalret / PROYECCION) * 100



    setPORYECCION_DESPACHO(PROYECCION);

    am4core.ready(function () {


      var chart = am4core.create(label, am4charts.GaugeChart);
      chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

      chart.innerRadius = -40;

      var axis = chart.xAxes.push(new am4charts.ValueAxis());
      axis.min = 0;
      axis.max = 100;
      axis.strictMinMax = true;
      axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
      axis.renderer.grid.template.strokeOpacity = 0.3;
      axis.renderer.radius = am4core.percent(80);

      var colorSet = new am4core.ColorSet();

      var range0 = axis.axisRanges.create();
      range0.value = 0;
      range0.endValue = 25;
      range0.axisFill.fillOpacity = 1;
      range0.axisFill.fill = colorSet.getIndex(0);
      range0.axisFill.zIndex = - 1;
      range0.axisFill.fill = am4core.color("#E74C3C");


      var range1 = axis.axisRanges.create();
      range1.value = 25;
      range1.endValue = 50;
      range1.axisFill.fillOpacity = 1;
      range1.axisFill.fill = colorSet.getIndex(2);
      range1.axisFill.zIndex = -1;
      range1.axisFill.fill = am4core.color("#E67E22");

      var range2 = axis.axisRanges.create();
      range2.value = 50;
      range2.endValue = 75;
      range2.axisFill.fillOpacity = 1;
      range2.axisFill.fill = colorSet.getIndex(4);
      range2.axisFill.zIndex = -1;
      range2.axisFill.fill = am4core.color("#F4D03F");

      var range3 = axis.axisRanges.create();
      range3.value = 75;
      range3.endValue = 100;
      range3.axisFill.fillOpacity = 1;
      range3.axisFill.fill = colorSet.getIndex(4);
      range3.axisFill.zIndex = -1;
      range3.axisFill.fill = am4core.color("#2ECC71");

      var hand = chart.hands.push(new am4charts.ClockHand());
      hand.axis = axis;
      hand.innerRadius = am4core.percent(55);
      hand.startWidth = 8;
      hand.pin.disabled = true;
      hand.value = "34";
      hand.fill = am4core.color("#444");
      hand.stroke = am4core.color("#000");
      // using chart.setTimeout method as the timeout will be disposed together with a chart
      chart.setTimeout(randomValue, 2000);

      // var label = chart.radarContainer.createChild(am4core.Label);
      // label.isMeasured = false;
      // label.fontSize = "3em";
      // label.x = am4core.percent(50);
      // label.paddingBottom = 30;
      // label.horizontalCenter = "middle";
      // label.verticalCenter = "bottom";
      // //label.dataItem = data;
      // label.text = PROYECCION;

      // var label2 = chart.radarContainer.createChild(am4core.Label);
      // label2.isMeasured = false;
      // label2.fontSize = "2em";
      // label2.horizontalCenter = "middle";
      // label2.verticalCenter = "bottom";
      // label2.text = GR_CARD_1_UNIDAD;
      // label2.fill = am4core.color(matchingGrade.color);

      //label.text = "{score}";
      // label.fill = am4core.color(matchingGrade.color);

      function randomValue() {
        hand.showValue(porc, 1000, am4core.ease.cubicOut);
        chart.setTimeout(randomValue, 2000);
      }

    }); // end am4core.ready()

    return PROYECCION;
  }


  //**** GR CARD 1 */

  const [GR_CARD_1_UNIDAD, setGR_CARD_1_UNIDAD] = useState('');
  const [GR_CARD_1_PORCENTAJE, setGR_CARD_1_PORCENTAJE] = useState('');
  const [GR_CARD_1_PORCENTAJE_MES_A, setGR_CARD_1_PORCENTAJE_MES_A] = useState('');


  function GR_CARD_1(d) {

    let datos = d["DATOS"]
    let ESTE_ME_TOTAL_RETIRADAS = datos[0];
    let ESTE_MES_COMPRADAS = datos[1];
    let ESTE_MES_RETIRADAS_COMPRADAS_MES_ANTERIOR = datos[2];
    let MES_PASADO_TOTAL_RETIRADAS = datos[3];
    let MES_PASADO_COMPRADAS = datos[4];
    let MES_PASADO_RETIRADAS_COMPRADAS_MES_ANTERIOR = datos[5];
    let POR_RETIRAR = datos[6];

    setGR_CARD_1_UNIDAD(ESTE_ME_TOTAL_RETIRADAS["UNIDAD"]);
    $("#GR_CARD_1_TOTAL_MES").text(ESTE_ME_TOTAL_RETIRADAS["cantidad"] + " ");
    $("#GR_CARD_1_TOTAL_MES_COMPRADO").text(ESTE_MES_COMPRADAS["cantidad"] + " ");
    $("#GR_CARD_1_TOTAL_MES_COMPRADO_MES_ANT").text(ESTE_MES_RETIRADAS_COMPRADAS_MES_ANTERIOR["cantidad"] + " ");
    $("#GR_CARD_1_POR_RETIRAR").text(POR_RETIRAR["cantidad"] + " ");



    let RET = parseFloat(ESTE_ME_TOTAL_RETIRADAS["cantidad"]) + parseFloat(ESTE_MES_RETIRADAS_COMPRADAS_MES_ANTERIOR["cantidad"])
    let TOT = parseFloat(ESTE_MES_COMPRADAS["cantidad"]);

    $("#GR_CARD_1_TOTAL_RETIRADO").text(RET + " ");
    let porc = ((RET) / TOT) * 100;

    setGR_CARD_1_PORCENTAJE(parseFloat(isNaN(porc) ? 0 : porc).toFixed(2));

    let RET_A = parseFloat(MES_PASADO_TOTAL_RETIRADAS["cantidad"]);

    let porc_mes_a = ((RET - RET_A) / RET_A) * 100
    setGR_CARD_1_PORCENTAJE_MES_A(isNaN(porc_mes_a) ? 0 : porc_mes_a);



  }

  const [chartContainerHeight, setChartContainerHeight] = useState(650);

  const adjustChartContainerSize = () => {
    const newHeight = window.innerWidth <= 768 ? 400 : 650;
    setChartContainerHeight(newHeight);
  };

  useEffect(() => {
    let inicio_mes = moment().startOf("month").format("YYYY-MM-DD");
    let fin_mes = moment().endOf("month").format("YYYY-MM-DD");
    let inicio_mes_a = moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD");
    let fin_mes_a = moment(inicio_mes_a).endOf("month").format("YYYY-MM-DD");
    let inicio_mes_s = moment().add(1, "month").startOf("month").format("YYYY-MM-DD");
    let fin_mes_s = moment(inicio_mes_s).endOf("month").format("YYYY-MM-DD");

    let check_producto = $("#check_producto").is(":checked") ? "p" : "TODO";
    let check_guia = $("#check_guia").is(":checked") ? "g" : 0;

    let param = {
      inicio_mes: inicio_mes,
      fin_mes: fin_mes,
      inicio_mes_a: inicio_mes_a,
      fin_mes_a: fin_mes_a,
      inicio_mes_s: inicio_mes_s,
      fin_mes_s: fin_mes_s,
      producto: "10016416",
      tipo: check_guia
    };

    // $("#SEL_PRODUCTOS").val("10016416").change();

    setFECHA_INICIO(inicio_mes);
    setFECHA_FIN(fin_mes);
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
    adjustChartContainerSize();
    window.addEventListener('resize', adjustChartContainerSize);

    // Limpieza del evento al desmontar el componente
    return () => {
      window.removeEventListener('resize', adjustChartContainerSize);
    };
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


      </div>

      <div className='row'>


        <div className='d-none'>
          <CCol sm={6} lg={3}>
            <CWidgetStatsA
              className="mb-4"
              color="primary"
              value={
                <>
                  <span className="fs-5 fw-bold">
                    {cantidad_cemento_mes + " " + STATS_UNIDAD + " "}{' '}
                  </span>

                  <span className="fs-6 fw-bold">
                    ({parseFloat(CM_GR_LABELS_por).toFixed(2)}% <CIcon icon={CM_GR_LABELS_por > 0 ? cilArrowTop : cilArrowBottom} />)
                  </span>
                </>
              }
              title={
                <>
                  {/* <span className="fs-6 fw-bold">Producto</span><br /> */}
                  <span className="fs-6 fw-bold">{cantidad_cemento_mes_pr}</span>
                </>

              }

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
          <CCol sm={6} lg={3}>
            <CWidgetStatsA
              className="mb-4"
              color="warning"
              value={
                <>
                  {STCHOFER_SACOS + " " + STATS_UNIDAD + " "}{'  '}
                  <span className="fs-6 fw-bold">
                    ({parseFloat(STCHOFER_POR).toFixed(2)}% <CIcon icon={CM_GR_LABELS_por > 0 ? cilArrowTop : cilArrowBottom} />)
                  </span>
                </>
              }
              title={
                <>
                  <span className="fs-6 fw-bold">{STCHOFER_NOMBRE}</span><br />
                  <span className="fs-6 fw-bold">{STCHOFER_SACOS > 0 ? "Con más " + STATS_UNIDAD + " despachad@s" : ""}</span>
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
          <CCol sm={6} lg={3}>
            <CWidgetStatsA
              className="mb-4"
              color="info"
              value={
                <>
                  {STVIGENTES + " " + STATS_UNIDAD + " "}{'  '}
                </>
              }
              title={
                <>
                  <span className="fs-6 fw-bold">VIGENTES DE DESPACHO</span><br />
                  <span className="fs-6 fw-bold">ESTE MES</span><br />
                </>
              }

              chart={
                <CChartLine
                  className="mt-3 mx-3"
                  style={{ height: '70px' }}
                  data={0}
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
          <CCol sm={6} lg={3}>
            <CWidgetStatsA
              className="mb-4"
              color="danger"
              value={
                <>
                  {STPROC_DESPACHO + " " + STATS_UNIDAD + " "}{'  '}
                </>
              }
              title={
                <>
                  <span className="fs-6 fw-bold">PROCESO DE DESPACHO</span><br />
                  <span className="fs-6 fw-bold">{moment().format("YYYY D, MMMM")}</span><br />
                </>
              }

              chart={
                <CChartLine
                  className="mt-3 mx-3"
                  style={{ height: '70px' }}
                  data={0}
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


      </div>
      {/*  CARR GUIAS RETIRADAS */}
      <div className='row g-4 g-xl-10 mb-3'>

        <div className='col-xl-4 mb-xl-10'>
          <div className="card card-flush h-xl-100">
            <div className="card-body mt-n20">

              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-2">GUIAS RETIRADAS</h5>
                  <span id='CARD_GT_TOTAL' className="fs-1 fw-bold text-gray-900 me-2 lh-1 ls-n2"></span><br />
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className={CAR_GT_PORCENTAJE > 0 ? "text-success mr-2 fw-bold" : "text-danger mr-2 fw-bold"}>
                      <CIcon icon={CAR_GT_PORCENTAJE > 0 ? cilArrowTop : cilArrowBottom} />
                      {parseFloat(CAR_GT_PORCENTAJE).toFixed(2)}%
                    </span>
                    <span className="text-nowrap fs-5"> Del mes pasado</span>
                  </p>
                </div>
                <div className="col-auto">
                  <i className="bi bi-truck fs-1"></i>
                </div>
              </div>

              <div className="row mt-3">
                <div className="card-body">

                  <div className="d-flex flex-stack">
                    <div className="col-9  small fw-bold me-2 text-danger">RETIRADAS NO INGRESADAS !</div>
                    <div className="col-2 text-gray-700 fw-semibold fs-6 text-end">
                      <span id='CARD_GT_RETIRADAS_NO_INGRESADAS' className="text-gray-900 fw-semibold fs-6 text-danger"></span>
                    </div>
                  </div>

                  <hr className="my-1 border-dashed" />


                  <div className="d-flex flex-stack">
                    <div className="col-9 small text-medium-emphasis fw-bold me-2">RETIRADAS DEL MES ANTERIOR</div>
                    <div className="col-2 text-gray-700 fw-semibold fs-6 text-end">
                      <span id='CARD_GT_RETIRADAS_MES_ANT' className="text-gray-900 fw-semibold fs-6"></span>
                    </div>
                  </div>
                  <hr className="my-1 border-dashed" />



                  <div className="d-flex flex-stack">
                    <div className="col-8 small text-medium-emphasis fw-bold me-2">RETIRADAS ESTE MES</div>
                    <div className="col-3 text-gray-700 fw-semibold fs-6 text-end">
                      <span id='CARD_GT_RETIRADAS_ESTE_MES' className="text-gray-900 fw-semibold fs-6"></span>
                    </div>
                  </div>
                  <hr className="my-1 border-dashed" />

                  <div className="d-flex flex-stack">
                    <div className="col-9 small text-medium-emphasis fw-bold me-2">COMPRADAS</div>
                    <div className="col-2 text-gray-700 fw-semibold fs-6 text-end">
                      <span id='CARD_GT_COMPRADAS' className="text-gray-900 fw-semibold fs-6"></span>
                    </div>
                  </div>
                  <hr className="my-1 border-dashed" />

                  <div className="d-flex flex-stack">
                    <div className="col-9 small text-medium-emphasis fw-bold me-2">POR RETIRAR TOTAL</div>
                    <div className="col-2 text-gray-700 fw-semibold fs-6 text-end">
                      <span id='CARD_GT_POR_RETIRAR' className="text-gray-900 fw-bold fs-6 text-success"></span>
                    </div>
                  </div>

                  <hr className="my-1 border-dashed" />

                  <div className="d-flex flex-stack">
                    <div className="col-9 small text-medium-emphasis fw-bold me-2">POR RETIRAR CEMENTO</div>
                    <div className="col-2 text-gray-700 fw-semibold fs-6 text-end">
                      <span id='CARD_GT_POR_RETIRAR_CEMENTO' className="text-gray-900 fw-bold fs-6 "></span>
                    </div>
                  </div>

                  <hr className="my-1 border-dashed" />

                  <div className="d-flex flex-stack">
                    <div className="col-9 small text-medium-emphasis fw-bold me-2">POR RETIRAR OTROS</div>
                    <div className="col-2 text-gray-700 fw-semibold fs-6 text-end">
                      <span id='CARD_GT_POR_RETIRAR_OTROS' className="text-gray-900 fw-bold fs-6 "></span>
                    </div>
                  </div>

                  <hr className="my-1 border-dashed" />


                  {/* <div className="d-flex flex-stack">
                  <div className="col-6 text-gray-700 fw-semibold fs-6 me-2">RETIRADA SGTE MES</div>
                  <div className="col-5 text-gray-700 fw-semibold fs-6 text-end">
                    <span className="text-gray-900 fw-bolder fs-6">0</span>
                  </div>
                </div> */}
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className='col-xl-8 mb-5 mb-xl-10'>

          <div className='row g-xl-10'>

            <div className="col-xl-6 col-sm-12">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">CHOFER MAS RETIROS</h5>
                      <span id='CARD_CHOFER_TOTAL' className="h2 font-weight-bold mb-0"></span>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-person-vcard fs-1"></i>
                    </div>
                  </div>

                  <p className="mb-0 fw-bold">Cemento Holcim Fuerte Tipo GU 50Kg</p>

                  <div className="d-flex flex-stack">
                    <div className="col-9 small text-medium-emphasis fw-bold me-2">SAC</div>
                    <div className="col-2 text-gray-700 fw-semibold fs-6 text-end">
                      <span id='CARD_CHOFER_SACOS' className="text-gray-900 fw-semibold fs-6">0</span>
                    </div>
                  </div>
                  <div className="d-flex flex-stack">
                    <div className="col-9 small text-medium-emphasis fw-bold me-2">GUIAS</div>
                    <div className="col-2 text-gray-700 fw-semibold fs-6 text-end">
                      <span id='CARD_CHOFER_PR_GUIAS' className="text-gray-900 fw-semibold fs-6">0</span>
                    </div>
                  </div>
                  <hr className="my-1 border-dashed" />

                  <p className="mb-0 text-muted text-sm">
                    <span id='CARD_CHOFER_NOMBRE' className="text-nowrap fw-bold">CHOFER 2 </span>
                    <span id='CARD_CHOFER_PLACA' className="text-nowrap">(GBO-7758)</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-sm-12">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">RECORD DIARIO</h5>
                      <span id='CD_RECORD_TOTAL' className="h2 font-weight-bold mb-0"></span>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-calendar2-week fs-1"></i>

                    </div>
                  </div>
                  <p id='CD_RECORD_DIA_TOTAL' className="mb-0 fw-bold"></p>

                  <p className="mb-0 fw-bold mt-2">Cemento Holcim Fuerte Tipo GU 50Kg</p>

                  <div className="d-flex flex-stack">
                    <div className="col-9 small text-medium-emphasis fw-bold me-2">GENERAL {CAR_DR_F_GEN}</div>
                    <div className="col-2 text-gray-700 fw-semibold fs-6 text-end">
                      <span id='CARD_DIAR_GENERAL' className="text-gray-900 fw-semibold fs-6">0</span>
                    </div>
                  </div>
                  <div className="d-flex flex-stack">
                    <div className="col-9 small text-medium-emphasis fw-bold me-2">MES {CAR_DR_F_MES}</div>
                    <div className="col-2 text-gray-700 fw-semibold fs-6 text-end">
                      <span id='CARD_DIAR_MES' className="text-gray-900 fw-semibold fs-6">0</span>
                    </div>
                  </div>


                </div>
              </div>
            </div>

          </div>

          <div className='row mt-4'>

            <div className="col-xl-6 col-sm-12">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">PROYECCION</h5>
                      <span id='CD_RECORD_PROYECCION' className="h2 font-weight-bold mb-0">0</span>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-calendar2-week fs-3"></i>
                    </div>
                  </div>
                  <div id='chartdiv_proyeccion_g' style={{ height: 110, width: "100%" }}></div>

                </div>
              </div>
            </div>

            <div className="col-6 d-none">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">GUIA EMITIDAS ESTE MES</h5>
                      <span className="h2 font-weight-bold mb-0">180</span>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-file-earmark-text-fill fs-3"></i>

                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-danger mr-2"><i className="fas fa-arrow-down"></i> 3.48%</span>
                    <span className="text-nowrap">Since last week</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <div className='row'>

        {/* CARTTILLA PRODUCTO */}

        <div className='col-xl-3 col-sm-12'>
          <CCard className="mb-4">
            <CCardBody>
              <div className='col-lg-12 col-sm-12'>
                <label className="required fs-6 fw-bold mb-2">Producto</label>
                {/* <input defaultValue={moment("20231001").format("YYYY-MM-DD")} id='AD_FECHA_INI' type="date" className="form-control form-control-solid ps-12 flatpickr-input active" /> */}
                <select onChange={CAMBIAR_MES} id='SEL_PRODUCTOS' className='form-select'>
                </select>
              </div>
              <div className='col-lg-12 col-sm-6'>
                <label className="required fs-6 fw-bold mb-2">Tipo</label>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="radio" name='ra' role="switch"
                    id="check_guia"
                    onChange={CAMBIAR_MES} />
                  <label className="form-check-label fw-bold">Por guías</label>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="radio" name='ra' role="switch"
                    id="check_producto" defaultChecked={TIPO_ESTADO}
                    onChange={CAMBIAR_MES} />
                  <label className="form-check-label fw-bold" >Por cantidad</label>
                </div>
              </div>
              <hr className="my-1 border-dashed" />

              <div className='col-12 mt-3 mb-3'>

                <h6 className='card-title text-uppercase text-muted mb-2'>COMPRADO EN EL MES</h6>
                <h6 className="fs-4 fw-bold text-gray-900 me-2 lh-1 ls-n2">
                  <span id='GR_CARD_1_TOTAL_MES_COMPRADO'>0</span>
                  <span className='text-muted fs-6'>
                    {GR_CARD_1_UNIDAD}
                  </span>
                </h6>
                <hr className="my-1 border-dashed" />

                <h6 className='card-title text-uppercase text-muted mb-2'>Retirado en el mes</h6>
                <h6 className="fs-4 fw-bold text-gray-900 me-2 lh-1 ls-n2">
                  <span id='GR_CARD_1_TOTAL_MES'>0</span>
                  <span className='text-muted fs-6'>
                    {GR_CARD_1_UNIDAD}
                  </span>
                </h6>

                <hr className="my-1 border-dashed" />

                <h6 className='card-title text-uppercase text-muted mb-2'>RETIRADO DEL MES ANTERIOR</h6>
                <h6 className="fs-4 fw-bold text-gray-900 me-2 lh-1 ls-n2">
                  <span id='GR_CARD_1_TOTAL_MES_COMPRADO_MES_ANT'>0</span>
                  <span className='text-muted fs-6'>
                    {GR_CARD_1_UNIDAD}
                  </span>
                </h6>

                <hr className="my-1 border-dashed" />

                <h6 className='card-title text-uppercase text-muted mb-2'>TOTAL RETIRADO</h6>
                <h6 className="fs-4 fw-bold text-gray-900 me-2 lh-1 ls-n2">
                  <span id='GR_CARD_1_TOTAL_RETIRADO'>0</span>
                  <span className='text-muted fs-6'>
                    {GR_CARD_1_UNIDAD}
                  </span>
                </h6>

                <hr className="my-1 border-dashed" />

                <h6 className='card-title text-uppercase text-muted mb-2'>POR RETIRAR</h6>
                <h6 className="fs-4 fw-bold text-gray-900 me-2 lh-1 ls-n2">
                  <span id='GR_CARD_1_POR_RETIRAR'>0</span>
                  <span className='text-muted fs-6'>
                    {GR_CARD_1_UNIDAD}
                  </span>
                </h6>

                <div className="clearfix">
                  <h6>Completado</h6>
                  <div className="float-start">
                    <strong>{GR_CARD_1_PORCENTAJE}%
                    </strong>
                  </div>
                  <div className="float-end">
                    <span className={GR_CARD_1_PORCENTAJE_MES_A > 0 ? "fs-6 fw-bold text-success" : "fs-6 fw-bold text-danger"}>
                      {parseFloat(GR_CARD_1_PORCENTAJE_MES_A).toFixed(2)}%<CIcon icon={GR_CARD_1_PORCENTAJE_MES_A > 0 ? cilArrowTop : cilArrowBottom} />
                    </span>
                  </div>
                </div>
                <div className="progress progress-thin" role="progressbar" aria-valuenow="10"
                  aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar bg-success" style={{ width: GR_CARD_1_PORCENTAJE + '%' }}>
                  </div>
                </div>
              </div>

              <hr className="my-1 border-dashed" />

              <div className='col-12 mt-3'>
                <h6 className='card-title text-uppercase text-muted mb-2'>Promedio de retiros</h6>
                <h6 className="fs-4 fw-bold text-gray-900 me-2 lh-1 ls-n2">
                  <span id='GR_CARD_1_PROMEDIO'>
                    {parseFloat((isNaN(PROMEDIO_DESPACHO) ? 0 : PROMEDIO_DESPACHO)).toFixed(0)}
                  </span>
                  <span className='text-muted fs-6'>
                    {' '}{GR_CARD_1_UNIDAD}
                  </span>
                </h6>

              </div>

              <hr className="my-1 border-dashed" />

              <div className='col-12 mt-3'>
                <h6 className='card-title text-uppercase text-muted mb-2'>Proyeccion</h6>
                <h6 className="fs-4 fw-bold text-gray-900 me-2 lh-1 ls-n2">
                  <span id='GR_CARD_1_PROMEDIO'>
                    {parseFloat((isNaN(PORYECCION_DESPACHO) ? 0 : PORYECCION_DESPACHO)).toFixed(0)}
                  </span>
                  <span className='text-muted fs-6'>
                    {' '}{GR_CARD_1_UNIDAD}
                  </span>
                </h6>
                <div id='chartdiv_proyeccion' style={{ height: 142 }}></div>

              </div>


            </CCardBody>
          </CCard>

        </div>

        <div className='col-xl-9 col-sm-12'>
          <CCard className="mb-4">
            <CCardBody>

              <CRow>
                <CCol sm={7}>
                  <h5 id="traffic" className="card-title mb-0 mt-1">
                    {cantidad_cemento_mes_pr}
                  </h5>
                  <div className="small text-medium-emphasis fw-bold">{moment(FECHA_INICIO).format("MMMM DD, YYYY")} - {moment(FECHA_FIN).format("MMMM DD, YYYY")}</div>
                </CCol>
                <CCol sm={5} className="d-none d-md-block mt-1">
                  <div className="btn-group float-end" role="group" aria-label="Basic example">
                    <button onClick={() => {
                      POR_DIA(DATOS_GR_DIA);
                    }} type="button" className="btn btn-light">Dia</button>
                    <button onClick={() => {
                      POR_MES(DATOS_GR_MES);
                    }} type="button" className="btn btn-light">Mes</button>
                    <button onClick={() => {
                      POR_ANIO(DATOS_COMPLETOS);
                    }} type="button" className="btn btn-light">Año</button>
                  </div>
                </CCol>
              </CRow>
              <div className='mt-5' id='GRAFICO_DIARIO' style={{ height: chartContainerHeight }}></div>

            </CCardBody>
            {/* <CCardFooter className="d-none">
              <CRow xs={{ cols: 3 }} md={{ cols: 3 }} className="text-center d-non">
                <CCol className="mb-sm-2 mb-0" >
                  <div className="fs-7">PROMEDIO DESPACHO</div>
                  <strong className='fs-5'>
                    {parseFloat((isNaN(PROMEDIO_DESPACHO) ? 0 : PROMEDIO_DESPACHO)).toFixed(0)} {STATS_UNIDAD}
                  </strong>
                  <CProgress thin className="mt-2" color={"info"} value={2222} />
                </CCol>
                <CCol className="mb-sm-2 mb-0" >
                  <div className="fs-7">PROYECCIÓN DESPACHO</div>
                  <strong className='fs-5'>
                    {parseFloat((isNaN(PORYECCION_DESPACHO) ? 0 : PORYECCION_DESPACHO)).toFixed(0)} {STATS_UNIDAD}
                  </strong>
                  <CProgress thin className="mt-2" color={"danger"} value={2222} />
                </CCol>
              </CRow>
            </CCardFooter> */}
          </CCard>
        </div>

      </div>


      {/* <WidgetsBrand withCharts /> */}

      {/* <CRow>
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
      </CRow> */}
    </>
  )
}

export default Dashboard
