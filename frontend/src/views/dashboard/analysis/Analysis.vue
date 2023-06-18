<template>
  <div>
    <b-row>
      <b-col lg="12" md="12" xl="12" sm="12" xs="12">
          <AnalysisStatistics />
      </b-col>
      <b-col lg="12" md="12" xl="12" sm="12" xs="12">
          <AnalysisPieChart />
      </b-col>
      <b-col lg="12" md="12" xl="12" sm="12" xs="12">
          <AnalysisColoumnCharts />
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

import AnalysisPieChart from './AnalysisPieChart'
import AnalysisStatistics from './AnalysisStatistics'
import AnalysisColoumnCharts from './AnalysisColoumnCharts'


export default {
  components: {
    BRow,
    BCol,
    DashboardAccess,

    AnalysisColoumnCharts,
    AnalysisStatistics,
    AnalysisPieChart,

  },
};
</script>