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

        <BCard>
            <h4 class="mb-2 font-weight-bolder">ثبت کوپن جدید</h4>
            <div class="row">
                <div class="col-lg-4 form-group">
                    <label>عنوان</label>
                    <b-form-input
                        autocomplete="off"
                        v-model="couponTitle"
                        placeholder="عنوان"
                        :class="{
                            'is-invalid': submitted && $v.couponTitle.$error,
                        }"
                    />
                    <div
                        v-if="submitted && !$v.couponTitle.required"
                        class="invalid-feedback d-block"
                    >
                        این فیلد الزامی است
                    </div>
                </div>
                <div class="col-lg-4 form-group">
                    <label>نوع کوپن</label>
                    <v-select
                        dir="rtl"
                        v-model="couponType"
                        :options="couponTypeOptions"
                        size="sm"
                        label="name"
                        placeholder="انتخاب کنید.."
                        :class="{
                            'is-invalid': submitted && $v.couponType.$error,
                        }"
                    >
                        <template #no-options>
                            رکوردی برای نمایش وجود ندارد
                        </template>
                    </v-select>
                    <div
                        v-if="submitted && !$v.couponType.required"
                        class="invalid-feedback d-block"
                    >
                        این فیلد الزامی است
                    </div>
                </div>
                <div class="col-lg-4 form-group">
                    <label>کد تخفیف</label>
                    <b-form-input
                        autocomplete="off"
                        v-model="couponCode"
                        placeholder="کد تخفیف"
                        :class="{
                            'is-invalid': submitted && $v.couponCode.$error,
                        }"
                    />
                    <div
                        v-if="submitted && !$v.couponCode.required"
                        class="invalid-feedback d-block"
                    >
                        این فیلد الزامی است
                    </div>
                </div>
                <div class="col-lg-4 form-group">
                    <label>به ازای کاربر</label>
                    <b-form-input
                        autocomplete="off"
                        v-model="couponPerUser"
                        placeholder="به ازای کاربر"
                        :class="{
                            'is-invalid': submitted && $v.couponPerUser.$error,
                        }"
                    />
                    <div
                        v-if="submitted && !$v.couponPerUser.required"
                        class="invalid-feedback d-block"
                    >
                        این فیلد الزامی است
                    </div>
                </div>
                <div class="col-lg-4 form-group">
                    <label>تعداد</label>
                    <b-form-input
                        autocomplete="off"
                        type="number"
                        v-model="couponMaxUsage"
                        placeholder="تعداد"
                        :class="{
                            'is-invalid': submitted && $v.couponMaxUsage.$error,
                        }"
                    />
                    <div
                        v-if="submitted && !$v.couponMaxUsage.required"
                        class="invalid-feedback d-block"
                    >
                        این فیلد الزامی است
                    </div>
                </div>
                <div class="col-lg-4 form-group">
                    <label> امتیاز </label>
                    <b-form-input
                        autocomplete="off"
                        type="number"
                        v-model="point"
                        placeholder="امتیاز"
                        :class="{
                            'is-invalid': submitted && $v.point.$error,
                        }"
                    />
                    <div
                        v-if="submitted && !$v.point.required"
                        class="invalid-feedback d-block"
                    >
                        این فیلد الزامی است
                    </div>
                </div>
                <div class="col-lg-4 form-group">
                    <label>
                        مبلغ
                        <small>
                            {{
                                couponType && couponType.value == "voucher"
                                    ? "(درصدی)"
                                    : "(ریال)"
                            }}
                        </small>
                    </label>
                    <b-form-input
                        autocomplete="off"
                        v-model="couponAmount"
                        placeholder="مبلغ"
                        :class="{
                            'is-invalid': submitted && $v.couponAmount.$error,
                        }"
                    />
                    <div
                        v-if="submitted && !$v.couponAmount.required"
                        class="invalid-feedback d-block"
                    >
                        این فیلد الزامی است
                    </div>
                </div>
                <div class="col-lg-4 form-group">
                    <label>حداقل مبلغ فاکتور <small>(ریال)</small></label>
                    <b-form-input
                        autocomplete="off"
                        v-model="couponBillMinAmount"
                        placeholder="حداقل مبلغ فاکتور"
                        :class="{
                            'is-invalid':
                                submitted && $v.couponBillMinAmount.$error,
                        }"
                    />
                    <div
                        v-if="submitted && !$v.couponBillMinAmount.required"
                        class="invalid-feedback d-block"
                    >
                        این فیلد الزامی است
                    </div>
                </div>
                <div class="col-lg-4">
                    <b-form-group>
                        <label for="" class="font-weight-bold">
                            تاریخ شروع
                        </label>
                        <date-picker
                            id="started_at"
                            v-model="couponStartedAt"
                            clearable
                            locale="fa"
                            format="jYYYY/jMM/jDD HH:mm:ss"
                            type="datetime"
                            :class="{
                                'is-invalid':
                                    submitted && $v.couponStartedAt.$error,
                            }"
                        />
                        <div
                            v-if="submitted && !$v.couponStartedAt.required"
                            class="invalid-feedback d-block"
                        >
                            این فیلد الزامی است
                        </div>
                    </b-form-group>
                </div>
                <div class="col-lg-4">
                    <b-form-group>
                        <label for="" class="font-weight-bold">
                            تاریخ پایان
                        </label>
                        <date-picker
                            id="expires_at"
                            v-model="couponExpiresAt"
                            clearable
                            locale="fa"
                            format="jYYYY/jMM/jDD HH:mm:ss"
                            type="datetime"
                            :class="{
                                'is-invalid':
                                    submitted && $v.couponExpiresAt.$error,
                            }"
                        />
                        <div
                            v-if="submitted && !$v.couponExpiresAt.required"
                            class="invalid-feedback d-block"
                        >
                            این فیلد الزامی است
                        </div>
                    </b-form-group>
                </div>
                <div class="col-lg-4">
                    <b-form-group class="mb-0">
                        <label for="" class="font-weight-bold"> تصویر </label>
                        <b-form-file
                            v-model="couponImage"
                            drop-placeholder="رها کنید"
                            @change="selectImageHandler"
                            placeholder="فایل مورد نظر را انتخاب کنید"
                        />
                    </b-form-group>
                </div>
                <div class="col-lg-4">
                    <b-form-group class="mb-0">
                        <label for="" class="font-weight-bold"> وضعیت </label>
                        <div class="demo-inline-spacing">
                            <b-form-radio
                                v-model="couponStatus"
                                name="status"
                                value="active"
                                class="custom-control-primary mt-0"
                            >
                                فعال
                            </b-form-radio>
                            <b-form-radio
                                v-model="couponStatus"
                                name="status"
                                value="inactive"
                                class="custom-control-primary mt-0"
                            >
                                غیرفعال
                            </b-form-radio>
                        </div>
                    </b-form-group>
                </div>
            </div>
            <div class="text-right">
                <b-button variant="primary" @click="newCouponHandler">
                    <span class="text-nowrap">ثبت</span>
                </b-button>
            </div>
        </BCard>
    </div>
</template>

<script>
import vSelect from "vue-select";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import { required } from "vuelidate/lib/validators";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    BCard,
    BButton,
    BFormRadio,
    BInputGroup,
    BFormInput,
    BFormGroup,
    BRow,
    BAlert,
    BCol,
    BCardText,
    BFormFile,
} from "bootstrap-vue";
import _ from "lodash";
import axios from "axios";
export default {
    components: {
        datePicker: VuePersianDatetimePicker,
        BCard,
        BCardText,
        BButton,
        BInputGroup,
        BFormInput,
        BFormGroup,
        BFormRadio,
        BRow,
        BAlert,
        BCol,
        BFormFile,
        vSelect,
    },
    data() {
        return {
            // error modal
            errorsList: [],
            errorModalShow: false,
            // coupon
            couponTypeOptions: [
                {
                    name: "تخفیف",
                    value: "discount",
                },
                {
                    name: "کوپن",
                    value: "voucher",
                },
            ],
            couponTitle: undefined,
            couponType: undefined,
            couponCode: undefined,
            point: undefined,
            couponPerUser: undefined,
            couponMaxUsage: undefined,
            couponAmount: undefined,
            couponBillMinAmount: undefined,
            couponStartedAt: undefined,
            couponExpiresAt: undefined,
            couponStatus: "inactive",
            couponImage: undefined,
            submitted: false,
        };
    },
    watch: {
        couponAmount(newValue, oldValue) {
            const result = newValue
                .toString()
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            this.$nextTick(() => (this.couponAmount = result));
        },
        couponBillMinAmount(newValue, oldValue) {
            const result = newValue
                .toString()
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            this.$nextTick(() => (this.couponBillMinAmount = result));
        },
    },
    validations: {
        couponTitle: { required },
        couponType: { required },
        couponCode: { required },
        couponPerUser: { required },
        couponMaxUsage: { required },
        couponAmount: { required },
        couponBillMinAmount: { required },
        couponStartedAt: { required },
        couponExpiresAt: { required },
        point: { required },
    },
    created() {
        const label = document
            .getElementsByClassName("custom-file-label")
            .item(0);
    },
    methods: {
        // remove currency divider
        removeCurrencyMask(value) {
            if (value) return value.toString().replace(/,/g, "");
        },
        // create new coupon
        newCouponHandler() {
            this.submitted = true;
            // validate
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            const params = {
                title: this.couponTitle,
                code: this.couponCode,
                type: this.couponType.value,
                max_usage: this.couponMaxUsage,
                per_user: this.couponPerUser,
                amount: parseInt(this.removeCurrencyMask(this.couponAmount)),
                bill_min_amount: parseInt(
                    this.removeCurrencyMask(this.couponBillMinAmount)
                ),
                required_points: this.point,
                image: this.couponImage,
                starts_at: this.couponStartedAt,
                expires_at: this.couponExpiresAt,
                status: this.couponStatus,
            };

            const formData = new FormData();

            for (const key in params) {
                if (Object.hasOwnProperty.call(params, key)) {
                    const element = params[key];
                    formData.set(key, element);
                }
            }

            axios
                .post(`${process.env.VUE_APP_URL}/discounts/store`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.$router.replace("/gift/coupones/list").then(() => {
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: "کوپن جدید",
                                icon: "CoffeeIcon",
                                variant: "success",
                                text: "کوپن مورد نظر ثبت شد",
                            },
                        });
                    });
                })
                .catch((error) => {
                    this.errorsList = error.response.data.errors;
                    this.errorModalShow = true;
                });
        },
        selectImageHandler(e) {
            this.couponImage = e.target.files[0];
        },
    },
};
</script>

<style lang="scss">
.custom-file-input ~ .custom-file-label[data-browse]::after {
    content: "انتخاب کنید";
    line-height: 22px !important;
}
</style>
