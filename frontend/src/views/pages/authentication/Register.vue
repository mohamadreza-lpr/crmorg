<template>
    <div class="auth-wrapper auth-v2">
        <b-row class="auth-inner m-0">
            <b-link class="brand-logo">
                <b-img
                    style="object-fit:contain"
                    width="100px"
                    :src="logoSrc"
                    alt="logo"
                />
                <h2 class="brand-text text-primary ml-1">
                    باشگاه مشتریان گرانش
                </h2>
            </b-link>
            <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
                <div
                    class="w-100 d-lg-flex align-items-center justify-content-center px-5"
                >
                    <b-img fluid :src="imgUrl" alt="Register V2" />
                </div>
            </b-col>
            <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
                <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
                    <b-card-title
                        class="mb-1 font-weight-bold text-center"
                        title-tag="h2"
                    >
                        <b-img
                            class="mb-3"
                            style="object-fit:contain"
                            width="110px"
                            :src="logoSrc"
                            alt="logo"
                        />
                        <br />
                        تجربه مدیریتی متفاوت در اینجا
                    </b-card-title>
                    <b-card-text class="mb-2 text-center">
                        برنامه ی مدیریتی آسان و جذاب خود را بسازید
                    </b-card-text>
                    <b-alert
                        v-height-fade.appear
                        :show="alertCountDown"
                        dismissible
                        class="mb-0"
                        :variant="alertType"
                        @dismissed="alertCountDown = 0"
                        @dismiss-count-down="countDownChanged"
                    >
                        <div class="alert-body">
                            {{ alertText }}
                        </div>
                    </b-alert>
                    <b-form
                        class="auth-register-form mt-2"
                        @submit.prevent="register"
                    >
                        <b-form-group
                            label="نام کاربری"
                            label-for="register-username"
                        >
                            <b-form-input autocomplete="off"
                                id="register-username"
                                v-model="username"
                                name="register-username"
                                placeholder="نام کاربری را وارد نمایید"
                                :class="{
                                    'is-invalid':
                                        submitted && $v.username.$error
                                }"
                            />
                            <div
                                v-if="submitted && !$v.username.required"
                                class="invalid-feedback"
                            >
                                ورودی این فیلد الزامی میباشد
                            </div>
                        </b-form-group>
                        <b-form-group label="ایمیل" label-for="register-email">
                            <b-form-input autocomplete="off"
                                id="register-email"
                                v-model="userEmail"
                                name="register-email"
                                placeholder="آدرس ایمیل را وارد نمایید"
                                :class="{
                                    'is-invalid':
                                        submitted && $v.userEmail.$error
                                }"
                            />
                            <div
                                v-if="submitted && !$v.userEmail.required"
                                class="invalid-feedback"
                            >
                                ورودی این فیلد الزامی میباشد
                            </div>
                            <div
                                v-if="submitted && !$v.userEmail.email"
                                class="invalid-feedback"
                            >
                                آدرس ایمیل معتبر نمیباشد
                            </div>
                        </b-form-group>
                        <b-form-group
                            label-for="register-password"
                            label="رمز عبور"
                        >
                            <b-input-group class="input-group-merge">
                                <b-form-input autocomplete="off"
                                    id="register-password"
                                    v-model="password"
                                    class="form-control-merge"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.password.$error
                                    }"
                                    :type="passwordFieldType"
                                    name="register-password"
                                    placeholder="رمز عبور خود را وارد نمایید"
                                />
                                <b-input-group-append
                                    is-text
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.password.$error
                                    }"
                                >
                                    <feather-icon
                                        :icon="passwordToggleIcon"
                                        class="cursor-pointer"
                                        @click="togglePasswordVisibility"
                                    />
                                </b-input-group-append>
                                <div
                                    v-if="submitted && !$v.password.required"
                                    class="invalid-feedback"
                                >
                                    ورودی این فیلد الزامی میباشد
                                </div>
                            </b-input-group>
                        </b-form-group>

                        <!-- <b-form-group>
                            <b-form-checkbox
                                id="register-privacy-policy"
                                v-model="status"
                                name="checkbox-1"
                            >
                                با
                                <b-link>قوانین و مقررات</b-link> موافقم
                            </b-form-checkbox>
                        </b-form-group> -->

                        <b-button variant="primary" :disabled="submitted" block type="submit">
                            عضویت
                        </b-button>
                    </b-form>

                    <p class="text-center mt-2">
                        <span>قبلا ثبت نام کرده اید؟</span>
                        <b-link :to="{ name: 'auth-login' }">
                            <span>&nbsp;ورود به حساب کاربری</span>
                        </b-link>
                    </p>
                </b-col>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
    BRow,
    BCol,
    BLink,
    BButton,
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BAlert,
    BInputGroup,
    BInputGroupAppend,
    BImg,
    BCardTitle,
    BCardText
} from "bootstrap-vue";
import { required, email } from "vuelidate/lib/validators";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import useJwt from "@/auth/jwt/useJwt";
import { heightFade } from "@core/directives/animations";

export default {
    directives: {
        "height-fade": heightFade
    },
    components: {
        VuexyLogo,
        BRow,
        BImg,
        BCol,
        BLink,
        BButton,
        BForm,
        BAlert,
        BCardText,
        BCardTitle,
        BFormCheckbox,
        BFormGroup,
        BFormInput,
        BInputGroup,
        BInputGroupAppend
    },
    mixins: [togglePasswordVisibility],
    data() {
        return {
            logoSrc: require("@/assets/images/logo/geranesh-logo-fa.png"),
            submitted: false,
            status: "",
            username: "",
            userEmail: "",
            password: "",
            sideImg: require("@/assets/images/pages/register-v2.svg"),

            // alert config
            alertTime: 10,
            alertCountDown: 0,
            alertText: undefined,
            alertType: undefined
        };
    },
    validations: {
        username: { required },
        userEmail: { required, email },
        password: { required }
    },
    computed: {
        passwordToggleIcon() {
            return this.passwordFieldType === "password"
                ? "EyeIcon"
                : "EyeOffIcon";
        },
        imgUrl() {
            if (store.state.appConfig.layout.skin === "dark") {
                this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
                return this.sideImg;
            }
            return this.sideImg;
        }
    },
    methods: {
        showAlert(text, type) {
            this.alertCountDown = this.alertTime;
            this.alertText = text;
            this.alertType = type;
        },
        countDownChanged(alertCountDown) {
            this.alertCountDown = alertCountDown;
        },
        register() {
            /* this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) return; */

            useJwt
                .register({
                    username: this.username,
                    email: this.userEmail,
                    password: this.password
                })
                .then(response => {
                    useJwt.setToken(response.data.access_token);
                    useJwt.setRefreshToken(response.data.refreshToken);
                    localStorage.setItem(
                        "userData",
                        JSON.stringify(response.data.user_data)
                    );
                    this.$ability.update(response.data.user_data.ability)
                    // const _text = "ثبت نام با موفقیت انجام شد";
                    // const _type = "success";
                    // this.showAlert(_text, _type);

                    setTimeout(() => {
                        this.submitted = false;
                       this.$router.push("/"); 
                    }, 2500);
                })
                .catch(error => {
                    const _text = "خطایی در ثبت نام رخ داده است";
                    const _type = "danger";
                    this.showAlert(_text, _type);
                    this.submitted = false;
                });
        }
    }
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
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
