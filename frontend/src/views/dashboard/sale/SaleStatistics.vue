<template>
    <div>
        <b-row>
            <b-col lg="9" md="9" xl="9" sm="12">
                <b-card no-body class="card-statistics">
                    <b-card-header>
                        <b-card-title>آمار امروز</b-card-title>
                        <!-- <b-card-text class="mr-25 mb-0">
                            <b-dropdown
                                text="امروز"
                                size="sm"
                                class="budget-dropdown"
                                variant="outline-primary"
                            >
                                <b-dropdown-item
                                    v-for="year in years"
                                    :key="year.index"
                                >
                                    {{ year }}
                                </b-dropdown-item>
                            </b-dropdown>
                        </b-card-text> -->
                        <v-select
                            v-model="time"
                            :options="timeOptions"
                            :dir="$store.state.appConfig.isRTL ? 'ltr' : 'rtl'"
                            label="text"
                            :clearable="false"
                            @input="getAll()"
                        />
                    </b-card-header>
                    <b-card-body class="statistics-body">
                        <b-row>
                            <b-col
                                v-for="item in statisticsItems"
                                :key="item.icon"
                                xl="3"
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
                                        <b-card-text class="font-small-3 mb-0">
                                            {{ item.subtitle }}
                                        </b-card-text>
                                    </b-media-body>
                                </b-media>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col lg="3" md="3" xl="3" sm="12">
                <b-card
                    v-for="card in cards"
                    :key="card.index"
                    :class="card.bgColor"
                    class="mb-1"
                >
                    <b-media no-body>
                        <b-media-aside class="mr-2">
                            <feather-icon
                                size="33"
                                :icon="card.icon"
                                class="text-light"
                            />
                        </b-media-aside>
                        <b-media-body class="my-auto">
                            <h4 class="font-weight-bolder text-light mb-0">
                                {{ card.title }}
                            </h4>
                            <b-card-text
                                class="mb-0 text-light font-small-5 font-weight-bold"
                            >
                                {{ card.subTitle }}
                            </b-card-text>
                        </b-media-body>
                    </b-media>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {
    BDropdown,
    BDropdownItem,
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
    BMediaBody
} from "bootstrap-vue";
import axios from "axios";
import _ from "lodash";
import vSelect from "vue-select";

export default {
    components: {
        BDropdown,
        BDropdownItem,
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
        vSelect,
    },
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
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
                // {
                //     value: "year_beginning",
                //     text: "از ابتدای سال"
                // },
                {
                    value: "all",
                    text: "کل"
                }
            ],
            years: [
                "7 روز گذشته",
                "یک سال گذشته",
                "یک ماه گذشته",
                "از ابتدای سال",
                "از ابتدای سال",
                "کل"
            ],

            statisticsItems: [],

            cards: []
        };
    },
    methods: {
        getUsers() {
            const params = {
                date: this.time.value,
                date_type: "created_at"
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/user`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    // this.statisticsItems = [];
                    this.statisticsItems.push({
                        icon: "UserIcon",
                        color: "light-info",
                        title: response.data.length,
                        subtitle: "مشتریان",
                        customClass: "mb-2 mb-xl-0"
                    });
                })
                .catch(error => {
                     
                });
        },
        getBills() {
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
                    // this.statisticsItems = [];
                    this.statisticsItems.push({
                        icon: "ShoppingBagIcon",
                        color: "light-primary",
                        title: _.sum(
                            _.map(response.data, item => {
                                return item.length;
                            })
                        ),
                        subtitle: "تعداد فروش",
                        customClass: "mb-2 mb-xl-0"
                    });
                    this.statisticsItems.push({
                        icon: "DollarSignIcon",
                        color: "light-success",
                        title: _.sum(
                            _.map(response.data, item => {
                                return _.sum(
                                    _.map(item, _item => {
                                        return _item.total;
                                    })
                                );
                            })
                        ),
                        subtitle: "میزان فروش",
                        customClass: "mb-2 mb-sm-0"
                    });
                })
                .catch(error => {
                     
                });
        },
        getCreditCount() {
            const params = {
                date: this.time.value,
                type: "deposit"
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/wallet/amount`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    this.statisticsItems = [];
                    this.statisticsItems.push({
                        icon: "AwardIcon",
                        color: "light-danger",
                        title: response.data.sum_balance,
                        subtitle: "میزان اعتبار اعطائی",
                        customClass: "mb-2 mb-sm-0"
                    });
                })
                .catch(error => {
                     
                });
        },
        getAverageCount() {
            const params = {
                date: "today",
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
                    const total = _.sum(
                        _.map(response.data, item => {
                            return _.sum(
                                _.map(item, _item => {
                                    return _item.total;
                                })
                            );
                        })
                    );
                    const length = _.sum(
                        _.map(response.data, item => {
                            return item.length;
                        })
                    );
                    const title = total / length;

                    this.cards.push({
                        title: title || 0,
                        bgColor: "bg-sabze",
                        icon: "ActivityIcon",
                        subTitle: "میانگین ارزش فاکتور امروز"
                    });
                })
                .catch(error => {
                     
                });
        },
        getPayedCredit() {
            const params = {
                date: "today",
                type: "withdraw"
            };
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/wallet/amount`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    this.cards.push({
                        title: response.data.sum_withdraw || 0,
                        bgColor: "bg-orange",
                        icon: "DollarSignIcon",
                        subTitle: "اعتبارهای خرج شده امروز"
                    });
                })
                .catch(error => {
                     
                });
        },
        getAll() {
            this.getUsers();
            this.getBills();
            this.getCreditCount();
            // this.getAverageCount();
            // this.getPayedCredit();
        }
    },
    created() {
        this.getUsers();
        this.getBills();
        this.getCreditCount();
        this.getAverageCount();
        this.getPayedCredit();
    }
};
</script>
<style scoped>
.bg-orange {
    background: #11998e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to left,
        #38ef7d,
        #11998e
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to left,
        #38ef7d,
        #11998e
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.bg-sabze {
    background: #2b5876; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right,
        #4e4376,
        #2b5876
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to right,
        #4e4376,
        #2b5876
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
