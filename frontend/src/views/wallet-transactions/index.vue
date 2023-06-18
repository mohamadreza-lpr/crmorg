<template>
    <div>
        <b-card>
            <h4 class="font-weight-bolder">
                لیست تراکنش های اعتبارات
            </h4>
            <b-alert
                v-height-fade.appear
                :show="this.alert.visible"
                dismissible
                class="mb-0"
                :variant="this.alert.type"
            >
                <div class="alert-body">
                    {{ this.alert.text }}
                </div>
            </b-alert>
            <b-table
                responsive
                class="mt-1"
                :striped="striped"
                :bordered="bordered"
                :outlined="outlined"
                :fields="fields"
                :items="transactions"
                show-empty
            >
                <template #cell(user)="data">
                    {{
                        data.item.user.first_name +
                            " " +
                            data.item.user.last_name
                    }}
                </template>
                <template #cell(amount)="data">
                    {{ addCurrencyMask(data.value) }}
                </template>
                <template #cell(description)="data">
                    {{ data.value.substring(0, 28) + " ..." }}
                </template>
                <template #cell(type)="data">
                    {{ data.value == "deposit" ? "سپرده" : "بستانکار" }}
                </template>
                <template #cell(action)="data">
                    <b-button
                        class="btn-icon"
                        variant="gradient-info"
                        v-on:click="showAction(data.item.id)"
                    >
                        <feather-icon icon="EyeIcon" />
                    </b-button>
                </template>
                <template #empty>
                    <div class="text-center">
                        <h4 class="text-muted text-center">
                            موردی یافت نشد
                        </h4>
                    </div>
                </template>
            </b-table>
            <b-pagination
                class="mb-0"
                v-model="page"
                :per-page="perPage"
                :total-rows="count"
                @change="pageChangeHandler"
            ></b-pagination>
        </b-card>
    </div>
</template>

<script>
import {
    BRow,
    BCard,
    BTable,
    BAlert,
    BButton,
    BPagination
} from "bootstrap-vue";
import _ from "lodash";
import axios from "axios";
import { heightFade } from "@core/directives/animations";

export default {
    directives: {
        "height-fade": heightFade
    },
    components: {
        BRow,
        BCard,
        BTable,
        BAlert,
        BButton,
        BPagination
    },
    data() {
        return {
            // table
            page: 1,
            count: 1,
            perPage: 1,
            striped: true,
            bordered: true,
            outlined: true,
            fields: [
                { key: "update_at", label: "#" },
                { key: "user", label: "نام و نام خانوادگی" },
                { key: "amount", label: "هزینه" },
                { key: "type", label: "نوع" },
                { key: "description", label: "توضیحات" },
                { key: "action", label: "عملیات" }
            ],
            transactions: []
        };
    },
    computed: {
        // get alert object from VUEX
        alert: {
            get() {
                return this.$store.getters["app/getAlert"];
            },
            set(value) {
                this.$store.commit("app/setAlert", value);
            }
        }
    },
    mounted() {
        this.getTransactions();
    },
    methods: {
        // add currency divider
        addCurrencyMask(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        // navigate user to show page with id parameter
        showAction(id) {
            this.$router.replace({
                name: "wallet-transactions-show",
                params: {
                    id
                }
            });
        },
        // navigate between list pages (paginate)
        pageChangeHandler(value) {
            this.page = value;
            this.getTransactions();
        },
        // reset pagination
        resetPagination() {
            this.page = 1;
        },
        // get transactions
        getTransactions() {
            axios
                .get(
                    `${process.env.VUE_APP_URL}/wallets/transactions?page=${this.page}&per_page=10&with=user`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`
                        }
                    }
                )
                .then(response => {
                    // setting pagination data
                    const { total } = response.data.meta;
                    const { per_page } = response.data.meta;
                    this.startNum = (this.page - 1) * this.perPage;
                    _.map(response.data.data, transaction => {
                        this.startNum++;
                        transaction.update_at = this.startNum;
                    });
                    this.perPage = per_page;
                    this.count = total;
                    // setting transactions list
                    this.transactions = _.values(response.data.data);
                });
        }
    }
};
</script>
