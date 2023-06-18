<template>
    <section>
        <b-modal
            id="modal-info"
            ok-only
            ok-variant="info"
            ok-title="ویرایش"
            modal-class="modal-info"
            centered
            title="ویرایش برچسب"
            @ok="editTag()"
        >
            <div>
                <label>برچسب</label>
                <b-form-input
                    autocomplete="off"
                    v-model="tagName"
                    class="d-inline-block mr-1"
                    placeholder="نام برچسب را وارد نمایید"
                />
                <!-- <label>تعداد</label>
                <b-form-input
                    autocomplete="off"
                    v-model="tagcount"
                    class="d-inline-block mr-1"
                    placeholder="تعداد را وارد نمایید"
                /> -->
            </div>
        </b-modal>
        <b-modal
            id="modal-warning"
            ok-only
            ok-variant="warning"
            ok-title="ایجاد"
            modal-class="modal-warning"
            centered
            title="ساخت برچسب جدید"
            @ok="createTags()"
        >
            <div>
                <label>برچسب</label>
                <b-form-input
                    autocomplete="off"
                    v-model="newTagName"
                    class="d-inline-block mr-1"
                    placeholder="نام برچسب را وارد نمایید"
                />
                <!-- <label>تعداد</label>
                <b-form-input
                    autocomplete="off"
                    v-model="tagcount"
                    class="d-inline-block mr-1"
                    placeholder="تعداد را وارد نمایید"
                /> -->
            </div>
        </b-modal>
        <b-row class="justify-content-center">
            <div class="col-md-12">
                <b-card>
                    <b-row class="m-1 justify-content-between">
                        <h4>برچسب های مشتریان</h4>
                        <b-button
                            variant="warning"
                            v-ripple.400="'rgba(0, 207, 232, 0.15)'"
                            v-b-modal.modal-warning
                        >
                            افزودن تگ جدید
                        </b-button>
                    </b-row>
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
                        <template class="minwidth" #cell(start)="data">
                            <div>
                                {{ data.item.start }}
                            </div>
                        </template>
                        <template #cell(action)="data">
                            <b-button
                                v-ripple.400="'rgba(0, 207, 232, 0.15)'"
                                v-b-modal.modal-info
                                class="btn-icon"
                                variant="gradient-info"
                                @click="sendIdToModal(data.item.id, data.index)"
                            >
                                <feather-icon icon="Edit2Icon" />
                            </b-button>
                        </template>
                    </b-table>
                    <div class="mx-2 mb-2">
                        <b-row>
                            <!-- Pagination -->
                            <b-col
                                cols="12"
                                sm="12"
                                class="d-flex align-items-center justify-content-center"
                            >
                                <b-pagination
                                    v-model="page"
                                    :total-rows="total"
                                    :per-page="perPage"
                                    @change="pageChanger"
                                    first-number
                                    last-number
                                    class="mb-0 mt-1 mt-sm-0"
                                    prev-class="prev-item"
                                    next-class="next-item"
                                >
                                    <template #prev-text>
                                        <feather-icon
                                            icon="ChevronRightIcon"
                                            size="18"
                                        />
                                    </template>
                                    <template #next-text>
                                        <feather-icon
                                            icon="ChevronRightIcon"
                                            size="18"
                                        />
                                    </template>
                                </b-pagination>
                            </b-col>
                        </b-row>
                    </div>
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
            newTagName: undefined,
            tagIndex: undefined,
            tagName: undefined,
            tagcount: undefined,
            tagIndexNum: undefined,
            page: 1,
            perPage: 5,
            total: 12,
            pageOptions: [5, 10, 15],
            //table data
            striped: true,
            bordered: true,
            outlined: true,
            items: [],
            fields: [
                { key: "start", label: "شماره" },
                { key: "name", label: "نام برچسب" },
                // { key: "count", label: "تعداد" },
                { key: "action", label: "ویرایش" }
            ],
            indexNum: 0
        };
    },
    created() {
        this.getTags();
    },
    computed: {},
    methods: {
        // countNum() {
        //
        // },
        // index(index) {
        //     (this.tagIndexNum = index),
        //         (this.tagName = this.items[this.tagIndexNum].tagName),
        //         (this.tagcount = this.items[this.tagIndexNum].count);
        // },
        pageChanger(value) {
            this.page = value;
        },
        sendIdToModal(id, index) {
            this.tagIndex = id;
            this.tagName = this.items[index].name;
        },
        editTag() {
            axios
                .patch(
                    `${process.env.VUE_APP_URL}/tags/${this.tagIndex}/update`,
                    {
                        name: this.tagName,
                        type: "users"
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`
                        }
                    }
                )
                .then(response => {
                    this.indexNum = 0;
                    this.getTags();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getTags() {
            axios
                .get(`${process.env.VUE_APP_URL}/tags/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    this.items = response.data.data;
                    _.map(this.items, post => {
                        this.indexNum++;
                        post.start = this.indexNum;
                    });
                })
                .catch(error => {});
        },
        createTags() {
            axios
                .post(
                    `${process.env.VUE_APP_URL}/tags/store`,
                    {
                        name: this.newTagName,
                        type: "users"
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`
                        }
                    }
                )
                .then(response => {
                    this.indexNum = 0;
                    this.getTags();
                });
        }
    }
};
</script>

<style>
.minwidth {
    max-width: 10px !important;
}
</style>
