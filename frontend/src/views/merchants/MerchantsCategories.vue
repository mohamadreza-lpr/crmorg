<template>
    <div>
        <h4>زمینه های فعالیت</h4>
        <BCard>
            <BButton
                class="form-group"
                size="sm"
                variant="success"
                @click="addNodeFunction1"
                >افزودن گروه جدید</BButton
            >
            <b-input-group class="w-50" v-if="show">
                <b-form-input autocomplete="off"
                    v-model="edited"
                    type="search"
                    placeholder="برای تغییر نام گروه تایپ نمایید"
                ></b-form-input autocomplete="off">

                <BInputGroupAppend>
                    <b-button :disabled="!edited" @click="editNodeFunction"
                        >ذخیره</b-button
                    >
                </BInputGroupAppend>
            </b-input-group>
            <Tree
                id="my-tree-id"
                ref="my-tree"
                :custom-options="myCustomOptions"
                :custom-styles="myCustomStyles"
                :nodes="treeDisplayData"
            ></Tree>
            <div class="text-right">
                <b-button @click="getAll" variant="primary">ذخیره</b-button>
            </div>
        </BCard>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import Tree from "vuejs-tree";
import {
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BCard,
    BButton,
} from "bootstrap-vue";
export default {
    components: {
        BInputGroup,
        BInputGroupAppend,
        BFormInput,
        BCard,
        BButton,
        Tree,
    },
    data() {
        return {
            edited: "مقدار پیش فرض",
            show: false,
            treeDisplayData: [
                {
                    text: "گروه اول",
                    id: 1,
                    checkable: false,
                    nodes: [
                        {
                            checkable: false,

                            text: "زیرگروه اول",
                            id: 3,
                            state: {
                                checked: true,
                            },
                            //     nodes: [
                            //       {
                            // checkable: false,

                            //         text: "زیرگروه داخلی 1",
                            //         id: 5,
                            //       },
                            //       {
                            // checkable: false,

                            //         text: "زیرگروه داخلی 2",
                            //         id: 6,
                            //       },
                            //     ],
                        },
                        // {
                        //   checkable: false,

                        //   text: "زیرگروه دوم",
                        //   id: 4,
                        // },
                    ],
                },
                // {
                //   checkable: false,

                //   text: "گروه دوم",
                //   id: 2,
                // },
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
                    state: true,
                    fn: this.addNodeFunction,
                    appearOnHover: false,
                },
                editNode: {
                    state: true,
                    fn: this.editNodeFunction,
                    appearOnHover: false,
                },
                deleteNode: {
                    state: true,
                    fn: this.deleteNodeFunction,
                    appearOnHover: false,
                },
                showTags: true,
            };
        },
    },
    mounted() {
        this.$refs["my-tree"].expandNode(1);
    },
    methods: {
        getAll() {},
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
                text: "زیرگروه جدید",
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
        editNodeFunction: function (node) {
            Swal.fire({
                customClass: {
                    confirmButton: "btn btn-success mx-1",
                    cancelButton: "btn btn-light text-dark mx-1",
                },
                confirmButtonText: "ثبت",
                cancelButtonText: "انصراف",
                title: "ویرایش نام گروه",
                input: "text",
                inputLabel: "نام گروه",
                // inputValue: inputValue,
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return "لطفا نام صحیح وارد نمایید";
                    } else {
                        node.text = value;
                    }
                },
            });
        },
    },
};
</script>

<style lang="scss">
.expanded_icon {
    margin-right: 8px;
}
#my-tree-id {
    li {
        width: unset !important;
    }
}
</style>
