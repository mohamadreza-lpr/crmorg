<template>
    <div>
        <h4>ویرایش بلاگ</h4>
        <b-card>
            <b-form-group>
                <div class="col-12 form-group">
                    <label>عنوان</label>
                    <b-form-input
                        autocomplete="off"
                        v-model="title"
                        class="d-inline-block mr-1"
                        placeholder="عنوان را وارد نمایید"
                    />
                </div>
                <div class="col-12 form-group">
                    <label>عکس</label>
                    <b-form-file
                        id="IANA"
                        browse-text="مرور"
                        placeholder="هیچ فایلی انتخاب نشده است"
                        accept="image/jpeg, image/png, image/gif"
                    />
                </div>
                <div class="col-12 form-group">
                    <label>محتوا</label>
                    <quill-editor v-model="content" />
                </div>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label>دسته بندی</label>
                        <v-select
                            class="bg-white"
                            v-model="category"
                            placeholder="انتخاب کنید"
                            dir="rtl"
                            label="name"
                            :options="categoryOptions"
                        />
                    </div>
                    <div class="col-md-6 form-group">
                        <label>برچسب</label>
                        <v-select
                            class="bg-white"
                            v-model="tags"
                            :options="tagOptions"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'ltr' : 'rtl'"
                            multiple
                            taggable
                            push-tags
                            placeholder="برچسب دلخواه خودتان را اضافه کنید"
                        />
                    </div>
                </div>
                <div class="col-12 form-group">
                    <b-form-group
                        class="mb-0 mt-2"
                        label="وضعیت"
                        label-for="status"
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
                </div>
                <div class="text-right mt-1">
                    <b-button @click="editBlog" variant="success">
                        <span class="text-nowrap">ذخیره</span>
                    </b-button>
                </div>
            </b-form-group>
        </b-card>
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

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
    BFormRadio,
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
    BFormFile
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
    components: {
        BFormRadio,
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
        quillEditor,
        BFormFile
    },
    directives: {
        "height-fade": heightFade,
        Ripple
    },
    data() {
        return {
            title: undefined,
            content: undefined,
            category: undefined,
            tags: undefined,
            tagOptions: undefined,
            catGroups: [],
            categoryOptions: undefined,
            tagGroups: [],
            status: undefined,
            striped: true,
            bordered: true,
            outlined: true,
            items: undefined,
            fields: [
                { key: "title", label: "عنوان" },
                { key: "categories", label: "دسته بندی" },
                { key: "tags", label: "برچسب ها" },
                { key: "content", label: "محتوا" }
            ],
            status_options: [
                {
                    value: "active",
                    text: "فعال"
                },
                {
                    value: "inactive",
                    text: "غیر فعال"
                }
            ]
        };
    },
    created() {
        this.getBlog();
        this.getTags();
        this.getCategories();
    },
    methods: {
        getBlog() {
            const id = this.$route.params.id;
            axios
                .get(`${process.env.VUE_APP_URL}/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    console.log(response);
                    this.title = response.data.data.title;
                    this.content = response.data.data.content;
                    this.tags = response.data.data.tags;
                    this.category = response.data.data.categories[0];
                    this.status = _.find(this.status_options, item => {
                        return item.text === response.data.data.status;
                    }).value;
                })
                .catch(error => {});
        },
        editBlog() {
            const id = this.$route.params.id;
            const params = {
                title: this.title,
                content: this.content,
                category_ids: [this.category ? this.category.id : undefined],
                tags:  _.map(this.tags, (item) => {
                    return _.has(item, 'id') ? {id: item.id , name: item.name} : {id: null , name: item.name }; 
                }),
                status: this.status,
                featured: null
            };
            console.log(params);
            axios
                .patch(`${process.env.VUE_APP_URL}/posts/${id}`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    console.log(response);
                    this.$router.replace("/blog/list").then(() => {
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: "بروزرسانی مقاله",
                                icon: "CoffeeIcon",
                                variant: "success",
                                text: "مقاله مورد نظر بروزرسانی شد"
                            }
                        });
                    });
                })
                .catch(error => {});
        },
        getTags() {
            axios
                .get(`${process.env.VUE_APP_URL}/tags/blogs`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    this.tagOptions = response.data.data;
                });
        },
        getCategories() {
            axios
                .get(
                    `${process.env.VUE_APP_URL}/groups/all/blogs?flatten=true`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`
                        }
                    }
                )
                .then(response => {
                    this.categoryOptions = response.data;
                });
        }
    }
};
</script>

<style></style>
