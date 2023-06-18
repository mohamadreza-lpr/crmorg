<template>
    <div class="auth-wrapper auth-v2">
        <b-row class="auth-inner m-0">
            <!-- <b-link class="brand-logo">
                <b-img
                    style="object-fit: contain"
                    width="100px"
                    :src="logoSrc"
                    alt="logo"
                />
            </b-link> -->
            <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
                <div
                    class="w-100 d-lg-flex align-items-center justify-content-center px-5"
                >
                    <b-img fluid :src="imgUrl" alt="Login V2" />
                </div>
            </b-col>
            <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
                <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
                    <b-card-title
                        class="mb-1 font-weight-bold text-center"
                        title-tag="h3"
                    >
                        <b-img
                            class="mb-3"
                            style="object-fit: contain"
                            width="160px"
                            :src="logoSrc"
                            alt="logo"
                        />
                        <br />
                        به باشگاه مشتریان گرانش خوش آمدید
                    </b-card-title>
                    <b-card-text class="mb-2 text-center">
                        لطفا به حساب کاربری خود وارد شوید و بررسی را شروع کنید
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
                        class="auth-login-form mt-2"
                        @submit.prevent="login"
                    >
                        <b-form-group
                            label="نام کاربری"
                            label-for="login-email"
                        >
                            <b-form-input
                                autocomplete="off"
                                id="login-email"
                                v-model="userEmail"
                                name="login-email"
                                placeholder="نام کاربری را وارد نمایید"
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
                        </b-form-group>
                        <b-form-group
                            label="رمز عبور"
                            label-for="login-password"
                        >
                            <b-input-group class="input-group-merge">
                                <b-form-input
                                    autocomplete="off"
                                    id="login-password"
                                    v-model="password"
                                    class="form-control-merge"
                                    :type="passwordFieldType"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.password.$error
                                    }"
                                    name="login-password"
                                    placeholder="رمز عبور خود را وارد کنید"
                                />
                                <b-input-group-append
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.password.$error
                                    }"
                                    is-text
                                >
                                    <feather-icon
                                        class="cursor-pointer"
                                        :icon="passwordToggleIcon"
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
                        <b-button
                            type="submit"
                            :disabled="submitted"
                            variant="primary"
                            block
                        >
                            ورود
                        </b-button>
                    </b-form>
                </b-col>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BAlert,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VBTooltip
} from "bootstrap-vue";
import store from "@/store/index";
import useJwt from "@/auth/jwt/useJwt";
import { required } from "vuelidate/lib/validators";
import { heightFade } from "@core/directives/animations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    directives: {
        "height-fade": heightFade,
        "b-tooltip": VBTooltip
    },
    components: {
        BRow,
        BCol,
        BLink,
        BFormGroup,
        BFormInput,
        BInputGroupAppend,
        BInputGroup,
        BFormCheckbox,
        BAlert,
        BCardText,
        BCardTitle,
        BImg,
        BForm,
        BButton
    },
    mixins: [togglePasswordVisibility],
    data() {
        return {
            submitted: false,
            logoSrc: require("@/assets/images/logo/geranesh-logo-fa.png"),
            status: "",
            password: "",
            userEmail: "",
            sideImg: require("@/assets/images/pages/login-v2.svg"),

            // alert config
            alertTime: 10,
            alertCountDown: 0,
            alertText: undefined,
            alertType: undefined
        };
    },
    validations: {
        userEmail: { required },
        password: {
            required
        }
    },
    computed: {
        passwordToggleIcon() {
            return this.passwordFieldType === "password"
                ? "EyeIcon"
                : "EyeOffIcon";
        },
        imgUrl() {
            if (store.state.appConfig.layout.skin === "dark") {
                this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
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
        login() {
            let location = "dashboard/index";
            const prevLocation = this.$router.history._startLocation;

            if (prevLocation && prevLocation != "/login")
                location = prevLocation;

            this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) return;

            useJwt
                .login({
                    username: this.userEmail,
                    password: this.password
                })
                .then(response => {
                    this.submitted = false;

                    this.setUserInfo(response.data).then(() => {
                        this.$router.replace(location).then(() => {
                            this.$toast({
                                component: ToastificationContent,
                                position: "top-right",
                                props: {
                                    title: `به گرانش خوش آمدید`,
                                    icon: "CheckIcon",
                                    variant: "success",
                                    text: `شما با موفقیت وارد شدید`
                                }
                            });
                        });
                    });
                })
                .catch(error => {
                    this.submitted = false;
                    let _type = "danger";
                    let _text = "خطایی رخ داده است";
                    const status = error.response.status;

                    if (status == 404) {
                        _type = "danger";
                        _text = error.response.data.message;
                    }

                    this.showAlert(_text, _type);
                });
        },
        async setUserInfo(params) {
            useJwt.setToken(params.access_token);
            useJwt.setRefreshToken(params.refreshToken);
            localStorage.setItem("userData", JSON.stringify(params.user_data));
            this.$ability.update(params.user_data.ability);
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
