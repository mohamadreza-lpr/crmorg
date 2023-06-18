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
                <div v-for="error in errorsList" :key="error">
                    <b-alert variant="danger" :show="true" class="mb-1">
                        <div class="alert-body">
                            <feather-icon icon="InfoIcon" class="mr-50" />
                            <small>{{ error }}</small>
                        </div>
                    </b-alert>
                </div>
            </b-card-text>
        </b-modal>
        <b-card>
            <div class="m-2">
                <b-row>
                    <b-col
                        cols="12"
                        md="6"
                        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                    >
                        <h3>سطح دسترسی جدید</h3>
                    </b-col>
                </b-row>
                <hr />
                <div class="col-md-6 form-group">
                    <label for="" class="font-weight-bold"
                        >عنوان سطح دسترسی</label
                    >
                    <b-form-input autocomplete="off"
                        class="d-inline-block mr-1"
                        v-model="title"
                        placeholder="عنوان سطح دسترسی"
                    />
                </div>
                <div class="col-md-6 form-group">
                    <label for="" class="font-weight-bold">نام انگلیسی</label>
                    <b-form-input autocomplete="off"
                        class="d-inline-block mr-1"
                        v-model="engName"
                        placeholder="نام انگلیسی"
                    />
                </div>
                <div class="text-right">
                    <b-button variant="success" @click="createRolls">
                        <span class="text-nowrap">ثبت</span>
                    </b-button>
                </div>
            </div>
        </b-card>
    </div>
</template>
<script>
import {
    BCard,
    BRow,
    BCol,
    BAlert,
    BFormInput,
    BForm,
    BButton,
    BTable,
    BBadge,
    BPagination,
    BFormGroup,
} from "bootstrap-vue";
import axios from "axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
    components: {
        BRow,
        BCol,
        BCard,
        BButton,
        BBadge,
        BTable,
        BFormGroup,
        BFormInput,
        BForm,
        BAlert,
        BPagination,
    },
    data() {
        return {
            title: undefined,
            engName: undefined,
            //errorModal
            errorModalShow: false,
            errorsList: undefined,
        };
    },
    methods: {
        createRolls() {
            const params = {
                display_name: this.title,
                name: this.engName,
            };
            axios
                .post(`${process.env.VUE_APP_URL}/roles/store`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.$router.replace("/access-control/roles").then(() => {
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: "نقش جدید",
                                icon: "CoffeeIcon",
                                variant: "success",
                                text: "سطح دسترسی جدید با موفقیت اضافه شد",
                            },
                        });
                    });
                })
                .catch((error) => {
                    this.errorModalShow = true;
                    this.errorsList = error.response.data.errors.display_name;
                });
        },
    },
};
</script>
<style lang="scss"></style>
