<template>
    <div>
        <b-card>
            <h4 class="mb-3">ایجاد قرعه کشی</h4>
            <div class="demo-spacing-0">
                <alert-message
                    ref="alertComponent"
                    :variant="alertVariant"
                    :messages="alertMessages"
                    :dismissible="alertDismissable"
                />
            </div>
            <b-form @submit.prevent="sendPosts">
                <b-row>
                    <b-col cols="12">
                        <b-form-group
                            label="نام"
                            label-for="rate"
                            label-cols-md="4"
                        >
                            <b-form-input
                                autocomplete="off"
                                id="rate"
                                v-model="title"
                                placeholder="نام"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group
                            label="تاریخ شروع"
                            label-for="rate"
                            label-cols-md="4"
                        >
                            <date-picker
                                type="datetime"
                                id="max-date-join"
                                v-model="starts_at"
                                clearable
                            />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group
                            label="تاریخ پایان"
                            label-for="rate"
                            label-cols-md="4"
                        >
                            <date-picker
                                type="datetime"
                                id="max-date-join"
                                v-model="expires_at"
                                clearable
                            />
                        </b-form-group>
                    </b-col>

                    <b-col cols="12">
                        <b-form-group
                            label="تعداد برندگان"
                            label-for="rate"
                            label-cols-md="4"
                        >
                            <b-form-input
                                autocomplete="off"
                                id="rate"
                                type="number"
                                placeholder="تعداد برندگان"
                                v-model="max_winner"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group
                            label="حداکثر شانس هر کاربر"
                            label-for="rate"
                            label-cols-md="4"
                        >
                            <b-form-input autocomplete="off"
                                id="rate"
                                type="number"
                                placeholder="حداکثر شانس هر کاربر"
                                v-model="max_chances"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group
                            label="حداقل امتیاز هر کاربر"
                            label-for="rate"
                            label-cols-md="4"
                        >
                            <b-input-group class="input-group-merge">
                                <b-input-group-prepend is-text>
                                    <feather-icon icon="StarIcon" />
                                </b-input-group-prepend>
                                <b-form-input autocomplete="off"
                                    id="rate"
                                    type="number"
                                    placeholder="حداقل امتیاز هر کاربر"
                                    v-model="required_points"
                                />
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group
                            label="کسر امتیاز"
                            label-for="rate"
                            label-cols-md="4"
                        >
                            <div class="demo-inline-spacing">
                                <b-form-radio
                                    v-model="point_withdrawal"
                                    name="point_withdrawal"
                                    value="1"
                                    class="custom-control-primary mt-0"
                                >
                                    صحیح
                                </b-form-radio>
                                <b-form-radio
                                    v-model="point_withdrawal"
                                    name="point_withdrawal"
                                    value="0"
                                    class="custom-control-primary mt-0"
                                >
                                    غلط
                                </b-form-radio>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group
                            label="وضعیت"
                            label-for="rate"
                            label-cols-md="4"
                        >
                            <div class="demo-inline-spacing">
                                <b-form-radio
                                    v-model="status"
                                    name="status"
                                    value="active"
                                    class="custom-control-primary mt-0"
                                >
                                    فعال
                                </b-form-radio>
                                <b-form-radio
                                    v-model="status"
                                    name="status"
                                    value="inactive"
                                    class="custom-control-primary mt-0"
                                >
                                    غیرفعال
                                </b-form-radio>
                            </div>
                        </b-form-group>
                    </b-col>
                    <!-- <b-col cols="12">
                        <b-form-group
                            label="نوع"
                            label-for="rate"
                            label-cols-md="4"
                        >
                            <b-form-input autocomplete="off"
                                autocomplete="off"
                                id="rate"
                                placeholder="نوع"
                                v-model="type"
                            />
                        </b-form-group>
                    </b-col> -->
                    <b-col cols="12">
                        <b-form-group
                            label="توضیحات قرعه کشی"
                            label-cols-md="4"
                        >
                            <b-form-textarea
                                placeholder="توضیحات .."
                                rows="3"
                                v-model="description"
                                no-resize
                            />
                        </b-form-group>
                    </b-col>
                    <b-col class="custom-border" cols="12">
                        <b-form-group
                            label="زمان قرعه کشی"
                            label-for="credit"
                            label-cols-md="4"
                        >
                            <date-picker
                                type="datetime"
                                id="max-date-join"
                                v-model="execute_at"
                                clearable
                            />
                        </b-form-group>
                    </b-col>
                    <!-- <b-col md="8" offset-md="4">
                        <b-form-group>
                            <b-form-checkbox
                                id="active"
                                name="active"
                                value="true"
                            >
                                نمایش تعداد شرکت کنندگان
                            </b-form-checkbox>
                        </b-form-group>
                    </b-col> -->

                    <!-- submit and reset -->
                    <b-col offset-md="4" class="mt-2">
                        <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            type="submit"
                            variant="primary"
                            class="mr-1"
                        >
                            ذخیره
                        </b-button>
                        <b-button
                            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                            type="reset"
                            variant="outline-secondary"
                            @click="delInputs"
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
import axios from "axios";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import Ripple from "vue-ripple-directive";
import {
    BFormTextarea,
    BCard,
    BAlert,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BFormRadio,
    BForm,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    BRow,
    BCol,
    BLink,
} from "bootstrap-vue";
import _ from "lodash";
import AlertMessage from "../components/alert-message/AlertMessage.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
    data() {
        return {
            title: "",
            starts_at: "",
            expires_at: "",
            execute_at: "",
            type: "",
            max_winner: "",
            max_chances: "",
            required_points: "",
            point_withdrawal: "",
            status: "",
            description: "",
            errors: undefined,
            alertType: "danger",
            alertMessages: [],
            alertVariant: undefined,
            alertDismissable: false,
        };
    },
    components: {
        datePicker: VuePersianDatetimePicker,

        BFormTextarea,
        BCard,
        BAlert,
        BFormGroup,
        BFormInput,
        BFormCheckbox,
        BFormRadio,
        BForm,
        BButton,
        BInputGroup,
        BInputGroupPrepend,
        BRow,
        BCol,
        BLink,
        "alert-message": AlertMessage,
    },
    directives: {
        Ripple,
    },
    methods: {
        sendPosts() {
            const params = {
                title: this.title,
                starts_at: `${this.starts_at}:00`,
                expires_at: `${this.expires_at}:00`,
                execute_at: `${this.execute_at}:00`,
                type: 'point',
                max_winner: this.max_winner,
                max_chances: this.max_chances,
                required_points: this.required_points,
                point_withdrawal: this.point_withdrawal,
                status: this.status,
                description: this.description,
            };
            axios
                .post(`${process.env.VUE_APP_URL}/lotteries/store`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    // this.alertMessages = ["عملیات با موفقیت انجام شد"];
                    // this.alertVariant = "success";
                    // this.$refs.alertComponent.showMessage();
                    this.$toast({
                        component: ToastificationContent,
                        position: "top-right",
                        props: {
                            title: "قرعه کشی",
                            icon: "CoffeeIcon",
                            variant: "success",
                            text: response.data.message,
                        },
                    });
                    this.$router.push({ name: "lottery-list" });
                })
                .catch((error) => {
                    this.alertMessages = _.flatten(
                        Object.values(error.response.data.errors)
                    );
                    this.alertVariant = "danger";
                    this.$refs.alertComponent.showMessage();
                });
        },
        delInputs() {
            this.title = "";
            this.starts_at = "";
            this.expires_at = "";
            this.execute_at = "";
            // this.type = "";
            this.max_winner = "";
            this.max_chances = "";
            this.required_points = "";
            this.point_withdrawal = "";
            this.status = "";
            this.descriptio = "";
        },
    },
};
</script>
