<template>
    <div id="telephone-area" class="my-2">
        <label for="">شماره تماس</label>
        <div class="row">
            <div class="col-md-8">
                <b-table
                    show-empty
                    responsive
                    class="rounded"
                    :striped="striped"
                    :bordered="bordered"
                    :outlined="outlined"
                    :fields="fields"
                    :items="telephones_"
                >
                    <template #empty>
                        <h5 class="text-center p-2 text-muted">
                            رکوردی برای نمایش وجود ندارد
                        </h5>
                    </template>
                    <template #cell(type)="data">
                        {{ data.item.type.name }}
                    </template>
                    <template #cell(actions)="data">
                        <b-button
                            variant="gradient-info"
                            class="btn-icon"
                            v-on:click="editTelAction(data.item.phone_id)"
                        >
                            <feather-icon icon="Edit2Icon" />
                        </b-button>
                        <b-button
                            variant="gradient-danger"
                            class="btn-icon ml-1"
                            v-on:click="removeTelAction(data.item.phone_id)"
                        >
                            <feather-icon icon="Trash2Icon" />
                        </b-button>
                    </template>
                </b-table>
            </div>
            <div class="col-md-4">
                <div class="row">
                    <div class="col-12 form-group">
                        <label>نوع</label>
                        <v-select
                            dir="rtl"
                            size="sm"
                            label="name"
                            v-model="telephone.type"
                            :options="telephoneTypeOptions"
                            placeholder="انتخاب کنید"
                            :class="{
                                'is-invalid':
                                    telephoneSubmitted &&
                                    $v.telephone.type.$error
                            }"
                        >
                            <template #no-options>
                                رکوردی برای نمایش وجود ندارد
                            </template>
                        </v-select>
                        <div
                            v-if="
                                telephoneSubmitted &&
                                    !$v.telephone.type.required
                            "
                            class="invalid-feedback d-block"
                        >
                            این فیلد الزامی است
                        </div>
                    </div>
                    <div class="col-12 form-group">
                        <label for="" class="font-weight-bold">
                            شماره تماس
                        </label>
                        <b-form-input autocomplete="off"
                            v-model="telephone.number"
                            placeholder="شماره تماس"
                            :class="{
                                'is-invalid':
                                    telephoneSubmitted &&
                                    $v.telephone.number.$error
                            }"
                        />
                        <div
                            v-if="
                                telephoneSubmitted &&
                                    !$v.telephone.number.required
                            "
                            class="invalid-feedback d-block"
                        >
                            این فیلد الزامی است
                        </div>
                    </div>
                    <div class="col-12">
                        <b-button
                            v-if="!isEditing"
                            size="sm"
                            variant="primary"
                            @click="addTelHandler"
                        >
                            <span class="text-nowrap">ثبت</span>
                        </b-button>
                        <b-button
                            v-else
                            size="sm"
                            variant="warning"
                            @click="updateTelHandler()"
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
import vSelect from "vue-select";
import { required } from "vuelidate/lib/validators";
import { BTable, BButton, BFormInput } from "bootstrap-vue";
export default {
    name: "telephone-management",
    props: ["telephones"],
    components: {
        BTable,
        BButton,
        vSelect,
        BFormInput
    },
    data() {
        return {
            telephone: {
                type: undefined,
                number: undefined
            },
            telephoneSubmitted: false,
            isEditing: false,
            telephoneTypeOptions: [
                {
                    name: "منزل",
                    value: "home"
                },
                {
                    name: "محل کار",
                    value: "work"
                },
                {
                    name: "فروشگاه",
                    value: "shop"
                },
                {
                    name: "شماره موبایل",
                    value: "mobile"
                },
                {
                    name: "تلفکس",
                    value: "telefax"
                },
                {
                    name: "فکس",
                    value: "fax"
                },
                {
                    name: "تلفن ثابت",
                    value: "fix"
                },
                {
                    name: "اداره",
                    value: "office"
                },
            ],
            striped: true,
            bordered: true,
            outlined: true,
            fields: [
                { key: "type", label: "نوع" },
                { key: "number", label: "شماره تماس" },
                { key: "actions", label: "عملیات" }
            ]
        };
    },
    validations: {
        telephone: {
            number: { required },
            type: { required }
        }
    },
    methods: {
        addTelHandler() {
            this.telephoneSubmitted = true;
            this.$v.telephone.$touch();

            if (this.$v.telephone.$invalid) {
                return;
            }

            this.telephones_ = {
                ...this.telephone,
                phone_id: this.telephones_.length + 1
            };
            this.telephoneSubmitted = false;
            this.telephone.type = undefined;
            this.telephone.number = undefined;

            this.$store.commit("app/setTelephones", this.telephones_);
        },
        editTelAction(id) {
            const telephoneIndex = this.telephones_.findIndex(item => {
                return item.phone_id === id;
            });
            this.isEditing = true;
            this.telephone.phone_id = this.telephones_[telephoneIndex].phone_id;
            this.telephone.type = this.telephones_[telephoneIndex].type;
            this.telephone.number = this.telephones_[telephoneIndex].number;
        },
        removeTelAction(id) {
            const telephoneIndex = this.telephones_.findIndex(item => {
                return item.phone_id === id;
            });

            if (telephoneIndex > -1) {
                this.telephones.splice(telephoneIndex, 1);
            }

            this.$store.commit("app/setTelephones", this.telephones_);
        },
        updateTelHandler() {
            this.telephoneSubmitted = true;
            this.$v.telephone.$touch();

            if (this.$v.telephone.$invalid) {
                return;
            }

            const telephoneIndex = this.telephones_.findIndex(item => {
                return item.phone_id === this.telephone.phone_id;
            });

            this.telephones_[telephoneIndex].type = this.telephone.type;
            this.telephones_[telephoneIndex].number = this.telephone.number;
            this.telephones_[telephoneIndex].phone_number = this.telephone.number;
            this.telephoneSubmitted = false;
            this.isEditing = false;
            this.telephone.type = undefined;
            this.telephone.number = undefined;

            this.$store.commit("app/setTelephones", this.telephones_);
        }
    },
    computed: {
        telephones_: {
            get() {
                return _.map(this.telephones, (item, index) => {
                    return {
                        ...item,
                        phone_id: index,
                        number: item.phone_number,
                        type: {
                            name: _.find(this.telephoneTypeOptions, _item => {
                                return _item.value == item.type;
                            }).name,
                            value: item.type
                        }
                    };
                });
            },
            set(value) {
                const _value = {
                    phone_number: value.number,
                    type: value.type.value,
                    phone_id: value.phone_id
                };
                this.telephones.push(_value);
            }
        }
    },
    mounted() {
        this.$store.commit("app/setTelephones", this.telephones_);
    }
};
</script>

<style lang="scss">
#telephone-area {
    & table.table {
        & td:last-child {
            width: 150px !important;
        }
    }
}
</style>
