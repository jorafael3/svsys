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

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import * as des from '../../funciones/dashboard/dashboard'
import moment from 'moment';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";



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



  function Cargar_Stats(param) {


    des.Cargar_Stats(param, function (x) {

      let SACOS = x["SACOS"];
      let CHOFER = x["CHOFER"];
      let GUIAS_DESP = x["GUIAS_DESPACHADAS"];
      STATS_SACOS(SACOS);
      STATS_CHOFER(CHOFER);
      GUIAS_DESPACHADAS(GUIAS_DESP);
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

  function GUIAS_DESPACHADAS(datosPorDia) {
    let PORDIA = datosPorDia["POR_DIA"]["DATOS"];
    let PORDIA_MESANT = datosPorDia["POR_DIA_MES_ANT"]["DATOS"];


    let ultimodia_mes_actual = moment(PORDIA[0]["FECHA"]).endOf("month").format("DD");
    console.log('primerdia_mes_actual: ', ultimodia_mes_actual);
    let con = 1
    while (con <= parseInt(ultimodia_mes_actual)) {
      // console.log('con: ', con);
      let dia = PORDIA.filter(item => parseInt(moment(item.FECHA).format("DD")) == con);
      console.log('dia: ', dia);
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
    PORDIA.sort((a, b) => a.FECHA - b.FECHA);
    console.log('PORDIA: ', PORDIA);


    // 
    GRAFICO_DIARIO(PORDIA.concat(PORDIA_MESANT));



  }

  function GRAFICO_DIARIO(datos) {

    // am4core.ready(function () {
    //   // Themes begin
    //   am4core.useTheme(am4themes_animated);
    //   // Themes end

    //   // Create chart instance
    //   var chart = am4core.create("GRAFICO_DIARIO", am4charts.XYChart);
    //   //chart.language.locale = am4lang_es_ES;
    //   chart.paddingRight = 20;
    //   chart.dateFormatter.dateFormat = "yyyy-MM-dd";

    //   // Add data
    //   chart.data = datos;
    //   /*var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    //   categoryAxis.dataFields.category = "texto";
    //   categoryAxis.renderer.minGridDistance = 50;
    //   categoryAxis.renderer.grid.template.location = 0.5;
    //   categoryAxis.startLocation = 0.5;
    //   categoryAxis.endLocation = 0.5;
    //   categoryAxis.label = "asdasd";*/
    //   var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    //   dateAxis.renderer.grid.template.location = 0.5;
    //   dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    //   dateAxis.renderer.minGridDistance = 80;
    //   dateAxis.tooltipDateFormat = "MMM dd, yyyy";


    //   // dateAxis.dateFormats.setKey("month", "MMM");
    //   // dateAxis.periodChangeDateFormats.setKey("month", "MMM");
    //   // Create value axis
    //   var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //   valueAxis.baseValue = 0;

    //   // Create series
    //   var series = chart.series.push(new am4charts.LineSeries());
    //   series.dataFields.valueY = "cantidad";
    //   series.dataFields.dateX = "FECHA";
    //   series.strokeWidth = 4;
    //   series.tensionX = 0.77;
    //   series.name = "Prediccion";
    //   series.tooltipText = `[bold]DESPACHADO: {cantidad}`;
    //   series.tooltip.pointerOrientation = "vertical";
    //   series.tooltip.getFillFromObject = false;
    //   series.tooltip.background.fill = am4core.color("#ffffff");
    //   series.tooltip.label.fill = am4core.color("#000000");
    //   series.legendSettings.itemValueText = "{valueY}";
    //   series.stroke = am4core.color("#4680ff");
    //   var bullet = series.bullets.push(new am4charts.CircleBullet());
    //   bullet.circle.fill = am4core.color("#4680ff");

    //   var series2 = chart.series.push(new am4charts.LineSeries());
    //   series2.dataFields.valueY = "CANT_MES_ANT";
    //   series2.dataFields.dateX = "FECHA";
    //   series2.strokeWidth = 4;
    //   series2.tensionX = 0.77;
    //   series2.name = "Despacho Mes Anterior";
    //   series2.tooltipText = `
    //               Mes Anterior
    //               ---------------------------------------
    //               [bold]DESPACHADO: {CANT_MES_ANT}`;
    //   series2.tooltip.pointerOrientation = "vertical";
    //   series2.tooltip.getFillFromObject = false;
    //   series2.tooltip.background.fill = am4core.color("#ffffff");
    //   series2.tooltip.label.fill = am4core.color("#000000");
    //   series2.legendSettings.itemValueText = "{valueY}";
    //   series2.stroke = am4core.color("#22941E");
    //   var bullet = series2.bullets.push(new am4charts.CircleBullet());
    //   bullet.circle.fill = am4core.color("#22941E");
    //   // // bullet is added because we add tooltip to a bullet for it to change color


    //   var bullet = series.bullets.push(new am4charts.Bullet());
    //   bullet.tooltipText = "{valueY}";


    //   bullet.adapter.add("fill", function (fill, target) {
    //     if (target.dataItem.valueY < 0) {
    //       return am4core.color("#22941E");
    //     }
    //     return fill;
    //   })
    //   var range = valueAxis.createSeriesRange(series);
    //   range.value = 0;
    //   range.endValue = -1000;
    //   range.contents.stroke = am4core.color("#FF0000");
    //   range.contents.fill = range.contents.stroke;

    //   // Add scrollbar
    //   var scrollbarX = new am4charts.XYChartScrollbar();
    //   scrollbarX.series.push(series);
    //   // scrollbarX.series.push(series2);
    //   scrollbarX.background.fill = am4core.color("#4680ff");
    //   scrollbarX.background.fillOpacity = 0.2;
    //   scrollbarX.minHeight = 50;

    //   chart.scrollbarX = scrollbarX;

    //   chart.cursor = new am4charts.XYCursor();

    //   chart.legend = new am4charts.Legend();


    // }); // end am4core.ready()

    am4core.ready(function () {

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart
      var chart = am4core.create("GRAFICO_DIARIO", am4charts.XYChart);

      // var data = [];
      // var price1 = 1000, price2 = 1200;
      // var quantity = 30000;
      // for (var i = 0; i < 360; i++) {
      //   price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      //   data.push({ date1: new Date(2015, 0, i), price1: price1 });
      // }
      // for (var i = 0; i < 360; i++) {
      //   price2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      //   data.push({ date2: new Date(2017, 0, i), price2: price2 });
      // }

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
      series.tooltipText = "{valueY.value}";
      series.fill = am4core.color("#e59165");
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
      series2.tooltipText = "{valueY.value}";
      series2.fill = am4core.color("#dfcc64");
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

      valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
      dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
      dateAxis.renderer.grid.template.strokeOpacity = 0.07;
      valueAxis.renderer.grid.template.strokeOpacity = 0.07;

    }); // end am4core.ready()
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
    Cargar_Stats(param)
  }, []);


  return (
    <>
      {/* <WidgetsDropdown /> */}
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
          <div id='GRAFICO_DIARIO' style={{ height: 500 }}></div>

          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
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
