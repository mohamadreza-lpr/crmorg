<template>
    <div>
        <h4>دسته بندی های بلاگ</h4>
        <BCard>
            <BButton
                class="form-group"
                size="sm"
                variant="success"
                @click="addNodeFunction(undefined)"
                >افزودن گروه جدید</BButton
            >
            <hr />
            <div v-if="!treeDisplayData.length > 0" class="text-center mt-3">
                <span class="h4 mb-0 text-muted"> موردی یافت نشد </span>
            </div>
            <Tree
                id="my-tree-id"
                ref="my-tree"
                :custom-options="myCustomOptions"
                :custom-styles="myCustomStyles"
                :nodes="treeDisplayData"
            ></Tree>
        </BCard>
        <b-modal
            v-model="addGroupModalFlag"
            id="add-group-modal"
            title="گروه جدید"
            ok-title="ثبت"
            cancel-title="لغو"
            cancel-variant="outline-secondary"
            @ok="addGroupHandler"
            @cancel="cancelGroupHandler"
        >
            <b-form ref="add-group-form">
                <b-form-group label="نام گروه" label-for="name">
                    <b-form-input
                        autocomplete="off"
                        v-model="addGroup.name"
                        id="name"
                        :class="{
                            'is-invalid':
                                addGroupFormSubmitted &&
                                $v.addGroup.name.$error,
                        }"
                        placeholder="نام گروه را وارد کنید"
                    />
                    <div
                        v-if="
                            addGroupFormSubmitted && !$v.addGroup.name.required
                        "
                        class="invalid-feedback d-block"
                    >
                        فیلد نام الزامی است
                    </div>
                </b-form-group>
                <!-- <b-form-group label="نوع گروه" label-for="type">
                    <v-select
                        id="type"
                        dir="rtl"
                        label="name"
                        placeholder="انتخاب کنید..."
                        :class="{
                            'is-invalid':
                                addGroupFormSubmitted &&
                                $v.addGroup.type.$error,
                        }"
                        v-model="addGroup.type"
                        :options="groupTypeOptions"
                    />
                    <div
                        v-if="
                            addGroupFormSubmitted && !$v.addGroup.type.required
                        "
                        class="invalid-feedback d-block"
                    >
                        فیلد نوع الزامی است
                    </div>
                </b-form-group> -->
            </b-form>
        </b-modal>

        <b-modal
            v-model="editGroupModalFlag"
            id="edit-group-modal"
            title="ویرایش گروه"
            ok-title="بروزرسانی"
            cancel-title="لغو"
            cancel-variant="outline-secondary"
            @ok="editGroupHandler"
            @cancel="cancelGroupHandler"
        >
            <b-form ref="edit-group-form">
                <b-form-group label="نام گروه" label-for="name">
                    <b-form-input
                        autocomplete="off"
                        v-model="editGroup.name"
                        id="name"
                        :class="{
                            'is-invalid':
                                editGroupFormSubmitted &&
                                $v.editGroup.name.$error,
                        }"
                        placeholder="نام گروه را وارد کنید"
                    />
                    <div
                        v-if="
                            editGroupFormSubmitted &&
                            !$v.editGroup.name.required
                        "
                        class="invalid-feedback d-block"
                    >
                        فیلد نام الزامی است
                    </div>
                </b-form-group>
                <!-- <b-form-group label="نوع گروه" label-for="type">
                    <v-select
                        id="type"
                        dir="rtl"
                        label="name"
                        placeholder="انتخاب کنید..."
                        :class="{
                            'is-invalid':
                                editGroupFormSubmitted &&
                                $v.editGroup.type.$error,
                        }"
                        v-model="editGroup.type"
                        :options="groupTypeOptions"
                    />
                    <div
                        v-if="
                            editGroupFormSubmitted &&
                            !$v.editGroup.type.required
                        "
                        class="invalid-feedback d-block"
                    >
                        فیلد نوع الزامی است
                    </div>
                </b-form-group> -->
            </b-form>
        </b-modal>
    </div>
</template>

<script>
import _ from "lodash";
import Tree from "vuejs-tree";
import vSelect from "vue-select";
import { required } from "vuelidate/lib/validators";
import {
    BInputGroup,
    BFormGroup,
    BInputGroupAppend,
    BFormInput,
    BModal,
    BForm,
    BCard,
    BButton,
} from "bootstrap-vue";
import axios from "axios";
export default {
    components: {
        BInputGroup,
        vSelect,
        BInputGroupAppend,
        BFormInput,
        BFormGroup,
        BModal,
        BForm,
        BCard,
        BButton,
        Tree,
    },
    data() {
        return {
            addGroupFormSubmitted: false,
            addGroupModalFlag: false,
            addGroup: { name: undefined, type: 'blogs' },

            editGroupFormSubmitted: false,
            editGroupModalFlag: false,
            editGroup: { name: undefined, type: 'blogs' },

            // groupTypeOptions: [
            //     {
            //         name: "مقالات",
            //         value: "blogs",
            //     },
            // ],
            treeDisplayData: [],
            currentNode: undefined,
        };
    },
    validations: {
        addGroup: {
            name: { required },
            // type: { required },
        },
        editGroup: {
            name: { required },
            // type: { required },
        },
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
                        state: true,
                        fn: this.expandNodeFunction,
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
            };
        },
    },
    mounted() {
        this.$refs["my-tree"].expandNode(1);
    },
    created() {
        axios
            .get(`${process.env.VUE_APP_URL}/groups/all/blogs`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then(({ data }) => {
                const result = _.map(data, (item) => {
                    return {
                        id: item.id,
                        text: item.name,
                        type: 'blogs',
                        checkable: false,
                        nodes: item.children.length > 0 ? [{}] : undefined,
                    };
                });

                this.treeDisplayData = result;
            })
            .catch((error) => {});
    },
    methods: {
        expandNodeFunction(node) {
            axios
                .get(`${process.env.VUE_APP_URL}/groups/${node}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then(({ data }) => {
                    const result = _.map(data, (item) => {
                        return {
                            id: item.id,
                            text: item.name,
                            type: 'blogs',
                            checkable: false,
                            nodes: item.children.length > 0 ? [{}] : undefined,
                        };
                    });

                    const _node = this.$refs["my-tree"].findNode(node);
                    _node.nodes = result;
                })
                .catch((error) => {});
        },
        addNodeFunction(node) {
            this.addGroupModalFlag = true;
            this.currentNode = node;
        },
        editNodeFunction(node) {
            this.editGroupModalFlag = true;
            this.currentNode = node;

            this.editGroup.name = this.currentNode.text;
            this.editGroup.type = _.find(this.groupTypeOptions, [
                "value",
                'blogs',
            ]);
        },
        editGroupHandler(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.editGroupFormSubmitted = true;

            this.$v.editGroup.$touch();
            if (this.$v.editGroup.$invalid) return;

            axios
                .patch(
                    `${process.env.VUE_APP_URL}/groups/${this.currentNode.id}/update`,
                    {
                        name: this.editGroup.name,
                        type: 'blogs',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then((response) => {});

            const node = this.$refs["my-tree"].findNode(this.currentNode.id);
            node.text = this.editGroup.name;
            node.type = 'blogs';

            this.editGroupModalFlag = false;
            this.editGroup.name = undefined;
            this.editGroup.type = undefined;
            this.editGroupFormSubmitted = false;
        },
        addGroupHandler(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.addGroupFormSubmitted = true;

            this.$v.addGroup.$touch();
            if (this.$v.addGroup.$invalid) return;

            const newNode = {
                checkable: false,
                text: this.addGroup.name,
                type: 'blogs',
                id: Math.floor(Math.random() * 1000),
            };

            axios
                .post(
                    `${process.env.VUE_APP_URL}/groups/store`,
                    {
                        name: this.addGroup.name,
                        type: 'blogs',
                        parent_id: this.currentNode
                            ? this.currentNode.id
                            : undefined,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    newNode.id = response.data.group.id;
                });

            if (this.currentNode != undefined) {
                if (this.currentNode.nodes === undefined) {
                    this.$set(this.currentNode, "nodes", [newNode]);
                } else {
                    this.currentNode.nodes.push(newNode);
                }
            } else {
                this.treeDisplayData.push(newNode);
            }

            this.addGroupModalFlag = false;
            this.addGroup.name = undefined;
            this.addGroup.type = undefined;
            this.addGroupFormSubmitted = false;
        },
        cancelGroupHandler() {
            this.addGroup.name = undefined;
            this.addGroup.type = undefined;
            this.$v.addGroup.$reset();
            this.addGroupFormSubmitted = false;
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
div#swal2-content {
    margin-top: 10px;
    display: flex !important;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    > input {
        margin: 0px 3px;
        font-size: 13px;
    }
}
#group-type {
    appearance: none;
    width: 100%;
    height: 34px;
    background: white;
    border-radius: 3px;
    border: 1px solid #ddd;
    box-shadow: 0px 0px 0px 0.3px rgba(0, 0, 0, 0.1);
    padding: 0px 10px;
    font-size: 13px;
    outline: none;

    & option:first-of-type {
        color: #ccc !important;
    }
    &:focus {
        outline: none;
    }
}
</style>
