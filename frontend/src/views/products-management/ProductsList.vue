<template>
    <div>
        <div class="demo-spacing-0 mb-1">
            <b-alert
                v-height-fade.appear
                :show="this.alert.visible"
                dismissible
                class="mb-2 mt-1"
                :variant="this.alert.type"
            >
                <div class="alert-body">
                    {{ this.alert.text }}
                </div>
            </b-alert>
        </div>
        <b-form-group>
            <b-button
                @click="$router.push({ name: 'products-create' })"
                class="form-group bg-blue-11 mr-1 px-3"
                >محصول جدید
                <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
            </b-button>
            <b-button
                @click="$router.push({ name: 'products-categories' })"
                class="form-group bg-blue-22 mr-1 px-3"
                >گروه بندی محصولات
                <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
            </b-button>
            <!-- <b-button
                variant="outline-secondary"
                @click="$router.push({ name: 'products-importProducts' })"
                class="form-group bg-blue-33 mr-1 px-3"
                >ورود محصولات از اکسل
                <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
            </b-button> -->
        </b-form-group>
        <b-card>
            <h3 class="mb-1">لیست محصولات</h3>
            <b-table
                :items="items"
                :bordered="bordered"
                :outlined="outlined"
                :striped="striped"
                :fields="fields"
                :perPage="perPage"
                :pageOptions="pageOptions"
                show-empty
            >
                <template #cell(price)="data">
                    {{ addCurrencyMask(data.value) }}
                </template>
                <template #empty>
                    <div class="text-center">
                        <h4 class="text-muted text-center">موردی یافت نشد</h4>
                    </div>
                </template>
                <template #cell(actions)="data">
                    <b-button
                        variant="gradient-info"
                        class="btn-icon"
                        @click="editHandler(data.item.id)"
                    >
                        <feather-icon icon="Edit2Icon" />
                    </b-button>
                </template>
                <template #cell(groups)="data">
                    <div v-for="group in data.item.groups" :key="group.id">
                        <b-badge variant="primary">
                            {{ group.name }}
                        </b-badge>
                    </div>
                </template>
            </b-table>
            <b-pagination
                v-model="page"
                :per-page="perPage"
                :total-rows="total"
                @change="pageChanger"
            ></b-pagination>
        </b-card>
    </div>
</template>

<script>
import axios from "axios";
import BsTable from "@/global/table/BsTable.vue";
import { heightFade } from "@core/directives/animations";
import Ripple from "vue-ripple-directive";
import {
    VBToggle,
    BAlert,
    BForm,
    BFormCheckbox,
    BSidebar,
    BInputGroupAppend,
    BButton,
    BFormInput,
    BPagination,
    BInputGroup,
    BFormGroup,
    BFormSelect,
    BCol,
    BRow,
    BCard,
    BTable,
    BBadge,
    BAvatar,
    BImg,
    BDropdown,
    BDropdownItem,
    BCardText,
    BDropdownText,
    BModal,
    VBModal,
} from "bootstrap-vue";
export default {
    components: {
        BsTable,
        BAlert,
        BFormCheckbox,
        BSidebar,
        BForm,
        BInputGroupAppend,
        BButton,
        BFormInput,
        BInputGroup,
        BFormGroup,
        BFormSelect,
        BCol,
        BRow,
        BCard,
        BTable,
        BBadge,
        BAvatar,
        BImg,
        BDropdown,
        BDropdownItem,
        BPagination,
        BCardText,
        BDropdownText,
        BModal,
    },
    directives: {
        "height-fade": heightFade,
        "b-modal": VBModal,
        "b-toggle": VBToggle,
    },
    data() {
        return {
            page: 1,
            perPage: 5,
            total: undefined,
            striped: true,
            bordered: true,
            outlined: true,
            pageOptions: [5, 10, 15],
            fields: [
                { key: "name", label: "نام", sortable: true },
                { key: "price", label: "قیمت", sortable: true },
                { key: "code", label: "کد", sortable: true },
                { key: "groups", label: "گروه" },
                { key: "actions", label: "ویرایش" },
                // { key: "id", label: "شماره", sortable: true },
                // { key: "description", label: "توضیحات" }
            ],
            items: [],
        };
    },
    computed: {
        alert: {
            get() {
                return this.$store.getters["app/getAlert"];
            },
            set(value) {
                this.$store.commit("app/setAlert", value);
            },
        },
    },
    mounted() {
        this.getProducts();
        setTimeout(() => {
            this.$store.commit("app/hideAlert", false);
        }, 7000);
    },
    methods: {
        addCurrencyMask(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getProducts() {
            const params = { page: this.page };

            axios
                .get(`${process.env.VUE_APP_URL}/products`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.items = response.data.data;
                    this.total = response.data.meta.total;
                    this.perPage = response.data.meta.per_page;
                })
                .catch((error) => {});
        },
        pageChanger(value) {
            this.page = value;
            this.getProducts();
        },
        editHandler(id) {
            this.$router.push({
                name: "products-editProduct",
                params: { id: id },
            });
        },
    },
};
</script>

<style lang="scss">
.bg-blue-11 {
    background-color: #1eb2a6 !important;
    border: none;
}
.bg-blue-22 {
    background-color: #75cfb8 !important;
    border: none;
}
// .bg-blue-33 {
//   background-color: #3a3535 !important;
//   border: none;
// }
</style>
