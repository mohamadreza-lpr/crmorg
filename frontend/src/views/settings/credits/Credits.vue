<template>
    <div>
        <b-card>
            <b-row>
                <h4 class="m-2">تنظیمات اعتبارات</h4>
            </b-row>
            <b-row class="m-2">
                <b-form-checkbox
                    v-model="possibility"
                    @input="possibillityCheck"
                >
                    امکان تبدیل امتیاز به اعتبار
                </b-form-checkbox>
            </b-row>
            <b-row v-if="possibility" class="m-2">
                <b-row>
                    <h6 class="mt-50">هر</h6>
                    <b-col cols="2">
                        <b-form-input autocomplete="off" />
                    </b-col>
                    <h6 class="mt-50">امتیاز معادل</h6>
                    <b-col cols="2">
                        <b-form-input autocomplete="off" />
                    </b-col>
                    <h6 class="mt-50">ریال اعتبار است.</h6>
                </b-row>
                <b-row class="justify-content-end">
                    <b-button variant="success">
                        ثبت
                    </b-button>
                </b-row>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BRow,
    BCol,
    BForm,
    BFormInput,
    BButton,
    BAlert,
    BFormCheckbox
} from "bootstrap-vue";
import axios from "axios";
import { heightFade } from "@/@core/directives/animations";
export default {
    components: {
        BCard,
        BCardHeader,
        BCardTitle,
        BCardBody,
        BRow,
        BCol,
        BForm,
        BFormInput,
        BButton,
        BAlert,
        BFormCheckbox
    },
    directives: {
        "height-fade": heightFade
    },
    data() {
        return {
            possibility: undefined
        };
    },
    methods: {
        possibillityCheck() {
            console.log(this.possibility);
        }
    }
};
</script>

<style></style>
