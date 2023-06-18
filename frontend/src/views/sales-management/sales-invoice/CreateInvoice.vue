vue
<template>
    <div>
        <!-- save invoice modal -->
        <b-modal
            centered
            cancel-title="لغو"
            ok-title="ثبت نهایی"
            @ok.prevent="saveInvoiceHandler"
            title="ثبت نهایی فاکتور"
            v-model="saveInvoiceModalShow"
            cancel-variant="outline-secondary"
        >
            <b-alert
                v-height-fade
                :show="messageFlag === 'modal' && messages.length > 0"
                :variant="messageVariant"
            >
                <div class="alert-body">
                    <small
                        class="d-block"
                        v-for="(message, index) in messages"
                        :key="index"
                    >
                        {{ message }}
                    </small>
                </div>
            </b-alert>
            <span class="h4 font-weight-bolder mt-3">
                موارد انتخابی شما محاسبه گردید
            </span>
            <h6 class="font-weight-bolder mb-0 mt-3">
                {{ addCurrencyMask(total) }} <small>تومان</small>
            </h6>
            <small class="text-muted"> مبلغ نهایی فاکتور </small>
            <div class="mt-2">
                <b-form-checkbox
                    v-model="pay_with_wallet"
                    :value="userWalletId"
                >
                    <small
                        >پرداخت با اعتبارات ({{
                            addCurrencyMask(userWalletAmount)
                        }}
                        تومان)</small
                    >
                </b-form-checkbox>
            </div>
        </b-modal>
        <!-- save invoice modal -->

        <BCard>
            <h4 class="mb-2">ثبت فاکتور جدید</h4>
            <b-alert
                v-height-fade
                :show="messageFlag === 'card' && messages.length > 0"
                :variant="messageVariant"
            >
                <div class="alert-body">
                    <small
                        class="d-block"
                        v-for="(message, index) in messages"
                        :key="index"
                    >
                        {{ message }}
                    </small>
                </div>
            </b-alert>
            <div class="row">
                <div class="col-lg-4 form-group">
                    <label>مشتری</label>
                    <v-select
                        dir="rtl"
                        v-model="customer"
                        :options="customerOptions"
                        size="sm"
                        label="name"
                        @input="changeWalletHandler(customer.id)"
                        :clearable="false"
                        placeholder="انتخاب کنید.."
                    >
                        <template #no-options>
                            رکوردی برای نمایش وجود ندارد
                        </template>
                    </v-select>
                </div>
                <div class="col-lg-4 form-group">
                    <label>مبلغ</label>
                    <b-form-input autocomplete="off"
                        v-model="amount"
                        class="d-inline-block mr-1"
                        placeholder="مبلغ"
                        @input="changeCurrencyMask('amount')"
                    />
                </div>
                <div class="col-lg-4 form-group">
                    <label>کد تخفیف</label>
                    <b-form-input autocomplete="off"
                        v-model="discount"
                        class="d-inline-block mr-1"
                        placeholder="کد تخفیف"
                    />
                </div>
                <div class="col-lg-4">
                    <b-form-group>
                        <label for="" class="font-weight-bold"> تاریخ </label>
                        <date-picker id="date" v-model="date" clearable />
                    </b-form-group>
                </div>
                <div class="col-lg-4 form-group">
                    <label>شماره فاکتور</label>
                    <b-form-input autocomplete="off"
                        v-model="number"
                        class="d-inline-block mr-1"
                        placeholder="شماره فاکتور"
                    />
                </div>
                <div class="col-lg-4 form-group">
                    <label>شعبه</label>
                    <v-select
                        dir="rtl"
                        v-model="branch"
                        :options="branchOptions"
                        size="sm"
                        label="name"
                        :clearable="false"
                        placeholder="انتخاب کنید.."
                    >
                        <template #no-options>
                            رکوردی برای نمایش وجود ندارد
                        </template>
                    </v-select>
                </div>
                <div class="col-lg-4 form-group">
                    <label>نوع</label>
                    <v-select
                        dir="rtl"
                        v-model="type"
                        :options="typeOptions"
                        size="sm"
                        label="type"
                        :clearable="false"
                        placeholder="انتخاب کنید.."
                    >
                        <template #no-options>
                            رکوردی برای نمایش وجود ندارد
                        </template>
                    </v-select>
                </div>
                <div class="col-lg-4 form-group">
                    <label>کاربر ثبت کننده</label>
                    <v-select
                        dir="rtl"
                        v-model="created_By"
                        :options="users"
                        size="sm"
                        label="name"
                        :clearable="false"
                        placeholder="انتخاب کنید.."
                    >
                        <template #no-options>
                            رکوردی برای نمایش وجود ندارد
                        </template>
                    </v-select>
                </div>
                <div class="col-lg-4 form-group">
                    <label>توضیحات</label>
                    <b-form-textarea
                        placeholder="توضیحات"
                        v-model="description"
                        rows="2"
                    />
                </div>
                <div class="col-lg-4">
                    <label for="">مالیات</label>
                    <b-form-group>
                        <b-form-checkbox
                            v-for="taxOption in taxOptions"
                            :value="taxOption.id"
                            :key="taxOption.id"
                            v-model="tax"
                        >
                            <small>
                                {{ taxOption.label }}
                            </small>
                        </b-form-checkbox>
                    </b-form-group>
                </div>
            </div>
            <div class="text-right">
                <b-button variant="primary" @click="calculateInvoiceHandler">
                    <span class="text-nowrap">ثبت و محاسبه</span>
                </b-button>
            </div>
        </BCard>
    </div>
</template>

<script>
import {
    BFormCheckbox,
    BCard,
    BButton,
    BInputGroupAppend,
    BFormRadio,
    BInputGroup,
    BFormInput,
    BFormSelect,
    BFormGroup,
    BCardText,
    BFormTextarea,
    BRow,
    BAlert,
    BCol,
} from "bootstrap-vue";
import _ from "lodash";
import axios from "axios";
import vSelect from "vue-select";
import { heightFade } from "@core/directives/animations";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import AlertMessage from "../../components/alert-message/AlertMessage.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    components: {
        datePicker: VuePersianDatetimePicker,
        BFormCheckbox,
        BCard,
        BButton,
        BInputGroupAppend,
        BInputGroup,
        BFormInput,
        BFormSelect,
        BFormGroup,
        BCardText,
        BFormTextarea,
        BFormRadio,
        BRow,
        BAlert,
        BCol,
        vSelect,
        "alert-message": AlertMessage,
    },
    data() {
        return {
            // form messages
            messages: [],
            messageFlag: undefined,
            messageVariant: undefined,
            // invoice modal flag
            saveInvoiceModalShow: false,
            // invoice form
            customer: undefined,
            amount: undefined,
            date: undefined,
            number: undefined,
            branch: undefined,
            discount: undefined,
            wallet: undefined,
            description: undefined,
            pay_with_wallet: undefined,
            type: undefined,
            tax: [],
            taxOptions: [],
            typeOptions: [
                { type: "فروش", value: "sale" },
                { type: "بازگشت", value: "sale" },
            ],
            customerOptions: [],
            branchOptions: [],
            total: 0,
            userWalletId: undefined,
            userWalletAmount: 0,
            submitted: false,
            created_By: undefined,
            users: undefined,
        };
    },
    directives: {
        "height-fade": heightFade,
    },
    watch: {
        amount(newValue, oldValue) {
            const result = newValue
                .toString()
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            this.$nextTick(() => (this.amount = result));
        },
    },
    methods: {
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
        calculateInvoiceHandler() {
            this.messages = [];
            this.submitted = true;

            const params = {
                sub_total: this.removeCurrencyMask(this.amount),
                taxes: this.tax,
                discount_code: this.discount,
            };
            axios
                .post(`${process.env.VUE_APP_URL}/bills/total`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.total = response.data.total;
                    this.saveInvoiceModalShow = true;
                })
                .catch((error) => {
                    switch (error.response.status) {
                        case 404:
                            this.messages = ["کاربری با مشخصات شما پیدا نشد!"];
                            break;
                        case 422:
                            this.messages = _.flatten(
                                Object.values(error.response.data.errors)
                            );
                            break;
                        default:
                            this.messages = [
                                "خطایی رخ داده است ، دوباره تلاش کنید.",
                            ];
                            break;
                    }
                    this.messageVariant = "danger";
                    this.messageFlag = "card";
                });
        },
        changeWalletHandler(id) {
            const customer = _.find(this.customerOptions, { id });
            this.userWalletId = customer.wallets[0].id;
            this.userWalletAmount = customer.wallets[0].balance;
        },
        saveInvoiceHandler() {
            this.messages = [];

            const params = {
                taxes: this.tax,
                number: this.number,
                bill_date: this.date,
                discount_code: this.discount,
                description: this.description,
                pay_with_wallet: this.pay_with_wallet,
                type: this.type ? this.type.value : undefined,
                sub_total: this.removeCurrencyMask(this.amount),
                branch_id: this.branch ? this.branch.id : undefined,
                customer_id: this.customer ? this.customer.id : undefined,
                created_by: this.created_By ? this.created_By.id : undefined,
            };

            axios
                .post(`${process.env.VUE_APP_URL}/bills/store`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.$router.replace("/sales/list").then(() => {
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: `فاکتور فروش جدید`,
                                icon: "CheckIcon",
                                variant: "success",
                                text: `فاکتور فروش جدید با موفقیت ثبت شد.`,
                            },
                        });
                    });
                })
                .catch((error) => {
                    switch (error.response.status) {
                        case 404:
                            this.messages = ["کاربری با مشخصات شما پیدا نشد!"];
                            break;
                        case 422:
                            this.messages = _.flatten(
                                Object.values(error.response.data.errors)
                            );
                            break;
                        default:
                            this.messages = [
                                "خطایی رخ داده است ، دوباره تلاش کنید.",
                            ];
                            break;
                    }
                    this.messageVariant = "danger";
                    this.messageFlag = "modal";
                });
        },
    },
    mounted() {
        //  get taxes
        axios
            .get(`${process.env.VUE_APP_URL}/taxes/active`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((response) => {
                this.taxOptions = response.data.data;
            })
            .catch((error) => {});
        // get branches
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
            })
            .catch((error) => {});
        // get customers
        axios
            .get(`${process.env.VUE_APP_URL}/users?with=wallets`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((response) => {
                this.customerOptions = _.map(response.data.data, (item) => {
                    return {
                        ...item,
                        name: item.first_name
                            ? `${item.first_name} ${item.last_name}`
                            : item.username,
                    };
                });
            })
            .catch((error) => {});
        // GET USERS FOR CREATED FIELD
        axios
            .get(`${process.env.VUE_APP_URL}/users/admin/seller`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((response) => {
                this.users = _.map(response.data.users, (item) => {
                    return {
                        ...item,
                        name: item.first_name + " " + item.last_name,
                    };
                });
            })
            .catch((error) => {});
    },
};
</script>

<style lang="scss"></style>
