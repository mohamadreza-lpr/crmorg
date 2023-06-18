<template>
  <div>
    <b-row>
      <b-col lg="12" md="12" xl="12" sm="12" xs="12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-50 mb-sm-0">
              ارزش ریالی مشتری در بازه های مختلف تکرار خرید
            </h4>
          </div>
          <div class="card-body">
            <VueApexCharts
              type="bar"
              height="350"
              :options="chartOptions"
              :series="series"
            />
          </div>
        </div>
      </b-col>
      <b-col lg="12" md="12" xl="12" sm="12" xs="12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-50 mb-sm-0">
              متوسط ارزش فاکتور به تفکیک بازه های خرید
            </h4>
          </div>
          <div class="card-body">
            <VueApexCharts
              type="bar"
              height="350"
              :options="chartOptions1"
              :series="series1"
            />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import { BDropdown, BDropdownItem, BRow, BCol } from "bootstrap-vue";

export default {
  components: {
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: "ارزش ریالی مشتری ",
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
        },
      ],
      chartOptions: {
        colors: ["#31326f"],
        chart: {
          height: 350,
          type: "bar",
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#000"],
          },
        },

        xaxis: {
          categories: [
            "01/1400",
            "02/1400",
            "03/1400",
            "04/1400",
            "05/1400",
            "06/1400",
            "07/1400",
            "08/1400",
            "09/1400",
            "10/1400",
            "11/1400",
            "12/1400",
          ],
          position: "top",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
      series1: [
        {
          name: "متوسط ارزش فاکتور",
          data: [4.3, 1.1, 7.2, 8.1, 2.0, 3.0, 1.5, 2.3, 1.9, 11.8, 3.5, 1.2],
        },
      ],
      chartOptions1: {
        colors: ["#ffc93c"],
        chart: {
          height: 350,
          type: "bar",
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#000"],
          },
        },

        xaxis: {
          categories: [
            "01/1400",
            "02/1400",
            "03/1400",
            "04/1400",
            "05/1400",
            "06/1400",
            "07/1400",
            "08/1400",
            "09/1400",
            "10/1400",
            "11/1400",
            "12/1400",
          ],
          position: "top",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    };
  },
};
</script>