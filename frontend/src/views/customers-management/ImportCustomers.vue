<template>
    <div>
        <h4>ورود اطلاعات مشتریان از اکسل</h4>
        <b-card>
            <b-alert variant="info" class="form-group" show>
                <div class="alert-body">
                    <feather-icon icon="InfoIcon" class="mr-50" />
                    <small
                        >کاربر گرامی، توجه داشته باشید که شما فقط قادر به افزودن
                        فایلهایی با پسوند
                        <span class="text-info font-weight-bold">xlsx</span>
                        هستید.</small
                    >
                </div>
            </b-alert>
            <alert-message
                ref="alertComponent"
                :variant="alertVariant"
                :messages="alertMessages"
                :dismissible="alertDismissible"
            />
            <b-form @submit.prevent="importCustomerHandler">
                <b-row>
                    <b-col cols="12">
                        <b-form-group
                            label="قایلهای انتخابی شما"
                            label-for="title"
                            label-cols-md="3"
                        >
                            <b-form-file
                                accept=".xlsx, .xls"
                                browse-text="مرور"
                                placeholder="هیچ فایلی انتخاب نشده است"
                                @change="selectFilesHandler"
                                multiple
                            >
                                <template
                                    slot="file-name"
                                    slot-scope="{ names }"
                                >
                                    <b-badge variant="primary">
                                        {{ names[0] }}
                                    </b-badge>
                                    <b-badge
                                        v-if="names.length > 1"
                                        variant="dark"
                                        class="ml-1"
                                    >
                                        {{ names.length - 1 }} فایل دیگر
                                    </b-badge>
                                </template>
                            </b-form-file>
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
    BFormFile,
    BBadge,
    BForm,
    BRow,
    BCol,
    BButton,
    BAlert,
} from "bootstrap-vue";
import axios from "axios";
import _ from "lodash";
import AlertMessageVue from '../components/alert-message/AlertMessage.vue';
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    components: {
        BCard,
        BAlert,
        BFormGroup,
        BFormFile,
        BBadge,
        BForm,
        BRow,
        BCol,
        BButton,
        "alert-message": AlertMessageVue,
    },
    data() {
        return {
            customersExcel: undefined,
            // alert
            alertMessages: [],
            alertVariant: undefined,
            alertDismissible: false,
        };
    },
    methods: {
        selectFilesHandler(e) {
            let formData = new FormData();
            _.map(e.target.files, (item, index) => {
                formData.append("users", e.target.files[index]);
            });
            this.customersExcel = formData;
        },

        importCustomerHandler() {
            axios
                .post(
                    `${process.env.VUE_APP_URL}/users/import`,
                    this.customersExcel,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    this.$router.replace("/customers/list").then(() => {
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: "برچسب جدید",
                                icon: "CoffeeIcon",
                                variant: "success",
                                text: "کاربران مورد نظر با موفقیت ثبت شدند",
                            },
                        });
                    });
                })
                .catch((error) => {
                    this.alertVariant = "danger";
                    this.alertMessages = ['خطا در بارگذاری فایل'];
                    this.$refs.alertComponent.showMessage();
                });
        },
    },
};
</script>

<style lang="scss" scoped>
</style>