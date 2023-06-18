<template>
    <div>
        <b-form-group>
            <b-button
                @click="$router.push({ name: 'customers-createPerson' })"
                class="form-group bg-blue-1 mr-1 px-3"
                >ثبت کامل
                <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
            </b-button>
            <b-button
                @click="$router.push({ name: 'customers-categories' })"
                class="form-group bg-blue-2 mr-1 px-3"
                >گروه ها
                <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
            </b-button>
            <!-- <b-button
                v-b-toggle.quick-create
                class="form-group bg-blue-3 mr-1 px-3"
                >ثبت سریع
                <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
            </b-button> -->
            <b-button
                @click="$router.push({ name: 'customers-tags' })"
                class="form-group bg-blue-4 mr-1 px-3"
                >برچسب ها
                <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
            </b-button>
        </b-form-group>
        <b-alert
            v-height-fade.appear
            :show="this.alert.visible"
            dismissible
            class="mb-2 mt-1"
            :variant="this.alert.type"
        >
            <div class="alert-body">
                {{ this.alert.text }}
            </div>
        </b-alert>
        <app-collapse class="form-group">
            <app-collapse-item title="فیلتر">
                <b-form @submit.prevent="filterUsersHandler">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group>
                                <label>انتخاب برچسب ها</label>
                                <v-select
                                    class="bg-white"
                                    v-model="selectTags"
                                    dir="rtl"
                                    multiple
                                    label="name"
                                    :options="tags"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" md="3" lg="3" xl="3" sm="3">
                            <b-form-group>
                                <label>انتخاب سطح مشتری</label>
                                <v-select
                                    class="bg-white"
                                    v-model="userLevels"
                                    dir="rtl"
                                    multiple
                                    label="title"
                                    :options="userLevelsOptions"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="3" lg="3" xl="3" sm="3">
                            <b-form-group>
                                <label>انتخاب دسته بندی</label>
                                <v-select
                                    class="bg-white"
                                    v-model="userSelectedGroup"
                                    dir="rtl"
                                    multiple
                                    label="name"
                                    :options="userGroups"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="3" lg="3" xl="3" sm="3">
                            <b-form-group>
                                <label>انتخاب نقش کاربر</label>
                                <v-select
                                    class="bg-white"
                                    v-model="userSelectedRoles"
                                    dir="rtl"
                                    multiple
                                    label="display_name"
                                    :options="userRoles"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="3" lg="3" xl="3" sm="3">
                            <b-form-group>
                                <label>انتخاب شعبه</label>
                                <v-select
                                    class="bg-white"
                                    v-model="branch"
                                    dir="rtl"
                                    label="name"
                                    :options="branchOptions"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="از اعتبار"
                                label-for="min-credit"
                                label-cols-md="4"
                            >
                                <b-form-input
                                    autocomplete="off"
                                    id="min-credit"
                                    v-model="minCredit"
                                    @input="changeCurrencyMask('minCredit')"
                                    placeholder="از اعتبار.."
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تا اعتبار"
                                label-for="max-credit"
                                label-cols-md="4"
                            >
                                <b-form-input
                                    autocomplete="off"
                                    id="max-credit"
                                    v-model="maxCredit"
                                    @input="changeCurrencyMask('maxCredit')"
                                    placeholder="تا اعتبار.."
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="از امتیاز"
                                label-for="min-point"
                                label-cols-md="4"
                            >
                                <b-form-input
                                    autocomplete="off"
                                    id="min-point"
                                    v-model="minPoint"
                                    placeholder="از امتیاز.."
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تا امتیاز"
                                label-for="max-point"
                                label-cols-md="4"
                            >
                                <b-form-input
                                    autocomplete="off"
                                    id="max-point"
                                    v-model="maxPoint"
                                    placeholder="تا امتیاز.."
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="از تاریخ ایجاد"
                                label-for="min-date"
                                label-cols-md="4"
                            >
                                <date-picker
                                    id="min-date-create"
                                    v-model="minUserCreatedDate"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تا تاریخ ایجاد"
                                label-for="max-date"
                                label-cols-md="4"
                            >
                                <date-picker
                                    id="max-date-create"
                                    v-model="maxUserCreatedDate"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="از تاریخ ازدواج"
                                label-for="min-date-marriage"
                                label-cols-md="4"
                            >
                                <date-picker
                                    id="min-date-marriage"
                                    v-model="minMarriageDate"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تا تاریخ ازدواج"
                                label-for="max-date-marriage"
                                label-cols-md="4"
                            >
                                <date-picker
                                    id="max-date-marriage"
                                    v-model="maxMarriageDate"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="از تاریخ تولد"
                                label-for="min-date-birth"
                                label-cols-md="4"
                            >
                                <date-picker
                                    id="min-date-birth"
                                    v-model="minBirthDate"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تا تاریخ تولد"
                                label-for="max-date-birth"
                                label-cols-md="4"
                            >
                                <date-picker
                                    id="max-date-birth"
                                    v-model="maxBirthDate"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="از تاریخ تولد همسر"
                                label-for="min-date-partner-birth"
                                label-cols-md="4"
                            >
                                <date-picker
                                    id="min-date-partner-birth"
                                    v-model="minPartnerBirthDate"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تا تاریخ تولد همسر"
                                label-for="max-date-partner-birth"
                                label-cols-md="4"
                            >
                                <date-picker
                                    id="max-date-partner-birth"
                                    v-model="maxPartnerBirthDate"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="سالگرد ازدواج"
                                label-for="anniversary"
                                label-cols-md="4"
                            >
                                <date-picker
                                    id="anniversary"
                                    v-model="anniversaryDate"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تاریخ تولد همسر"
                                label-for="birthday-love"
                                label-cols-md="4"
                            >
                                <date-picker
                                    id="birthday-love"
                                    v-model="partnerBirthDate"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="از تعداد خرید"
                                label-for="min-count"
                                label-cols-md="4"
                            >
                                <b-form-input
                                    autocomplete="off"
                                    id="min-count"
                                    v-model="minBillCount"
                                    placeholder="از تعداد خرید.."
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تا تعداد خرید"
                                label-for="max-count"
                                label-cols-md="4"
                            >
                                <b-form-input
                                    autocomplete="off"
                                    id="max-count"
                                    v-model="maxBillCount"
                                    placeholder="تا تعداد خرید.."
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="از حجم خرید"
                                label-for="min-value"
                                label-cols-md="4"
                            >
                                <b-form-input
                                    autocomplete="off"
                                    id="min-value"
                                    v-model="minBillAmount"
                                    @input="changeCurrencyMask('minBillAmount')"
                                    placeholder="از حجم خرید.."
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تا حجم خرید"
                                label-for="max-value"
                                label-cols-md="4"
                            >
                                <b-form-input
                                    autocomplete="off"
                                    id="max-value"
                                    v-model="maxBillAmount"
                                    @input="changeCurrencyMask('maxBillAmount')"
                                    placeholder="تا حجم خرید.."
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="ازآخرین‌ تاریخ‌ خرید"
                                label-for="minLastBillDate"
                                label-cols-md="4"
                            >
                                <date-picker
                                    id="minLastBillDate"
                                    v-model="minLastBillDate"
                                    clearable
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6" lg="6" xl="6" sm="6">
                            <b-form-group
                                label="تاآخرین ‌تاریخ ‌خرید"
                                label-for="maxLastBillDate"
                                label-cols-md="4"
                            >
                                <date-picker
                                    id="maxLastBillDate"
                                    v-model="maxLastBillDate"
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
        <b-card no-body>
            <b-card-header>
                <div
                    class="w-100 d-flex flex-row justify-content-between align-items-center"
                >
                    <h4 class="mb-0">لیست مشتریان</h4>
                    <div v-if="this.userData">
                        <b-button
                            variant="warning"
                            class="mr-1"
                            @click="sendSms"
                            v-b-modal.modal-warning
                        >
                            <span class="text-nowrap">ارسال پیامک</span>
                        </b-button>
                    </div>
                    <div v-else></div>
                </div>
                <b-modal
                    id="modal-warning"
                    ok-only
                    @ok="sendSmsHandler"
                    ok-variant="warning"
                    ok-title="ارسال"
                    size="lg"
                    modal-class="modal-warning"
                    centered
                    title="ارسال پیامک"
                >
                    <b-card-text>
                        شما درحال ارسال پیامک به
                        {{ this.smsNums }} کاربر هستید
                    </b-card-text>
                    <b-button
                        v-for="button in buttons"
                        :key="button.index"
                        @click="addVar(button.en_name)"
                        size="sm"
                        class="mr-1 mb-1"
                        variant="warning"
                    >
                        {{ button.fa_name }}
                    </b-button>
                    <div>
                        <label for="message"
                            >برای افزودن متغیر از دکمه های بالا استفاده
                            نمایید</label
                        >
                        <b-form-textarea
                            v-model="smsTemplate"
                            id="message"
                            placeholder="برای افزودن متغیر از دکمه های بالا استفاده نمایید"
                            rows="3"
                            no-resize
                        />
                    </div>
                </b-modal>
            </b-card-header>
            <b-table
                responsive
                :striped="striped"
                :bordered="bordered"
                :outlined="outlined"
                :fields="fields"
                :items="users"
                show-empty
            >
                <template #empty>
                    <div class="text-center">
                        <h4 class="text-muted text-center">موردی یافت نشد</h4>
                    </div>
                </template>
                <template #cell(checkBox)="data">
                    <b-form-group>
                        <b-form-checkbox-group v-model="chosen">
                            <b-form-checkbox
                                :value="data.item.id"
                            ></b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                </template>
                <template #cell(fullname)="data">
                    {{ data.item.first_name ? data.item.first_name : "--" }}
                    {{ data.item.last_name ? data.item.last_name : "--" }}
                </template>
                <template #cell(customer_code)="data">
                    {{ data.item.profile.code }}
                </template>
                <template #cell(age)="data">
                    <span class="text-center d-block">
                        {{ data.item.profile.age }}
                    </span>
                </template>
                <template #cell(wallet_amount)="data">
                    {{
                        data.item.wallet
                            ? addCurrencyMask(data.item.wallet[0].balance) +
                              " تومان"
                            : ""
                    }}
                </template>
                <template #cell(action)="data">
                    <b-button
                        variant="gradient-info"
                        class="btn-icon"
                        @click="userEditHandler(data.item)"
                    >
                        <feather-icon icon="Edit2Icon" />
                    </b-button>
                </template>
            </b-table>
            <div class="d-flex justify-content-center my-1">
                <b-pagination
                    v-model="page"
                    :per-page="perPage"
                    :total-rows="total"
                    @change="pageChangeHandler"
                ></b-pagination>
            </div>
        </b-card>
    </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import vSelect from "vue-select";
import { heightFade } from "@core/directives/animations";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import {
    BForm,
    VBToggle,
    BInputGroupAppend,
    BButton,
    BAlert,
    BFormInput,
    BFormGroup,
    BCardHeader,
    BCol,
    BRow,
    BTable,
    BCard,
    BPagination,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormTextarea,
    BCardText
} from "bootstrap-vue";
export default {
    components: {
        BForm,
        VBToggle,
        datePicker: VuePersianDatetimePicker,
        AppCollapse,
        AppCollapseItem,
        BInputGroupAppend,
        BButton,
        BAlert,
        BFormInput,
        BFormGroup,
        BCard,
        BCol,
        BRow,
        BTable,
        BCardHeader,
        BPagination,
        BFormCheckbox,
        BFormCheckboxGroup,
        vSelect,
        BFormTextarea,
        BCardText
    },
    directives: {
        "b-toggle": VBToggle,
        "height-fade": heightFade
    },
    data() {
        return {
            permissions: JSON.parse(localStorage.getItem("userData")),
            userData: undefined,
            chosen: undefined,
            buttons: [
                {
                    name: "نام کامل",
                    value: "FullName"
                },
                {
                    name: "امتیاز دریافتی",
                    value: "Point"
                },
                {
                    name: "اعتبار دریافتی",
                    value: "Credit"
                }
            ],
            // table
            page: 1,
            total: 0,
            perPage: 10,
            striped: true,
            bordered: true,
            outlined: true,
            fields: [
                { key: "checkBox", label: "انتخاب" },
                { key: "fullname", label: "نام" },
                { key: "customer_code", label: "کد مشتری" },
                { key: "age", label: "طول عمر" },
                { key: "wallet_amount", label: "اعتبارات" },
                { key: "action", label: "عملیات" }
            ],
            buttons: [
                {
                    name: "نام کامل",
                    value: "FullName"
                },
                {
                    name: "امتیاز دریافتی",
                    value: "Point"
                },
                {
                    name: "اعتبار دریافتی",
                    value: "Credit"
                }
            ],
            // filters
            userLevels: undefined,
            userLevelsOptions: undefined,
            smsTemplate: "",
            users: [],
            smsNums: undefined,
            selectedUsers: [],
            userGroups: [],
            userSelectedGroup: [],
            tags: [],
            selectTags: [],
            userRoles: [],
            userSelectedRoles: [],
            branch: undefined,
            branchOptions: [],
            minCredit: null,
            maxCredit: null,
            minPoint: null,
            maxPoint: null,
            minUserCreatedDate: null,
            maxUserCreatedDate: null,
            minMarriageDate: null,
            maxMarriageDate: null,
            minPartnerBirthDate: null,
            maxPartnerBirthDate: null,
            minBirthDate: null,
            maxBirthDate: null,
            anniversaryDate: null,
            partnerBirthDate: null,
            minBillCount: null,
            maxBillCount: null,
            minBillAmount: null,
            maxBillAmount: null,
            minLastBillDate: null,
            maxLastBillDate: null
        };
    },
    mounted() {
        const userInfo = _.map(this.permissions.ability, item => {
            return item.action;
        });
        const smsPer = _.includes(userInfo, "backend.users.send-sms");
        if (smsPer == true) {
            this.userData = true;
        } else {
            this.userData = false;
        }
        this.getTemplates();
        setTimeout(() => {
            this.$store.commit("app/setAlert", false);
        }, 7000);
        this.getUsers();
        // get branches
        axios
            .get(`${process.env.VUE_APP_URL}/branches/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`
                }
            })
            .then(response => {
                this.branchOptions = response.data.data;
            });
        //get customer levels
        axios
            .get(`${process.env.VUE_APP_URL}/levels`, {
                params: {},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`
                }
            })
            .then(res => {
                this.userLevelsOptions = res.data.data;
            });
        // get groups
        axios
            .get(`${process.env.VUE_APP_URL}/groups/all/users?flatten=true`, {
                params: {},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`
                }
            })
            .then(res => {
                this.userGroups = res.data;
            });
        // get roles
        axios
            .get(`${process.env.VUE_APP_URL}/roles`, {
                params: {},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`
                }
            })
            .then(res => {
                this.userRoles = res.data.data;
            });
        // get tags
        axios
            .get(`${process.env.VUE_APP_URL}/tags/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`
                }
            })
            .then(res => {
                this.tags = res.data.data;
            });
    },
    computed: {
        alert: {
            get() {
                return this.$store.getters["app/getAlert"];
            },
            set(value) {
                this.$store.commit("app/setAlert", value);
            }
        }
    },
    methods: {
        getTemplates() {
            axios
                .get(`${process.env.VUE_APP_URL}/sms/templates`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(({ data }) => {
                    this.buttons = data;
                });
        },
        addVar(a) {
            this.smsTemplate += `[${a}]`;
        },
        sendSms() {
            if (this.chosen ? this.chosen.length : 0) {
                this.smsNums = this.chosen.length;
            } else {
                this.smsNums = 0;
            }
        },
        sendSmsHandler() {
            const params = {
                user_ids: this.chosen,
                message: this.smsTemplate
            };
            axios
                .post(`${process.env.VUE_APP_URL}/sms/send`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(res => {})
                .catch(error => {});
        },
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
        // navigate user to edit page with id parameter
        userEditHandler(item) {
            this.$router.replace({
                name: "customers-editPerson",
                params: {
                    id: item.id
                }
            });
        },
        // get users with filter parameters
        getUsers(params = {}) {
            const _params = {
                ...params,
                // pagination parameters
                page: this.page,
                "per-page": this.perPage,
                // get users with their wallets
                with: "wallets"
            };
            axios
                .get(`${process.env.VUE_APP_URL}/users`, {
                    params: _params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(res => {
                    console.log(res);
                    // setting pagination data
                    this.perPage = parseInt(res.data.meta.per_page);
                    this.total = res.data.meta.total;
                    // setting users list
                    this.users = res.data.data;
                });
        },
        // reset pagination when filter refreshed
        resetPagination() {
            this.page = 1;
        },
        // navigate between list pages (paginate)
        pageChangeHandler(value) {
            this.page = value;
            this.filterUsersHandler();
        },
        // filter users
        filterUsersHandler() {
            const params = {
                from_user_created_at: this.minUserCreatedDate,
                to_user_created_at: this.maxUserCreatedDate,
                form_partner_birth_date: this.minPartnerBirthDate,
                to_partner_birth_date: this.maxPartnerBirthDate,
                from_marriage_date: this.minMarriageDate,
                to_marriage_date: this.maxMarriageDate,
                from_brith_date: this.minBirthDate,
                to_brith_date: this.maxBirthDate,
                anniversary_date: this.anniversaryDate,
                min_credit: this.minCredit
                    ? this.removeCurrencyMask(this.minCredit)
                    : undefined,
                max_credit: this.maxCredit
                    ? this.removeCurrencyMask(this.maxCredit)
                    : undefined,
                min_point: this.maxPoint,
                max_point: this.minPoint,
                from_bill_created_at: this.minLastBillDate,
                to_bill_created_at: this.maxLastBillDate,
                min_bill_amount: this.minBillAmount
                    ? this.removeCurrencyMask(this.minBillAmount)
                    : undefined,
                max_bill_amount: this.maxBillAmount
                    ? this.removeCurrencyMask(this.maxBillAmount)
                    : undefined,
                min_bills_count: this.minBillCount,
                max_bills_count: this.maxBillCount,
                role: _.map(this.userSelectedRoles, item => {
                    return item.id;
                }),
                branch_id: this.branch ? this.branch.id : undefined,
                tag_id: _.map(this.selectTags, item => {
                    return item.tag_id;
                }),
                group_id: _.map(this.userSelectedGroup, item => {
                    return item.id;
                }),
                level_ids: _.map(this.userLevels, item => {
                    return item.id;
                })
            };
            console.log(params);
            this.getUsers(params);
        },
        // filter form reset action
        resetHandler() {
            this.page = 1;
            this.minUserCreatedDate = undefined;
            this.maxUserCreatedDate = undefined;
            this.minPartnerBirthDate = undefined;
            this.maxPartnerBirthDate = undefined;
            this.minMarriageDate = undefined;
            (this.minBirthDate = undefined),
                (this.maxBirthDate = undefined),
                (this.maxMarriageDate = undefined);
            this.anniversaryDate = undefined;
            this.minCredit = undefined;
            this.minCredit = undefined;
            this.maxCredit = undefined;
            this.maxCredit = undefined;
            this.maxPoint = undefined;
            this.minPoint = undefined;
            this.minLastBillDate = undefined;
            this.maxLastBillDate = undefined;
            this.minBillAmount = undefined;
            this.minBillAmount = undefined;
            this.maxBillAmount = undefined;
            this.maxBillAmount = undefined;
            this.minBillCount = undefined;
            this.maxBillCount = undefined;
            this.userSelectedRoles = undefined;
            this.branch = undefined;
            this.branch = undefined;
            this.selectTags = undefined;
            this.userSelectedGroup = undefined;

            this.getUsers();
        }
    }
};
</script>

<style lang="scss">
table.table {
    & td:nth-child(1) {
        width: 200px !important;
    }
    & td:nth-child(3) {
        width: 100px !important;
    }
}
.bg-blue-3 {
    background-color: #4a47a3 !important;
}
.bg-blue-4 {
    background-color: #537ec5 !important;
}
.bg-blue-1 {
    background-color: #4a69bb !important;
}
</style>
