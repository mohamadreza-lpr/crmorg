<template>
    <div>
        <b-row>
            <b-col
                v-for="(item, index) in statisticsItems"
                :key="index"
                xl="4"
                lg="4"
                sm="6"
                class="form-group"
            >
                <b-card :class="'bg-' + [item.bg]">
                    <b-media no-body>
                        <b-media-aside class="mr-2">
                            <b-avatar size="53" class="bg-white-op">
                                <feather-icon
                                    size="27"
                                    :icon="item.icon"
                                    class="text-light"
                                />
                            </b-avatar>
                        </b-media-aside>
                        <b-media-body class="my-auto">
                            <h4 class="font-weight-bolder text-light mb-0">
                                {{ item.title }}
                            </h4>
                            <b-card-text class="font-small-5 text-light mb-0">
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
                </b-card>
            </b-col>
        </b-row>
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
    },
    data() {
        return {
            statisticsItems: [],
            dashboards: [
                {
                    name: "تعداد فروش",
                    count: "123",
                    percent: "74",
                },
            ],
            todaysBills: undefined,
            allBills: undefined,
            todayBirthdays: undefined,
            partnerBirthDate: undefined,
            anniversaryDate: undefined,
            todayCustomers: undefined,
        };
    },

    methods: {
        getBills() {
            const params = {
                date: "today",
                status: "sale",
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
                    this.todaysBills = _.sum(
                        _.map(response.data, (item) => {
                            return _.sumBy(item, (_item) => {
                                return _item.total;
                            });
                        })
                    );
                    this.statisticsItems.push({
                        icon: "SlidersIcon",
                        bg: "dark-skies",
                        color: "light-primary",
                        title: this.todaysBills,
                        subtitle: "تعداد فاکتور های امروز",
                    });
                })
                .catch((error) => {});
        },
        getAllBills() {
            const params = {
                date: "all",
                status: "sale",
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
                    this.allBills = _.sum(
                        _.map(response.data, (item) => {
                            return _.sumBy(item, (_item) => {
                                return _item.total;
                            });
                        })
                    );
                    this.statisticsItems.push({
                        icon: "LayersIcon",
                        bg: "sea-blue",
                        color: "light-info",
                        title: this.allBills,
                        subtitle: "تعداد فاکتور ها",
                    });
                })
                .catch((error) => {});
        },
        getUsersBirthDate() {
            const params = {
                date: "today",
                date_type: "birth_date",
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
                    this.todayBirthdays = response.data.length;
                    this.statisticsItems.push({
                        icon: "GiftIcon",
                        bg: "orange-coral",
                        title: this.todayBirthdays,
                        color: "light-info",
                        subtitle: "تعداد تولدهای امروز",
                    });
                })
                .catch((error) => {});
        },
        getPartnerBirthdate() {
            const params = {
                date: "today",
                date_type: "partner_birth_date",
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
                    this.partnerBirthDate = response.data.length;
                    this.statisticsItems.push({
                        icon: "SmileIcon",
                        bg: "mine",
                        color: "light-info",
                        title: this.partnerBirthDate,
                        subtitle: "تعداد متولدین امروز(همسران)",
                    });
                })
                .catch((error) => {});
        },
        getAnniversaryDate() {
            const params = {
                date: "today",
                date_type: "anniversary_date",
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
                    this.anniversaryDate = response.data.length;
                    this.statisticsItems.push({
                        icon: "HeartIcon",
                        bg: "romantic",
                        color: "light-info",
                        title: this.anniversaryDate,
                        subtitle: "تعداد سالگردهای ازدواج امروز",
                    });
                })
                .catch((error) => {});
        },
        getTodayCustomers() {
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
                    this.todayCustomers = response.data.length;
                    this.statisticsItems.push({
                        icon: "UsersIcon",
                        bg: "inbox",
                        color: "light-danger",
                        title: this.todayCustomers,
                        subtitle: "تعداد مشتریان امروز",
                    });
                })
                .catch((error) => {});
        },
    },
    created() {
        this.getBills();
        this.getAllBills();
        this.getUsersBirthDate();
        this.getPartnerBirthdate();
        this.getAnniversaryDate();
        this.getTodayCustomers();
    },
};
</script>

<style scoped>
.bg-white-op {
    background-color: #ffffff66;
}
.bg-dark-skies {
    background: #4b79a1; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right,
        #283e51,
        #4b79a1
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to right,
        #283e51,
        #4b79a1
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.bg-sea-blue {
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
.bg-inbox {
    background: #457fca; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right,
        #5691c8,
        #457fca
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to right,
        #5691c8,
        #457fca
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.bg-orange-coral {
    background: #4e54c8; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right,
        #8f94fb,
        #4e54c8
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to right,
        #8f94fb,
        #4e54c8
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.bg-mine {
    background: #00c6ff; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right,
        #0072ff,
        #00c6ff
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to right,
        #0072ff,
        #00c6ff
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.bg-romantic {
    background: #4568dc; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right,
        #b06ab3,
        #4568dc
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to right,
        #b06ab3,
        #4568dc
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
