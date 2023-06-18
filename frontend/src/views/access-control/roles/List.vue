<template>
    <b-card no-body class="mb-0">
        <div class="m-2">
            <b-row>
                <b-col
                    cols="12"
                    md="6"
                    class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                >
                    <h3>لیست سطوح دسترسی</h3>
                </b-col>

                <b-col cols="12" md="6">
                    <div class="d-flex align-items-center justify-content-end">
                        <b-button variant="primary" @click="toRollCreate">
                            <span class="text-nowrap">سطح دسترسی جدید</span>
                        </b-button>
                    </div>
                </b-col>
            </b-row>
        </div>
        <b-alert
            v-height-fade.appear
            :show="this.alert.visible"
            dismissible
            class="mb-2 mt-1 m-1"
            :variant="this.alert.type"
        >
            <div class="alert-body">
                {{ this.alert.text }}
            </div>
        </b-alert>
        <b-table
            :items="items"
            :fields="fields"
            :bordered="bordered"
            :outlined="outlined"
            :striped="striped"
            class="mb-0"
            responsive
            empty-text="رکوردی یافت نشد"
            show-empty
        >
            <template #cell(actions)="data">
                <b-button
                    variant="gradient-info"
                    class="btn-icon p-btn"
                    @click="editAction(data.item.id)"
                >
                    <feather-icon icon="Edit2Icon" />
                </b-button>
                <b-button
                    variant="success"
                    class="btn-icon"
                    @click="licenseAction(data.item.id, data.item.display_name)"
                >
                    <feather-icon icon="BookOpenIcon" />
                </b-button>
            </template>
        </b-table>
    </b-card>
</template>
<script>
import axios from "axios";
import {
    BCard,
    BRow,
    BCol,
    BAlert,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
} from "bootstrap-vue";
import { heightFade } from "@core/directives/animations";
export default {
    components: {
        BAlert,
        BCard,
        BRow,
        BCol,
        BFormInput,
        BButton,
        BTable,
        BMedia,
        BAvatar,
        BLink,
        BBadge,
        BDropdown,
        BDropdownItem,
        BPagination,
    },
    directives: {
        "height-fade": heightFade,
    },
    data() {
        return {
            //table data
            fields: [
                { key: "startAt", label: "شماره", sortable: true },
                { key: "display_name", label: "سطح دسترسی", sortable: true },
                { key: "name", label: "نام", sortable: true },
                { key: "type", label: "تعداد مجوزها", sortable: true },
                { key: "actions", label: "عملیات" },
            ],
            items: [],
            indexNum: 0,
            striped: true,
            bordered: true,
            outlined: true,
        };
    },
    mounted() {
        this.getAccessLevels();
        setTimeout(() => {
            this.$store.commit("app/hideAlert", false);
        }, 7000);
    },
    computed: {
        // get alert object from VUEX
        alert: {
            get() {
                return this.$store.getters["app/getAlert"];
            },
            set(value) {
                this.$store.commit("app/setAlert", value);
            },
        },
    },
    methods: {
        getAccessLevels() {
            axios
                .get(`${process.env.VUE_APP_URL}/roles`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.items = response.data.data;
                    _.map(response.data.data, (post) => {
                        this.indexNum++;
                        post.startAt = this.indexNum;
                    });
                })
                .catch((error) => {});
        },
        licenseAction(id, displayName) {
            this.$router.replace({
                name: "permission-assign",
                params: {
                    id,
                    displayName,
                },
            });
        },
        editAction(id) {
            this.$router.replace({
                name: "roles-edit",
                params: {
                    id,
                },
            });
        },
        toRollCreate() {
            this.$router.replace({
                name: "roles-create",
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
