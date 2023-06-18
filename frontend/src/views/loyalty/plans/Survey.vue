<template>
    <div>
        <b-modal
            hide-footer
            modal-class="modal-danger"
            centered
            title="خطا رخ داده است"
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
        <b-alert variant="primary" show>
            <div class="alert-body">
                <h3 class="text-primary">شرکت در نظرسنجی</h3>
                <span>
                    مشتری با شرکت در نظرسنجی <strong>امتیاز</strong> کسب می کند.
                </span>
            </div>
        </b-alert>
        <b-card>
            <b-form @submit.prevent="updatePlanHandler">
                <b-row>
                    <b-col cols="12">
                        <b-form-group
                            label="امتیاز"
                            label-for="rate"
                            label-cols-md="2"
                        >
                            <b-input-group class="input-group-merge">
                                <b-input-group-prepend is-text>
                                    <feather-icon icon="StarIcon" />
                                </b-input-group-prepend>
                                <b-form-input autocomplete="off"
                                    id="rate"
                                    v-model="score"
                                    placeholder="امتیاز"
                                />
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col md="10" offset-md="2">
                        <b-form-group>
                            <b-form-checkbox
                                id="active"
                                name="active"
                                v-model="status"
                                :value="true"
                            >
                                فعال
                            </b-form-checkbox>
                        </b-form-group>
                        <b-form-group>
                            <b-form-checkbox
                                id="sendMessage"
                                name="sendMessage"
                                v-model="smsOptOut"
                                :value="true"
                            >
                                ارسال پیام
                            </b-form-checkbox>
                        </b-form-group>
                    </b-col>
                    <b-col class="form-group" md="10" offset-md="2">
                        <hr />
                        <div>
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
                        </div>
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
                    </b-col>

                    <!-- submit and reset -->
                    <b-col offset-md="2">
                        <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            type="submit"
                            variant="primary"
                            class="mr-1"
                        >
                            ویرایش
                        </b-button>
                        <b-button
                            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                            @click="resetHandler"
                            variant="outline-secondary"
                        >
                            پاک کردن فرم
                        </b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-card>
    </div>
</template>

<script>
import Ripple from "vue-ripple-directive";
import {
    BFormTextarea,
    BCard,
    BAlert,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    BRow,
    BCardText,
    BCol,
} from "bootstrap-vue";
import axios from "axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
    data() {
        return {
            // error modal
            errorsList: [],
            errorModalShow: undefined,
            planId: 4,
            score: undefined,
            status: false,
            smsOptOut: false,
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
            ],
        };
    },
    components: {
        BFormTextarea,
        BCard,
        BCardText,
        BAlert,
        BFormGroup,
        BFormInput,
        BFormCheckbox,
        BForm,
        BButton,
        BInputGroup,
        BInputGroupPrepend,
        BRow,
        BCol,
    },
    directives: {
        Ripple,
    },
    methods: {
        addVar(a) {
            this.smsTemplate += `[${a}]`;
        },
        getPlan() {
            axios
                .get(
                    `${process.env.VUE_APP_URL}/loyalties/${this.planId}/show`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then(({ data }) => {
                    this.score = data.data.score;
                    this.status = data.data.status == "فعال" ? true : false;
                    this.smsOptOut = data.data.sms_opt_out == 1 ? true : false;
                    this.smsTemplate = data.data.sms_template;
                })
                .catch((error) => {});
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
        updatePlanHandler() {
            const params = {
                score: this.score,
                status: this.status ? "active" : "inactive",
                sms_opt_out: this.smsOptOut,
                sms_template: this.smsTemplate,
            };

            axios
                .patch(
                    `${process.env.VUE_APP_URL}/loyalties/${this.planId}/update`,
                    params,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    this.$router.replace("/loyalty/plans").then(() => {
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: "بروزرسانی موفق",
                                icon: "CoffeeIcon",
                                variant: "success",
                                text: "تغییرات با موفقیت قبت شد",
                            },
                        });
                    });
                })
                .catch((error) => {
                    this.errorsList = error.response.data.errors;
                    this.errorModalShow = true;
                });
        },
        resetHandler() {
            this.score = undefined;
            this.status = undefined;
            this.smsOptOut = undefined;
            this.smsTemplate = "";
        },
    },
    mounted() {
        this.getPlan();
        this.getTemplates();
    },
};
</script>

<style lang="scss" scoped>
.custom-border {
    .input-group-text:first-child {
        border-radius: 0px !important;
    }
    input {
        border-radius: 0;
    }
}
</style>
