<template>
    <div>
        <b-modal
            hide-footer
            modal-class="modal-danger"
            centered
            title="خطا رخ داده است"
            v-model="errorModalShow"
        >
            <b-card-text>
                <div v-for="error in errorsList" :key="error[0]">
                    <b-alert variant="danger" :show="true" class="mb-1">
                        <div class="alert-body">
                            <feather-icon icon="InfoIcon" class="mr-50" />
                            <small>{{ error[0] }}</small>
                        </div>
                    </b-alert>
                </div>
            </b-card-text>
        </b-modal>
        <b-row>
            <b-col md="12" lg="12" sm="12">
                <BCard>
                    <h4 class="mb-2 font-weight-bolder">ایجاد شعبه جدید</h4>
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>نام</label>
                            <b-form-input
                                autocomplete="off"
                                v-model="branch.name"
                                placeholder="نام شعبه"
                                :class="{
                                    'is-invalid':
                                        submitted && $v.branch.name.$error
                                }"
                            />
                            <div
                                v-if="submitted && !$v.branch.name.required"
                                class="invalid-feedback d-block"
                            >
                                این فیلد الزامی است
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>کد</label>
                            <b-form-input
                                autocomplete="off"
                                v-model="branch.code"
                                placeholder="کد"
                                :class="{
                                    'is-invalid':
                                        submitted && $v.branch.code.$error
                                }"
                            />
                            <div
                                v-if="submitted && !$v.branch.code.required"
                                class="invalid-feedback d-block"
                            >
                                این فیلد الزامی است
                            </div>
                        </div>
                        <div class="col-md-6">
                            <b-form-group>
                                <label>گروه</label>
                                <v-select
                                    class="bg-white"
                                    v-model="branch.group"
                                    placeholder="انتخاب کنید"
                                    dir="rtl"
                                    label="name"
                                    :options="groups"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.branch.group.$error
                                    }"
                                >
                                    <template #no-options>
                                        رکوردی برای نمایش وجود ندارد
                                    </template>
                                </v-select>
                                <div
                                    v-if="
                                        submitted && !$v.branch.group.required
                                    "
                                    class="invalid-feedback d-block"
                                >
                                    این فیلد الزامی است
                                </div>
                            </b-form-group>
                        </div>
                        <!-- <div class="col-md-6">
                            <b-form-group>
                                <label>مدیر شعبه</label>
                                <v-select
                                    class="bg-white"
                                    v-model="branch.seller"
                                    placeholder="انتخاب کنید"
                                    dir="rtl"
                                    label="name"
                                    :options="sellers"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.branch.seller.$error
                                    }"
                                >
                                    <template #no-options>
                                        رکوردی برای نمایش وجود ندارد
                                    </template>
                                </v-select>
                                <div
                                    v-if="
                                        submitted && !$v.branch.seller.required
                                    "
                                    class="invalid-feedback d-block"
                                >
                                    این فیلد الزامی است
                                </div>
                            </b-form-group>
                        </div> -->
                        <div class="col-md-6 form-group">
                            <label>استان</label>
                            <v-select
                                dir="rtl"
                                placeholder="انتخاب کنید"
                                v-model="branch.province"
                                :options="provinces"
                                label="name"
                                @input="provinceChanges"
                                size="sm"
                                :clearable="false"
                                :class="{
                                    'is-invalid':
                                        submitted && $v.branch.province.$error
                                }"
                            >
                                <template #no-options>
                                    رکوردی برای نمایش وجود ندارد
                                </template>
                            </v-select>
                            <div
                                v-if="submitted && !$v.branch.province.required"
                                class="invalid-feedback d-block"
                            >
                                این فیلد الزامی است
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>شهر</label>
                            <v-select
                                dir="rtl"
                                label="name"
                                placeholder="انتخاب کنید"
                                v-model="branch.city"
                                :options="cities"
                                size="sm"
                                :clearable="false"
                                :class="{
                                    'is-invalid':
                                        submitted && $v.branch.city.$error
                                }"
                            >
                                <template #no-options>
                                    رکوردی برای نمایش وجود ندارد
                                </template>
                            </v-select>
                            <div
                                v-if="submitted && !$v.branch.city.required"
                                class="invalid-feedback d-block"
                            >
                                این فیلد الزامی است
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>کد پستی</label>
                            <b-form-input
                                autocomplete="off"
                                v-model="branch.postcode"
                                placeholder="کد پستی"
                                :class="{
                                    'is-invalid':
                                        submitted && $v.branch.postcode.$error
                                }"
                            />
                            <div
                                v-if="submitted && !$v.branch.postcode.required"
                                class="invalid-feedback d-block"
                            >
                                این فیلد الزامی است
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>کاربران</label>
                            <v-select
                                dir="rtl"
                                label="users"
                                placeholder="انتخاب کنید"
                                v-model="branch.userIds"
                                :options="userIdsOptions"
                                size="sm"
                                :clearable="false"
                            >
                                <template #no-options>
                                    رکوردی برای نمایش وجود ندارد
                                </template>
                            </v-select>
                            <div
                                v-if="submitted && !$v.branch.userIds.required"
                                class="invalid-feedback d-block"
                            >
                                این فیلد الزامی است
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>آدرس کامل</label>
                            <b-form-textarea
                                v-model="branch.address"
                                placeholder="آدرس کامل"
                                :class="{
                                    'is-invalid':
                                        submitted && $v.branch.address.$error
                                }"
                            />
                            <div
                                v-if="submitted && !$v.branch.address.required"
                                class="invalid-feedback d-block"
                            >
                                این فیلد الزامی است
                            </div>
                        </div>
                        <div class="col-12 form-group">
                            <telephone-management
                                v-bind:telephones="telephones"
                            ></telephone-management>
                        </div>
                        <div class="col-12 form-group">
                            <b-form-group
                                class="mb-0 mt-2"
                                label="وضعیت"
                                label-for="status"
                            >
                                <div class="demo-inline-spacing">
                                    <b-form-radio
                                        v-model="branch.status"
                                        name="status"
                                        value="active"
                                        class="custom-control-primary mt-0"
                                    >
                                        فعال
                                    </b-form-radio>
                                    <b-form-radio
                                        v-model="branch.status"
                                        name="status"
                                        value="inactive"
                                        class="custom-control-primary mt-0"
                                    >
                                        غیرفعال
                                    </b-form-radio>
                                </div>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="text-right">
                        <b-button variant="success" @click="addMerchantHandler">
                            <span class="text-nowrap">ذخیره</span>
                        </b-button>
                    </div>
                </BCard>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import vSelect from "vue-select";
import {
    BFormCheckbox,
    BCard,
    BButton,
    BFormInput,
    BFormGroup,
    BFormRadio,
    BCardText,
    BFormTextarea,
    BAlert,
    BRow,
    BTable,
    BCol
} from "bootstrap-vue";
import { required } from "vuelidate/lib/validators";
import TelephoneManagementVue from "../components/telephone/TelephoneManagement.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    components: {
        BFormCheckbox,
        BAlert,
        BFormRadio,
        vSelect,
        BFormTextarea,
        BCard,
        BButton,
        BFormInput,
        BTable,
        BFormGroup,
        BCardText,
        BRow,
        BCol,
        "telephone-management": TelephoneManagementVue
    },
    data() {
        return {
            // error modal
            errorsList: [],
            errorModalShow: undefined,
            // branch
            submitted: false,
            branch: {
                status: "inactive",
                address: undefined,
                name: undefined,
                code: undefined,
                postcode: undefined,
                province: undefined,
                city: undefined,
                group: undefined,
                seller: undefined,
                userIds: undefined
            },
            provinces: [],
            cities: [],
            groups: [],
            sellers: [],
            telephones: [],
            //userids
            userIdsOptions: undefined
        };
    },
    mounted() {
        //getuserIdsOptions
        axios
            .get(`${process.env.VUE_APP_URL}/users/admins`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`
                }
            })
            .then(res => {
                this.userIdsOptions = _.map(res.data.data, item => {
                    return {
                        ...item,
                        users:
                            item.first_name +
                            " " +
                            item.last_name +
                            " " +
                            "(" +
                            item.role[0].display_name +
                            ")"
                    };
                });
            });
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
        // get sellers
        // axios
        //     .get(
        //         `${process.env.VUE_APP_URL}/users?role=branch-super-admin&paginate=false`,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${localStorage.getItem(
        //                     "accessToken"
        //                 )}`
        //             }
        //         }
        //     )
        //     .then(res => {
        //         this.sellers = _.map(res.data.data, item => {
        //             return {
        //                 ...item,
        //                 name: item.first_name + " " + item.last_name
        //             };
        //         });
        //     });
        // get groups
        axios
            .get(`${process.env.VUE_APP_URL}/groups/all/branches?flatten=true`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`
                }
            })
            .then(({ data }) => {
                this.groups = data;
            });
    },
    validations: {
        branch: {
            group: { required },
            name: { required },
            code: { required },
            city: { required },
            address: { required },
            postcode: { required },
            province: { required },
            status: { required },
            userIds: { required }
            // seller: { required }
        }
    },
    methods: {
        // province changes
        provinceChanges() {
            axios
                .get(
                    `${process.env.VUE_APP_URL}/backend/provinces/${this.branch.province.id}/cities`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`
                        }
                    }
                )
                .then(res => {
                    this.cities = res.data;
                });
        },
        // create new branch
        addMerchantHandler() {
            this.submitted = true;
            // validate
            this.$v.branch.$touch();

            if (this.$v.branch.$invalid) {
                return;
            }

            const params = {
                name: this.branch.name,
                code: this.branch.code,
                phones: this.branch.tels,
                line: this.branch.address,
                status: this.branch.status,
                postcode: this.branch.postcode,
                city_id: this.branch.city ? this.branch.city.id : undefined,
                group_id: this.branch.group ? this.branch.group.id : undefined,
                branch_super_admin: this.branch.seller
                    ? this.branch.seller.id
                    : undefined,
                province_id: this.branch.province
                    ? this.branch.province.id
                    : undefined,
                user_ids: [
                    this.branch.userIds ? this.branch.userIds.id : undefined
                ],
                phones: this.$store.getters["app/getTelephones"]
            };
            console.log(params);
            axios
                .post(`${process.env.VUE_APP_URL}/branches/store`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(response => {
                    // remove temp date from VUEX
                    this.$store.commit("app/removeTelephones");

                    this.$router.replace("/merchants").then(() => {
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: "ثبت با موفقیت انجام شد",
                                icon: "CoffeeIcon",
                                variant: "success",
                                text: response.data.message
                            }
                        });
                    });
                })
                .catch(error => {
                    this.errorsList = error.response.data.errors;
                    this.errorModalShow = true;
                });
        }
    }
};
</script>

<style>
table.table td:last-child {
    width: 150px !important;
}
</style>
