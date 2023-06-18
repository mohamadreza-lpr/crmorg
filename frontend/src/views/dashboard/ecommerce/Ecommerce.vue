<template>
    <section id="dashboard-ecommerce">
        <div>
            <b-row class="match-height">
                <b-col xl="12" md="12">
                    <ecommerce-statistics />
                </b-col>
            </b-row>

            <b-row class="match-height">
                <b-col lg="12">
                    <ecommerce-revenue-report />
                </b-col>
            </b-row>

            <b-row class="match-height">
                <b-col lg="12" md="12">
                    <dashboard-pie-chart />
                </b-col>
            </b-row>

            <b-row class="match-height">
                <b-col lg="6" md="6">
                    <ecommerce-goal-overview />
                </b-col>
            </b-row>

            <b-row class="match-height">
                <b-col lg="12" md="12">
                    <DashboardAccess />
                </b-col>
            </b-row>
        </div>
    </section>
</template>

<script>
import { BRow, BCol } from "bootstrap-vue";
import DashboardAccess from "./DashboardAccess.vue";
import DashboardPieChart from "./DashboardPieChart.vue";
import EcommerceStatistics from "./EcommerceStatistics.vue";
import EcommerceGoalOverview from "./EcommerceGoalOverview.vue";
import EcommerceRevenueReport from "./EcommerceRevenueReport.vue";

export default {
    components: {
        BRow,
        BCol,
        DashboardAccess,
        DashboardPieChart,
        EcommerceStatistics,
        EcommerceGoalOverview,
        EcommerceRevenueReport
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/dashboard-ecommerce.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
</style>
