<template>
    <div>
        <b-row>
            <div class="col-md-8 col-lg-9">
                <b-card>
                    <h4 class="font-weight-bolder mb-2">
                        لیست فاکتور های فروش
                    </h4>
                    <!-- <b-alert
                        v-height-fade.appear
                        :show="this.alert.visible"
                        dismissible
                        class="mb-0"
                        :variant="this.alert.type"
                    >
                        <div class="alert-body">
                            {{ this.alert.text }}
                        </div>
                    </b-alert> -->
                    <b-table
                        responsive
                        class="mt-1"
                        :striped="striped"
                        :bordered="bordered"
                        :outlined="outlined"
                        :fields="fields"
                        :items="invoices"
                        show-empty
                    >
                        <template #empty>
                            <div class="text-center">
                                <h4 class="text-muted text-center">
                                    موردی یافت نشد
                                </h4>
                            </div>
                        </template>
                        <template #cell(type)="data">
                            {{ data.value == "sale" ? "فروش" : "بازگشتی" }}
                        </template>
                        <template #cell(total)="data">
                            {{ addCurrencyMask(data.value) }}
                            <small>تومان</small>
                        </template>
                        <template #cell(created_at)="data">
                            <div id="createdTd" dir="ltr">
                                {{ data.item.created_at }}
                            </div>
                        </template>
                        <template #cell(customer)="data">
                            {{
                                data.item.customer.first_name +
                                " " +
                                data.item.customer.last_name
                            }}
                        </template>
                        <template #cell(seller)="data">
                            {{ data.item.branch.name }}
                        </template>
                        <template #cell(description)="data">
                            <div
                                v-for="item in data.item.description"
                                :key="item"
                            >
                                {{ item.content }}
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
            <div class="col-md-4 col-lg-3">
                <b-card>
                    <h4 class="font-weight-bolder">جستجو</h4>
                    <b-form class="mt-2" @submit.prevent="searchHandler">
                        <b-form-group label="نام و نام خانوادگی">
                            <b-form-input autocomplete="off"
                                @change="resetPagination"
                                v-model="searchCustomer"
                                placeholder="نام و نام خانوادگی"
                            />
                        </b-form-group>
                        <b-form-group label="حداقل مبلغ فاکتور">
                            <b-form-input autocomplete="off"
                                @change="resetPagination"
                                @input="
                                    changeCurrencyMask('searchMinInvoiceAmount')
                                "
                                v-model="searchMinInvoiceAmount"
                                placeholder="مبلغ فاکتور"
                            />
                        </b-form-group>
                        <b-form-group label="حداکثر مبلغ فاکتور">
                            <b-form-input autocomplete="off"
                                @change="resetPagination"
                                @input="
                                    changeCurrencyMask('searchMaxInvoiceAmount')
                                "
                                v-model="searchMaxInvoiceAmount"
                                placeholder="مبلغ فاکتور"
                            />
                        </b-form-group>

                        <b-form-group>
                            <label class="font-weight-bold">
                                تاریخ شروع فاکتور
                            </label>
                            <date-picker
                                @change="resetPagination"
                                v-model="searchBillStartDate"
                                clearable
                            />
                        </b-form-group>
                        <b-form-group>
                            <label class="font-weight-bold">
                                تاریخ پایان فاکتور
                            </label>
                            <date-picker
                                @change="resetPagination"
                                v-model="searchBillEndDate"
                                clearable
                            />
                        </b-form-group>

                        <b-form-group label="تعداد فاکتور های مشتری">
                            <b-form-input autocomplete="off"
                                @change="resetPagination"
                                v-model="searchCustomerInvoiceCount"
                                placeholder="تعداد فاکتور های مشتری"
                            />
                        </b-form-group>

                        <b-form-group>
                            <label>شعبه</label>
                            <v-select
                                dir="rtl"
                                @select="resetPagination"
                                v-model="searchBranch"
                                :options="branchOptions"
                                size="sm"
                                label="name"
                                :clearable="false"
                                class="per-page-selector"
                                placeholder="انتخاب کنید.."
                            >
                                <template #no-options>
                                    رکوردی برای نمایش وجود ندارد
                                </template>
                            </v-select>
                        </b-form-group>

                        <b-form-group>
                            <b-form-checkbox
                                v-model="searchInvoiceHasDiscount"
                                :value="true"
                            >
                                فاکتور های تخفیف دار
                            </b-form-checkbox>
                        </b-form-group>

                        <b-button type="submit" variant="primary" block>
                            جستجو
                        </b-button>
                        <b-button
                            type="button"
                            variant="outline-dark"
                            @click="resetHandler"
                            block
                            >حذف فیلتر</b-button
                        >
                    </b-form>
                </b-card>
            </div>
        </b-row>
    </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import vSelect from "vue-select";
import {
    BRow,
    BCard,
    BFormCheckbox,
    BButton,
    BBadge,
    BTable,
    BFormGroup,
    BFormInput,
    BForm,
    BAlert,
    BPagination,
    BNavItem,
} from "bootstrap-vue";
import { heightFade } from "@core/directives/animations";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
export default {
    components: {
        BRow,
        vSelect,
        BCard,
        BButton,
        BFormCheckbox,
        BBadge,
        BTable,
        BFormGroup,
        BFormInput,
        BForm,
        BAlert,
        BPagination,
        datePicker: VuePersianDatetimePicker,
    },
    directives: {
        "height-fade": heightFade,
    },
    data() {
        return {
            // table
            page: 1,
            count: 1,
            perPage: 1,
            startNum: 0,
            striped: true,
            bordered: true,
            outlined: true,
            fields: [
                { key: "customer_id", label: "#" },
                { key: "number", label: "شماره فاکتور" },
                { key: "type", label: "نوع" },
                { key: "total", label: "مبلغ کل" },
                { key: "seller", label: "شعبه" },
                { key: "customer", label: "مشتری" },
                { key: "created_at", label: "تاریخ" },
                { key: "description", label: "توضیحات" },
            ],
            invoices: [],
            // search
            searchCustomer: undefined,
            searchMinInvoiceAmount: undefined,
            searchMaxInvoiceAmount: undefined,
            searchBillStartDate: undefined,
            searchBillEndDate: undefined,
            searchCustomerInvoiceCount: undefined,
            searchBranch: undefined,
            searchInvoiceHasDiscount: undefined,
            branchOptions: [],
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
            },
        },
    },
    mounted() {
        // get invoices
        this.searchHandler();
        // get branches
        this.getBranches();
    },
    methods: {
        // add currency divider
        addCurrencyMask(value) {
            if (value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        removeCurrencyMask(value) {
            if (value) {
                return value.toString().replace(/,/g, "");
            }
        },
        changeCurrencyMask(reference) {
            this[reference] = this.removeCurrencyMask(this[reference]);
            this[reference] = this.addCurrencyMask(this[reference]);
        },
        getBranches() {
            axios
                .get(`${process.env.VUE_APP_URL}/branches`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.branchOptions = response.data.data;
                });
        },
        getInvoices(params = []) {
            axios
                .get(`${process.env.VUE_APP_URL}/bills`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                    params: {
                        ...params,
                        // pagination parameters
                        page: this.page,
                        per_page: 10,
                    },
                })
                .then((response) => {
                    this.startNum = (this.page - 1) * this.perPage;
                    _.map(response.data.data, (invoice) => {
                        this.startNum++;
                        invoice.customer_id = this.startNum;
                    });
                    this.invoices = _.values(response.data.data);
                    this.perPage = response.data.meta.per_page;
                    this.count = response.data.meta.total;
                });
        },
        // navigate user to edit page with id parameter
        editAction(id) {
            this.$router.replace({
                name: "invoice-edit",
                params: {
                    id,
                },
            });
        },
        // navigate between list pages (paginate)
        pageChangeHandler(value) {
            this.page = value;
            this.searchHandler();
        },
        // reset pagination when filter refreshed
        resetPagination() {
            this.page = 1;
        },
        // filter invoices
        searchHandler() {
            const params = {
                customer_name: this.searchCustomer,
                min_total: this.searchMinInvoiceAmount
                    ? this.removeCurrencyMask(this.searchMinInvoiceAmount)
                    : undefined,
                max_total: this.searchMaxInvoiceAmount
                    ? this.removeCurrencyMask(this.searchMaxInvoiceAmount)
                    : undefined,
                bill_start_date: this.searchBillStartDate,
                bill_end_date: this.searchBillEndDate,
                customer_invoice_count: this.searchCustomerInvoiceCount,
                branch_id: this.searchBranch ? this.searchBranch.id : undefined,
                invoice_has_discount: this.searchInvoiceHasDiscount,
            };

            this.getInvoices(params);
        },
        // filter form reset action
        resetHandler() {
            this.searchCustomer = undefined;
            this.searchMinInvoiceAmount = undefined;
            this.searchMaxInvoiceAmount = undefined;
            this.searchBillStartDate = undefined;
            this.searchBillEndDate = undefined;
            this.searchCustomerInvoiceCount = undefined;
            this.searchBranch = undefined;
            this.searchInvoiceHasDiscount = undefined;
            this.search = undefined;
            this.page = 1;
            this.getInvoices();
        },
    },
};
</script>
<style>
#createdTd {
    width: 120px;
}
</style>
