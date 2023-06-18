<template>
    <div>
        <h4>ویرایش برچسب</h4>
        <b-card>
            <b-form @submit.prevent="updateTaghandler">
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
                                v-model="title"
                                id="title"
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
                                v-model="description"
                                id="description"
                                placeholder="توضیحات"
                            />
                        </b-form-group>
                    </b-col>
                    <!-- submit and reset -->
                    <b-col offset-md="3">
                        <b-button type="submit" variant="warning" class="mr-1">
                            بروزرسانی
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
    BAlert,
    BCol,
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
        BForm,
        BRow,
        BCol,
        BAlert,
        BButton
    },
    directives: {
        "height-fade": heightFade
    },
    data() {
        return {
            title: undefined,
            description: undefined,
            tagId: undefined,
            // alert properties
            alertCountDown: null,
            alertText: null,
            alertType: null
        };
    },
    methods: {
        getTag() {
            this.tagId = this.$route.params.id;

            axios
                .get(`${process.env.VUE_APP_URL}/tags/${this.tagId}/find`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(({ data }) => {
                    this.title = data.name;
                    this.description = data.description;
                })
                .catch(error => {
                     
                });
        },
        showAlert(text, type, alertTime = 10) {
            this.alertCountDown = alertTime;
            this.alertText = text;
            this.alertType = type;
        },
        countDownChanged(alertCountDown) {
            this.alertCountDown = alertCountDown;
        },
        updateTaghandler() {
            const params = {
                name: this.title,
                description: this.description
            };

            axios
                .patch(
                    `${process.env.VUE_APP_URL}/tags/${this.tagId}/update`,
                    params,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`
                        }
                    }
                )
                .then(response => {
                    this.$router.replace("/customers/tags").then(() => {
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: "بروزرسانی برچسب",
                                icon: "CoffeeIcon",
                                variant: "success",
                                text: "برچسب با موفقیت بروزرسانی شد",
                            },
                        });
                    });
                })
                .catch(error => {
                    let errors = "";
                    for (const [key, value] of Object.entries(
                        error.response.data
                    )) {
                        errors += `${value} <br>`;
                    }

                    this.showAlert(errors, "danger");
                });
        }
    },
    created() {
        this.getTag();
    }
};
</script>

<style lang="scss" scoped></style>
