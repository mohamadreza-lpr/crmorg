<template>
    <div>
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
                <!-- <div class="col-md-6 form-group">
                    <label for="" class="font-weight-bold">نام انگلیسی</label>
                    <b-form-input autocomplete="off"
                        class="d-inline-block mr-1"
                        v-model="engName"
                        placeholder="نام انگلیسی"
                    />
                </div> -->
                <div class="text-right">
                    <b-button variant="success" @click="editRolls">
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
import { heightFade } from "@core/directives/animations";
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
    directives: {
        "height-fade": heightFade,
    },
    data() {
        return {
            title: undefined,
            engName: undefined,
        };
    },
    created() {
        const id = this.$route.params.id;

        axios
            .get(`${process.env.VUE_APP_URL}/roles/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((response) => {
                this.title = response.data.data.display_name;
                this.engName = response.data.data.name;
            });
    },
    methods: {
        editRolls() {
            const id = this.$route.params.id;
            const params = {
                display_name: this.title,
                name: this.engName,
            };
            axios
                .patch(`${process.env.VUE_APP_URL}/roles/${id}`, params, {
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
                                title: "بروزرسانی نقش",
                                icon: "CoffeeIcon",
                                variant: "success",
                                text: "سطح دسترسی با موفقیت بروزرسانی شد",
                            },
                        });
                    });
                })
                .catch((error) => {});
        },
    },
};
</script>
<style lang="scss"></style>
