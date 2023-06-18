<template>
    <div>
        <div class="row">
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
                                <!-- <b-dropdown
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
                                </b-dropdown> -->
                                <v-select
                                    v-model="sell"
                                    :dir="
                                        $store.state.appConfig.isRTL
                                            ? 'ltr'
                                            : 'rtl'
                                    "
                                    label="text"
                                    class="report-date"
                                    @input="getBranchesSellNum()"
                                    :options="timeOptions"
                                    :clearable="false"
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
                            <!-- <div class="col-6 text-right">
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
                            </div> -->
                            <v-select
                                v-model="sell1"
                                :dir="
                                    $store.state.appConfig.isRTL ? 'ltr' : 'rtl'
                                "
                                label="text"
                                @input="getBranchesSellVolume()"
                                :options="timeOptions1"
                                :clearable="false"
                            />
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
    </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import { BDropdown, BDropdownItem } from "bootstrap-vue";
import vSelect from "vue-select";
import axios from "axios";
import _ from "lodash";

export default {
    components: {
        BDropdown,
        BDropdownItem,
        VueApexCharts,
        vSelect,
    },
    data() {
        return {
            sell: {
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
            sell1: {
                value: "last_week",
                text: "7 روز گذشته",
            },
            timeOptions1: [
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
            items: ["کل", "7روز گذشته", "یک ماه گذشته", "یک سال گذشته", "کل"],
            series: [44, 55, 41, 17, 15],
            chartOptions: {
                labels: [
                    // "رستوران",
                    // "فست فود",
                    // "کافی شاپ",
                    // "شهر کتاب",
                    // "فروشگاه موبایل"
                ],
                chart: {
                    type: "donut",
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: "bottom",
                            },
                        },
                    },
                ],
            },
            series1: [23, 11, 39, 11, 59],
            chartOptions1: {
                labels: [
                    // "رستوران",
                    // "فست فود",
                    // "کافی شاپ",
                    // "شهر کتاب",
                    // "فروشگاه موبایل"
                ],
                chart: {
                    type: "donut",
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: "bottom",
                            },
                        },
                    },
                ],
            },
        };
    },
    mounted() {
        this.getBranchesSellNum();
        this.getBranchesSellVolume();
    },
    methods: {
        //تعداد
        getBranchesSellNum() {
            const params = {
                date: this.sell.value,
                type: "count",
                limit: 5,
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/branch`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    const data = _.orderBy(
                        response.data,
                        "bills_count",
                        "desc"
                    );
                    const options = {
                        labels: _.map(data, (item) => {
                            return item.name;
                        }),
                    };
                    this.chartOptions = options;
                    this.series = _.map(data, (item) => {
                        return item.bills_count;
                    });
                })
                .catch((error) => {
                     
                });
        },
        //حجم
        getBranchesSellVolume() {
            const params = {
                date: this.sell.value,
                type: "amount",
                limit: 5,
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/branch`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    const data = _.orderBy(
                        response.data,
                        "bills_sum_total",
                        "desc"
                    );

                    const options = {
                        labels: _.map(data, (item) => {
                            return item.name;
                        }),
                    };
                    this.chartOptions1 = options;
                    this.series1 = _.map(data, (item) => {
                        return _.toNumber(item.bills_sum_total);
                    });
                })
                .catch((error) => {
                     
                });
        },
    },
};
</script>