<template>
    <div>
        <b-row>
            <div class="offset-md-2"></div>
            <div class="col-md-8">
                <b-card no-body>
                    <b-card-header>
                        <b-card-title>تنظیمات پیامکی کد ورود (otp)</b-card-title>
                    </b-card-header>
                    <b-card-body>
                        <b-alert
                            v-height-fade
                            :show="messages.length > 0"
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
                        <b-form @submit.prevent="submitHandler">
                            <b-row>
                                <b-col
                                    cols="12"
                                    xl="4"
                                    sm="12"
                                    class="mb-0 mb-md-1"
                                    dir="ltr"
                                >
                                    <label>
                                        <small> نام کاربری </small>
                                    </label>
                                    <b-form-input
                                        autocomplete="off"
                                        v-model="api_key"
                                        placeholder="لطفا نام کاربری را وارد نمایید"
                                    />
                                </b-col>
                                <b-col
                                    cols="12"
                                    xl="4"
                                    sm="12"
                                    class="mb-0 mb-md-1"
                                    dir="ltr"
                                >
                                    <label>
                                        <small> رمز عبور </small>
                                    </label>
                                    <b-form-input
                                        autocomplete="off"
                                        v-model="secret_key"
                                        placeholder="لطفا رمز عبور را وارد نمایید"
                                    />
                                </b-col>
                                <b-col
                                    cols="12"
                                    xl="4"
                                    sm="12"
                                    class="mb-0 mb-md-1"
                                    dir="ltr"
                                >
                                    <label>
                                        <small> آدرس (url) </small>
                                    </label>
                                    <b-form-input
                                        autocomplete="off"
                                        v-model="api_url"
                                        placeholder="لطفا آدرس را وارد نمایید"
                                    />
                                </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col cols="12">
                                    <b-button
                                        type="submit"
                                        variant="primary"
                                        size="sm"
                                    >
                                        ثبت تنظیمات
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-form>
                    </b-card-body>
                </b-card>
            </div>
            <div class="offset-md-2"></div>
        </b-row>
    </div>
</template>

<script>
import {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BRow,
    BCol,
    BForm,
    BFormInput,
    BButton,
    BAlert
} from "bootstrap-vue";
import axios from "axios";
import { heightFade } from "@/@core/directives/animations";

export default {
    components: {
        BCard,
        BCardHeader,
        BCardTitle,
        BCardBody,
        BRow,
        BCol,
        BForm,
        BFormInput,
        BButton,
        BAlert
    },
    directives: {
        "height-fade": heightFade
    },
    data() {
        return {
            // form attributes
            api_key: undefined,
            secret_key: undefined,
            api_url: undefined,
            // message
            messages: [],
            messageVariant: undefined
        };
    },
    created() {
        this.getSmsSetting();
    },
    methods: {
        getSmsSetting() {
            axios
                .get(`${process.env.VUE_APP_URL}/settings/sms/verification-code`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    console.log(response);
                    this.api_key = response.data.api_key;
                    this.secret_key = response.data.secret_key;
                    this.api_url = response.data.api_url;
                })
                .catch(error => {});
        },
        submitHandler() {
            const params = {
                api_key: this.api_key,
                api_url: this.api_url,
                secret_key: this.secret_key,
            };

            axios
                .patch(`${process.env.VUE_APP_URL}/settings/sms/verification-code`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    console.log(response);
                    this.messages = [response.data.message];
                    this.messageVariant = "success";
                    this.isSubmitted = false;
                })
                .catch(error => {
                    this.messages = _.flatten(
                        Object.values(error.response.data.errors)
                    );
                    this.messageVariant = "danger";
                    this.isSubmitted = false;
                });
        }
    }
};
</script>

<style></style>
