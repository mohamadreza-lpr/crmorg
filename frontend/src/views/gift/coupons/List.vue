<template>
    <div>
        <b-row>
            <div class="col-md-8 col-lg-9">
                <b-card>
                    <h4 class="font-weight-bolder">لیست کدهای تخفیف</h4>
                    <!-- <b-alert
                        v-height-fade.appear
                        :show="this.alert.visible"
                        dismissible
                        class="mb-0"
                        :variant="this.alert.type"
                    >
                        <div class="alert-body">
                            {{ this.alert.text }}
                        </div>
                    </b-alert> -->
                    <b-table
                        responsive
                        class="mt-1"
                        :striped="striped"
                        :bordered="bordered"
                        :outlined="outlined"
                        :fields="fields"
                        :items="coupons"
                        show-empty
                    >
                        <template #cell(thumb_img)="data">
                              <b-img :src="data.value || defaultImage" class="thumb_img rounded" />
                        </template>
                        <template #cell(amount)="data">
                            {{ addCurrencyMask(data.value) }}
                            <small>تومان</small>
                        </template>
                        <template #cell(date)="data">
                            از
                            <strong><small>{{ data.item.starts_at.j_date.full_date }}</small></strong>
                            تا
                            <strong><small>{{ data.item.expires_at.j_date.full_date }}</small></strong>
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
                </b-card>
            </div>
            <div class="col-md-4 col-lg-3">
                <b-card>
                    <h4 class="font-weight-bolder">جستجو</h4>
                    <b-form class=" mt-2" @submit.prevent="searchHandler">
                        <b-form-group label="کد تخفیف">
                            <b-form-input autocomplete="off"
                                @change="resetPagination"
                                v-model="searchCode"
                                placeholder="کد تخفیف"
                            />
                        </b-form-group>
                        <b-form-group label="تاریخ شروع">
                            <date-picker
                                @change="resetPagination"
                                v-model="searchStartedAt"
                                clearable
                            />
                        </b-form-group>

                        <b-form-group label="تاریخ پابان">
                            <date-picker
                                @change="resetPagination"
                                v-model="searchExpiresAt"
                                clearable
                            />
                        </b-form-group>
                        <b-form-group lable="نوع کوپن">
                            <v-select
                                size="sm"
                                dir="rtl"
                                label="name"
                                @select="resetPagination"
                                v-model="searchType"
                                :options="couponTypeOptions"
                                placeholder="انتخاب کنید.."
                            >
                                <template #no-options>
                                    رکوردی برای نمایش وجود ندارد
                                </template>
                            </v-select>
                        </b-form-group>

                        <b-form-group label="وضعیت">
                            <div class="demo-inline-spacing">
                                <b-form-radio
                                    v-model="searchStatus"
                                    @change="resetPagination"
                                    name="status"
                                    value="active"
                                    class="custom-control-primary mt-0"
                                >
                                    فعال
                                </b-form-radio>
                                <b-form-radio
                                    v-model="searchStatus"
                                    @change="resetPagination"
                                    name="status"
                                    value="deactive"
                                    class="custom-control-primary mt-0"
                                >
                                    غیرفعال
                                </b-form-radio>
                            </div>
                        </b-form-group>

                        <b-button type="submit" variant="primary" block
                            >جستجو</b-button
                        >
                        <b-button
                            type="button"
                            variant="outline-dark"
                            @click="resetHandler"
                            block
                            >حذف فیلتر</b-button
                        >
                    </b-form>
                </b-card>
            </div>
        </b-row>
    </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import vSelect from "vue-select";
import { heightFade } from "@core/directives/animations";
import {
    BRow,
    BCard,
    BFormRadio,
    BImg,
    BButton,
    BBadge,
    BTable,
    BFormGroup,
    BFormInput,
    BForm,
    BAlert,
    BPagination
} from "bootstrap-vue";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

export default {
    components: {
        BRow,
        vSelect,
        BCard,
        BImg,
        BButton,
        BFormRadio,
        BBadge,
        BTable,
        BFormGroup,
        BFormInput,
        BForm,
        BAlert,
        BPagination,
        datePicker: VuePersianDatetimePicker
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
                { key: "updated_at", label: "#" },
                { key: 'thumb_img', label: 'تصویر'},
                { key: "title", label: "عنوان" },
                { key: "code", label: "کد" },
                { key: "amount", label: "مبلغ" },
                { key: "date", label: "تاریخ اعتبار" },
                { key: "max_usage", label: "تعداد" },
                { key: "status", label: "وضعیت" },
                { key: "action", label: "عملیات" }
            ],
            coupons: [],
            couponTypeOptions: [
                {
                    name: "تخفیف",
                    value: "discount"
                },
                {
                    name: "کوپن",
                    value: "voucher"
                }
            ],
            // search
            searchCode: undefined,
            searchStartedAt: undefined,
            searchExpiresAt: undefined,
            searchStatus: undefined,
            searchType: undefined
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
        },
        defaultImage() {
            return require('@/assets/images/pages/defaultImage.png');
        }
    },
    mounted() {
        this.getCoupons();
    },
    methods: {
        // add currency divider
        addCurrencyMask(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        // get discounts
        getCoupons(params = []) {
            axios
                .get(`${process.env.VUE_APP_URL}/discounts`, {
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
                    // setting pagination data
                    const { total } = response.data.meta;
                    const { per_page } = response.data.meta;
                    // table numbers
                    this.startNum = (this.page - 1) * this.perPage;
                    _.map(response.data.data, coupon => {
                        this.startNum++;
                        coupon.updated_at = this.startNum;
                    });
                    this.coupons = _.values(response.data.data);
                    this.perPage = per_page;
                    this.count = total;
                });
        },
        // navigate user to edit page with id parameter
        editAction(id) {
            this.$router.replace({
                name: "gift-coupones-edit",
                params: {
                    id
                }
            });
        },
        // navigate between list pages (paginate)
        pageChangeHandler(value) {
            this.page = value;
            const params = {
                code: this.searchCode,
                starts_at: this.searchStartedAt,
                expires_at: this.searchExpiresAt,
                status: this.searchStatus,
                type: this.searchType ? this.searchType.value : undefined
            };

            this.getCoupons(params);
        },
        // reset pagination when filter refreshed
        resetPagination() {
            this.page = 1;
        },
        // filter discount
        searchHandler() {
            const params = {
                code: this.searchCode,
                starts_at: this.searchStartedAt,
                expires_at: this.searchExpiresAt,
                status: this.searchStatus,
                type: this.searchType ? this.searchType.value : undefined
            };
            this.getCoupons(params);
        },
        // filter form reset action
        resetHandler() {
            this.searchCode = undefined;
            this.searchStartedAt = undefined;
            this.searchExpiresAt = undefined;
            this.searchStatus = undefined;
            this.searchType = undefined;
            this.page = 1;

            this.getCoupons();
        }
    }
};
</script>

<style lang="scss">
.thumb_img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: center;
}
</style>
