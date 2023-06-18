<template>
    <div>
        <div class="card">
            <div class="card-header">
                <span class="card-title"> آمار نظرسنجی </span>
                <span class="survey-select">
                    <v-select
                        dir="rtl"
                        label="title"
                        class="bg-white"
                        v-model="selectedSurvey"
                        :options="surveyOptions"
                        @input="getSurveyQuestions"
                        placeholder="انتخاب نظرسنجی"
                    >
                        <template #no-options>
                            رکوردی برای نمایش وجود ندارد
                        </template>
                    </v-select>
                </span>
            </div>
        </div>
        <div class="card" v-if="!isLoading">
            <div class="card-body" v-if="surveyQuestions.length > 0">
                <div
                    v-for="(question, index) in surveyQuestions"
                    :key="question.id"
                >
                    <promoters-index :question="question" />
                    <hr
                        class="my-3"
                        v-if="index !== surveyQuestions.length - 1"
                    />
                </div>
            </div>
            <div class="card-body text-center" v-else>
                <h4 class="text-muted">موردی یافت نشد</h4>
            </div>
        </div>
        <div class="card" v-if="isLoading">
            <div class="card-body">
                <loader />
            </div>
        </div>
    </div>
</template>
<script>
import _ from "lodash";
import axios from "axios";
import vSelect from "vue-select";
import { BSpinner } from "bootstrap-vue";
import PromotersIndex from "../ecommerce/PromotersIndex";
import Loader from "./../../components/loader/Loader.vue";

export default {
    components: {
        vSelect,
        PromotersIndex,
        BSpinner,
        Loader,
    },
    data() {
        return {
            isLoading: false,
            surveyOptions: [],
            selectedSurvey: undefined,
            surveyQuestions: [],
        };
    },
    mounted() {
        this.getSurvey();
    },
    methods: {
        getSurvey() {
            axios
                .get(`${process.env.VUE_APP_URL}/surveys`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.surveyOptions = _.map(response.data.data, (item) => {
                        return _.pick(item, ["id", "title"]);
                    });
                });
        },
        getSurveyQuestions(option) {
            this.isLoading = true;

            axios
                .get(
                    `${process.env.VUE_APP_URL}/statistics/survey/${option.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    this.surveyQuestions = response.data.questions;
                    this.isLoading = false;
                })
                .catch((error) => {
                    this.isLoading = false;
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.survey-select {
    width: 300px;
}
</style>