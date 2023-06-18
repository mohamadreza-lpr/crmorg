<template>
    <div>
        <b-row>
            <b-col cols="10">
                <h3 class="mb-2">
                    شما درحال ویرایش مجوزهای دسترسی برای سطح کاربری
                    <b>{{ this.rollName }}</b> هستید
                </h3>
            </b-col>
            <b-col cols="2">
                <div class="text-left">
                    <b-button
                        @click="toggleIndeterminate"
                        v-text="isAllChecked ? 'برداشتن انتخاب' : 'انتخاب همه'"
                    ></b-button>
                </div>
            </b-col>
        </b-row>

        <hr />
        <div v-if="isLoading"><loader /></div>
        <div v-else>
            <b-row>
                <b-col cols="1"></b-col>
                <b-col cols="10">
                    <b-card
                        v-for="(permission, index) in permissions"
                        :key="index"
                    >
                        <b-row>
                            <b-col cols="10">
                                <h2 class="m-1">{{ index }}</h2>
                            </b-col>
                            <b-col cols="2"> </b-col>
                        </b-row>

                        <div>
                            <b-form-group>
                                <b-form-checkbox-group
                                    v-model="checkbox"
                                    class="demo-inline-spacing"
                                >
                                    <b-form-checkbox
                                        v-for="permissionName in permission"
                                        :key="permissionName.name"
                                        :value="permissionName.name"
                                        :checked="indeterminate"
                                    >
                                        {{ permissionName.display_name }}
                                    </b-form-checkbox>
                                </b-form-checkbox-group>
                            </b-form-group>
                        </div>
                    </b-card>
                </b-col>
                <b-col cols="1"></b-col>
            </b-row>
            <b-row>
                <div class="col-10"></div>
                <div class="text-right">
                    <b-button variant="primary pl-2" @click="submitPermissions">
                        <span class="text-nowrap">ثبت</span>
                    </b-button>
                </div>
            </b-row>
        </div>
    </div>
</template>
<script>
import {
    BCard,
    BRow,
    BCol,
    BAlert,
    BFormInput,
    BForm,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BFormGroup,
    BFormCheckbox,
    BFormCheckboxGroup,
} from "bootstrap-vue";
import axios from "axios";
import Loader from "../../components/loader/Loader.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
    components: {
        BRow,
        BCol,
        BCard,
        BButton,
        BBadge,
        BTable,
        BFormGroup,
        BFormInput,
        BForm,
        BAlert,
        BPagination,
        BFormCheckbox,
        BFormCheckboxGroup,
        loader: Loader,
    },
    data() {
        return {
            isAllChecked: false,
            checked: true,
            indeterminate: false,
            permissions: [],
            checkbox: [],
            rollName: undefined,
            isLoading: true,
        };
    },
    mounted() {
        const id = this.$route.params.id;
        const displayName = this.$route.params.displayName;
        this.rollName = displayName;
        this.getPermissions();
        this.getAssign();
    },
    methods: {
        toggleIndeterminate() {
            if (!this.isAllChecked) {
                const perms = _.flattenDepth(
                    Object.values(this.permissions),
                    2
                );
                this.checkbox = _.map(perms, "name");
            } else {
                this.checkbox = [];
            }
            this.isAllChecked = !this.isAllChecked;
        },
        getAssign() {
            const id = this.$route.params.id;
            axios
                .get(`${process.env.VUE_APP_URL}/roles/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.isLoading = false;
                    this.checkbox = _.map(
                        response.data.data.permissions,
                        (item) => {
                            return item.name;
                        }
                    );
                })
                .catch((error) => {});
        },
        getPermissions() {
            axios
                .get(`${process.env.VUE_APP_URL}/permissions`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.permissions = response.data.permissions;
                })
                .catch((error) => {});
        },
        submitPermissions() {
            const id = this.$route.params.id;
            const params = {
                permissions: this.checkbox,
            };
            axios
                .patch(
                    `${process.env.VUE_APP_URL}/roles/${id}/permissions`,
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
                    // this.$store.commit("app/setAlert", {
                    //     text: "مجوزهای دسترسی با موفقیت ویرایش شد",
                    //     type: "success",
                    //     visible: true,
                    //     count: 10,
                    // });
                    this.$toast({
                        component: ToastificationContent,
                        position: "top-right",
                        props: {
                            title: "مجوزهای دسترسی",
                            icon: "CoffeeIcon",
                            variant: "success",
                            text: response.data.message,
                        },
                    });
                    this.$router.push("/access-control/roles");
                })
                .catch((error) => {});
        },
    },
};
</script>
<style lang="scss"></style>
