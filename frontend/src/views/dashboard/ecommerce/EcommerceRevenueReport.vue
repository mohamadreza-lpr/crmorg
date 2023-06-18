<template>
    <div>
        <b-card v-if="fulfilled" no-body class="card-revenue-budget">
            <b-row class="mx-0">
                <b-col md="12" class="revenue-report-wrapper">
                    <div
                        class="d-sm-flex justify-content-between align-items-center mb-3"
                    >
                        <h4 class="card-title mb-50 mb-sm-0">گزارش فروش</h4>
                        <v-select
                            label="text"
                            v-model="time"
                            :clearable="false"
                            class="report-date"
                            @input="getReports()"
                            :options="timeOptions"
                            :dir="$store.state.appConfig.isRTL ? 'ltr' : 'rtl'"
                        />
                    </div>
                    <vue-apex-charts
                        type="line"
                        height="250"
                        :options="salesBar.chartOptions"
                        :series="salesBar.series"
                    />
                </b-col>
            </b-row>
        </b-card>
        <div
            v-else
            class="d-flex flex-column justify-content-center align-items-center my-3"
        >
            <b-spinner label="درحال بارگذاری ..." />
            <span class="d-block mt-1"> در حال بارگذاری ... </span>
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import VueApexCharts from "vue-apexcharts";
import { BCard, BRow, BCol, BSpinner } from "bootstrap-vue";

export default {
    components: {
        BRow,
        BCol,
        BCard,
        vSelect,
        BSpinner,
        VueApexCharts,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            fulfilled: false,
            options: undefined,
            time: {
                value: "last_week",
                text: "7 روز گذشته",
            },
            timeOptions: [
                {
                    value: "last_week",
                    text: "7 روز گذشته",
                },
                {
                    value: "last_year",
                    text: "یک سال گذشته",
                },
                {
                    value: "last_month",
                    text: "یک ماه گذشته",
                },
                {
                    value: "year_beginning",
                    text: "از ابتدای سال",
                },
                {
                    value: "all",
                    text: "کل",
                },
            ],
            salesBar: {
                series: [],
                chartOptions: {
                    axisTicks: {
                        show: false,
                    },
                    grid: {
                        yaxis: {
                            lines: { show: false },
                        },
                    },
                    axisBorder: {
                        show: false,
                    },
                    legend: {
                        show: true,
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    chart: {
                        height: 350,
                        type: "line",
                        toolbar: { show: false },
                    },
                    stroke: {
                        width: [0, 4],
                    },
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: [1],
                    },
                    // labels: [
                    //     "04/01/2021",
                    //     "04/02/2021",
                    //     "04/03/2021",
                    //     "04/04/2021",
                    //     "04/05/2021",
                    //     "04/06/2021",
                    //     "04/07/2021",
                    //     "04/08/2021",
                    //     "04/09/2021",
                    //     "04/10/2021",
                    //     "04/11/2021"
                    // ],
                    // xaxis: {
                    //     show: false,
                    //     type: "datetime"
                    // },
                    xaxis: {
                        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                        categories: [
                            "05/08",
                            "06/08",
                            "07/08",
                            "08/08",
                            "09/08",
                            "10/08",
                            "05/08",
                        ],
                        labels: {
                            style: {
                                colors: "#6E6B7B",
                                fontSize: "0.86rem",
                                fontFamily: "Montserrat",
                            },
                        },
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                        },
                    },
                    tooltip: {
                        enabled: false,
                    },
                    yaxis: [
                        {
                            labels: {
                                style: {
                                    colors: "#6E6B7B",
                                    fontSize: "0.86rem",
                                    fontFamily: "Montserrat",
                                },
                            },
                        },
                        {
                            show: false,
                            showAlways: false,
                            title: {
                                text: "تعداد فروش",
                            },
                        },
                        {
                            show: false,
                            opposite: false,
                            title: {
                                text: "حجم فروش",
                            },
                        },
                    ],
                },
            },
        };
    },
    created() {
        this.getReports().then(() => {
            this.fulfilled = true;
        });
    },
    methods: {
        async getReports() {
            const params = {
                date: this.time.value,
                status: "sale",
            };
            return await axios
                .get(`${process.env.VUE_APP_URL}/statistics/bill`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.salesBar.series = [];
                    this.salesBar.series.push({
                        name: "تعداد فروش",
                        type: "column",
                        data: _.map(response.data, (item) => {
                            return _.sumBy(item, (_item) => {
                                return _item.total;
                            });
                        }),
                    });
                    this.salesBar.series.push({
                        name: "حجم فروش",
                        type: "line",
                        data: _.map(response.data, (item) => {
                            return item.length;
                        }),
                    });
                    const xaxis = {
                        xaxis: {
                            categories: _.map(response.data, (item, index) => {
                                return index;
                            }),
                        },
                    };
                    this.salesBar.chartOptions = xaxis;
                })
                .catch((error) => {});
        },
    },
};
</script>
<style lang="scss">
.apexcharts-yaxis {
    transform: translate(0, 0) !important;
}
.report-date {
    & #vs3__combobox {
        min-width: 150px !important;
    }
}
</style>
