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
                <h4>ویرایش مشتری</h4>
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
                                placeholder="انتخاب کنید"
                                v-model="selected_tags"
                                dir="rtl"
                                taggable
                                push-tags
                                multiple
                                label="name"
                                :options="tags"
                            />
                        </div>

                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold">نام</label>
                            <b-form-input
                                autocomplete="off"
                                v-model="firstName"
                                class="d-inline-block mr-1"
                                :class="{
                                    'is-invalid':
                                        userSubmitted && $v.userForm.name.$error
                                }"
                                placeholder="نام"
                            />
                            <div
                                v-if="
                                    userSubmitted && !$v.userForm.name.required
                                "
                                class="invalid-feedback d-block"
                            >
                                فیلد نام الزامی است
                            </div>
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
                                readonly
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
                                class="per-page-selector"
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
                            <label>وضعیت تاهل</label>
                            <v-select
                                dir="rtl"
                                v-model="userForm.marital_status"
                                :options="marital_statuses"
                                @input="maritalStatusChangeHandler"
                                size="sm"
                                label="text"
                                clearable
                                class="per-page-selector"
                            >
                                <template #no-options>
                                    رکوردی برای نمایش وجود ندارد
                                </template>
                            </v-select>
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
                                class="per-page-selector"
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
                                class="per-page-selector"
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
                                class="per-page-selector"
                            />
                        </div>
                        <div class="col-md-6 form-group">
                            <label>شعبه</label>
                            <v-select
                                dir="rtl"
                                id="per-page-select"
                                v-model="userForm.branch"
                                multiple
                                :options="branchOptions"
                                size="sm"
                                label="name"
                                clearable
                                class="per-page-selector"
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
                        <b-button @click="userUpdateHandler" variant="success">
                            <span class="text-nowrap">بروزرسانی</span>
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
    BTable,
    BFormCheckbox,
    BCard,
    BButton,
    BAlert,
    BInputGroupAppend,
    BInputGroup,
    BFormInput,
    BFormSelect,
    BFormGroup,
    BCardText,
    BFormTextarea,
    BModal,
    BRow,
    BCol
} from "bootstrap-vue";
import axios from "axios";
import { heightFade } from "@core/directives/animations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import TelephoneManagementVue from "../components/telephone/TelephoneManagement.vue";
import AddressManagementVue from "../components/address/AddressManagement.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    components: {
        BTable,
        datePicker: VuePersianDatetimePicker,
        BFormCheckbox,
        vSelect,
        BFormTextarea,
        BCard,
        BButton,
        BAlert,
        BInputGroupAppend,
        BInputGroup,
        BFormInput,
        BFormSelect,
        BFormGroup,
        BCardText,
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
            tags: [],
            branchOptions: [],
            activate: null,
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
            isSingle: false,
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
    computed: {
        // password icon toggle
        passwordToggleIcon() {
            return this.passwordFieldType === "password"
                ? "EyeIcon"
                : "EyeOffIcon";
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
        // update the user
        userUpdateHandler() {
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
                branches_id: _.map(this.userForm.branch, "id"),
                acquaintance_type: this.userForm.introduction
                    ? this.userForm.introduction.value
                    : undefined,
                phones: this.$store.getters["app/getTelephones"],
                addresses: this.$store.getters["app/getAddresses"],
                roles: ["customer"]
            };
            console.log(params);
            // get id parameter from url
            const id = this.$route.params.id;
            axios
                .patch(
                    `${process.env.VUE_APP_URL}/users/${id}/update`,
                    params,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`
                        }
                    }
                )
                .then(res => {
                    // remove temp date from VUEX
                    this.$store.commit("app/removeAddresses");
                    this.$store.commit("app/removeTelephones");
                    // redirect to users list and show message
                    this.$router.replace("/customers/list").then(() => {
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: "ویرایش مشتری",
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
    created() {
        // get customer
        const id = this.$route.params.id;
        axios
            .get(`${process.env.VUE_APP_URL}/users/${id}/show?with=profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`
                }
            })
            .then(({ data }) => {
                this.userForm.name = data.data.first_name;
                this.userForm.last_name = data.data.last_name;
                this.firstName = data.data.first_name;
                this.lastName = data.data.last_name;
                this.userForm.username = data.data.username;
                this.userForm.gender = _.find(this.gender_options, item => {
                    return item.value == data.data.gender;
                });
                this.userForm.email = data.data.email;
                this.userForm.user_title = _.find(
                    this.user_title_options,
                    item => {
                        return item.value == data.data.title;
                    }
                );
                // _.find(
                //     this.user_title_options,
                //     item => {
                //         return item.text == data.data.title;
                //     }
                // );
                this.group = data.data.group;
                this.selected_tags = data.data.tags;
                this.telephones = data.data.phones;
                this.addresses = data.data.addresses;
                this.userForm.introduction = _.find(
                    this.introduction_options,
                    item => {
                        return (
                            item.value == data.data.profile.acquaintance_type
                        );
                    }
                );
                this.userForm.customer_code = data.data.profile.code;
                this.userForm.national_code = data.data.profile.nic;
                this.userForm.birth_date = data.data.profile.birth_date;
                this.userForm.anniversary = data.data.profile.anniversary_date;
                const maritalStatus = _.find(
                    this.marital_statuses,
                    item => item.value == data.data.profile.marital_status
                );
                if (maritalStatus) {
                    this.isSingle = !maritalStatus.value;
                    this.userForm.marital_status = maritalStatus;
                }
                this.userForm.spouse_birth_date =
                    data.data.profile.partner_birth_date;
                this.userForm.education = _.find(
                    this.education_options,
                    item => {
                        return item.value == data.data.profile.education_degree;
                    }
                );
                this.userForm.branch = data.data.branches;
                // setting on vue
                this.$store.commit("app/setTelephones", data.data.phones);
                this.$store.commit("app/setAddresses", data.data.addresses);
            });
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

        axios
            .get(`${process.env.VUE_APP_URL}/tags/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`
                }
            })
            .then(response => {
                this.tags = response.data.data
            })
            .catch(error => {});
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
