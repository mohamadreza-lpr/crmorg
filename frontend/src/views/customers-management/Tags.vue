<template>
    <div>
        <b-button
            variant="primary"
            @click="toTagPage"
            class="form-group"
            >افزودن برچسب جدید
            <feather-icon size="13" icon="PlusIcon"></feather-icon>
        </b-button>
        <div class="my">
            <!-- alert -->
            <b-alert
                v-height-fade.appear
                :show="this.alert.visible"
                dismissible
                class="mb-2"
                :variant="this.alert.type"
            >
                <div class="alert-body">
                    {{ this.alert.text }}
                </div>
            </b-alert>
            <!-- alert -->
        </div>
        <b-card v-if="tags.length > 0">
            <!-- users list table -->
            <b-table
                responsive
                class="mt-1"
                :striped="striped"
                :bordered="bordered"
                :outlined="outlined"
                :fields="fields"
                :items="tags"
            >
                <template #cell(title)="data">
                    {{ data.value }}
                </template>
                <template #cell(description)="data">
                    {{ data.value }}
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
            <!-- users list table -->

            <b-pagination
                class="mb-0"
                v-model="page"
                :per-page="perPage"
                :total-rows="count"
                @change="pageChangeHandler"
            ></b-pagination>
        </b-card>
        <b-card v-else class="text-center">
            <h4 class="text-secondary mb-0">
                موردی یافت نشد
            </h4>
        </b-card>
    </div>
</template>

<script>
import {
    BRow,
    BCard,
    BTable,
    BAlert,
    BButton,
    BPagination
} from "bootstrap-vue";
import { heightFade } from "@core/directives/animations";
import _ from "lodash";
import axios from "axios";

export default {
    directives: {
        "height-fade": heightFade,
    },
    components: {
        BRow,
        BCard,
        BTable,
        BAlert,
        BButton,
        BPagination
    },
    data() {
        return {
            // table properties
            page: 1,
            count: 1,
            perPage: 1,
            striped: true,
            bordered: true,
            outlined: true,
            // table fields
            fields: [
                { key: "created_at", label: "#" },
                { key: "name", label: "عنوان" },
                { key: "description", label: "توضیحات" },
                { key: "action", label: "عملیات" }
            ],
            // tags list
            tags: []
        };
    },
    created() {
        // hide alert after 5 seconds
        if (this.alert.visible) {
            setTimeout(() => {
                this.$store.commit("app/hideAlert");
            }, 5000);
        }
        // take page from url
        if (this.$route.query.hasOwnProperty("page")) {
            this.page = this.$route.query.page;
        }
        // get all tags from api
        this.getTags();
    },
    computed: {
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
        toTagPage(){
            this.$router.push({ name: 'customers-addTag' })
        },
        editAction(id) {
            this.$router.replace({
                name: "customers-editTag",
                params: {
                    id,
                },
            });
        },
        pageChangeHandler(value) {
            this.page = value;
            this.getTags();
        },
        resetPagination() {
            this.page = 1;
        },
        getTags() {
            axios
                .get(`${process.env.VUE_APP_URL}/tags?page=${this.page}&per_page=8&order_by=tag_id,desc`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    const { total } = response.data.meta;
                    const { per_page } = response.data.meta;

                    this.startNum = (this.page - 1) * this.perPage;

                    _.map(response.data.data, tag => {
                        this.startNum++;
                        tag.created_at = this.startNum;
                    });

                    this.tags = _.values(response.data.data);
                    this.perPage = per_page;
                    this.count = total;
                });
        }
    }
};
</script>
