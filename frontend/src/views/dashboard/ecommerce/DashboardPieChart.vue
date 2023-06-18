<template>
    <div>
        <div v-if="fulfilled" class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <h4 class="card-title mb-50 mb-sm-0">
                                    تعداد فروش بر اساس شعبه
                                </h4>
                            </div>
                            <div class="col-6 text-right">
                                <v-select
                                    dir="rtl"
                                    label="text"
                                    v-model="sell"
                                    :clearable="false"
                                    :options="timeOptions"
                                    @input="getBranchesSellNum()"
                                />
                            </div>
                        </div>
                        <VueApexCharts
                            type="donut"
                            :options="chartOptions"
                            :series="series"
                        />
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <h4 class="card-title mb-50 mb-sm-0">
                                    حجم فروش بر اساس شعبه
                                </h4>
                            </div>
                            <div class="col-6 text-right">
                                <v-select
                                    dir="rtl"
                                    label="text"
                                    v-model="sell1"
                                    :clearable="false"
                                    :options="timeOptions1"
                                    @input="getBranchesSellVolume()"
                                />
                            </div>
                        </div>
                        <VueApexCharts
                            type="donut"
                            :options="chartOptions1"
                            :series="series1"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="this.nullData">
            <div class="card">
                <hr />
                <h4 class="text-center text-secondary">
                    موردی برای نمایش نمودار های فروش یافت نشد
                </h4>
                <hr />
            </div>
        </div>
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
import { BSpinner } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";

export default {
    components: {
        VueApexCharts,
        BSpinner,
        vSelect
    },
    data() {
        return {
            nullData: false,
            sell: {
                value: "last_week",
                text: "7 روز گذشته"
            },
            timeOptions: [
                {
                    value: "last_week",
                    text: "7 روز گذشته"
                },
                {
                    value: "last_year",
                    text: "یک سال گذشته"
                },
                {
                    value: "last_month",
                    text: "یک ماه گذشته"
                },
                {
                    value: "year_beginning",
                    text: "از ابتدای سال"
                },
                {
                    value: "all",
                    text: "کل"
                }
            ],
            sell1: {
                value: "last_week",
                text: "7 روز گذشته"
            },
            timeOptions1: [
                {
                    value: "last_week",
                    text: "7 روز گذشته"
                },
                {
                    value: "last_year",
                    text: "یک سال گذشته"
                },
                {
                    value: "last_month",
                    text: "یک ماه گذشته"
                },
                {
                    value: "year_beginning",
                    text: "از ابتدای سال"
                },
                {
                    value: "all",
                    text: "کل"
                }
            ],
            series: [],
            chartOptions: {
                chart: {
                    type: "donut"
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: "bottom"
                            }
                        }
                    }
                ]
            },
            series1: [],
            chartOptions1: {
                chart: {
                    type: "donut"
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: "bottom"
                            }
                        }
                    }
                ]
            }
        };
    },
    mounted() {
        this.getBranchesSellNum();
        this.getBranchesSellVolume();
    },
    computed: {
        fulfilled() {
            return this.series.length > 0 && this.series1.length > 0;
        }
    },
    methods: {
        getBranchesSellNum() {
            const params = {
                date: this.sell.value,
                type: "count",
                limit: 5
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/branch`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    if (response.data.length == 0) {
                        this.nullData = true;
                    } else {
                        this.nullData = false
                        const data = _.orderBy(
                            response.data,
                            "bills_count",
                            "desc"
                        );
                        const options = {
                            labels: _.map(data, item => {
                                return item.name;
                            })
                        };
                        this.chartOptions = options;
                        this.series = _.map(data, item => {
                            return item.bills_count;
                        });
                    }
                })
                .catch(error => {});
        },
        getBranchesSellVolume() {
            const params = {
                date: this.sell.value,
                type: "amount",
                limit: 5
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/branch`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    const data = _.orderBy(
                        response.data,
                        "bills_sum_total",
                        "desc"
                    );

                    const options = {
                        labels: _.map(data, item => {
                            return item.name;
                        })
                    };
                    this.chartOptions1 = options;
                    this.series1 = _.map(data, item => {
                        return _.toNumber(item.bills_sum_total);
                    });
                })
                .catch(error => {});
        }
    }
};
</script>
