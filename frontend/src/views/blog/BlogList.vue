<template>
    <section>
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
        <b-row>
            <div class="col-md-8">
                <b-card>
                    <!-- <b-alert
                        v-height-fade.appear
                        :show="this.alert.visible"
                        dismissible
                        class="mb-2 mt-1"
                        :variant="this.alert.type"
                    >
                        <div class="alert-body">
                            {{ this.alert.text }}
                        </div>
                    </b-alert> -->
                    <b-table
                        responsive
                        :bordered="bordered"
                        :outlined="outlined"
                        :striped="striped"
                        :fields="fields"
                        :items="items"
                        empty-text="رکوردی یافت نشد"
                        show-empty
                    >
                        <template #cell(title)="data">
                            <div class="row flex-nowrap align-items-center">
                                <div cols="2">
                                    <img
                                        class="mb-1 rounded"
                                        src="../../assets/images/images.png"
                                    />
                                </div>
                                <div class="m-1" cols="10">
                                    <h4>
                                        {{ data.item.title }}
                                    </h4>
                                </div>
                            </div>
                            <div class="row mt-50">
                                <div class="mr-25" cols="7">
                                    <b-badge
                                        :variant="
                                            data.item.status == 'فعال'
                                                ? 'light-success'
                                                : 'light-danger'
                                        "
                                    >
                                        {{ data.item.status }}
                                    </b-badge>
                                </div>
                                <div
                                    cols="5"
                                    class="mr-50"
                                    v-for="cat in data.item.categories"
                                    :key="cat.data"
                                >
                                    <b-badge variant="light-primary">
                                        {{ cat.name }}
                                    </b-badge>
                                </div>
                            </div>
                        </template>
                        <template #cell(created_by)="data">
                            <div v-for="item in data" :key="item.data">
                                {{ item.first_name }}
                                {{ item.last_name }}
                            </div>
                        </template>
                        <template #cell(tags)="data">
                            <div style="width:200px" class="row flex">
                                <div
                                    class="m-25"
                                    v-for="tag in data.item.tags"
                                    :key="tag.data"
                                >
                                    {{ tag.name }}
                                </div>
                            </div>
                        </template>
                        <template #cell(action)="data">
                            <b-button
                                variant="gradient-info"
                                class="btn-icon"
                                @click="editAction(data.item.id)"
                            >
                                <feather-icon icon="Edit2Icon" />
                            </b-button>
                        </template>
                    </b-table>
                </b-card>
            </div>

            <div class="col-md-4">
                <b-card>
                    <h4 class="font-weight-bolder">جستجو</h4>
                    <b-form class="mt-2" @submit.prevent="searchHandler">
                        <b-form-group label="عنوان">
                            <b-form-input
                                autocomplete="off"
                                v-model="searchTitle"
                                placeholder="عنوان مورد نظر را تایپ کنید"
                            />
                        </b-form-group>
                        <b-form-group>
                            <label>دسته بندی</label>
                            <v-select
                                size="sm"
                                dir="rtl"
                                label="name"
                                v-model="searchCategories"
                                :options="searchCategoriesOptions"
                                placeholder="انتخاب کنید"
                            >
                                <template #no-options>
                                    رکوردی برای نمایش وجود ندارد
                                </template>
                            </v-select>
                        </b-form-group>
                        <b-form-group>
                            <label>وضعیت</label>
                            <b-row>
                                <b-form-radio
                                    v-model="searchStatus"
                                    name="searchStatus"
                                    value="1"
                                    class="custom-control-primary m-1"
                                >
                                    فعال
                                </b-form-radio>
                                <b-form-radio
                                    v-model="searchStatus"
                                    name="searchStatus"
                                    value="0"
                                    class="custom-control-primary m-1"
                                >
                                    غیر فعال
                                </b-form-radio>
                            </b-row>
                        </b-form-group>

                        <b-button type="submit" variant="primary" block
                            >جستجو</b-button
                        >
                        <b-button
                            @click="removeSearch"
                            type="button"
                            variant="outline-dark"
                            block
                        >
                            حذف فیلتر
                        </b-button>
                    </b-form>
                </b-card>
            </div>
        </b-row>
    </section>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import BsTable from "@/global/table/BsTable.vue";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import vSelect from "vue-select";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import { heightFade } from "@core/directives/animations";
import Ripple from "vue-ripple-directive";
import {
    BFormInput,
    BFormGroup,
    BCol,
    BButton,
    BForm,
    BTable,
    BPagination,
    BAlert,
    BCard,
    BRow,
    BFormCheckbox,
    BFormRadio,
    BBadge
} from "bootstrap-vue";
export default {
    components: {
        BFormInput,
        datePicker: VuePersianDatetimePicker,
        BFormGroup,
        BsTable,
        BCol,
        BForm,
        BButton,
        BTable,
        BPagination,
        BAlert,
        BCard,
        AppCollapse,
        AppCollapseItem,
        BRow,
        vSelect,
        BFormCheckbox,
        BFormRadio,
        BBadge
    },
    directives: {
        "height-fade": heightFade,
        Ripple
    },
    data() {
        return {
            //modalError
            errorModalShow: false,
            errorsList: undefined,
            //search data
            searchTitle: undefined,
            searchStatus: undefined,
            searchCategories: undefined,
            searchCategoriesOptions: undefined,
            //table data
            striped: true,
            bordered: true,
            outlined: true,
            items: [],
            fields: [
                { key: "start", label: "شماره" },
                { key: "title", label: "عنوان" },
                // { key: "created_by", label: "نویسنده" },
                // { key: "slug", label: "محتوا" },
                // { key: "status", label: "وضعیت" },
                // { key: "tags", label: "برچسب ها" },
                { key: "action", label: "ویرایش" }
            ],
            indexNum: 0
        };
    },
    created() {
        this.getBlogs();
        this.getCategories();
        setTimeout(() => {
            this.$store.commit("app/hideAlert", false);
        }, 7000);
    },
    computed: {
        // get alert object from VUEX
        alert: {
            get() {
                return this.$store.getters["app/getAlert"];
            },
            set(value) {
                this.$store.commit("app/setAlert", value);
            }
        }
    },
    methods: {
        searchHandler() {
            const params = {
                title: this.searchTitle,
                status: this.searchStatus,
                categories: [
                    this.searchCategories ? this.searchCategories.id : 0
                ]
            };
            console.log(params);
            axios
                .get(`${process.env.VUE_APP_URL}/blogs`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    },
                    params
                })
                .then(response => {
                    this.items = response.data.data;
                })
                .catch(error => {
                    this.errorsList = error.response.data.errors.title;
                    this.errorModalShow = true;
                });
        },
        removeSearch() {},
        getBlogs() {
            axios
                .get(`${process.env.VUE_APP_URL}/posts`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    console.log(response);
                    this.items = response.data.data;
                    _.map(response.data.data, post => {
                        this.indexNum++;
                        post.start = this.indexNum;
                    });
                })
                .catch(error => {});
        },
        getCategories() {
            axios
                .get(`${process.env.VUE_APP_URL}/groups/posts`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    _.map(response.data, item => {
                        return item.name;
                    });
                    this.searchCategoriesOptions = response.data;
                })
                .catch(error => {});
        },
        editAction(id) {
            this.$router.push({
                name: "blog-edit",
                params: {
                    id
                }
            });
        }
    }
};
</script>

<style></style>
