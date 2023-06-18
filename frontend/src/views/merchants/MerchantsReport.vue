<template>
  <div>
    <template>
      <b-card no-body>
        <!-- title and dropdown -->
        <b-card-header class="pb-0">
          <b-card-title>گزارشات کارکرد شعب</b-card-title>
          <b-button variant="primary">
            <feather-icon class="mr-1" icon="RefreshCwIcon" size="15" />
            به روز رسانی
          </b-button>
        </b-card-header>
        <!--/ title and dropdown -->

        <b-card-body class="mt-2">
            <b-row class="form-group d-flex justify-content-between">
              <b-col
                v-for="item in statisticsItems"
                :key="item.icon"
                xl="4"
                sm="4"
                cols='12'
                :class="item.customClass"
              >
                <b-media no-body>
                  <b-media-aside class="mr-2">
                    <b-avatar size="48" :variant="item.color">
                      <feather-icon size="24" :icon="item.icon" />
                    </b-avatar>
                  </b-media-aside>
                  <b-media-body class="my-auto">
                    <h4 class="font-weight-bolder mb-0">
                      {{ item.title }}
                    </h4>
                    <b-card-text class="font-small-3 mb-0">
                      {{ item.subtitle }}
                    </b-card-text>
                  </b-media-body>
                </b-media>
              </b-col>
            </b-row>
          <app-echart-bar class="w-100 mt-4" :option-data="option" />
        </b-card-body>
      </b-card>
    </template>
  </div>
</template>
    </div>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BDropdown,
  BDropdownItem,
  BCardBody,
  BRow,
  BCol,
  BCardText,
  BButton,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
} from "bootstrap-vue";

import AppEchartBar from "@core/components/charts/echart/AppEchartBar.vue";

export default {
  components: {
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    AppEchartBar,
    BCard,
    BCardHeader,
    BButton,
    BCardTitle,
    BDropdown,
    BDropdownItem,
    BCardText,
    BCardBody,
    BRow,
    BCol,
  },
  data() {
    return {
              statisticsItems: [
        {
          icon: "CheckCircleIcon",
          color: "light-primary",
          title: "11",
          subtitle: "تعداد شعبه فعال",
          customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "UsersIcon",
          color: "light-success",
          title: "8759",
          subtitle: "تعداد مشتریان شعبه",
          customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "DollarSignIcon",
          color: "light-warning",
          title: "1200000",
          subtitle: "کل فروش شعبه",
          customClass: "mb-2 mb-sm-0",
        },
      ],
      option: {
        xAxis: [
          {
            type: "category",
            data: [
              "7/12",
              "8/12",
              "9/12",
              "10/12",
              "11/12",
              "12/12",
              "13/12",
              "14/12",
              "15/12",
              "16/12",
              "17/12",
              "18/12",
              "19/12",
              "20/12",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: { show: false },
          },
        ],
        grid: {
          left: "40px",
          right: "30px",
          bottom: "30px",
        },
        series: [
            {
            name: "حجم فروش",
            type: "bar",
            stack: "advertising",
            data: [
              220, 232, 201, 334, 290, 230, 220, 360, 80, 130, 310, 460, 110,
              80,
            ],
            barMaxWidth: "20%",
            barMinWidth: "10px",
            itemStyle: {
                color:'#98acf8'
            },
            },
          {
            name: "تعداد فروش",
            type: "bar",
            stack: "advertising",
            data: [
              220, 232, 201, 334, 290, 230, 220, 360, 80, 130, 310, 460, 110,
              80,
            ],
            barMaxWidth: "20%",
            barMinWidth: "10px",
            itemStyle: {
                color:'#b088f9'
            },
          },
          {
            name: "تعداد مشتری",
            type: "bar",
            stack: "advertising",
            data: [
              220, 232, 201, 234, 190, 130, 210, 163, 105, 120, 220, 102, 150,
              130,
            ],
            barMaxWidth: "20%",
            barMinWidth: "10px",
            itemStyle: {
                color:'#da9ff9',
                barBorderRadius: [10, 10, 0, 0],

            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>