<template>
    <section>
        <b-row>
            <div class="col-md-12">
                <div v-if="isLoaded">
                    <b-card>
                        <b-alert
                            v-height-fade.appear
                            :show="this.alert.visible"
                            dismissible
                            class="mb-2 mt-1"
                            :variant="this.alert.type"
                        >
                            <div class="alert-body">
                                {{ this.alert.text }}
                            </div>
                        </b-alert>
                        <h4 class="font-weight-bolder mb-2">لیست نظرسنجی ها</h4>
                        <!-- surveys list table -->
                        <b-table
                            responsive
                            :striped="striped"
                            :bordered="bordered"
                            :outlined="outlined"
                            :fields="fields"
                            :items="surveys"
                        >
                            <template #empty>
                                <h5 class="text-center text-muted">
                                    رکوردی برای نمایش وجود ندارد
                                </h5>
                            </template>
                            <template #cell(statuses)="data">
                                <b-badge variant="primary">
                                    <small>{{ data.value }}</small>
                                </b-badge>
                            </template>
                            <template #cell(starts_at)="data">
                                <small dir="ltr">{{ data.item.starts_at.j_date.full_date }}</small>
                            </template>
                            <template #cell(expires_at)="data">
                                <small dir="ltr">{{ data.item.expires_at.j_date.full_date }}</small>
                            </template>
                            <template #cell(questions_count)="data">
                                <small dir="ltr">{{ data.value || 0 }}</small>
                            </template>
                            <template #cell(last_description)="data">
                                <div>
                                    {{
                                        data.item.description
                                            ? data.item.description.content
                                            : null
                                    }}
                                </div>
                            </template>
                            <template #cell(action)="data">
                                <b-button
                                    variant="gradient-info"
                                    class="btn-icon"
                                    v-on:click="editAction(data.item.id)"
                                >
                                    <feather-icon icon="Edit2Icon" />
                                </b-button>
                            </template>
                        </b-table>
                        <!-- surveys list table -->
                        <b-pagination
                            class="mb-0"
                            v-model="page"
                            :per-page="perPage"
                            :total-rows="count"
                            @change="pageChangeHandler"
                        ></b-pagination>
                    </b-card>
                </div>
                <div v-else class="text-center my-3">
                    <b-spinner label="درحال بارگذاری ..." />
                    <span class="d-block mt-1"> در حال بارگذاری ... </span>
                </div>
            </div>
        </b-row>
    </section>
</template>
<script>
import _ from "lodash";
import axios from "axios";
import { heightFade } from "@core/directives/animations";
import {
    BRow,
    BCard,
    BCardText,
    BImg,
    BButton,
    BBadge,
    BTable,
    BFormGroup,
    BFormInput,
    BSpinner,
    BForm,
    BAlert,
    BPagination,
} from "bootstrap-vue";

export default {
    components: {
        BRow,
        BCard,
        BCardText,
        BImg,
        BButton,
        BBadge,
        BTable,
        BFormGroup,
        BFormInput,
        BSpinner,
        BForm,
        BAlert,
        BPagination,
    },
    directives: {
        "height-fade": heightFade,
    },
    data() {
        return {
            // table
            page: 1,
            count: 1,
            perPage: 1,
            startNum: 0,
            striped: true,
            bordered: true,
            outlined: true,
            fields: [
                { key: "users_count", label: "#" },
                { key: "title", label: "عنوان" },
                { key: "statuses", label: "وضعیت" },
                { key: "starts_at", label: "تاریخ شروع" },
                { key: "expires_at", label: "تاریخ پایان" },
                { key: "questions_count", label: "تعداد سوالات" },
                { key: "last_description", label: "توضیحات" },
                { key: "action", label: "عملیات" },
            ],
            surveys: [],
            // is data loaded flag
            isLoaded: false,
        };
    },
    computed: {
        // get alert object from VUEX
        alert: {
            get() {
                return this.$store.getters["app/getAlert"];
            },
            set(value) {
                this.$store.commit("app/setAlert", value);
            },
        },
    },
    methods: {
        // get all surveys
        getSurveys(_params = {}) {
            axios
                .get(`${process.env.VUE_APP_URL}/surveys`, {
                    params: {
                        ..._params,
                        per_page: 8,
                        page: this.page,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then(({ data }) => {
                    const { total } = data.meta;
                    const { per_page } = data.meta;

                    this.startNum = (this.page - 1) * this.perPage;

                    _.map(data.data, (item) => {
                        item.description = _.last(item.description);
                        this.startNum++;
                        item.users_count = this.startNum;
                    });

                    this.surveys = data.data;
                    this.perPage = per_page;
                    this.count = total;

                    this.isLoaded = true;
                })
                .catch((error) => {
                    this.isLoaded = true;
                });
        },
        // navigate user to edit page with id parameter
        editAction(id) {
            this.$router.replace({
                name: "survey-edit",
                params: {
                    id,
                },
            });
        },
        // navigate between list pages (paginate)
        pageChangeHandler(value) {
            this.page = value;
            this.getSurveys();
        },
        // reset pagination when filter refreshed
        resetPagination() {
            this.page = 1;
        },
    },
    mounted() {
        this.getSurveys();
        setTimeout(() => {
            this.$store.commit("app/hideAlert", false);
        }, 7000);
    },
};
</script>
<style lang="sass"></style>
