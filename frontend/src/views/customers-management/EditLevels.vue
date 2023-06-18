<template>
    <div>
        <b-row class="mb-1">
            <b-col cols="4"><h4>ساخت سطح جدید</h4></b-col>
        </b-row>
        <b-row>
            <b-col md="12" lg="12" sm="12">
                <BCard>
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold">عنوان</label>
                            <b-form-input
                                autocomplete="off"
                                v-model="title"
                                class="d-inline-block mr-1"
                                placeholder="عنوان را وارد نمایید"
                            />
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold"
                                >اولویت</label
                            >
                            <b-form-input
                                autocomplete="off"
                                v-model="periority"
                                class="d-inline-block mr-1"
                                placeholder="اولویت را وارد نمایید"
                                type="number"
                            />
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold"
                                >از امتیاز</label
                            >
                            <b-form-input
                                autocomplete="off"
                                v-model="fromPoint"
                                class="d-inline-block mr-1"
                                type="number"
                            />
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="" class="font-weight-bold"
                                >تا امتیاز</label
                            >
                            <b-form-input
                                autocomplete="off"
                                v-model="toPoint"
                                class="d-inline-block mr-1"
                                type="number"
                            />
                        </div>
                        <div class="col-md-12 form-group">
                            <label for="" class="font-weight-bold"
                                >توضیحات</label
                            >
                            <b-form-textarea
                                id="textarea-default"
                                placeholder="توضیحات"
                                rows="3"
                            />
                        </div>
                        <div class="col-md-6 form-group">
                            <b-button @click="editLevels" variant="primary">
                                ذخیره
                            </b-button>
                        </div>
                    </div>
                </BCard>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import _ from "lodash";
import vSelect from "vue-select";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import {
    BCard,
    BButton,
    BAlert,
    BFormInput,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormGroup,
    BModal,
    BRow,
    BCol,
    BBadge,
    BFormSpinbutton,
    BFormTextarea
} from "bootstrap-vue";
import axios from "axios";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import { heightFade } from "@core/directives/animations";
import TelephoneManagementVue from "../components/telephone/TelephoneManagement.vue";
import AddressManagementVue from "../components/address/AddressManagement.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    components: {
        datePicker: VuePersianDatetimePicker,
        vSelect,
        BCard,
        BButton,
        BAlert,
        BFormInput,
        BCardText,
        BInputGroup,
        BInputGroupAppend,
        BFormGroup,
        BModal,
        BRow,
        BCol,
        BBadge,
        BFormSpinbutton,
        BFormTextarea,
        "telephone-management": TelephoneManagementVue,
        "address-management": AddressManagementVue
    },
    directives: {
        "height-fade": heightFade
    },
    mixins: [togglePasswordVisibility],
    data() {
        return {
            title: undefined,
            periority: undefined,
            fromPoint: undefined,
            toPoint: undefined,
        };
    },
    computed: {},
    watch: {},
    created(){
        this.getLevels()
    },
    methods: {
        getLevels(){
            const id = this.$route.params.id;
            console.log(id);
            axios
                .get(`${process.env.VUE_APP_URL}/levels/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(res => {
                    console.log(res);
                    this.title = res.data.data.title;
                    this.fromPoint = res.data.data.from_point;
                    this.toPoint = res.data.data.to_point;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        editLevels() {
            const params = {
                title: this.title,
                from_point: this.fromPoint,
                to_point: this.toPoint,
            };
            const id = this.$route.params.id;
            axios
                .patch(`${process.env.VUE_APP_URL}/levels/${id}`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(res => {
                   console.log(res);
                   this.$router.replace({
                       name: "customers-levels",
                   })
                })
                .catch(err => {
                });
        }
    },
};
</script>

<style>
.clickable {
    cursor: pointer;
}
.expanded_icon {
    margin-right: 8px;
}
.vpd-input-group input {
    border-radius: 0px;
}
.input-group-append.is-invalid > .input-group-text {
    border-color: #ea5455;
}
[dir="rtl"] .input-group-append:not(:last-child) .input-group-text {
    border-width: 1px !important;
    border-style: solid !important;
    border-bottom-left-radius: 0.357rem !important;
    border-top-left-radius: 0.357rem !important;
}
</style>
