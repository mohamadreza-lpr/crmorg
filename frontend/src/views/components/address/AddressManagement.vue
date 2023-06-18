<template>
    <div id="address-area" class="my-2">
        <label>آدرس</label>
        <div class="row">
            <div class="col-md-12">
                <b-table
                    show-empty
                    responsive
                    class="rounded"
                    :striped="striped"
                    :bordered="bordered"
                    :outlined="outlined"
                    :fields="fields"
                    :items="addresses_"
                >
                    <template #empty>
                        <h5 class="text-center p-2 text-muted">
                            رکوردی برای نمایش وجود ندارد
                        </h5>
                    </template>
                    <template #cell(type)="data">
                        {{
                            data.item.type != undefined
                                ? data.item.type.name
                                : undefined
                        }}
                    </template>
                    <template #cell(province)="data">
                        {{
                            data.item.province != undefined
                                ? data.item.province.name
                                : undefined
                        }}
                    </template>
                    <template #cell(city)="data">
                        {{
                            data.item.city != undefined
                                ? data.item.city.name
                                : undefined
                        }}
                    </template>
                    <template #cell(actions)="data">
                        <b-button
                            variant="gradient-info"
                            class="btn-icon"
                            v-on:click="editAddressAction(data.item.address_id)"
                        >
                            <feather-icon icon="Edit2Icon" />
                        </b-button>
                        <b-button
                            variant="gradient-danger"
                            class="btn-icon ml-1"
                            v-on:click="
                                removeAddressAction(data.item.address_id)
                            "
                        >
                            <feather-icon icon="Trash2Icon" />
                        </b-button>
                    </template>
                </b-table>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-3 form-group">
                        <label>نوع</label>
                        <v-select
                            dir="rtl"
                            size="sm"
                            label="name"
                            v-model="address.type"
                            :options="addressTypeOptions"
                            placeholder="انتخاب کنید"
                            :class="{
                                'is-invalid':
                                    addressSubmitted && $v.address.type.$error
                            }"
                        >
                            <template #no-options>
                                رکوردی برای نمایش وجود ندارد
                            </template>
                        </v-select>
                        <div
                            v-if="addressSubmitted && !$v.address.type.required"
                            class="invalid-feedback d-block"
                        >
                            این فیلد الزامی است
                        </div>
                    </div>
                    <div class="col-md-3 form-group">
                        <label class="font-weight-bold">
                            کد پستی
                        </label>
                        <b-form-input autocomplete="off"
                            v-model="address.postcode"
                            placeholder="کد پستی"
                            :class="{
                                'is-invalid':
                                    addressSubmitted &&
                                    $v.address.postcode.$error
                            }"
                        />
                        <div
                            v-if="
                                addressSubmitted &&
                                    !$v.address.postcode.required
                            "
                            class="invalid-feedback d-block"
                        >
                            این فیلد الزامی است
                        </div>
                          <div
                            v-if="
                                addressSubmitted &&
                                    !$v.address.postcode.numeric
                            "
                            class="invalid-feedback d-block"
                        >
                        این فیلد فقط مقدار عددی میپذیرد
                        </div>
                    </div>
                    <div class="col-md-3 form-group">
                        <label>استان</label>
                        <v-select
                            dir="rtl"
                            size="sm"
                            label="name"
                            v-model="address.province"
                            :options="provinceOptions"
                            @input="provinceChanges"
                            placeholder="انتخاب کنید"
                            :class="{
                                'is-invalid':
                                    addressSubmitted &&
                                    $v.address.province.$error
                            }"
                        >
                            <template #no-options>
                                رکوردی برای نمایش وجود ندارد
                            </template>
                        </v-select>
                        <div
                            v-if="
                                addressSubmitted &&
                                    !$v.address.province.required
                            "
                            class="invalid-feedback d-block"
                        >
                            این فیلد الزامی است
                        </div>
                    </div>
                    <div class="col-md-3 form-group">
                        <label>شهر</label>
                        <v-select
                            dir="rtl"
                            size="sm"
                            label="name"
                            v-model="address.city"
                            :options="cityOptions"
                            placeholder="انتخاب کنید"
                            :class="{
                                'is-invalid':
                                    addressSubmitted && $v.address.city.$error
                            }"
                        >
                            <template #no-options>
                                رکوردی برای نمایش وجود ندارد
                            </template>
                        </v-select>
                        <div
                            v-if="addressSubmitted && !$v.address.city.required"
                            class="invalid-feedback d-block"
                        >
                            این فیلد الزامی است
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label>آدرس</label>
                        <b-form-textarea
                            placeholder="آدرس"
                            v-model="address.line"
                            :class="{
                                'is-invalid':
                                    addressSubmitted && $v.address.line.$error
                            }"
                        />
                        <div
                            v-if="addressSubmitted && !$v.address.line.required"
                            class="invalid-feedback d-block"
                        >
                            این فیلد الزامی است
                        </div>
                    </div>
                    <div class="col-md-4 mt-2">
                        <b-button
                            v-if="!isEditing"
                            size="sm"
                            variant="primary"
                            @click="addAddressHandler"
                        >
                            <span class="text-nowrap">ثبت</span>
                        </b-button>
                        <b-button
                            v-else
                            size="sm"
                            variant="warning"
                            @click="updateAddressHandler"
                        >
                            <span class="text-nowrap">بروزرسانی</span>
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from "lodash";
import axios from "axios";
import vSelect from "vue-select";
import { required,numeric } from "vuelidate/lib/validators";
import { BTable, BButton, BFormInput, BFormTextarea } from "bootstrap-vue";
export default {
    name: "address-management",
    props: ["addresses"],
    components: {
        BTable,
        BButton,
        vSelect,
        BFormInput,
        BFormTextarea
    },
    data() {
        return {
            address: {
                line: undefined,
                type: undefined,
                city: undefined,
                province: undefined,
                postcode: undefined
            },
            addressSubmitted: false,
            isEditing: false,
            addressTypeOptions: [
                {
                    name: "منزل",
                    value: "home"
                },
                {
                    name: "محل کار",
                    value: "work"
                },
                {
                    name: "دفتر کار",
                    value: "office"
                },
                {
                    name: "فروشگاه",
                    value: "store"
                }
            ],
            provinceOptions: [],
            cityOptions: [],
            striped: true,
            bordered: true,
            outlined: true,
            fields: [
                { key: "type", label: "نوع" },
                { key: "province", label: "استان" },
                { key: "city", label: "شهر" },
                { key: "postcode", label: "کد پستی" },
                { key: "line", label: "آدرس" },
                { key: "actions", label: "عملیات" }
            ]
        };
    },
    validations: {
        address: {
            type: { required },
            province: { required },
            city: { required },
            postcode: { required,numeric },
            line: { required }
        }
    },
    methods: {
        addAddressHandler() {
            this.addressSubmitted = true;
            this.$v.address.$touch();
            if (this.$v.address.$invalid) {
                return;
            }
            this.addresses_ = {
                ...this.address,
                address_id: this.addresses_.length + 1
            };
            this.addressSubmitted = false;
            this.address.type = undefined;
            this.address.line = undefined;
            this.address.city = undefined;
            this.address.province = undefined;
            this.address.postcode = undefined;
            this.$store.commit("app/setAddresses", this.addresses_);
        },
        editAddressAction(id) {
            const addressIndex = this.addresses_.findIndex(item => {
                return item.address_id === id;
            });
            this.isEditing = true;
            this.address.address_id = this.addresses_[addressIndex].address_id;
            this.address.type = this.addresses_[addressIndex].type;
            this.address.line = this.addresses_[addressIndex].line;
            this.address.city = this.addresses_[addressIndex].city;
            this.address.province = this.addresses_[addressIndex].province;
            this.address.postcode = this.addresses_[addressIndex].postcode;
        },
        removeAddressAction(id) {
            const addressIndex = this.addresses_.findIndex(item => {
                return item.address_id === id;
            });
            if (addressIndex > -1) {
                this.addresses.splice(addressIndex, 1);
            }
            this.$store.commit("app/setAddresses", this.addresses_);
        },
        updateAddressHandler() {
            this.addressSubmitted = true;
            this.$v.address.$touch();
            if (this.$v.address.$invalid) {
                return;
            }
            const addressIndex = this.addresses_.findIndex(item => {
                return item.address_id === this.address.address_id;
            });
            this.addresses_[addressIndex].type = this.address.type;
            this.addresses_[addressIndex].postcode = this.address.postcode;
            this.addresses_[addressIndex].province = this.address.province;
            this.addresses_[addressIndex].city = this.address.city;
            this.addresses_[addressIndex].line = this.address.line;

            this.addressSubmitted = false;
            this.isEditing = false;
            this.address.type = undefined;
            this.address.postcode = undefined;
            this.address.province = undefined;
            this.address.city = undefined;
            this.address.line = undefined;
            this.$store.commit("app/setAddresses", this.addresses_);
        },
        provinceChanges() {
            const provinceId = this.address.province
                ? this.address.province.id
                : undefined;
            axios
                .get(
                    `${process.env.VUE_APP_URL}/backend/provinces/${provinceId}/cities`
                )
                .then(response => {
                    this.address.city = undefined;
                    this.cityOptions = response.data;
                })
                .catch(error => {});
        }
    },
    computed: {
        addresses_: {
            get() {
                return _.map(this.addresses, (item, index) => {
                    return {
                        ...item,
                        address_id: index,
                        line: item.line,
                        type: _.find(this.addressTypeOptions, _item => {
                            return _item.value == item.type;
                        })
                    };
                });
            },
            set(value) {
                const _value = {
                    ...value,
                    type: value.type.value
                };
                this.addresses.push(_value);
            }
        }
    },
    mounted() {
        // get provinces
        axios
            .get(`${process.env.VUE_APP_URL}/backend/provinces`)
            .then(response => {
                this.provinceOptions = response.data;
            })
            .catch(error => {});
    }
};
</script>
<style lang="scss">
#address-area {
    & table.table {
        & td:last-child {
            width: 150px !important;
        }
    }
}
</style>
