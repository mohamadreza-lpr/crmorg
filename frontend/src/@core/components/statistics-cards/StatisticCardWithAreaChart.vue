<template>
    <b-card no-body>
        <b-card-body class="pb-0">
            <b-avatar class="mb-1" :variant="`light-${color}`" size="45">
                <feather-icon size="21" :icon="icon" />
            </b-avatar>
            <div class="truncate">
                <h2 class="mb-25 font-weight-bolder">
                    {{ statistic }}
                </h2>
                <span>{{ statisticTitle }}</span>
            </div>
        </b-card-body>

        <vue-apex-charts
            type="area"
            height="100"
            width="100%"
            :options="chartOptionsComputed"
            :series="chartData"
        />
    </b-card>
</template>

<script>
import { BCard, BCardBody, BAvatar } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";
import { areaChartOptions } from "./chartOptions";
import axios from "axios";

export default {
    components: {
        VueApexCharts,
        BCard,
        BCardBody,
        BAvatar,
    },
    data() {
        return {
            statistic: 0,
            chartData: [],
        };
    },
    props: {
        icon: {
            type: String,
            required: true,
        },
        statisticTitle: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "primary",
        },
        chartOptions: {
            type: Object,
            default: null,
        },
    },
    methods: {
        getInfo() {
            const params = {
                date_type: "created_at",
                date: "last_year",
                transform: "chart",
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/user`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.statistic = _.sum(
                        _.map(response.data, (item) => {
                            return item.length;
                        })
                    );

                    const chartData = _.map(response.data, (item, index) => {
                        return item.length;
                    });

                    this.chartData = [
                        {
                            data: chartData,
                            name: "مشتریان",
                        },
                    ];
                })
                .catch((error) => {});
        },
    },
    created() {
        this.getInfo();
    },
    computed: {
        chartOptionsComputed() {
            if (this.chartOptions === null) {
                const options = JSON.parse(JSON.stringify(areaChartOptions));
                options.theme.monochrome.color = $themeColors[this.color];
                return options;
            }
            return this.chartOptions;
        },
    },
};
</script>
