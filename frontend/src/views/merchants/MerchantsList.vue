<template>
    <section>
        <b-row>
            <div class="col-md-8 col-lg-9">
                <b-card>
                    <h4 class="font-weight-bolder">لیست شعب</h4>
                    <b-alert
                        v-height-fade.appear
                        :show="this.alert.visible"
                        dismissible
                        class="mb-0"
                        :variant="this.alert.type"
                    >
                        <div class="alert-body">
                            {{ this.alert.text }}
                        </div>
                    </b-alert>
                    <div v-if="isLoaded">
                        <b-table
                            responsive
                            class="mt-1"
                            :striped="striped"
                            :bordered="bordered"
                            :outlined="outlined"
                            :fields="fields"
                            :items="merchants"
                            show-empty
                        >
                            <template #cell(name)="data">
                                {{ data.item.name }}
                                <div
                                    v-for="item in data.item.groups"
                                    :key="item.index"
                                >
                                    <b-badge variant="light-primary">
                                        {{ item.name }}
                                    </b-badge>
                                </div>
                            </template>
                            <template #cell(city)="data">
                                {{ data.item.address.city.name }} /
                                {{ data.item.address.province.name }}
                            </template>
                            <template #cell(action)="data">
                                <b-button
                                    variant="gradient-info"
                                    class="btn-icon p-btn"
                                    v-on:click="editAction(data.item.id)"
                                >
                                    <feather-icon icon="Edit2Icon" />
                                </b-button>
                                <b-button
                                    variant="success"
                                    class="btn-icon"
                                    v-on:click="permissionAction(data.item.id)"
                                >
                                    <feather-icon icon="UserPlusIcon" />
                                </b-button>
                            </template>
                            <template #empty>
                                <div class="text-center">
                                    <h4 class="text-muted text-center">
                                        موردی یافت نشد
                                    </h4>
                                </div>
                            </template>
                        </b-table>
                        <b-pagination
                            class="mb-0"
                            v-model="page"
                            :per-page="perPage"
                            :total-rows="count"
                            @change="pageChangeHandler"
                        ></b-pagination>
                    </div>
                    <div v-else class="text-center my-3">
                        <b-spinner label="درحال بارگذاری ..." />
                        <span class="d-block mt-1"> در حال بارگذاری ... </span>
                    </div>
                </b-card>
            </div>
            <div class="col-md-4 col-lg-3">
                <b-card>
                    <h4 class="font-weight-bolder">جستجو</h4>
                    <b-form class="mt-2" @submit.prevent="searchHandler">
                        <b-form-group label="نام شعبه">
                            <b-form-input
                                autocomplete="off"
                                v-model="searchName"
                                @change="resetPagination"
                                placeholder="نام شعبه"
                            />
                        </b-form-group>
                        <b-form-group label="کد شعبه">
                            <b-form-input
                                autocomplete="off"
                                v-model="searchCode"
                                @change="resetPagination"
                                placeholder="کد شعبه"
                            />
                        </b-form-group>
                        <b-form-group>
                            <label>استان</label>
                            <v-select
                                size="sm"
                                dir="rtl"
                                label="name"
                                v-model="searchProvince"
                                @input="provinceChanges"
                                :options="provinces"
                                placeholder="انتخاب کنید"
                            >
                                <template #no-options>
                                    رکوردی برای نمایش وجود ندارد
                                </template>
                            </v-select>
                        </b-form-group>

                        <b-form-group>
                            <label>شهر</label>
                            <v-select
                                size="sm"
                                dir="rtl"
                                label="name"
                                v-model="searchCity"
                                :options="cities"
                                placeholder="انتخاب کنید"
                            >
                                <template #no-options>
                                    رکوردی برای نمایش وجود ندارد
                                </template>
                            </v-select>
                        </b-form-group>

                        <b-button type="submit" variant="primary" block
                            >جستجو</b-button
                        >
                        <b-button
                            type="button"
                            variant="outline-dark"
                            @click="resetHandler"
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
import vSelect from "vue-select";
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
    BPagination
} from "bootstrap-vue";
export default {
    components: {
        BRow,
        BCard,
        BCardText,
        BImg,
        vSelect,
        BButton,
        BBadge,
        BTable,
        BFormGroup,
        BFormInput,
        BForm,
        BSpinner,
        BAlert,
        BPagination
    },
    directives: {
        "height-fade": heightFade
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
                { key: "created_at", label: "#" },
                { key: "name", label: "نام" },
                { key: "code", label: "کد شعبه" },
                { key: "city", label: "شهر/استان" },
                { key: "action", label: "عملیات" }
            ],
            merchants: [],
            // search
            searchName: undefined,
            searchCode: undefined,
            searchProvince: undefined,
            searchCity: undefined,
            provinces: [],
            cities: [],
            // loader
            isLoaded: false
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
            }
        }
    },
    mounted() {
        this.getMerchants();
        // get provinces
        axios
            .get(`${process.env.VUE_APP_URL}/backend/provinces`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`
                }
            })
            .then(res => {
                this.provinces = res.data;
            });
    },
    methods: {
        // get branches
        getMerchants(params = []) {
            this.isLoaded = false;
            axios
                .get(`${process.env.VUE_APP_URL}/branches`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    },
                    params: {
                        ...params,
                        // pagination parameters
                        page: this.page,
                        per_page: 10
                    }
                })
                .then(response => {
                    console.log(response);
                    // setting pagination data
                    const { total } = response.data.meta;
                    const { per_page } = response.data.meta;
                    // table numbers
                    this.startNum = (this.page - 1) * this.perPage;
                    _.map(response.data.data, post => {
                        this.startNum++;
                        post.created_at = this.startNum;
                    });
                    this.perPage = per_page;
                    this.count = total;
                    this.merchants = _.values(response.data.data);

                    this.isLoaded = true;
                });
        },
        // navigate user to edit page with id parameter
        editAction(id) {
            this.$router.replace({
                name: "merchants-edit",
                params: {
                    id
                }
            });
        },
        permissionAction(id) {
            this.$router.replace({
                name: "admin-permission",
                params: {
                    id
                }
            });
        },
        // navigate between list pages (paginate)
        pageChangeHandler(value) {
            this.page = value;
            this.getMerchants();
        },
        // reset pagination when filter refreshed
        resetPagination() {
            this.page = 1;
        },
        // filter branches
        searchHandler() {
            const params = {
                name: this.searchName,
                code: this.searchCode,
                province_id: this.searchProvince
                    ? this.searchProvince.id
                    : undefined,
                city_id: this.searchCity ? this.searchCity.id : undefined
            };

            this.page = 1;
            this.getMerchants(params);
        },
        // filter form reset action
        resetHandler() {
            this.searchName = undefined;
            this.searchCode = undefined;
            this.searchProvince = undefined;
            this.searchCity = undefined;
            this.page = 1;

            this.getMerchants();
        },
        // province changes
        provinceChanges() {
            axios
                .get(
                    `${process.env.VUE_APP_URL}/backend/provinces/${this.searchProvince.id}/cities`
                )
                .then(res => {
                    this.cities = res.data;
                });
        }
    }
};
</script>
<style lang="scss">
table.table {
    & td:last-child {
        width: 150px !important;
    }
}
.p-btn {
    margin-right: 3px;
}
.td {
    min-width: 135px;
}
</style>
