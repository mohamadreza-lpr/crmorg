<template>
    <div>
        <b-col md="12" lg="12" sm="12">
            <BCard>
                <h4 class="mb-2">ویرایش محصول</h4>
                <alert-message
                    ref="alertComponent"
                    :variant="alertVariant"
                    :messages="alertMessages"
                    :dismissible="alertDismissible"
                />
                <div class="row">
                    <div class="col-12 form-group">
                        <label for="" class="font-weight-bold">نام</label>
                        <b-form-input autocomplete="off"
                            class="d-inline-block mr-1"
                            placeholder="نام"
                            v-model="name"
                        />
                    </div>

                    <div class="col-md-4 form-group">
                        <label for="" class="font-weight-bold">کد محصول</label>
                        <b-form-input autocomplete="off"
                            id="min-credit"
                            placeholder="کد محصول"
                            v-model="code"
                        />
                    </div>

                    <div class="col-md-4 form-group">
                        <label for="" class="font-weight-bold">دسته بندی</label>
                        <v-select
                            v-model="groups"
                            :dir="$store.state.appConfig.isRTL ? 'ltr' : 'rtl'"
                            multiple
                            label="name"
                            :options="options"
                        />
                    </div>

                    <div class="col-md-4 form-group">
                        <label for="" class="font-weight-bold">قیمت</label>
                        <b-form-input autocomplete="off"
                            id="min-credit"
                            placeholder="قیمت"
                            v-model="price"
                            @input="currencySeparator('price')"
                        />
                    </div>

                    <div class="col-12 form-group">
                        <label for="" class="font-weight-bold">توضیحات</label>
                        <quill-editor
                            :options="snowOption"
                            v-model="description"
                        />
                    </div>
                </div>

                <div class="text-right">
                    <b-button variant="primary" @click="updateProduct">
                        <span class="text-nowrap">ذخیره</span>
                    </b-button>
                </div>
            </BCard>
        </b-col>
    </div>
</template>

<script>
// import QuillEditor from "@/global/QuillEditor.vue";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
// eslint-disable-next-line
import "quill/dist/quill.snow.css";
// eslint-disable-next-line
import "quill/dist/quill.bubble.css";
import axios from "axios";
import Tree from "vuejs-tree";
import vSelect from "vue-select";
import {
    BCard,
    BAlert,
    BButton,
    BInputGroupAppend,
    BInputGroup,
    BFormInput,
    BFormSelect,
    BFormGroup,
    BCardText,
    BRow,
    BCol,
} from "bootstrap-vue";
import _ from "lodash";
import AlertMessage from "../components/alert-message/AlertMessage.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
    components: {
        // QuillEditor,
        quillEditor,
        Tree,
        BCard,
        BButton,
        BInputGroupAppend,
        BInputGroup,
        BFormInput,
        BFormSelect,
        BFormGroup,
        BCardText,
        BRow,
        BCol,
        BAlert,
        vSelect,
        "alert-message": AlertMessage,
    },
    data() {
        return {
            snowOption: {
                placeholder: "اطلاعات خود را در این کادر وارد نمایید...",
            },
            code: "",
            description: "",
            groups: "",
            name: "",
            price: "",
            selected: null,
            errors: undefined,
            options: [],
            id: this.$route.params.id,
            alertMessages: [],
            alertVariant: undefined,
            alertDismissible: false,
            treeDisplayData: [
                {
                    text: "گروه اول",
                    id: 1,
                    nodes: [
                        {
                            text: "زیرگروه اول",
                            id: 3,
                            state: {
                                checked: true,
                            },
                            nodes: [
                                {
                                    text: "زیرگروه داخلی 1",
                                    id: 5,
                                },
                                {
                                    text: "زیرگروه داخلی 2",
                                    id: 6,
                                },
                            ],
                        },
                        {
                            text: "زیرگروه دوم",
                            id: 4,
                        },
                    ],
                },
                {
                    text: "گروه دوم",
                    id: 2,
                },
            ],
        };
    },
    computed: {
        myCustomStyles() {
            return {
                tree: {
                    height: "auto",
                    maxHeight: "300px",
                    overflowY: "visible",
                    display: "inline-block",
                },
                row: {
                    width: "500px",
                    cursor: "pointer",
                    child: {
                        height: "35px",
                    },
                },
                text: {
                    style: {},
                    active: {
                        style: {
                            "font-weight": "bold",
                            color: "#2ECC71",
                        },
                    },
                },
                editNode: {
                    style: {
                        color: "#747cff",
                    },
                },
                addNode: {
                    style: {
                        color: "#17d053",
                    },
                },
            };
        },
        myCustomOptions() {
            return {
                treeEvents: {
                    expanded: {
                        state: false,
                    },
                    collapsed: {
                        state: false,
                    },
                    selected: {
                        state: true,
                        fn: this.mySelectedFunction,
                    },
                    checked: {
                        state: true,
                        fn: this.myCheckedFunction,
                    },
                },
                events: {
                    expanded: {
                        state: true,
                    },
                    selected: {
                        state: true,
                    },
                    checked: {
                        state: true,
                    },
                    editableName: {
                        state: true,
                        calledEvent: "expanded",
                    },
                },
                addNode: {
                    state: false,
                    fn: this.addNodeFunction,
                    appearOnHover: false,
                },
                editNode: {
                    state: false,
                    fn: this.editNodeFunction,
                    appearOnHover: false,
                },
                deleteNode: {
                    state: false,
                    fn: this.deleteNodeFunction,
                    appearOnHover: false,
                },
                showTags: true,
            };
        },
    },
    mounted() {
        const id = this.$route.params.id;
        this.getGroups();
        this.getProduct(id);
    },
    methods: {
        addCurrencySeparator(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        removeCurrencySeparator(value) {
            return value.toString().replace(/,/g, "");
        },
        currencySeparator(reference) {
            this[reference] = this.removeCurrencySeparator(this[reference]);
            this[reference] = this.addCurrencySeparator(this[reference]);
        },
        getGroups() {
            axios
                .get(`${process.env.VUE_APP_URL}/groups/all/products?flatten=true`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.options = response.data;
                })
                .catch((error) => {});
        },
        getProduct(id) {
            axios
                .get(`${process.env.VUE_APP_URL}/products/${id}/show`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    this.name = response.data.data.name;
                    this.groups = response.data.data.groups;
                    this.code = response.data.data.code;
                    this.price = this.addCurrencySeparator(
                        response.data.data.price
                    );
                    this.description = response.data.data.description;
                    //
                })
                .catch((error) => {});
        },
        updateProduct() {
            const selectedGroups = _.flatten(
                    _.map(this.groups, (item) => {
                        return _.values(_.pick(item, "id"));
                    })
                ),
                id = this.$route.params.id;

            const params = {
                code: this.code,
                description: this.description,
                groups: selectedGroups,
                name: this.name,
                price: this.removeCurrencySeparator(this.price),
            };

            axios
                .patch(
                    `${process.env.VUE_APP_URL}/products/${id}/update`,
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
                    this.$router.replace({ name: "products-list" }).then(() => {
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: "بروزرسانی محصول",
                                icon: "CoffeeIcon",
                                variant: "success",
                                text: "محصول مورد نظر بروزرسانی شد",
                            },
                        });
                    });
                })
                .catch((error) => {
                    this.alertMessages = _.flatten(
                        Object.values(error.response.data.errors)
                    );
                    this.alertVariant = "danger";
                    this.$refs.alertComponent.showMessage();
                });
        },

        editNumber(a) {
            (this.changed1 = true),
                (this.changedId1 = a.item.id),
                (this.mobileType = a.item.type);
            this.preNumber = a.item.preNumber;
            this.callNumber = a.item.callNumber;
            this.untilNumber = a.item.untilNumber;
            this.innerNumber = a.item.innerNumber;
        },
        editFinallNumber() {
            this.mobileItems.map((b) => {
                if (b.id == this.changedId1) {
                    b.type = this.mobileType;
                    b.preNumber = this.preNumber;
                    b.callNumber = this.callNumber;
                    b.untilNumber = this.untilNumber;
                    b.innerNumber = this.innerNumber;
                }
            });
            this.nullNumber();
            this.changed1 = false;
        },

        removeNumber(a) {
            this.mobileItems.splice(
                this.mobileItems.findIndex((x) => x.id == a.id)
            );
        },
        addNumber() {
            const number = {
                id: this.mobileItems.length + 1,
                type: this.mobileType,
                preNumber: this.preNumber,
                callNumber: this.callNumber,
                untilNumber: this.untilNumber,
                innerNumber: this.innerNumber,
            };
            this.mobileItems.push(number);
            this.nullNumber();
        },
        nullNumber() {
            this.mobileType = null;
            this.preNumber = null;
            this.callNumber = null;
            this.untilNumber = null;
            this.innerNumber = null;
        },

        editAddress(a) {
            (this.changed = true),
                (this.changedId = a.item.id),
                (this.addressType = a.item.type);
            this.province = a.item.province;
            this.city = a.item.city;
            this.postCode = a.item.postCode;
            this.address = a.item.address;
        },
        editFinallAddress() {
            this.addressItems.map((b) => {
                if (b.id == this.changedId) {
                    b.type = this.addressType;
                    b.province = this.province;
                    b.city = this.city;
                    b.postCode = this.postCode;
                    b.address = this.address;
                }
            });
            this.nullAddress();
            this.changed = false;
        },

        removeAddress(a) {
            this.addressItems.splice(
                this.addressItems.findIndex((x) => x.id == a.id)
            );
        },
        addAddress() {
            const address = {
                id: this.addressItems.length + 1,
                type: this.addressType,
                province: this.province,
                city: this.city,
                postCode: this.postCode,
                address: this.address,
            };
            this.addressItems.push(address);
            this.nullAddress();
        },
        nullAddress() {
            this.addressType = null;
            this.province = null;
            this.city = null;
            this.postCode = null;
            this.address = null;
        },
        myCheckedFunction: function (nodeId, state) {},
        mySelectedFunction: function (nodeId, state) {},
        deleteNodeFunction: function (node) {
            const nodePath = this.$refs["my-tree"].findNodePath(node.id);
            const parentNodeId = nodePath.slice(-2, -1)[0];
            if (parentNodeId === undefined) {
                // 'root' node
                const nodeIndex =
                    this.$refs["my-tree"].nodes.findIndex(
                        (x) => x.id !== node.id
                    ) - 1;
                this.$refs["my-tree"].nodes.splice(nodeIndex, 1);
            } else {
                // child node
                const parentNode = this.$refs["my-tree"].findNode(parentNodeId);
                const nodeIndex =
                    parentNode.nodes.findIndex((x) => x.id !== node.id) - 1;
                parentNode.nodes.splice(nodeIndex, 1);
            }
        },
        addNodeFunction: function (node) {
            const newNode = {
                text: "Grandchild 2",
                id: Math.floor(Math.random() * 100),
                checkable: false,
            };

            if (node.nodes === undefined) {
                // the node doesn't have childs
                // I use $set to ensure that VueJs detect the change
                this.$set(node, "nodes", [newNode]);
            } else {
                node.nodes.push(newNode);
            }
        },
        addNodeFunction1: function (node) {
            const newNode = {
                text: "گروه جدید",
                id: Math.floor(Math.random() * 100),
                checkable: false,
            };
            this.treeDisplayData.push(newNode);
        },
        editNodeFunction(node) {},
    },
};
</script>

<style>
.expanded_icon {
    margin-right: 8px;
}
.vpd-input-group input {
    border-radius: 0px;
}
</style>
