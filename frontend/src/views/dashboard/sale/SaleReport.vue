<template>
    <b-card>
        <b-card-header class="row">
            <div class="col-6">
                <b-card-title>آمار های فروش</b-card-title>
            </div>
            <div class="col-3 text-right">
                <!-- <b-card-text class="mr-25 mb-0">
                    <b-dropdown
                        right
                        text="امروز"
                        size="sm"
                        class="budget-dropdown"
                        variant="outline-primary"
                    >
                        <b-dropdown-item
                            v-model="timeOptions"
                            v-for="day in timeOptions"
                            :key="day.index"
                        >
                            {{ day.text }}
                        </b-dropdown-item>
                    </b-dropdown>
                </b-card-text> -->
                <v-select
                    v-model="time"
                    :options="timeOptions"
                    :dir="$store.state.appConfig.isRTL ? 'ltr' : 'rtl'"
                    label="text"
                    :clearable="false"
                    @input="getReports()"
                />
            </div>
        </b-card-header>
        <b-card-body class="statistics-body">
            <vue-apex-charts
                type="line"
                height="250"
                :options="salesBar.chartOptions"
                :series="salesBar.series"
            />
        </b-card-body>
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
    BCardText,
    BCardHeader,
    BCardBody,
    BCardTitle
} from "bootstrap-vue";
import vSelect from "vue-select"; 
import VueApexCharts from "vue-apexcharts";
import Ripple from "vue-ripple-directive";
import axios from "axios";
import _ from "lodash";

export default {
    components: {
        VueApexCharts,
        BCard,
        BCardHeader,
        BCardBody,
        BCardTitle,
        BRow,
        BCol,
        BButton,
        BCardText,
        BDropdown,
        BDropdownItem,
        BProgress,
        vSelect
    },
    directives: {
        Ripple
    },
    data() {
        return {
            lastDays: ["30 روز گذشته", "3 ماه گذشته", "سال گذشته"],
            time: {
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
            salesBar: {
                series: [],
                chartOptions: {
                    axisTicks: {
                        show: false
                    },
                    grid: {
                        yaxis: {
                            lines: { show: false }
                        }
                    },
                    axisBorder: {
                        show: false
                    },
                    legend: {
                        show: true
                    },
                    dataLabels: {
                        enabled: false
                    },
                    chart: {
                        height: 350,
                        type: "line",
                        toolbar: { show: false }
                    },
                    stroke: {
                        width: [0, 4]
                    },
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: [1]
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
                            "05/08"
                        ],
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
                    tooltip: {
                        enabled: false
                    },
                    yaxis: [
                        {
                            labels: {
                                style: {
                                    colors: "#6E6B7B",
                                    fontSize: "0.86rem",
                                    fontFamily: "Montserrat"
                                }
                            }
                        },
                        {
                            show: false,
                            showAlways: false,
                            title: {
                                text: "تعداد فروش"
                            }
                        },
                        {
                            show: false,
                            opposite: false,
                            title: {
                                text: "حجم فروش"
                            }
                        }
                    ]
                }

                // chartOptions: {
                //   chart: {
                //     sparkline: { enabled: true },
                //     toolbar: { show: false },
                //   },
                //   grid: {
                //     yaxis: {
                //       lines: { show: false },
                //     },
                //     show: false,
                //     padding: {
                //       left: 0,
                //       right: 0,
                //       bottom: 50,
                //     },
                //   },
                //   states: {
                //     hover: {
                //       filter: "none",
                //     },
                //   },
                //   stroke: {
                //     show: true,
                //     width: 1,
                //     colors: ["transparent"],
                //   },
                //   fill: {
                //     opacity: 1,
                //   },
                //   colors: [$themeColors.primary, $themeColors.warning],
                //   plotOptions: {
                //     bar: {
                //       distributed: false,
                //       endingShape: "rounded",
                //       horizontal: false,
                //       columnWidth: "55%",
                //       endingShape: "rounded",
                //     },
                //   },
                //   tooltip: {
                //     x: { show: false },
                //   },
                //   xaxis: {
                //     type: "numeric",
                //     labels: {
                //       style: {
                //         colors: "#6E6B7B",
                //         fontSize: "0.86rem",
                //         fontFamily: "Montserrat",
                //       },
                //     },
                //     axisTicks: {
                //       show: true,
                //     },
                //     axisBorder: {
                //       show: true,
                //     },
                //   },
                //   yaxis: {
                //     labels: {
                //       style: {
                //         colors: "#6E6B7B",
                //         fontSize: "0.86rem",
                //         fontFamily: "Montserrat",
                //       },
                //     },
                //   },
                //   legend: {
                //     show: true,
                //   },
                //   dataLabels: {
                //     enabled: false,
                //   },
                // },
            }
        };
    },
    methods: {
        getReports() {
            const params = {
                date: this.time.value,
                status: "sale"
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
                    this.salesBar.series = [];
                    this.salesBar.series.push({
                        name: "تعداد فروش",
                        type: "column",
                        data: _.map(response.data, item => {
                            return _.sumBy(item, _item => {
                                return _item.total;
                            });
                        })
                    });
                    this.salesBar.series.push({
                        name: "حجم فروش",
                        type: "line",
                        data: _.map(response.data, item => {
                            return item.length;
                        })
                    });
                    const xaxis = {
                        xaxis: {
                            categories: _.map(response.data, (item, index) => {
                                return index;
                            })
                        }
                    };
                    this.salesBar.chartOptions = xaxis;
                })
                .catch(error => {
                     
                });
        }
    },
    created() {
        this.getReports();
    }
};
</script>
<style lang="scss">
.apexcharts-yaxis {
    transform: translate(0, 0) !important;
}
</style>
