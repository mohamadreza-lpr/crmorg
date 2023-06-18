<template>
    <div>
        <b-row class="justify-content-between mb-2">
            <b-col cols="3">
                <h4>سطوح مشتریان</h4>
            </b-col>
            <b-col cols="3">
                <b-button @click="createNewLevel" variant="warning">
                    افزودن سطح جدید
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="6" lg="6" sm="6" v-for="level in levels" :key="level.index">
                <BCard>
                    <b-row>
                        <b-col cols="4">
                            <p class="font-weight-bolder">{{ level.title }}</p>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col
                            class="d-inline-flex justify-content-between"
                            cols="8"
                        >
                            <p class="text-muted">
                                از امتیاز:
                                <span class="text-dark">{{
                                    level.from_point
                                }}</span>
                            </p>

                            <p class="text-muted">
                                تا امتیاز
                                <span class="text-dark">{{
                                    level.to_point
                                }}</span>
                            </p>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="4">
                            <b-badge
                                @click="editLevel(level.id)"
                                class="m-50 clickable"
                                variant="light-info"
                            >
                                <feather-icon icon="Edit2Icon" />
                                ویرایش
                            </b-badge>
                        </b-col>
                    </b-row>
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
    BBadge
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
        "telephone-management": TelephoneManagementVue,
        "address-management": AddressManagementVue
    },
    directives: {
        "height-fade": heightFade
    },
    mixins: [togglePasswordVisibility],
    data() {
        return {
            levels: undefined
        };
    },
    computed: {},
    watch: {},
    created() {
        this.getLevels();
    },
    methods: {
        getLevels() {
            axios
                .get(`${process.env.VUE_APP_URL}/levels`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(res => {
                    console.log(res);
                    this.levels = res.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        editLevel(id) {
            this.$router.replace({
                name: "customers-editLevels",
                params:{
                    id
                }
            })
        },
        createNewLevel() {
            this.$router.replace({
                name: "customers-createLevels"
            });
        }
    },
    mounted() {}
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
