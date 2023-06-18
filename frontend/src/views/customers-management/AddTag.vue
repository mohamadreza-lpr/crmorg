<template>
    <div>
        <h4>ایجاد برچسب</h4>
        <b-card>
            <b-form @submit.prevent="newTagHandler">
                <b-row>
                    <b-col cols="12">
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
                                <small v-html="alertText"></small>
                            </div>
                        </b-alert>
                        <b-form-group
                            label="عنوان"
                            label-for="title"
                            label-cols-md="3"
                        >
                            <b-form-input autocomplete="off"
                                id="title"
                                v-model="title"
                                placeholder="عنوان"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group
                            label="توضیحات"
                            label-for="description"
                            label-cols-md="3"
                        >
                            <b-form-textarea
                                id="description"
                                v-model="description"
                                placeholder="توضیحات"
                            />
                        </b-form-group>
                    </b-col>
                    <!-- submit and reset -->
                    <b-col offset-md="3">
                        <b-button type="submit" variant="primary" class="mr-1">
                            ذخیره
                        </b-button>
                        <b-button type="reset" variant="outline-secondary">
                            پاک کردن فرم
                        </b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-card>
    </div>
</template>

<script>
import {
    BCard,
    BFormGroup,
    BFormTextarea,
    BFormInput,
    BForm,
    BRow,
    BCol,
    BAlert,
    BButton
} from "bootstrap-vue";
import axios from "axios";
import { heightFade } from "@core/directives/animations";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    components: {
        BCard,
        BFormGroup,
        BFormTextarea,
        BFormInput,
        BAlert,
        BForm,
        BRow,
        BCol,
        BButton
    },
    directives: {
        "height-fade": heightFade
    },
    data() {
        return {
            title: undefined,
            description: undefined,

            // alert properties
            alertCountDown: null,
            alertText: null,
            alertType: null
        };
    },
    methods: {
        showAlert(text, type, alertTime = 10) {
            this.alertCountDown = alertTime;
            this.alertText = text;
            this.alertType = type;
        },
        countDownChanged(alertCountDown) {
            this.alertCountDown = alertCountDown;
        },
        newTagHandler() {
            const params = {
                name: this.title,
                description: this.description
            };
            axios
                .post(`${process.env.VUE_APP_URL}/tags/store`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    this.$router.replace("/customers/tags").then(() => {
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: "برچسب جدید",
                                icon: "CoffeeIcon",
                                variant: "success",
                                text: "برچسب جدید با موفقیت ثبت شد",
                            },
                        });
                    });
                })
                .catch(error => {
                    let errors = "";
                    for (const [key, value] of Object.entries(
                        error.response.data.errors
                    )) {
                        errors += `${value} <br>`;
                    }

                    this.showAlert(errors, "danger");
                });
        }
    }
};
</script>

<style lang="scss" scoped></style>
