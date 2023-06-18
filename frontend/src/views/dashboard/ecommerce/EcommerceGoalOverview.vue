<template>
    <div class="container">
        <b-card no-body>
            <b-card-header>
                <h4 class="mb-0">فاکتور های فروش</h4>
            </b-card-header>
            <div v-if="this.nullData">
                <vue-apex-charts
                    type="radialBar"
                    height="245"
                    class="my-2"
                    :options="goalOverviewRadialBar"
                    :series="series"
                />
            </div>
            <div v-else>
                <hr />
                <h4 class="text-center text-secondary">
                    موردی جهت نمایش نمودار فاکتورهای فروش یافت نشد
                </h4>
                <hr />
            </div>
            <b-row class="text-center mx-0">
                <b-col
                    cols="6"
                    class="border-top border-right d-flex align-items-between flex-column py-1"
                >
                    <b-card-text class="text-muted mb-0">
                        تایید شده
                    </b-card-text>
                    <h3 class="font-weight-bolder mb-0">
                        {{ completed }}
                    </h3>
                </b-col>
                <b-col
                    cols="6"
                    class="border-top d-flex align-items-between flex-column py-1"
                >
                    <b-card-text class="text-muted mb-0">
                        رد شده
                    </b-card-text>
                    <h3 class="font-weight-bolder mb-0">
                        {{ fail }}
                    </h3>
                </b-col>
            </b-row>
        </b-card>
        <!-- <span v-else>
                <hr />
                <h4 class="text-center text-secondary">
                    موردی جهت نمایش نمودار فاکتورهای فروش یافت نشد
                </h4>
                <hr />
        </span> -->
    </div>
</template>

<script>
import { BCard, BCardHeader, BRow, BCol, BCardText } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";
import axios from "axios";

const $strokeColor = "#ebe9f1";
const $textHeadingColor = "#5e5873";
const $goalStrokeColor2 = "#51e5a8";
export default {
    components: {
        VueApexCharts,
        BCard,
        BCardHeader,
        BRow,
        BCardText,
        BCol
    },
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            nullData: true,
            totalBills: undefined,
            sales: undefined,
            series: [],
            fail: undefined,
            completed: undefined,
            goalOverviewRadialBar: {
                chart: {
                    height: 245,
                    type: "radialBar",
                    sparkline: {
                        enabled: true
                    },
                    dropShadow: {
                        enabled: true,
                        blur: 3,
                        left: 1,
                        top: 1,
                        opacity: 0.1
                    }
                },
                colors: [$goalStrokeColor2],
                plotOptions: {
                    radialBar: {
                        offsetY: -10,
                        startAngle: -150,
                        endAngle: 150,
                        hollow: {
                            size: "77%"
                        },
                        track: {
                            background: $strokeColor,
                            strokeWidth: "50%"
                        },
                        dataLabels: {
                            name: {
                                show: false
                            },
                            value: {
                                color: $textHeadingColor,
                                fontSize: "2.86rem",
                                fontWeight: "600"
                            }
                        }
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "dark",
                        type: "horizontal",
                        shadeIntensity: 0.5,
                        gradientToColors: [$themeColors.success],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    }
                },
                stroke: {
                    lineCap: "round"
                },
                grid: {
                    padding: {
                        bottom: 30
                    }
                }
            }
        };
    },
    mounted() {
        this.getBills();
    },
    methods: {
        getBills() {
            const params = {
                status: "all"
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/bill`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    if (response.data.length == 0) {
                        this.nullData = false;
                    } else {
                        this.nullData = true;
                        const sales = _.map(response.data, item => {
                            return item.type;
                        });
                        const returns = _.map(response.data, item => {
                            return item.type;
                        });
                        this.completed = _.filter(sales, item => {
                            return item == "sale";
                        }).length;
                        this.sales = this.completed;
                        this.totalBills = response.data.length;
                        this.fail = _.filter(returns, item => {
                            return item == "return";
                        }).length;
                        this.series.push(
                            Math.floor((100 * this.sales) / this.totalBills)
                        );
                    }
                })
                .catch(error => {});
        }
    }
};
</script>
