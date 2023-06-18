<template>
  <div>
    <div class="card">
        <div class="card-body">
        <div class="row">
        <div class="col-6">
            <h4 class="card-title mb-50 mb-sm-0">نرخ جذب شعبه</h4>
        </div>
        <div class="col-6 text-right">
            <b-dropdown
            text="7 روز گذشته"
            size="sm"
            class="budget-dropdown"
            variant="outline-primary"
            >
            <b-dropdown-item
                v-for="item in items"
                :key="item.index"
            >
                {{ item }}
            </b-dropdown-item>
            </b-dropdown>
        </div>
        </div>
        <VueApexCharts
            type='donut'
            :options='chartOptions'
            :series='series'
        />
        </div>
    </div>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import {BDropdown,BDropdownItem
} from 'bootstrap-vue'

export default {
  components: {
    BDropdown,
    BDropdownItem,
    VueApexCharts,
  },
  data() {
    return {
      items:['کل','7روز گذشته','یک ماه گذشته','یک سال گذشته','کل'],
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        labels: ['رستوران', 'فست فود', 'کافی شاپ', 'شهر کتاب', 'فروشگاه موبایل'],
        chart: {
          type: 'donut',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
      series1: [23, 11, 39, 11, 59],
      chartOptions1: {
        labels: ['رستوران', 'فست فود', 'کافی شاپ', 'شهر کتاب', 'فروشگاه موبایل'],
        chart: {
          type: 'donut',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    }
  },
}
</script>
