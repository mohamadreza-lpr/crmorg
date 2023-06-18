<template>
    <div>
        <!-- Table Container Card -->
        <app-collapse class="form-group">
            <app-collapse-item title="فیلتر">
                <b-form @submit.prevent="filterUsersHandler">
                    <b-row>
                        <b-col cols="12" md="4" lg="4" xl="4" sm="4">
                            <b-form-group>
                                <label>نام</label>
                                <b-form-input autocomplete="off"
                                    id="first-name"
                                    v-model="firstName"
                                    placeholder="نام کاربر را وارد نمایید"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="4" lg="4" xl="4" sm="4">
                            <b-form-group>
                                <label>نام خانوادگی</label>
                                <b-form-input autocomplete="off"
                                    id="last-name"
                                    v-model="lastName"
                                    placeholder="نام خانوادگی کاربر را وارد نمایید"
                                />
                            </b-form-group>
                        </b-col>
                        <!-- <b-col cols="12" md="4" lg="4" xl="4" sm="4">
                            <b-form-group>
                                <label>شماره تماس</label>
                                <b-form-input autocomplete="off"
                                    type="number"
                                    id="telephone"
                                    v-model="telNumber"
                                    placeholder="شماره تماس را وارد نمایید"
                                />
                            </b-form-group>
                        </b-col> -->
                        <b-col cols="12" md="4" lg="4" xl="4" sm="4">
                            <b-form-group>
                                <label>انتخاب نقش کاربر</label>
                                <v-select
                                    class="bg-white"
                                    dir="rtl"
                                    multiple
                                    label="display_name"
                                    v-model="role"
                                    :options="roleOptions"
                                >
                                    <template #no-options>
                                        موردی یافت نشد
                                    </template>
                                </v-select>
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
        <b-card no-body class="mb-0">
            <div class="m-2">
                <!-- Table Top -->
                <b-row>
                    <!-- Per Page -->
                    <b-col
                        cols="12"
                        md="6"
                        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                    >
                        <h3>لیست کاربران</h3>
                        <!-- <label>تعداد در صفحه</label>
                        <v-select
                            dir="rtl"
                            id="per-page-select"
                            v-model="perPage"
                            size="sm"
                            :clearable="false"
                            class="per-page-selector d-inline-block mx-50"
                        />
                        <label>ردیف</label> -->
                    </b-col>

                    <!-- Search -->
                    <b-col cols="12" md="6">
                        <div
                            class="d-flex align-items-center justify-content-end"
                        >
                            <!-- <b-form-input autocomplete="off"
                                v-model="filter"
                                class="d-inline-block mr-1"
                                placeholder="جستجو..."
                            /> -->
                            <b-button
                                variant="warning"
                                class="mr-1"
                                @click="sendSms"
                                v-b-modal.modal-warning
                            >
                                <span class="text-nowrap">ارسال پیامک</span>
                            </b-button>
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
                                        >برای افزودن متغیر از دکمه های بالا
                                        استفاده نمایید</label
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
                            <b-button
                                variant="primary"
                                @click="isAddNewUserSidebarActive"
                            >
                                <span class="text-nowrap">افزودن کاربر</span>
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
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
            </div>

            <b-table
                :items="items"
                :fields="fields"
                :bordered="bordered"
                :outlined="outlined"
                :striped="striped"
                class="mb-0"
                responsive
                empty-text="رکوردی یافت نشد"
                show-empty
            >
                <!-- name and userName -->
                <template #emptyfiltered>
                    <h5 class="text-danger">رکوردی برای نمایش وجود ندارد</h5>
                </template>
                <template #head(checkBox)>
                    <b-form-checkbox
                        v-model="isCheckedAll"
                        @change="checkAll"
                    ></b-form-checkbox>
                    انتخاب
                </template>
                <template #cell(index)="data">
                    <div class="d-flex align-items-center">
                        {{ data.index }}
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

                <template #cell(name)="data">
                    <div class="d-flex align-items-center">
                        <span
                            class="is-phone-active"
                            :class="
                                data.item.has_active_phone
                                    ? 'bg-success'
                                    : 'bg-danger'
                            "
                        ></span>
                        <div>
                            <div class="font-weight-bolder d-inline">
                                {{ data.item.first_name }}
                                {{ data.item.last_name }}
                            </div>
                            <div class="font-small-3 text-muted">
                                {{ data.item.username }}
                            </div>
                        </div>
                    </div>
                </template>

                <!-- email -->
                <template #cell(email)="data">
                    <div class="d-inline">
                        <b-avatar size="22" variant="light-danger">
                            <feather-icon size="13" icon="MailIcon" />
                        </b-avatar>
                        <div class="font-weight-bolder d-inline">
                            {{ data.item.email }}
                        </div>
                    </div>
                </template>

                <template #cell(type)="data">
                    <div class="d-inline">
                        <div
                            class="font-weight-bolder d-inline"
                            v-for="type in data.item.role"
                            :key="type.id"
                        >
                            <b-badge variant="primary">
                                {{ type }}
                            </b-badge>
                        </div>
                    </div>
                </template>

                <!-- actions -->
                <template #cell(actions)="data">
                    <b-button
                        variant="gradient-info"
                        class="btn-icon"
                        @click="editAction(data.item.id)"
                    >
                        <feather-icon icon="Edit2Icon" />
                    </b-button>
                </template>
            </b-table>
            <div class="mx-2 mb-2">
                <b-row>
                    <!-- Pagination -->
                    <b-col
                        cols="12"
                        sm="12"
                        class="d-flex align-items-center justify-content-center"
                    >
                        <b-pagination
                            v-model="page"
                            :total-rows="total"
                            :per-page="perPage"
                            @change="pageChanger"
                            first-number
                            last-number
                            class="mb-0 mt-1 mt-sm-0"
                            prev-class="prev-item"
                            next-class="next-item"
                        >
                            <template #prev-text>
                                <feather-icon
                                    icon="ChevronRightIcon"
                                    size="18"
                                />
                            </template>
                            <template #next-text>
                                <feather-icon
                                    icon="ChevronRightIcon"
                                    size="18"
                                />
                            </template>
                        </b-pagination>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </div>
</template>

<script>
import {
    BForm,
    VBToggle,
    BInputGroupAppend,
    BCard,
    BRow,
    BCol,
    BAlert,
    BFormGroup,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BFormCheckbox,
    BFormCheckboxGroup,
    BModal,
    VBModal,
    BFormTextarea,
    BCardText,
} from "bootstrap-vue";
import _ from "lodash";
import axios from "axios";
import vSelect from "vue-select";
import UserListAddNew from "./UserListAddNew.vue";
import UsersListFilters from "./UsersListFilters.vue";
import { heightFade } from "@core/directives/animations";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import Ripple from "vue-ripple-directive";

export default {
    components: {
        BModal,
        BFormGroup,
        AppCollapse,
        AppCollapseItem,
        BForm,
        VBToggle,
        datePicker: VuePersianDatetimePicker,
        BInputGroupAppend,
        UsersListFilters,
        UserListAddNew,
        BAlert,
        BCard,
        BRow,
        BCol,
        BFormInput,
        BButton,
        BTable,
        BMedia,
        BAvatar,
        BLink,
        BBadge,
        BDropdown,
        BDropdownItem,
        BPagination,
        BFormCheckbox,
        BFormCheckboxGroup,
        vSelect,
        BFormTextarea,
        BCardText,
    },
    directives: {
        "height-fade": heightFade,
        "b-modal": VBModal,
        Ripple,
    },
    data() {
        return {
            hasActivePhones: false,
            isCheckedAll: false,
            firstName: undefined,
            lastName: undefined,
            telNumber: undefined,
            role: [],
            roleOptions: [],
            chosen: undefined,
            active: false,
            page: 1,
            perPage: 5,
            total: undefined,
            pageOptions: [5, 10, 15],
            tableItems: [],
            indexNum: 0,
            sortBy: "",
            sortDesc: false,
            sortDirection: "asc",
            striped: true,
            bordered: true,
            outlined: true,
            filter: null,
            role: undefined,
            fields: [
                { key: "checkBox", label: "انتخاب", sortable: true },
                { key: "startAt", label: "شماره", sortable: true },
                { key: "name", label: "نام", sortable: true },
                { key: "email", label: "ایمیل", sortable: true },
                { key: "type", label: "نقش", sortable: true },
                { key: "actions", label: "عملیات" },
                // { key: "custom", label: "custom" , sortable: true},
            ],
            items: [],
            smsNums: undefined,
            smsTemplate: "",
            buttons: [
                {
                    name: "نام کامل",
                    value: "FullName",
                },
                {
                    name: "امتیاز دریافتی",
                    value: "Point",
                },
                {
                    name: "اعتبار دریافتی",
                    value: "Credit",
                },
            ],
        };
    },
    mounted() {
        this.getRoles();
        this.getUsers();
        this.getTemplates();
        setTimeout(() => {
            this.$store.commit("app/hideAlert", false);
        }, 7000);
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
    methods: {
        checkAll() {
            if (this.isCheckedAll) {
                const itemsId = _.map(this.items, "id");
                this.chosen = itemsId;
            } else {
                this.chosen = [];
            }
        },
        sendSms() {
            if (this.chosen ? this.chosen.length : 0) {
                this.smsNums = this.chosen.length;
            } else {
                this.smsNums = 0;
            }
        },
        getTemplates() {
            axios
                .get(`${process.env.VUE_APP_URL}/sms/templates`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then(({ data }) => {
                    this.buttons = data;
                });
        },
        addVar(a) {
            this.smsTemplate += `[${a}]`;
        },
        isAddNewUserSidebarActive() {
            this.$router.push("/users/create");
        },
        getUsers(parameters = []) {
            const params = { page: this.page, ...parameters };
            axios
                .get(`${process.env.VUE_APP_URL}/users/admins`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    const items = _.map(response.data.data, (item) => {
                        const hasActivePhone = _.some(item.phones, (_item) => {
                            return _item.status === "فعال";
                        });

                        const roles = _.map(item.role, (_item) => {
                            return _item.display_name;
                        });

                        return {
                            ...item,
                            role: roles,
                            has_active_phone: hasActivePhone,
                        };
                    });
                    this.items = items;
                    this.total = response.data.meta.total;
                    this.perPage = response.data.meta.per_page;
                    this.indexNum = (this.page - 1) * this.perPage;
                    _.map(items, (post) => {
                        this.indexNum++;
                        post.startAt = this.indexNum;
                    });
                })
                .catch((error) => {});
        },
        pageChanger(value) {
            this.isCheckedAll = false;
            this.page = value;
            this.filterUsersHandler();
        },
        editAction(id) {
            this.$router.push({
                name: "apps-users-edit",
                params: {
                    id,
                },
            });
        },
        getRoles() {
            // get roles
            axios
                .get(`${process.env.VUE_APP_URL}/roles`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    const roles = _.filter(response.data.data, (item) => {
                        return item.name != "customer";
                    });
                    this.roleOptions = roles;
                });
        },
        filterUsersHandler() {
            const params = {
                first_name: this.firstName,
                last_name: this.lastName,
                // telephone: this.telNumber,
                roles: _.map(this.role, (item) => {
                    return item.name;
                }),
            };

            this.getUsers(params);
        },
        resetHandler() {
            this.firstName = undefined;
            this.lastName = undefined;
            // this.telNumber = undefined;
            this.role = [];

            this.getUsers();
        },
        sendSmsHandler() {
            const params = {
                user_ids: this.chosen,
                message: this.smsTemplate,
            };

            axios
                .post(`${process.env.VUE_APP_URL}/sms/send`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {})
                .catch((error) => {});
        },
    },
};
</script>

<style lang="scss">
.per-page-selector {
    width: 90px;
}
span.badge.badge-primary {
    margin-left: 3px;
}
table.table {
    & th:first-child {
        text-align: center;
        width: 130px !important;
        & .custom-checkbox {
            display: inline;
            margin-right: 1rem;
        }
    }
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

.is-phone-active {
    width: 11px;
    height: 10px;
    border-radius: 7px;
    margin-right: 10px;
}
</style>
