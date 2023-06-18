<template>
  <div>
    <b-row>
      <b-col lg="12" md="12" xl="12" sm="12" xs="12">
        <SaleStatistics />
      </b-col>
      <b-col lg="12" md="12" xl="12" sm="12" xs="12">
        <SaleReport />
      </b-col>
      <b-col lg="12" md="12" xl="12" sm="12" xs="12">
        <SalePieChart />
      </b-col>
      <b-col lg="12" md="12" xl="12" sm="12" xs="12">
        <DashboardAccess />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { BRow, BCol } from "bootstrap-vue";
import DashboardAccess from '../ecommerce/DashboardAccess.vue'
import SalePieChart from "./SalePieChart";
import SaleStatistics from "./SaleStatistics";
import SaleReport from "./SaleReport";

export default {
  components: {
    BRow,
    BCol,
    SaleReport,
    DashboardAccess,
    SaleStatistics,
    SalePieChart,
  },
};
</script>