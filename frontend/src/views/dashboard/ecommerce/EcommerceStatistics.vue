<template>
    <div>
        <div v-if="fulfilled">
            <!-- all time reports -->
            <b-row>
                <b-col
                    xl="3"
                    sm="6"
                    v-for="item in statisticsItemsTop"
                    :class="item.customClass"
                    :key="item.icon"
                >
                    <b-card :class="'bg-' + [item.color]">
                        <b-media no-body>
                            <b-media-aside class="mr-2">
                                <b-avatar size="48" variant="light-secondary">
                                    <feather-icon
                                        size="24"
                                        :icon="item.icon"
                                        class="text-light"
                                    />
                                </b-avatar>
                            </b-media-aside>
                            <b-media-body class="my-auto">
                                <h4 class="font-weight-bolder text-light mb-0">
                                    {{ item.title }} {{ item.unit }}
                                </h4>
                                <b-card-text
                                    class="font-small-2 mb-0 text-light font-weight-bold"
                                >
                                    {{ item.subtitle }}
                                </b-card-text>
                            </b-media-body>
                        </b-media>
                    </b-card>
                </b-col>
            </b-row>
            <!-- / all time reports -->

            <!-- last month reports -->
            <b-row>
                <b-col cols="12">
                    <b-card no-body class="card-statistics">
                        <b-card-header>
                            <b-card-title>آمار</b-card-title>
                            <b-card-text class="mr-25 mb-0">
                                <span class="font-weight-bold">
                                    آخرین بروز رسانی 1 ماه پیش
                                </span>
                            </b-card-text>
                        </b-card-header>
                        <b-card-body class="statistics-body">
                            <b-row>
                                <b-col
                                    v-for="item in lastMonthStats"
                                    :key="item.icon"
                                    xl="4"
                                    sm="6"
                                    :class="item.customClass"
                                >
                                    <b-media no-body>
                                        <b-media-aside class="mr-2">
                                            <b-avatar
                                                size="48"
                                                :variant="item.color"
                                            >
                                                <feather-icon
                                                    size="24"
                                                    :icon="item.icon"
                                                />
                                            </b-avatar>
                                        </b-media-aside>
                                        <b-media-body class="my-auto">
                                            <h4 class="font-weight-bolder mb-0">
                                                {{ item.title }}
                                            </h4>
                                            <b-card-text
                                                class="font-small-3 mb-0"
                                            >
                                                {{ item.subtitle }}
                                                <span
                                                    class="font-weight-bolder ml-1"
                                                    :class="
                                                        item.deduction
                                                            ? 'text-danger'
                                                            : 'text-success'
                                                    "
                                                >
                                                    {{ item.payment }}
                                                </span>
                                            </b-card-text>
                                        </b-media-body>
                                    </b-media>
                                </b-col>
                            </b-row>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
            <!-- / last month reports -->

            <!-- today reports -->
            <b-row>
                <b-col
                    v-for="item in todayStats"
                    :key="item.icon"
                    xl="4"
                    sm="6"
                    :class="item.customClass"
                >
                    <b-card :class="'bg-' + [item.color]">
                        <b-media no-body>
                            <b-media-aside class="mr-2">
                                <b-avatar size="48" :variant="item.color">
                                    <feather-icon
                                        size="24"
                                        :icon="item.icon"
                                        class="text-light"
                                    />
                                </b-avatar>
                            </b-media-aside>
                            <b-media-body class="my-auto">
                                <h4 class="font-weight-bolder mb-0">
                                    {{ item.title }}
                                </h4>
                                <b-card-text
                                    class="font-small-2 mb-0 text-dark font-weight-bold"
                                >
                                    {{ item.subtitle }} امروز
                                </b-card-text>
                            </b-media-body>
                        </b-media>
                    </b-card>
                </b-col>
            </b-row>
            <!-- / today reports -->
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
import {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BRow,
    BCol,
    BMedia,
    BMediaAside,
    BAvatar,
    BMediaBody,
    BSpinner,
} from "bootstrap-vue";
import axios from "axios";
import _ from "lodash";
export default {
    components: {
        BRow,
        BCol,
        BCard,
        BCardHeader,
        BCardTitle,
        BCardText,
        BCardBody,
        BMedia,
        BAvatar,
        BMediaAside,
        BMediaBody,
        BSpinner,
    },
    computed: {
        fulfilled() {
            return (
                this.statisticsItemsTop.length > 0 &&
                this.todayStats.length > 0 &&
                this.lastMonthStats.length > 0
            );
        },
    },
    data() {
        return {
            dashboards: [
                {
                    name: "تعداد فروش",
                    count: "123",
                    percent: "74",
                },
            ],
            statisticsItemsTop: [],
            //one mounth ago
            lastMonthStats: [],
            sellTitleCount: undefined,
            sellTitleNum: undefined,
            customerTitleNum: undefined,
            //today
            todayStats: [],
            sellTitleCount2: undefined,
            sellTitleNum2: undefined,
            customerTitleNum2: undefined,
            //the first row
        };
    },
    created() {
        this.getStatistics();
        this.users();
        this.purchaseVolume();
        this.credits();
        this.points();
    },
    mounted() {
        this.getStatistics2();
        this.users2();
    },
    methods: {
        // add currency divider
        addCurrencyMask(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        // remove currency divider
        removeCurrencyMask(value) {
            return value.toString().replace(/,/g, "");
        },
        // currency dividing on typing
        changeCurrencyMask(reference) {
            this[reference] = this.removeCurrencyMask(this[reference]);
            this[reference] = this.addCurrencyMask(this[reference]);
        },

        users() {
            const params = {
                date: "last_month",
                date_type: "created_at",
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
                    this.customerTitleNum = response.data.length;
                    this.lastMonthStats.push({
                        icon: "UserIcon",
                        color: "light-info",
                        title: this.customerTitleNum,
                        subtitle: "تعداد مشتریان",
                        customClass: "mb-2 mb-xl-0",
                        deduction: true,
                    });
                })
                .catch((error) => {});
        },

        getStatistics() {
            const params = {
                date: "last_month",
                status: "sale",
                get_max_amount: 1,
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/bill`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.sellTitleCount = _.sum(
                        _.map(response.data, (item) => {
                            return item.length;
                        })
                    );
                    this.sellTitleNum = _.sum(
                        _.map(response.data, (item) => {
                            return _.sumBy(item, (_item) => {
                                return _item.total;
                            });
                        })
                    );

                    this.lastMonthStats.push(
                        {
                            icon: "TrendingUpIcon",
                            color: "light-primary",
                            title: this.sellTitleCount,
                            subtitle: "تعداد فروش",
                            customClass: "mb-2 mb-xl-0",
                            deduction: false,
                        },
                        {
                            icon: "DollarSignIcon",
                            color: "light-success",
                            title: this.sellTitleNum,
                            subtitle: "میزان فروش",
                            customClass: "",
                            deduction: false,
                        }
                    );
                })
                .catch((error) => {});
        },
        users2() {
            const params = {
                date: "today",
                date_type: "created_at",
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
                    this.customerTitleNum2 = response.data.length;
                    this.todayStats.push({
                        icon: "UserIcon",
                        color: "light-info",
                        title: this.customerTitleNum2,
                        subtitle: "تعداد مشتریان",
                        customClass: "mb-2 mb-xl-0",
                        deduction: true,
                    });
                })
                .catch((error) => {});
        },

        getStatistics2() {
            const params = {
                date: "today",
                status: "sale",
                get_max_amount: 1,
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/bill`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.sellTitleCount2 = _.sum(
                        _.map(response.data, (item) => {
                            return item.length;
                        })
                    );
                    this.sellTitleNum2 = _.sum(
                        _.map(response.data, (item) => {
                            return _.sumBy(item, (_item) => {
                                return _item.total;
                            });
                        })
                    );
                    this.todayStats.push(
                        {
                            icon: "TrendingUpIcon",
                            color: "light-primary",
                            title: this.sellTitleCount2,
                            subtitle: "تعداد فروش",
                            customClass: "mb-2 mb-xl-0",
                            deduction: false,
                        },
                        {
                            icon: "DollarSignIcon",
                            color: "light-success",
                            title: this.sellTitleNum2,
                            subtitle: "میزان فروش",
                            customClass: "",
                            deduction: false,
                        }
                    );
                })
                .catch((error) => {
                    //
                });
        },
        purchaseVolume() {
            const params = {
                status: "sale",
                get_max_amount: 1,
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/bill`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.statisticsItemsTop.push(
                        {
                            icon: "DatabaseIcon",
                            color: "darkBlue1",
                            title: this.addCurrencyMask(
                                _.sum(
                                    _.map(response.data, (item) => {
                                        return item.total;
                                    })
                                )
                            ),
                            subtitle: "تمام حجم خریدها",
                            customClass: "mb-2 mb-xl-0",
                            unit: "ریال",
                        },
                        {
                            icon: "ShoppingCartIcon",
                            color: "darkBlue2",
                            title: response.data.length,
                            subtitle: "تمامی خریدها",
                            customClass: "mb-2 mb-xl-0",
                            unit: "عدد",
                        }
                    );
                })
                .catch((error) => {});
        },
        credits() {
            const params = {
                date: "all",
                type: "all",
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/wallet/amount`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.statisticsItemsTop.push({
                        icon: "DollarSignIcon",
                        color: "darkBlue3",
                        title: this.addCurrencyMask(response.data.balance),
                        subtitle: "تمامی اعتبارها",
                        customClass: "mb-2 mb-sm-0",
                        unit: "ریال",
                    });
                })
                .catch((error) => {});
        },
        points() {
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/point`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.statisticsItemsTop.push({
                        icon: "HeartIcon",
                        color: "darkBlue4",
                        title: response.data.points,
                        subtitle: "تمامی امتیازها",
                        customClass: "",
                        unit: "امتیاز",
                    });
                })
                .catch((error) => {});
        },
    },
};
</script>
<style scoped>
.bg-darkBlue1 {
    background: #1e3c72;
    background: linear-gradient(to right, #2a5298, #1e3c72);
    background: -webkit-linear-gradient(to right, #2a5298, #1e3c72);
}
.bg-darkBlue2 {
    background: #457fca;
    background: linear-gradient(to left, #5691c8, #457fca);
    background: -webkit-linear-gradient(to left, #5691c8, #457fca);
}
.bg-darkBlue3 {
    background: #2b5bec;
    background: linear-gradient(to left, #344cd1, #2b5bec);
    background: -webkit-linear-gradient(to left, #344cd1, #2b5bec);
}
.bg-darkBlue4 {
    background: #00aeff;
    background: linear-gradient(to left, #3a7bd5, #00aeff);
    background: -webkit-linear-gradient(to left, #3a7bd5, #00aeff);
}
</style>
