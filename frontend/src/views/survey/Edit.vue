<template>
    <section>
        <form-wizard
            error-color="#EA5455"
            color="#7367F0"
            :title="null"
            :subtitle="null"
            shape="square"
            finish-button-text="ویرایش نهایی"
            back-button-text="مرحله قبل"
            next-button-text="مرحله بعد"
            icon="ArrowDownIcon"
            class="mb-3"
            @on-complete="submitHandler"
        >
            <b-alert
                v-height-fade
                :variant="formAlertVariant"
                v-model="formAlertVisibility"
            >
                <div class="alert-body">
                    <div
                        v-for="(message, index) in formAlertMessages"
                        :key="index"
                    >
                        <small>{{ message }}</small>
                    </div>
                </div>
            </b-alert>
            <tab-content
                title="ویرایش نظرسنجی"
                :before-change="surveyNextHandler"
            >
                <b-row>
                    <b-col cols="12" class="mb-2">
                        <h5 class="mb-0">ویرایش نظرسنجی</h5>
                        <small class="text-muted">
                            اطلاعات نظرسنجی را وارد کنید
                        </small>
                    </b-col>
                    <div class="col-md-6">
                        <label>
                            <small>عنوان نظرسنجی</small>
                        </label>
                        <b-form-input autocomplete="off"
                            placeholder="عنوان مورد نظر را وارد نمایید"
                            v-model="surveyTitle"
                        />
                    </div>
                    <div class="col-md-3">
                        <label>تاریخ شروع نظرسنجی</label>
                        <date-picker
                            v-model="surveyStartDate"
                            locale="fa"
                            format="jYYYY/jMM/jDD HH:mm:ss"
                            type="datetime"
                        />
                    </div>
                    <div class="col-md-3">
                        <label>تاریخ اتمام نظرسنجی</label>
                        <date-picker
                            v-model="surveyExpireDate"
                            locale="fa"
                            format="jYYYY/jMM/jDD HH:mm:ss"
                            type="datetime"
                        />
                    </div>
                    <div class="col-md-12 mt-0 mt-md-2">
                        <label>وضعیت نظرسنجی</label>
                        <div class="demo-inline-spacing">
                            <b-form-radio
                                v-model="surveyStatus"
                                name="user_active"
                                value="active"
                                class="custom-control-primary mt-0"
                            >
                                فعال
                            </b-form-radio>
                            <b-form-radio
                                v-model="surveyStatus"
                                name="user_active"
                                value="inactive"
                                class="custom-control-primary mt-0"
                            >
                                غیرفعال
                            </b-form-radio>
                        </div>
                    </div>
                </b-row>
            </tab-content>
            <tab-content
                title="ویرایش پرسش ها"
                :before-change="questionNextHandler"
            >
                <b-row>
                    <b-col cols="12" class="mb-2">
                        <div
                            class="d-flex flex-row justify-content-between align-items-end"
                        >
                            <span>
                                <h5 class="mb-0">ویرایش پرسش ها</h5>
                                <small class="text-muted">
                                    اطلاعات پرسش هارا وارد کنید
                                </small>
                            </span>
                            <b-button
                                size="sm"
                                variant="outline-primary"
                                @click="
                                    questionSearchModal = !questionSearchModal
                                "
                            >
                                جستجو و انتخاب پرسش
                            </b-button>
                        </div>
                    </b-col>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12">
                                <label> عنوان پرسش </label>
                                <b-form-input autocomplete="off"
                                    v-model="questionTitle"
                                    placeholder="عنوان مورد نظر را وارد کنید"
                                />
                            </div>
                            <!-- <div class="col-md-4">
                                <label>
                                    ترتیب
                                </label>
                                <b-form-input autocomplete="off"
                                    type="number"
                                    v-model="questionOrder"
                                    placeholder=" ترتیب مورد نظر را وارد کنید"
                                />
                            </div> -->
                        </div>
                        <b-button
                            v-if="questionIsEditing"
                            size="sm"
                            class="mt-1"
                            variant="warning"
                            @click="updateQuestionHandler"
                        >
                            بروزرسانی پرسش
                        </b-button>
                        <b-button
                            v-else
                            size="sm"
                            class="mt-1"
                            variant="primary"
                            @click="newQuestionHandler"
                        >
                            ثبت پرسش جدید
                        </b-button>
                        <b-button
                            v-if="questionIsEditing"
                            size="sm"
                            class="mt-1 ml-1"
                            variant="outline-danger"
                            @click="cancellEditQuestion"
                        >
                            لغو
                        </b-button>
                    </div>
                    <div class="col-md-6">
                        <label>لیست پرسشها</label>
                        <b-table
                            id="questionsTable"
                            bordered
                            responsive
                            show-empty
                            :fields="quesationsFeilds"
                            :items="questionItems"
                        >
                            <template #empty>
                                <h5 class="text-center p-2 text-muted">
                                    رکوردی برای نمایش وجود ندارد
                                </h5>
                            </template>
                            <template #cell(actions)="data">
                                <b-button
                                    variant="gradient-info"
                                    class="btn-icon"
                                    @click="editQuestionHandler(data.item.id)"
                                >
                                    <feather-icon icon="Edit2Icon" />
                                </b-button>
                                <!-- <b-button
                                    variant="gradient-danger"
                                    class="btn-icon ml-1"
                                >
                                    <feather-icon icon="Trنظرسنجیash2Icon" />
                                </b-button> -->
                            </template>
                        </b-table>
                        <b-pagination
                            v-model="questionPage"
                            :total-rows="questionRows"
                            :per-page="questionPerPage"
                            hide-goto-end-buttons
                            @change="questionPageChangeHandler"
                        />
                    </div>
                </b-row>
            </tab-content>
            <tab-content title="ویرایش پاسخ ها">
                <b-row>
                    <b-col cols="12" class="mb-2">
                        <div
                            class="d-flex flex-row justify-content-between align-items-end"
                        >
                            <span>
                                <h5 class="mb-0">ویرایش پاسخ ها</h5>
                                <small class="text-muted">
                                    اطلاعات پاسخ هارا وارد کنید
                                </small>
                            </span>
                            <b-button
                                size="sm"
                                variant="outline-primary"
                                @click="choiceAddHandler"
                            >
                                ثبت پاسخ جدید
                            </b-button>
                        </div>
                    </b-col>
                    <div class="col-md-6">
                        <label>سوال</label>
                        <v-select
                            class="bg-white"
                            v-model="selectedQuestion"
                            placeholder="انتخاب کنید"
                            @input="selectQuestionHandler"
                            dir="rtl"
                            label="title"
                            :options="questionOptions"
                        >
                            <template #no-options>
                                رکوردی برای نمایش وجود ندارد
                            </template>
                        </v-select>
                    </div>
                    <div class="col-md-6">
                        <label>لیست پاسخ ها</label>
                        <b-table
                            id="choicesTable"
                            bordered
                            responsive
                            show-empty
                            :fields="choiceFields"
                            :items="choiceItems"
                        >
                            <template #empty>
                                <h5 class="text-center p-2 text-muted">
                                    رکوردی برای نمایش وجود ندارد
                                </h5>
                            </template>
                            <template #cell(actions)="data">
                                <b-button
                                    variant="gradient-info"
                                    class="btn-icon"
                                    @click="editChoiceHandler(data.item.id)"
                                >
                                    <feather-icon icon="Edit2Icon" />
                                </b-button>
                                <!-- <b-button
                                    variant="gradient-danger"
                                    class="btn-icon ml-1"
                                >
                                    <feather-icon icon="Trash2Icon" />
                                </b-button> -->
                            </template>
                        </b-table>
                        <b-pagination
                            v-model="choicePage"
                            :total-rows="choiceRows"
                            :per-page="choicePerPage"
                            hide-goto-end-buttons
                            @change="choicePageChangeHandler"
                        />
                    </div>
                </b-row>
            </tab-content>
        </form-wizard>
        <b-modal
            v-model="questionSearchModal"
            title="جستجو و انتخاب پرسش"
            ok-title="انتخاب کن"
            hide-footer
        >
            <label>جستجو در عنوان ها</label>
            <b-form
                class="kb-search-input d-flex justify-content-center align-items-center"
                @submit.prevent
            >
                <b-input-group class="input-group-merge m-0">
                    <b-form-input autocomplete="off"
                        id="searchbar"
                        v-model="questionTitleSearch"
                        @input="isTyping = true"
                        placeholder="جستجو در عنوان پرسش ها"
                    />
                    <b-input-group-append is-text>
                        <feather-icon icon="SearchIcon" />
                    </b-input-group-append>
                </b-input-group>
                <b-spinner
                    class="ml-1"
                    type="grow"
                    small
                    v-show="isLoading"
                    variant="primary"
                    label="Searching..."
                />
            </b-form>

            <div v-if="questionTitleSearch">
                <div
                    class="questionsResult"
                    v-if="searchedQuestionItems.length > 0"
                >
                    <b-list-group flush>
                        <b-list-group-item
                            button
                            @click="
                                questionSelectionHandler(searchedQuestionItem)
                            "
                            v-for="searchedQuestionItem in searchedQuestionItems"
                            :key="searchedQuestionItem.id"
                        >
                            {{ searchedQuestionItem.title }}
                        </b-list-group-item>
                    </b-list-group>
                </div>
                <div v-else class="text-center p-4">
                    <h6 class="mb-0 text-muted">موردی یافت نشد</h6>
                </div>
            </div>
        </b-modal>
        <b-modal
            v-model="choiceModalShow"
            :title="choiceModalTitle"
            hide-footer
        >
            <b-alert
                v-height-fade
                :variant="modalAlertVariant"
                v-model="modalAlertVisibility"
            >
                <div class="alert-body">
                    <div
                        v-for="(message, index) in modalAlertMessages"
                        :key="index"
                    >
                        <small>{{ message }}</small>
                    </div>
                </div>
            </b-alert>
            <b-form
                v-if="choiceIsEditting"
                @submit.prevent="choiceUpdateHandler"
            >
                <div>
                    <label>
                        <small>عنوان پاسخ</small>
                    </label>
                    <b-form-input autocomplete="off"
                        placeholder="عنوان مورد نظر را وارد نمایید"
                        v-model="choiceTitle"
                    />
                </div>
                <div class="mt-1">
                    <b-button size="sm" type="submit" variant="warning">
                        بروزرسانی
                    </b-button>
                </div>
            </b-form>
            <b-form v-else @submit.prevent="choiceStoreHandler">
                <div>
                    <div class="questionsResult mb-2">
                        <div v-if="questionOptions.length > 0">
                            <b-list-group flush>
                                <b-list-group-item
                                    button
                                    v-for="questionOption in questionOptions"
                                    @click="
                                        choiceStoreQuestionSelectHandler(
                                            questionOption
                                        )
                                    "
                                    :key="questionOption.id"
                                    :active="
                                        ChoiceStoreActiveQuestion ===
                                        questionOption.id
                                            ? true
                                            : false
                                    "
                                >
                                    {{ questionOption.title }}
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                        <div v-else class="text-center p-4">
                            <h6 class="mb-0 text-muted">موردی یافت نشد</h6>
                        </div>
                    </div>
                    <div>
                        <label>
                            <small>عنوان پاسخ</small>
                        </label>
                        <b-form-input autocomplete="off"
                            placeholder="عنوان مورد نظر را وارد نمایید"
                            v-model="choiceTitle"
                        />
                    </div>
                </div>
                <div class="mt-1">
                    <b-button size="sm" type="submit" variant="primary">
                        ثبت
                    </b-button>
                </div>
            </b-form>
        </b-modal>
    </section>
</template>
<script>
import _ from "lodash";
import axios from "axios";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { heightFade } from "@core/directives/animations";
import { FormWizard, TabContent } from "vue-form-wizard";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BAlert,
    BListGroup,
    BListGroupItem,
    BFormRadio,
    BInputGroup,
    BForm,
    BTable,
    BModal,
    BSpinner,
    BInputGroupAppend,
    BPagination,
    BButton,
} from "bootstrap-vue";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import vSelect from "vue-select";
import AlertMessage from "../components/alert-message/AlertMessage.vue";

export default {
    components: {
        FormWizard,
        TabContent,
        BRow,
        BCol,
        BFormGroup,
        BInputGroupAppend,
        BFormInput,
        BListGroup,
        BListGroupItem,
        BForm,
        BAlert,
        BModal,
        BFormRadio,
        BInputGroup,
        BSpinner,
        BButton,
        BTable,
        BPagination,
        vSelect,
        datePicker: VuePersianDatetimePicker,
        "alert-message": AlertMessage,
    },
    directives: {
        "height-fade": heightFade,
    },
    data() {
        return {
            // survey
            surveyTitle: undefined,
            surveyStartDate: undefined,
            surveyExpireDate: undefined,
            surveyStatus: undefined,
            // question
            isTyping: false,
            isLoading: false,
            questions: [],
            questionItems: [],
            questionPage: 1,
            questionPerPage: 4,
            questionRows: 0,
            questionSearchModal: false,
            questionTitleSearch: undefined,
            searchedQuestionItems: [],
            quesationsFeilds: [
                { key: "title", label: "عنوان" },
                { key: "actions", label: "عملیات" },
            ],
            questionIsEditing: false,
            questionTitle: undefined,
            questionOrder: undefined,
            questionId: undefined,
            selectedQuestion: undefined,
            questionOptions: [],
            ChoiceStoreActiveQuestion: undefined,
            // choice
            choiceFields: [
                { key: "title", label: "عنوان" },
                { key: "actions", label: "عملیات" },
            ],
            choices: [],
            choiceItems: [],
            choicePage: 1,
            choicePerPage: 4,
            choiceRows: 0,
            choiceTitle: undefined,
            choiceId: undefined,
            // choice modal
            choiceModalShow: false,
            choiceModalTitle: "پاسخ جدید",
            choiceIsEditting: false,
            selectedQuestionForUpdate: undefined,
            // tabs (from wizard)
            tabIndex: 0,
            // alert messages
            modalAlertVariant: undefined,
            modalAlertVisibility: undefined,
            modalAlertMessages: [],
            formAlertVariant: undefined,
            formAlertVisibility: undefined,
            formAlertMessages: [],
        };
    },
    watch: {
        questionTitleSearch: _.debounce(function () {
            this.isTyping = false;
        }, 500),
        isTyping: function (value) {
            if (!value) {
                this.isLoading = true;
                this.searchQuestion();
            }
        },
        alertVisibility: function () {
            setTimeout(() => {
                this.alertVisibility = false;
            }, 8000);
        },
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    methods: {
        choiceStoreQuestionSelectHandler(question) {
            this.ChoiceStoreActiveQuestion = question.id;
            this.selectedQuestionForUpdate = question;
        },
        getSurvery(id) {
            axios
                .get(`${process.env.VUE_APP_URL}/surveys/${this.id}/edit`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then(({ data }) => {
                    // setting surveys data
                    this.surveyTitle = data.data.title;
                    this.surveyStartDate = data.data.starts_at;
                    this.surveyExpireDate = data.data.expires_at;
                    this.surveyStatus =
                        data.data.statuses === "فعال" ? "active" : "inactive";

                    // setting question data
                    this.questions = data.data.questions;
                    this.questionOptions = data.data.questions;
                    this.questionItems = _.chunk(data.data.questions, 4)[0];
                    this.questionRows = data.data.questions.length;
                });
        },
        submitHandler() {
            this.$router.replace("/survey/list").then(() => {
                this.$toast({
                    component: ToastificationContent,
                    position: "top-right",
                    props: {
                        title: "بروزرسانی نظرسنجی",
                        icon: "CoffeeIcon",
                        variant: "success",
                        text: "نظرسنجی مورد نظر بروزرسانی شد",
                    },
                });
            });
        },
        reinitAlertProperties() {
            this.formAlertVariant = undefined;
            this.formAlertMessages = [];
            this.formAlertVisibility = undefined;

            this.modalAlertVariant = undefined;
            this.modalAlertMessages = [];
            this.modalAlertVisibility = undefined;
        },
        async surveyNextHandler() {
            this.errors = [];

            const params = {
                title: this.surveyTitle,
                starts_at: this.surveyStartDate,
                expires_at: this.surveyExpireDate,
                status: this.surveyStatus,
            };

            return await axios
                .patch(
                    `${process.env.VUE_APP_URL}/surveys/${this.id}/update`,
                    params,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    this.reinitAlertProperties();
                    return true;
                })
                .catch((error) => {
                    this.formAlertVariant = "danger";
                    this.formAlertMessages = _.flatten(
                        Object.values(error.response.data.errors)
                    );
                    this.formAlertVisibility = true;
                });
        },
        questionPageChangeHandler(page) {
            this.questionItems = _.chunk(this.questions, 4)[page - 1];
        },
        editQuestionHandler(id) {
            const question = this.questions.find((item) => {
                return item.id == id;
            });
            this.questionTitle = question.title;
            this.questionOrder = question.order;
            this.questionId = question.id;
            this.questionIsEditing = true;
        },
        searchQuestion() {
            axios
                .get(`${process.env.VUE_APP_URL}/questions`, {
                    params: {
                        s: this.questionTitleSearch,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then(({ data }) => {
                    this.searchedQuestionItems = data.data;
                    this.isLoading = false;
                })
                .catch((error) => {
                     
                    this.isLoading = false;
                });
        },
        updateQuestionHandler() {
            this.reinitAlertProperties();
            const params = {
                title: this.questionTitle,
            };

            axios
                .patch(
                    `${process.env.VUE_APP_URL}/questions/${this.questionId}/update`,
                    params,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then(({ data }) => {
                    const questionIndex = this.questionItems.findIndex(
                        (item) => {
                            return item.id === this.questionId;
                        }
                    );
                    this.questionItems[questionIndex].title = data.data.title;
                    this.questionIsEditing = false;
                    this.questionTitle = undefined;

                    this.formAlertVariant = "success";
                    this.formAlertMessages = ["سوال مورد نظر بروزرسانی شد"];
                    this.formAlertVisibility = true;
                })
                .catch((error) => {
                    this.formAlertVariant = "danger";
                    this.formAlertMessages = _.flatten(
                        Object.values(error.response.data.errors)
                    );
                    this.formAlertVisibility = true;
                });
        },
        newQuestionHandler() {
            this.reinitAlertProperties();
            const params = {
                title: this.questionTitle,
            };

            axios
                .post(`${process.env.VUE_APP_URL}/questions/store`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then(({ data }) => {
                    const createdQuestion = { ...data.data, choices: [] };
                    this.questions.push(createdQuestion);

                    const questionItems = _.chunk(this.questions, 4);
                    let page = _.round(
                        this.questionRows / this.questionPerPage
                    );

                    if (page == 0) {
                        page = 1;
                    }

                    this.questionRows = this.questions.length;
                    this.questionItems = questionItems[page - 1];
                    this.questionPage = page;

                    this.addQuestionToSurvey(data.data.id);
                })
                .catch((error) => {
                    this.formAlertVariant = "danger";
                    this.formAlertMessages = _.flatten(
                        Object.values(error.response.data.errors)
                    );
                    this.formAlertVisibility = true;
                });
        },
        addQuestionToSurvey(questionId) {
            this.reinitAlertProperties();
            const params = {
                order: 1,
                question_id: questionId,
            };

            axios
                .post(
                    `${process.env.VUE_APP_URL}/surveys/${this.id}/add-question`,
                    params,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    this.questionTitle = undefined;
                    this.formAlertVariant = "success";
                    this.formAlertMessages = ["سوال مورد نظر باموفقیت ثبت شد"];
                    this.formAlertVisibility = true;
                })
                .catch((error) => {
                    this.formAlertVariant = "danger";
                    this.formAlertMessages = _.flatten(
                        Object.values(error.response.data.errors)
                    );
                    this.formAlertVisibility = true;
                });
        },
        setAlertMessage(message, type, visibility) {
            this.alertVisibility = visibility;
            this.alertMessages = message;
            this.alertType = type;
        },
        cancellEditQuestion() {
            this.questionIsEditing = false;
            this.questionTitle = undefined;
        },
        questionSelectionHandler(question) {
            this.questionTitleSearch = undefined;
            this.searchedQuestionItems = [];
            this.questionSearchModal = false;

            this.addQuestionToSurvey(question.id);

            this.questions.push(question);
            const questionItems = _.chunk(this.questions, 4);
            let page = _.round(this.questionRows / this.questionPerPage);

            if (page == 0) {
                page = 1;
            }
            this.questionRows = this.questions.length;
            this.questionItems = questionItems[page - 1];
            this.questionPage = page;
        },
        async questionNextHandler() {
            if (this.questions.length > 0) {
                this.reinitAlertProperties();
                this.questionOptions = this.questions;
                return true;
            }
        },
        selectQuestionHandler() {
            axios
                .get(
                    `${process.env.VUE_APP_URL}/questions/${this.selectedQuestion.id}/edit`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then(({ data }) => {
                    this.choices = data.data.choices;
                    this.choiceRows = data.data.choices.length;
                    this.choiceItems = _.chunk(data.data.choices, 4)[0];
                })
                .catch((error) => {});
        },
        choicePageChangeHandler(page) {
            this.choiceItems = _.chunk(this.choices, 4)[page - 1];
        },
        choiceAddHandler() {
            this.choiceModalTitle = "ثبت پاسخ جدید";
            this.choiceTitle = undefined;
            this.choiceIsEditting = false;
            this.choiceModalShow = !this.choiceModalShow;
        },
        choiceStoreHandler() {
            this.ChoiceStoreActiveQuestion = 0;
            if (!this.selectedQuestionForUpdate) {
                this.modalAlertVariant = "danger";
                this.modalAlertMessages = [
                    "برای ثبت جواب ، ابتدا پرسش مورد نظر را انتخاب کنید",
                ];
                this.modalAlertVisibility = true;
                return;
            }

            const params = {
                order: 1,
                title: this.choiceTitle,
            };

            axios
                .post(`${process.env.VUE_APP_URL}/choices/store`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then(({ data }) => {
                    this.choices.push(data.data);
                    const choicesItems = _.chunk(this.choices, 4);
                    let page = _.round(
                        this.questionRows / this.questionPerPage
                    );

                    if (page == 0) {
                        page = 1;
                    }
                    this.choiceRows = this.choices.length;
                    this.choiceItems = choicesItems[page - 1];
                    this.choicePage = page;

                    this.addChoiceToQuestion(data.data.id);

                    this.choiceIsEditting = false;
                    this.choiceModalShow = false;
                    this.choiceTitle = undefined;
                    this.selectedQuestionForUpdate = undefined;

                    this.formAlertVariant = "success";
                    this.formAlertMessages = ["پاسخ جدید نظر با موفقیت ثبت شد"];
                    this.formAlertVisibility = true;
                })
                .catch((error) => {
                    this.modalAlertVariant = "danger";
                    this.modalAlertMessages = _.flatten(
                        Object.values(error.response.data.errors)
                    );
                    this.modalAlertVisibility = true;
                });
        },
        addChoiceToQuestion(choiceId) {
            const params = {
                order: 1,
                choice_id: choiceId,
            };

            axios
                .post(
                    `${process.env.VUE_APP_URL}/questions/${this.selectedQuestionForUpdate.id}/add-choice`,
                    params,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    this.formAlertVariant = "success";
                    this.formAlertMessages = ["پاسخ شما باموفقیت ثبت شد"];
                    this.formAlertVisibility = true;
                })
                .catch((error) => {
                    this.modalAlertVariant = "danger";
                    this.modalAlertMessages = _.flatten(
                        Object.values(error.response.data.errors)
                    );
                    this.modalAlertVisibility = true;
                });
        },
        choiceUpdateHandler() {
            const params = {
                order: 1,
                title: this.choiceTitle,
            };

            axios
                .patch(
                    `${process.env.VUE_APP_URL}/choices/${this.choiceId}/update`,
                    params,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then(({ data }) => {
                    const choiceIndex = this.choiceItems.findIndex((item) => {
                        return item.id === this.choiceId;
                    });
                    this.choiceItems[choiceIndex].title = data.data.title;
                    this.choiceIsEditting = false;
                    this.choiceModalShow = false;
                    this.choiceTitle = undefined;

                    this.questionTitle = undefined;
                    this.formAlertVariant = "success";
                    this.formAlertMessages = ["پاسخ مورد نظر با موفقیت بروزرسانی شد"];
                    this.formAlertVisibility = true;
                })
                .catch((error) => {
                    this.modalAlertVariant = "danger";
                    this.modalAlertMessages = _.flatten(
                        Object.values(error.response.data.errors)
                    );
                    this.modalAlertVisibility = true;;
                });
        },
        editChoiceHandler(id) {
            this.choiceModalTitle = "بروزرسانی پاسخ";
            this.choiceIsEditting = true;
            this.choiceModalShow = true;
            const coice = _.find(this.choices, { id });

            this.choiceTitle = coice.title;
            this.choiceId = coice.id;
        },
    },
    mounted() {
        this.getSurvery();
    },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-wizard.scss";
@import "@core/scss/vue/libs/vue-select.scss";
.vue-form-wizard .wizard-card-footer .wizard-footer-right .wizard-btn::after,
.vue-form-wizard .wizard-card-footer .wizard-footer-left .wizard-btn::before {
    display: none !important;
}
.vpd-input-group {
    > label {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    > input {
        border-top-right-radius: 4px;
        border-top-left-radius: 0px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 0px;
        direction: rtl !important;
    }
}
table#questionsTable {
    & td:first-child {
        width: auto !important;
    }
    & td:last-child {
        width: 100px !important;
    }
}
table#choicesTable {
    & td:first-child {
        width: auto !important;
    }
    & td:last-child {
        width: 100px !important;
    }
}
.questionsResult {
    width: 100%;
    max-height: 270px;
    margin-top: 10px;
    border: 1px solid #d8d6de;
    border-radius: 5px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #888;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}
</style>
