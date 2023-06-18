<template>
    <section id="dashboard-analytics">
        <b-row class="match-height">
            <b-col lg="9" md="12">
                <AnalyticsStatistics />
            </b-col>
            <b-col lg="3" md="12" sm="6">
                <statistic-card-with-area-chart
                    v-if="data.subscribersGained"
                    icon="UsersIcon"
                    statistic-title="تعداد مشتریان"
                    color="info"
                />
            </b-col>
        </b-row>

        <b-row class="match-height">
            <b-col lg="12">
                <analytics-avg-sessions :data="data.avgSessions" />
            </b-col>
        </b-row>

        <b-row class="match-height">
            <b-col lg="12" md="12">
                <DashboardAccess />
            </b-col>
        </b-row>

        <b-row class="match-height">
            <b-col lg="12">
                <BestCustomers />
            </b-col>
        </b-row>
    </section>
</template>

<script>
import { BRow, BCol } from "bootstrap-vue";

import StatisticCardWithAreaChart from "@core/components/statistics-cards/StatisticCardWithAreaChart.vue";

import BestCustomers from "./BestCustomers.vue";
import AnalysticsPieChart from "./AnalysticsPieChart.vue";
import DashboardAccess from "../ecommerce/DashboardAccess.vue";
import AnalyticsStatistics from "./AnalyticsStatistics.vue";
import { kFormatter } from "@core/utils/filter";
import InvoiceList from "@/views/apps/invoice/invoice-list/InvoiceList.vue";
import AnalyticsCongratulation from "./AnalyticsCongratulation.vue";
import AnalyticsAvgSessions from "./AnalyticsAvgSessions.vue";
import AnalyticsSupportTracker from "./AnalyticsSupportTracker.vue";
import AnalyticsTimeline from "./AnalyticsTimeline.vue";
import AnalyticsSalesRadarChart from "./AnalyticsSalesRadarChart.vue";
import AnalyticsAppDesign from "./AnalyticsAppDesign.vue";
import axios from "axios";
import _ from "lodash";

export default {
    components: {
        BestCustomers,
        AnalysticsPieChart,
        DashboardAccess,
        AnalyticsStatistics,
        BRow,
        BCol,
        AnalyticsCongratulation,
        AnalyticsAvgSessions,
        StatisticCardWithAreaChart,
        AnalyticsSupportTracker,
        AnalyticsTimeline,
        AnalyticsSalesRadarChart,
        AnalyticsAppDesign,
        InvoiceList
    },
    data() {
        return {
            data: {}
        };
    },
    created() {
        // data
        this.$http.get("/analytics/data").then(response => {
            this.data = response.data;
        });
    },

    methods: {
        kFormatter
    }
};
</script>
