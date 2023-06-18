<template>
    <section>
        <b-row>
            <div class="col-md-8 col-lg-9">
                <b-card>
                    <div>
                        <h4 class="font-weight-bolder">
                            مدیران شعبه {{ this.branchName }}
                        </h4>
                    </div>
                    <alert-message
                        ref="alertComponent"
                        :messages="alertMessages"
                        :variant="alertVariant"
                        :dismissible="alertDismissable"
                    />
                    <div v-if="isLoading"><loader /></div>
                    <div v-else>
                        <b-table
                            responsive
                            class="mt-1"
                            :striped="striped"
                            :bordered="bordered"
                            :outlined="outlined"
                            :fields="fields"
                            :items="items"
                            show-empty
                        >
                            <template #cell(name)="data">
                                {{ data.item.first_name }}
                                {{ data.item.last_name }}
                            </template>
                            <template #cell(action)="data">
                                <!-- <b-button
                                    variant="gradient-info"
                                    class="btn-icon p-btn"
                                    v-on:click="editAction(data.item.id)"
                                >
                                    <feather-icon icon="Edit2Icon" />
                                </b-button> -->
                                <b-button
                                    variant="danger"
                                    class="btn-icon"
                                    v-on:click="deleteUsers(data.item.id)"
                                >
                                    <feather-icon icon="DeleteIcon" />
                                </b-button>
                            </template>
                            <template #empty>
                                <div class="text-center">موردی یافت نشد</div>
                            </template>
                        </b-table>
                    </div>
                    <!-- <b-pagination
                        class="mb-0"
                        v-model="page"
                        :per-page="perPage"
                        :total-rows="count"
                        @change="pageChangeHandler"
                    ></b-pagination> -->
                </b-card>
            </div>
            <div class="col-md-4 col-lg-3">
                <b-card>
                    <h4 class="font-weight-bolder">افزودن مدیر جدید</h4>
                    <b-form class="mt-2" @submit.prevent="postUsers">
                        <b-form-group>
                            <label>ادمین های شعبه</label>
                            <v-select
                                size="sm"
                                dir="rtl"
                                label="name"
                                multiple
                                v-model="branchAdmin"
                                :options="branchAdminOptions"
                                placeholder="انتخاب کنید"
                            >
                                <template #no-options>
                                    رکوردی برای نمایش وجود ندارد
                                </template>
                            </v-select>
                        </b-form-group>

                        <b-button type="submit" variant="primary" block>
                            ثبت
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
    BForm,
    BAlert,
    BPagination,
} from "bootstrap-vue";
import Loader from "../components/loader/Loader.vue";
import AlertMessage from "../components/alert-message/AlertMessage.vue";
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
        BAlert,
        BPagination,
        loader: Loader,
        "alert-message": AlertMessage,
    },
    directives: {
        "height-fade": heightFade,
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
            indexNum: 0,
            isLoading: true,
            removedBranches: undefined,
            alertMessages: [],
            alertVariant: undefined,
            alertDismissable: false,
            fields: [
                { key: "startAt", label: "شماره" },
                { key: "name", label: "نام" },
                // { key:"title", label:"عنوان"},
                { key: "action", label: "عملیات" },
            ],
            items: [],
            branchName: [],
            alertMessages: undefined,
            //BRANCH ADMIN
            branchAdmin: undefined,
            branchAdminOptions: undefined,
        };
    },

    computed: {
        fullName() {
            return JSON.parse(localStorage.getItem("userData")).fullName;
        },
        branchId() {
            return this.$route.params.id;
        },
    },
    mounted() {
        const id = parseInt(this.$route.params.id);
        this.getUsers(id).then((users) => {
            this.items = users;
            this.getBranchAdmins(users);
        });
    },
    methods: {
        postUsers() {
            const branchAdminIds = _.map(this.branchAdmin, (item) => {
                return item.id;
            });
            const params = {
                users: branchAdminIds,
            };
            this.isLoading = true;

            axios
                .post(
                    `${process.env.VUE_APP_URL}/branches/${this.branchId}/admins/add`,
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
                    const itemId = _.map(this.items, (item) => {
                        return item.id;
                    });
                    this.items = response.data.data.users;
                    this.removedBranches = this.items;
                    _.map(response.data.data.users, (item) => {
                        this.indexNum++;
                        item.startAt = this.indexNum;
                    });
                    this.isLoading = false;
                    if (this.branchAdmin == undefined) {
                        this.alertMessages = ["لطفا ادمین را انتخاب کنید"];
                        this.alertVariant = "danger";
                        this.$refs.alertComponent.showMessage();
                    } else {
                        this.alertMessages = ["مدیر جدید اضافه شد"];
                        this.alertVariant = "success";
                        this.$refs.alertComponent.showMessage();
                    }
                    setTimeout(() => {
                        this.$refs.alertComponent.hideMessage();
                    }, 2500);
                    const id = parseInt(this.$route.params.id);
                    this.getUsers(id).then((users) => {
                        this.items = users;
                        this.getBranchAdmins(users);
                    });
                    this.branchAdmin = null;
                })
                .catch((error) => {});
        },
        deleteUsers(id) {
            const userIndex = this.items.findIndex((item) => {
                return item.id == id;
            });
            const params = {
                user_id: this.items[userIndex].id,
            };
            this.isLoading = true;
            axios
                .delete(
                    `${process.env.VUE_APP_URL}/branches/${this.branchId}/admins/remove`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    },
                    params
                )
                .then((response) => {
                    this.branchAdminOptions.push(this.items[userIndex]);
                    this.items.splice(userIndex, 1);
                    this.isLoading = false;
                    this.alertMessages = ["عملیات حذف با موفقیت انجام شد"];
                    this.alertVariant = "success";
                    this.$refs.alertComponent.showMessage();
                    setTimeout(() => {
                        this.$refs.alertComponent.hideMessage();
                    }, 2500);
                    this.branchAdminOptions = _.map(
                        this.branchAdminOptions,
                        (item) => {
                            return {
                                ...item,
                                name: item.first_name + " " + item.last_name,
                            };
                        }
                    );
                })
                .catch((error) => {});
        },
        // get users
        async getUsers(id) {
            return await axios
                .get(`${process.env.VUE_APP_URL}/branches/${id}/admins`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.isLoading = false;
                    // this.items = response.data.data.users;
                    this.branchName = response.data.data.name;
                    const userItems = _.map(
                        response.data.data.users,
                        (item) => {
                            this.indexNum++;
                            item.startAt = this.indexNum;
                            return item;
                        }
                    );
                    return userItems;
                });
        },
        // get branches admin users
        getBranchAdmins(users) {
            const usersId = _.map(users, "id");

            axios
                .get(
                    `${process.env.VUE_APP_URL}/branches/${this.branchId}/admins`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    this.branchAdminOptions = _.compact(
                        _.map(res.data.users, (item) => {
                            if (!_.includes(usersId, item.id)) {
                                return {
                                    ...item,
                                    name:
                                        item.first_name + " " + item.last_name,
                                };
                            }
                        })
                    );
                });
        },
        deleteAction() {},
        // navigate user to edit page with id parameter
        editAction(id) {
            this.$router.replace({
                name: "merchants-edit",
                params: {
                    id,
                },
            });
        },
    },
};
</script>
<style lang="scss">
table.table {
    & td:last-child {
        width: 150px !important;
    }
}
.p-btn {
    margin-right: 8px;
}
</style>
