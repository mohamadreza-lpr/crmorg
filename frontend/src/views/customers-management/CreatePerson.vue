<template>
    <div>
        <b-modal
            hide-footer
            modal-class="modal-danger"
            centered
            title="خطا در ثبت"
            v-model="errorModalShow"
        >
            <b-card-text>
                <div v-for="error in errorsList" :key="error[0]">
                    <b-alert variant="danger" :show="true" class="mb-1">
                        <div class="alert-body">
                            <feather-icon icon="InfoIcon" class="mr-50" />
                            <small>{{ error[0] }}</small>
                        </div>
                    </b-alert>
                </div>
            </b-card-text>
        </b-modal>
        <b-alert
            v-height-fade.appear
            :show="alertCountDown"
            dismissible
            class="mb-2"
            :variant="alertType"
            @dismissed="alertCountDown = 0"
            @dismiss-count-down="countDownChanged"
        >
            <div class="alert-body">
                {{ alertText }}
            </div>
        </b-alert>
        <b-row>
            <b-col md="12" lg="12" sm="12">
                <h4>ثبت مشتری جدید</h4>
                <BCard>
                    <div class="row">
                        <div class="col-12 mb-1">
                            <label>دسته بندی</label>
                            <v-select
                                class="bg-white"
                                v-model="group"
                                placeholder="انتخاب کنید"
                                dir="rtl"
                                label="name"
                                :options="groups"
                            />
                        </div>
                        <div class="col-12 mb-1">
                            <label>انتخاب برچسب ها</label>
                            <v-select
                                class="bg-white"
                                v-model="selected_tags"
                                placeholder="انتخاب کنید"
                                dir="rtl"
                                multiple
                                taggable
                                push-tags
                                label="name"
                                :options="tags"
                            >
                                <template #no-options>موردی یافت نشد</template>
                            </v-select>
                        </div>

                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold">نام</label>
                            <b-form-input
                                autocomplete="off"
                                v-model="firstName"
                                class="d-inline-block mr-1"
                                placeholder="نام"
                            />
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold"
                                >نام خانوادگی</label
                            >
                            <b-form-input
                                autocomplete="off"
                                v-model="lastName"
                                class="d-inline-block mr-1"
                                :class="{
                                    'is-invalid':
                                        userSubmitted &&
                                        $v.userForm.last_name.$error
                                }"
                                placeholder="نام خانوادگی"
                            />
                            <div
                                v-if="
                                    userSubmitted &&
                                        !$v.userForm.last_name.required
                                "
                                class="invalid-feedback d-block"
                            >
                                فیلد نام خانوادگی الزامی است
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold"
                                >نام کاربری</label
                            >
                            <b-form-input
                                autocomplete="off"
                                v-model="userForm.username"
                                class="d-inline-block mr-1"
                                :class="{
                                    'is-invalid':
                                        userSubmitted &&
                                        $v.userForm.username.$error
                                }"
                                placeholder="نام کاربری"
                            />
                            <div
                                v-if="
                                    userSubmitted &&
                                        !$v.userForm.username.required
                                "
                                class="invalid-feedback d-block"
                            >
                                فیلد نام کاربری الزامی است
                            </div>
                        </div>

                        <b-form-group
                            class="col-md-6 form-group"
                            label="رمز عبور"
                            label-for="login-password"
                        >
                            <b-input-group class="input-group-merge">
                                <b-form-input
                                    autocomplete="off"
                                    id="login-password"
                                    v-model="userForm.password"
                                    class="form-control-merge"
                                    :type="passwordFieldType"
                                    name="login-password"
                                    placeholder="رمز عبور خود را وارد کنید"
                                />
                                <b-input-group-append is-text>
                                    <feather-icon
                                        class="cursor-pointer"
                                        :icon="passwordToggleIcon"
                                        @click="togglePasswordVisibility"
                                    />
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>

                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold"
                                >کد مشتری</label
                            >
                            <b-form-input
                                autocomplete="off"
                                id="min-credit"
                                v-model="userForm.customer_code"
                                type="number"
                                placeholder="کد مشتری"
                                :class="{
                                    'is-invalid':
                                        userSubmitted &&
                                        $v.userForm.customer_code.$error
                                }"
                            />
                            <div
                                v-if="
                                    userSubmitted &&
                                        !$v.userForm.customer_code.required
                                "
                                class="invalid-feedback d-block"
                            >
                                فیلد کد مشتری الزامی است
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>عنوان کاربر</label>
                            <v-select
                                dir="rtl"
                                v-model="userForm.user_title"
                                :options="user_title_options"
                                size="sm"
                                label="text"
                                clearable
                                placeholder="انتخاب کنید"
                            >
                                <template #no-options>
                                    رکوردی برای نمایش وجود ندارد
                                </template>
                            </v-select>
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold"
                                >کد ملی</label
                            >
                            <b-form-input
                                autocomplete="off"
                                id="min-credit"
                                v-model="userForm.national_code"
                                type="number"
                                placeholder="کد ملی"
                                :class="{
                                    'is-invalid':
                                        userSubmitted &&
                                        $v.userForm.national_code.$error
                                }"
                            />
                            <div
                                v-if="
                                    userSubmitted &&
                                        !$v.userForm.national_code.required
                                "
                                class="invalid-feedback d-block"
                            >
                                فیلد کد ملی الزامی است
                            </div>
                            <div
                                v-if="
                                    userSubmitted &&
                                        !$v.userForm.national_code.minLength
                                "
                                class="invalid-feedback"
                            >
                                مقدار ورودی نباید کمتر از ۱۰ رقم باشد
                            </div>
                            <div
                                v-if="
                                    userSubmitted &&
                                        !$v.userForm.national_code.maxLength
                                "
                                class="invalid-feedback"
                            >
                                مقدار ورودی نباید بیشتر از ۱۰ رقم باشد
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold">ایمیل</label>
                            <b-form-input
                                autocomplete="off"
                                id="h-email"
                                v-model="userForm.email"
                                type="email"
                                placeholder="example@test.com"
                                :class="{
                                    'is-invalid':
                                        userSubmitted &&
                                        $v.userForm.email.$error
                                }"
                            />
                            <div
                                v-if="
                                    userSubmitted && !$v.userForm.email.required
                                "
                                class="invalid-feedback d-block"
                            >
                                فیلد ایمیل الزامی است
                            </div>
                            <div
                                v-if="userSubmitted && !$v.userForm.email.email"
                                class="invalid-feedback d-block"
                            >
                                ایمیل وارد شده صحیح نمی باشد
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold"
                                >تاریخ تولد</label
                            >
                            <date-picker
                                id="max-date-create"
                                v-model="userForm.birth_date"
                                clearable
                            />
                            <div
                                v-if="
                                    userSubmitted &&
                                        !$v.userForm.birth_date.required
                                "
                                class="invalid-feedback d-block"
                            >
                                فیلد تاریخ تولد الزامی است
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>وضعیت تاهل</label>
                            <v-select
                                dir="rtl"
                                v-model="userForm.marital_status"
                                :options="marital_statuses"
                                @input="maritalStatusChangeHandler"
                                size="sm"
                                label="text"
                                clearable
                            >
                                <template #no-options>
                                    رکوردی برای نمایش وجود ندارد
                                </template>
                            </v-select>
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold"
                                >سالگرد ازدواج</label
                            >
                            <date-picker
                                :disabled="isSingle"
                                id="max-date-create"
                                v-model="userForm.anniversary"
                                clearable
                            />
                        </div>

                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold"
                                >تاریخ تولد همسر</label
                            >
                            <date-picker
                                :disabled="isSingle"
                                id="max-date-create"
                                v-model="userForm.spouse_birth_date"
                                clearable
                            />
                        </div>
                        <div class="col-md-6 form-group">
                            <label>جنسیت</label>
                            <v-select
                                dir="rtl"
                                id="per-page-select"
                                v-model="userForm.gender"
                                :options="gender_options"
                                label="text"
                                size="sm"
                                clearable
                            />
                            <div
                                v-if="
                                    userSubmitted &&
                                        !$v.userForm.gender.required
                                "
                                class="invalid-feedback d-block"
                            >
                                فیلد جنسیت الزامی است
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>تحصیلات</label>
                            <v-select
                                dir="rtl"
                                id="per-page-select"
                                v-model="userForm.education"
                                :options="education_options"
                                label="text"
                                size="sm"
                                clearable
                            />
                        </div>
                        <div class="col-md-6 form-group">
                            <label>نحوه آشنایی</label>
                            <v-select
                                dir="rtl"
                                id="per-page-select"
                                v-model="userForm.introduction"
                                :options="introduction_options"
                                label="text"
                                size="sm"
                                clearable
                            />
                        </div>
                        <div class="col-md-6 form-group">
                            <label>شعبه</label>
                            <v-select
                                dir="rtl"
                                id="per-page-select"
                                v-model="branch"
                                multiple
                                :options="branchOptions"
                                size="sm"
                                label="name"
                                clearable
                            />
                        </div>
                    </div>
                    <telephone-management
                        v-bind:telephones="telephones"
                    ></telephone-management>
                    <address-management
                        v-bind:addresses="addresses"
                    ></address-management>
                    <hr />
                    <div class="text-right">
                        <b-button
                            @click="userCreateSubmitHandler"
                            variant="success"
                        >
                            <span class="text-nowrap">ثبت اطلاعات</span>
                        </b-button>
                    </div>
                </BCard>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import _ from "lodash";
import vSelect from "vue-select";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import {
    required,
    email,
    minLength,
    maxLength
} from "vuelidate/lib/validators";
import {
    BCard,
    BButton,
    BAlert,
    BFormInput,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormGroup,
    BModal,
    BRow,
    BCol
} from "bootstrap-vue";
import axios from "axios";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import { heightFade } from "@core/directives/animations";
import TelephoneManagementVue from "../components/telephone/TelephoneManagement.vue";
import AddressManagementVue from "../components/address/AddressManagement.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    components: {
        datePicker: VuePersianDatetimePicker,
        vSelect,
        BCard,
        BButton,
        BAlert,
        BFormInput,
        BCardText,
        BInputGroup,
        BInputGroupAppend,
        BFormGroup,
        BModal,
        BRow,
        BCol,
        "telephone-management": TelephoneManagementVue,
        "address-management": AddressManagementVue
    },
    directives: {
        "height-fade": heightFade
    },
    mixins: [togglePasswordVisibility],
    data() {
        return {
            // alert
            alertTime: 10,
            alertCountDown: 0,
            alertText: undefined,
            alertType: undefined,
            // error modal
            errorsList: [],
            errorModalShow: false,
            // user
            userSubmitted: false,
            selected_tags: null,
            tags: undefined,
            branch: undefined,
            branchOptions: [],
            acquaintance: undefined,
            isSingle: false,
            userForm: {
                username: null,
                password: null,
                last_name: null,
                customer_code: null,
                user_title: null,
                birth_date: null,
                anniversary: null,
                spouse_birth_date: null,
                education: null,
                national_code: null,
                email: null,
                branch: undefined,
                introduction: null,
                marital_status: null,
                gender: null
            },
            user_title_options: [
                {
                    value: "mr",
                    text: "آقا"
                },
                {
                    value: "mrs",
                    text: "خانم"
                },
                {
                    value: "profesor",
                    text: "استاد"
                },
                {
                    value: "doctor",
                    text: "دکتر"
                }
            ],
            user_title_options: [
                {
                    value: "mr",
                    text: "آقا"
                },
                {
                    value: "mrs",
                    text: "خانم"
                },
                {
                    value: "profesor",
                    text: "استاد"
                },
                {
                    value: "doctor",
                    text: "دکتر"
                },
                {
                    value: "engineer",
                    text: "مهندس"
                }
            ],
            introduction_options: [
                {
                    value: "environmental_advertising",
                    text: "تبلیغات محیطی"
                },
                {
                    value: "customer_club_counter",
                    text: "کانتر باشگاه مشتریان"
                },
                {
                    value: "internet_advertising",
                    text: "تبلیغات اینترنتی"
                },
                {
                    value: "TV_commercials",
                    text: "تبلیغات تلویزیونی"
                },
                {
                    value: "sms_advertising",
                    text: "تبلیغات پیامکی"
                },
                {
                    value: "referral",
                    text: "معرفی دوستان"
                },
                {
                    value: "other",
                    text: "دیگر"
                }
            ],
            education_options: [
                {
                    value: "associate_degree",
                    text: "فوق دیپلم"
                },
                {
                    value: "bachelor",
                    text: "لیسانس"
                },
                {
                    value: "ma",
                    text: "فوق لیسانس"
                },
                {
                    value: "phd",
                    text: "دکتری"
                },
                {
                    value: "diploma",
                    text: "دیپلم"
                }
            ],
            marital_statuses: [
                {
                    value: false,
                    text: "مجرد"
                },
                {
                    value: true,
                    text: "متاهل"
                }
            ],
            gender_options: [
                {
                    value: "male",
                    text: "مرد"
                },
                {
                    value: "female",
                    text: "زن"
                }
            ],
            group: undefined,
            groups: [],
            firstName: undefined,
            lastName: undefined,
            telephones: [],
            addresses: []
        };
    },
    validations: {
        userForm: {
            username: { required },
            name: { required },
            last_name: { required },
            customer_code: { required },
            national_code: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(10)
            },
            email: { required, email },
            birth_date: { required },
            gender: { required }
        }
    },
    computed: {
        // password icon toggle
        passwordToggleIcon() {
            return this.passwordFieldType === "password"
                ? "EyeIcon"
                : "EyeOffIcon";
        }
    },
    watch: {
        firstName(newValue, oldValue) {
            const result = newValue.replace(/\d+/g, "");

            this.$nextTick(() => {
                this.firstName = result;
                this.userForm.name = result;
            });
        },
        lastName(newValue, oldValue) {
            const result = newValue.replace(/\d+/g, "");

            this.$nextTick(() => {
                this.lastName = result;
                this.userForm.last_name = result;
            });
        }
    },
    methods: {
        maritalStatusChangeHandler(e) {
            this.isSingle = !e.value;
            this.userForm.anniversary = undefined;
            this.userForm.spouse_birth_date = undefined;
        },
        // set alert count down number
        countDownChanged(alertCountDown) {
            this.alertCountDown = alertCountDown;
        },
        // show alert
        showAlert(text, type) {
            this.alertCountDown = this.alertTime;
            this.alertText = text;
            this.alertType = type;
        },
        // create new user
        userCreateSubmitHandler() {
            this.userSubmitted = true;
            // validation check
            this.$v.userForm.$touch();

            if (this.$v.userForm.$invalid) {
                return;
            }

            const params = {
                groups_id: this.group.id,
                tags: _.map(this.selected_tags, item => {
                    return _.has(item, "id")
                        ? { id: item.id, name: item.name }
                        : { id: null, name: item.name };
                }),
                first_name: this.userForm.name,
                last_name: this.userForm.last_name,
                username: this.userForm.username,
                password: this.userForm.password,
                customer_code: this.userForm.customer_code,
                national_code: this.userForm.national_code,
                user_title: this.userForm.user_title
                    ? this.userForm.user_title.value
                    : undefined,
                marital_status: this.userForm.marital_status
                    ? this.userForm.marital_status.value
                    : undefined,
                email: this.userForm.email,
                birth_date: this.userForm.birth_date,
                spouse_birth_date: this.userForm.spouse_birth_date,
                gender: this.userForm.gender
                    ? this.userForm.gender.value
                    : undefined,
                anniversary: this.userForm.anniversary,
                education_degree: this.userForm.education
                    ? this.userForm.education.value
                    : undefined,
                branches_id: _.map(this.branch, "id"),
                acquaintance_type: this.userForm.introduction
                    ? this.userForm.introduction.value
                    : undefined,
                phones: this.$store.getters["app/getTelephones"],
                addresses: this.$store.getters["app/getAddresses"],
                roles: ["customer"]
            };
            console.log(params);
            axios
                .post(`${process.env.VUE_APP_URL}/users/store`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(res => {
                    // remove temp date from VUEX
                    this.$store.commit("app/removeAddresses");
                    this.$store.commit("app/removeTelephones");
                    this.$router.replace("/customers/list").then(() => {
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: "مشتری جدید",
                                icon: "CoffeeIcon",
                                variant: "success",
                                text: res.data.message
                            }
                        });
                    });
                })
                .catch(err => {
                    this.errorsList = err.response.data.errors;
                    this.errorModalShow = true;
                });
        },
        // province changes
        provinceChanges() {
            axios
                .get(
                    `${process.env.VUE_APP_URL}/backend/provinces/${this.addressForm.province.id}/cities`
                )
                .then(res => {
                    this.cities = res.data;
                });
        }
    },
    mounted() {
        // get branches
        axios
            .get(`${process.env.VUE_APP_URL}/branches`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`
                }
            })
            .then(response => {
                this.branchOptions = response.data.data;
            });
        // get provinces
        axios.get(`${process.env.VUE_APP_URL}/backend/provinces`).then(res => {
            this.provinces = res.data;
        });
        // get groups
        axios
            .get(`${process.env.VUE_APP_URL}/groups/all/users?flatten=true`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`
                }
            })
            .then(({ data }) => {
                this.groups = data;
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
            .then(response => {
                console.log(response.data.data);
                this.tags = response.data.data;
            });
    }
};
</script>

<style>
.expanded_icon {
    margin-right: 8px;
}
.vpd-input-group input {
    border-radius: 0px;
}
.input-group-append.is-invalid > .input-group-text {
    border-color: #ea5455;
}
[dir="rtl"] .input-group-append:not(:last-child) .input-group-text {
    border-width: 1px !important;
    border-style: solid !important;
    border-bottom-left-radius: 0.357rem !important;
    border-top-left-radius: 0.357rem !important;
}
</style>
