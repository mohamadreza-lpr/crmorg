<template>
  <div>
    <div class="row">
			<div class="col-md-6">
        <div class="card">
          <div class="card-body">
          <div class="row">
            <div class="col-6">
              <h4 class="card-title mb-50 mb-sm-0">وضعیت مشتریان در بازه های مختلف(تکرار خرید)</h4>
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
			<div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <h4 class="card-title mb-50 mb-sm-0">سهم ریالی فروش به تفکیک بازه های تکرار خرید</h4>
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
              :options='chartOptions1'
              :series='series1'
            />
          </div>
        </div>
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
      series: [11, 36, 44],
      chartOptions: {
        colors: ['#617be3', '#21bf73', '#0f3460', '#f40552', '#8566aa'],
        labels: [' متن آزمایشی 1 ', ' متن آزمایشی 2 ', ' متن آزمایشی 3  '],
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
      series1: [45, 11, 20],
      chartOptions1: {
        colors: ['#617be3', '#21bf73', '#0f3460', '#f40552', '#8566aa'],
        labels: [' متن آزمایشی 1', ' متن آزمایشی 2', ' متن آزمایشی 3 '],
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
