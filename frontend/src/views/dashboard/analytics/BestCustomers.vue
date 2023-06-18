<template>
    <div>
        <b-row class="match-height">
            <b-col lg="4" xl="4" md="12">
                <b-card class="card-transaction" no-body>
                    <b-card-header>
                        <b-card-title>کاربران جدید</b-card-title>
                        <b-avatar rounded size="29" variant="light-success">
                            <feather-icon
                                icon="UserPlusIcon"
                                size="17"
                                class="text-success"
                            />
                        </b-avatar>
                    </b-card-header>

                    <b-card-body>
                        <div
                            v-for="transaction in newValue"
                            :key="transaction.id"
                            class="transaction-item"
                        >
                            <b-media no-body>
                                <b-media-aside>
                                    <b-avatar
                                        rounded
                                        size="30"
                                        variant="light-secondary"
                                    >
                                        <feather-icon
                                            size="18"
                                            icon="UserIcon"
                                        />
                                    </b-avatar>
                                </b-media-aside>
                                <b-media-body>
                                    <h6 class="transaction-title">
                                        {{ transaction.first_name }}
                                        {{ transaction.last_name }}
                                    </h6>
                                    <small>{{ transaction.number }}</small>
                                </b-media-body>
                            </b-media>
                            <div class="font-weight-bolder text-success">
                                {{ transaction.payment }}
                            </div>
                        </div>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col lg="4" xl="4" md="12">
                <b-card class="card-transaction" no-body>
                    <b-card-header>
                        <b-card-title>بیشترین حجم خرید</b-card-title>
                        <b-avatar rounded size="29" variant="light-secondary">
                            <feather-icon
                                icon="AwardIcon"
                                size="17"
                                class="text-secondary"
                            />
                        </b-avatar>
                    </b-card-header>

                    <b-card-body>
                        <div
                            v-for="transaction in mostValue"
                            :key="transaction.id"
                            class="transaction-item"
                        >
                            <b-media no-body>
                                <b-media-aside>
                                    <b-avatar
                                        rounded
                                        size="30"
                                        variant="light-secondary"
                                    >
                                        <feather-icon
                                            size="18"
                                            icon="UserIcon"
                                        />
                                    </b-avatar>
                                </b-media-aside>
                                <b-media-body>
                                    <h6 class="transaction-title">
                                        {{ transaction.first_name }}
                                        {{ transaction.last_name }}
                                    </h6>
                                    <small>{{ transaction.number }}</small>
                                </b-media-body>
                            </b-media>
                            <div class="font-weight-bolder text-success">
                                {{ transaction.customer_bills_sum_total }}
                            </div>
                        </div>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col lg="4" xl="4" md="12">
                <b-card class="card-transaction" no-body>
                    <b-card-header>
                        <b-card-title>برترین تکرار خرید</b-card-title>
                        <b-avatar rounded size="29" variant="light-primary">
                            <feather-icon
                                icon="AwardIcon"
                                size="17"
                                class="text-primary"
                            />
                        </b-avatar>
                    </b-card-header>

                    <b-card-body>
                        <div
                            v-for="transaction in mostRepeat"
                            :key="transaction.id"
                            class="transaction-item"
                        >
                            <b-media no-body>
                                <b-media-aside>
                                    <b-avatar
                                        rounded
                                        size="30"
                                        variant="light-primary"
                                    >
                                        <feather-icon
                                            size="18"
                                            icon="UserIcon"
                                        />
                                    </b-avatar>
                                </b-media-aside>
                                <b-media-body>
                                    <h6 class="transaction-title">
                                        {{ transaction.first_name }}
                                        {{ transaction.last_name }}
                                    </h6>
                                    <small>{{ transaction.number }}</small>
                                </b-media-body>
                            </b-media>
                            <div class="font-weight-bolder text-success">
                                {{ transaction.payment }}
                            </div>
                        </div>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {
    BCard,
    BRow,
    BCol,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BDropdown,
    BDropdownItem,
} from "bootstrap-vue";
import axios from "axios";

export default {
    components: {
        BRow,
        BCol,
        BCard,
        BCardHeader,
        BCardTitle,
        BCardBody,
        BMediaBody,
        BMedia,
        BMediaAside,
        BAvatar,
        BDropdown,
        BDropdownItem,
    },
    data() {
        return {
            newValue: undefined,
            mostValue: undefined,
            mostRepeat: undefined,
        };
    },
    methods: {
        getNewUsers() {
            const params = {
                date: "all",
                date_type: "created_at",
                limit: 4,
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
                    const firstN = _.map(response.data, (item) => {
                        return item.first_name;
                    });
                    const lastN = _.map(response.data, (item) => {
                        return item.last_name;
                    });
                    this.newValue = response.data;
                    this.newUsersName = firstN + lastN;
                })
                .catch((error) => {});
        },
        getUsersVul() {
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/user/bill_amount`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.mostValue = response.data;
                })
                .catch((error) => {});
        },
        getUsersRepeat() {
            axios
                .get(`${process.env.VUE_APP_URL}/statistics/user/bill_count`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.mostRepeat = response.data;
                })
                .catch((error) => {});
        },
    },
    created() {
        this.getNewUsers();
        this.getUsersVul();
        this.getUsersRepeat();
    },
};
</script>
