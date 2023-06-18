<template>
    <b-card v-if="data">
        <b-row class="pb-50">
            <b-col
                sm="6"
                order-sm="1"
                order="2"
                class="d-flex justify-content-between flex-column mt-1 mt-sm-0"
            >
                <div>
                    <h2 class="font-weight-bolder mb-25">
                        {{ this.customerCreditNum }}
                    </h2>
                    <b-card-text class="font-weight-bold mb-2">
                        گزارش اعتبارهای مشتری
                    </b-card-text>
                </div>

                <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                    class="shadow"
                    @click="toActionsHistory"
                >
                    <span>تاریخچه فعالیت ها </span>
                    <feather-icon icon="ChevronsLeftIcon" />
                </b-button>
            </b-col>
            <b-col
                sm="6"
                cols="12"
                order-sm="2"
                order="1"
                class="d-flex justify-content-between flex-column text-right"
            >
                <div v-if="this.nullData">
                    <vue-apex-charts
                        type="bar"
                        height="250"
                        :options="salesBar.chartOptions"
                        :series="revenueSeries"
                    />
                </div>
                <div v-else>
                    <hr />
                    <h4>
                        موردی برای نمایش نمودار گزارش اعتبارهای مشتری وجود ندارد
                    </h4>
                    <hr />
                </div>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
import {
    BCard,
    BRow,
    BCol,
    BButton,
    BDropdown,
    BDropdownItem,
    BProgress,
    BCardText
} from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import Ripple from "vue-ripple-directive";
import { $themeColors } from "@themeConfig";
import { kFormatter } from "@core/utils/filter";
import axios from "axios";
import _ from "lodash";

export default {
    components: {
        VueApexCharts,
        BCard,
        BRow,
        BCol,
        BButton,
        BCardText,
        BDropdown,
        BDropdownItem,
        BProgress
    },
    directives: {
        Ripple
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
            customerCreditNum: undefined,
            revenueSeries: [],
            salesBar: {
                chartOptions: {
                    chart: {
                        sparkline: { enabled: true },
                        toolbar: { show: false }
                    },
                    grid: {
                        yaxis: {
                            lines: { show: false }
                        },
                        show: false,
                        padding: {
                            left: 0,
                            right: 0,
                            bottom: 50
                        }
                    },
                    states: {
                        hover: {
                            filter: "none"
                        }
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ["transparent"]
                    },
                    fill: {
                        opacity: 1
                    },
                    colors: [$themeColors.primary, $themeColors.warning],
                    plotOptions: {
                        bar: {
                            distributed: false,
                            endingShape: "rounded",
                            horizontal: false,
                            columnWidth: "55%",
                            endingShape: "rounded"
                        }
                    },
                    tooltip: {
                        x: { show: false }
                    },
                    xaxis: {
                        type: "numeric",
                        labels: {
                            style: {
                                colors: "#6E6B7B",
                                fontSize: "0.86rem",
                                fontFamily: "Montserrat"
                            }
                        },
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#6E6B7B",
                                fontSize: "0.86rem",
                                fontFamily: "Montserrat"
                            }
                        }
                    },
                    legend: {
                        show: true
                    },
                    dataLabels: {
                        enabled: false
                    }
                }
            }
        };
    },
    methods: {
        kFormatter,
        toActionsHistory() {
            this.$router.push({ name: "wallet-transactions-index" });
        },
        getWallets() {
            const params = {
                date: "last_week",
                type: "all"
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/wallet`, {
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
                        const data = _.map(response.data, (item, index) => {
                            const depositSum = _.sumBy(item, _item => {
                                if (_item.type === "deposit")
                                    return _item.amount;
                            });
                            const withdrawSum = _.sumBy(item, _item => {
                                if (_item.type === "withdraw")
                                    return _item.amount;
                            });

                            return {
                                [index]: {
                                    deposit: depositSum,
                                    withdraw: withdrawSum
                                }
                            };
                        });

                        this.revenueSeries.push({
                            data: _.flatten(
                                _.map(data, item => {
                                    return _.map(item, _item => {
                                        return _item.deposit;
                                    });
                                })
                            ),
                            name: "اعتبارهای اعطا شده"
                        });
                        this.revenueSeries.push({
                            data: _.flatten(
                                _.map(data, item => {
                                    return _.map(item, _item => {
                                        return _item.withdraw;
                                    });
                                })
                            ),
                            name: "اعتبارهای خرج شده"
                        });
                        this.customerCreditNum = _.sum(
                            _.map(response.data, item => {
                                return _.sum(
                                    _.map(item, _item => {
                                        return _item.amount;
                                    })
                                );
                            })
                        );
                    }
                })
                .catch(error => {});
        }
    },

    created() {
        this.getWallets();
    }
};
</script>
