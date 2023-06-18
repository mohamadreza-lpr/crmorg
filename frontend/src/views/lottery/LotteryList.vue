<template>
    <div>
        <app-collapse class="form-group">
            <app-collapse-item title="فیلتر">
                <b-form @submit.prevent="filterSearchHandler">
                    <b-row>
                        <b-col cols="12" md="12" lg="12" xl="12" sm="6">
                            <b-form-group
                                label="عنوان"
                                label-for="min-credit"
                                label-cols-md="2"
                            >
                                <b-form-input autocomplete="off"
                                    id="min-credit"
                                    v-model="searchTitle"
                                    placeholder="عنوان را وارد نمایید"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تاریخ شروع"
                                label-for="min-date"
                                label-cols-md="4"
                            >
                                <date-picker
                                    type="datetime"
                                    id="min-date-create"
                                    v-model="searchStarts_at"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تاریخ پایان"
                                label-for="max-date"
                                label-cols-md="3"
                            >
                                <date-picker
                                    type="datetime"
                                    id="max-date-create"
                                    v-model="searchExpires_at"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تاریخ اجرا"
                                label-for="min-date-marriage"
                                label-cols-md="4"
                            >
                                <date-picker
                                    type="datetime"
                                    id="min-date-marriage"
                                    v-model="searchExecute_at"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <div class="text-right">
                        <b-button
                            @click="resetHandler"
                            variant="outline-secondary"
                        >
                            پاک کردن فرم
                        </b-button>
                        <b-button type="submit" variant="primary" class="ml-1">
                            جستجو
                        </b-button>
                    </div>
                </b-form>
            </app-collapse-item>
        </app-collapse>
        <b-card>
            <div class="demo-spacing-0 mb-1" v-if="alertVisibility">
                <b-alert :variant="alert.type" show>
                    <div class="alert-body">
                        {{ alert.message }}
                    </div>
                </b-alert>
            </div>
            <h4 class="mb-2">لیست قرعه کشی</h4>
            <b-table
                responsive
                :bordered="bordered"
                :outlined="outlined"
                :striped="striped"
                :fields="fields"
                :items="items"
            >
                <template #cell(actions)="data">
                    <b-button
                        variant="gradient-info"
                        class="btn-icon"
                        @click="editHandler(data.item.id)"
                    >
                        <feather-icon icon="Edit2Icon" />
                    </b-button>
                </template>
                <template #cell(starts_at)="data">
                    <strong><small>{{ data.item.starts_at.j_date.full_date }}</small></strong>
                </template>
                <template #cell(expires_at)="data">
                    <strong><small>{{ data.item.expires_at.j_date.full_date }}</small></strong>
                </template>
                <template #cell(executed_at)="data">
                    <strong><small>{{ data.item.execute_at.j_date.full_date }}</small></strong>
                </template>
            </b-table>
            <b-pagination
                v-model="page"
                :per-page="perPage"
                :total-rows="total"
                @change="pageChanger"
            ></b-pagination>
        </b-card>
    </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import vSelect from "vue-select";
import BsTable from "@/global/table/BsTable.vue";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import {
    BFormInput,
    BFormGroup,
    BCol,
    BButton,
    BForm,
    BTable,
    BPagination,
    BAlert,
    BCard,
    BRow
} from "bootstrap-vue";

export default {
    components: {
        BFormInput,
        datePicker: VuePersianDatetimePicker,
        BFormGroup,
        BsTable,
        BCol,
        BForm,
        BButton,
        BTable,
        BPagination,
        BAlert,
        BCard,
        AppCollapse,
        AppCollapseItem,
        BRow,
        vSelect
    },
    data() {
        return {
            // table
            page: 1,
            perPage: 5,
            active: false,
            total: undefined,
            striped: true,
            bordered: true,
            outlined: true,
            fields: [
                { key: "title", label: "عنوان" },
                { key: "starts_at", label: "تاریخ شروع" },
                { key: "expires_at", label: "تاریخ انقضا" },
                { key: "executed_at", label: "تاریخ اجرا" },
                { key: "type", label: "نوع" },
                { key: "max_winner", label: "تعداد برندگان" },
                // { key: "max_chances", label: "بیشترین شانس" },
                { key: "required_points", label: "امتیازات مورد نیاز" },
                {
                    key: "point_withdrawal",
                    label: "امتیاز از دست داده شده در صورت انصراف"
                },
                { key: "actions", label: "عملیات" }
            ],
            items: [],
            //filter
            searchTitle: undefined,
            searchStarts_at: undefined,
            searchExpires_at: undefined,
            searchExecute_at: undefined
        };
    },
    computed: {
        alert() {
            return this.$store.getters["other/getAlert"];
        },
        alertVisibility() {
            return this.$store.getters["other/isAlertValid"];
        }
    },
    mounted() {
        // get all lotteries
        this.getLotteries();
        // hide alert after 7 seconds
        setTimeout(() => {
            this.$store.commit("other/setAlertVisibility", false);
        }, 7000);
    },
    methods: {
        getLotteries() {
            // API route parameters
            const params = { page: this.page };

            axios
                .get(`${process.env.VUE_APP_URL}/lotteries`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    this.items = response.data.data;
                    this.total = response.data.meta.total;
                    this.perPage = response.data.meta.per_page;
                })
                .catch(error => {});
        },
        editHandler(id) {
            this.$router.push({ name: "lottery-edit", params: { id: id } });
        },
        // set next page number and get lotteries data according page number
        pageChanger(value) {
            this.page = value;
            this.getLotteries();
        },
        filterSearchHandler() {
            const params = {
                title: this.searchTitle,
                starts_at: this.searchStarts_at,
                expires_at: this.searchExpires_at,
                execute_at: this.searchExecute_at
            };
            console.log(params);
            axios
                .get(`${process.env.VUE_APP_URL}/lotteries`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    console.log(response);
                    this.items = response.data.data;
                    this.total = response.data.meta.total;
                    this.perPage = response.data.meta.per_page;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        resetHandler() {
            this.searchTitle = "";
            this.searchStarts_at = "";
            this.searchExpires_at = "";
            this.searchExecute_at = "";
        }
    }
};
</script>
