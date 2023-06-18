<template>
  <div>
    <h4> گروه‌ بندی محصولات </h4>
    <BCard>
    <BButton class="form-group" size='sm' variant='success' @click="addNodeFunction1">افزودن گروه جدید</BButton>
      <b-input-group class="w-50"  v-if="show">
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
        <b-button @click="getAll" variant='primary'>ذخیره</b-button>
      </div>
    </BCard>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Tree from "vuejs-tree";
import {BInputGroup,
BInputGroupAppend,
  BFormInput, BCard, BButton } from "bootstrap-vue";
export default {
  components: {BInputGroup,
  BInputGroupAppend,
    BFormInput,
    BCard,
    BButton,
    Tree,
  },
  data() {
    return {
      edited:'مقدار پیش فرض',
      show:false,
      treeDisplayData: [
        {
          text: "پیش فرض",
          id: 1,
          checkable: false,
        },
        {
          checkable: false,

          text: "گروه جدید",
          id: 2,
             nodes: [
            {
              checkable: false,

              text: "زیرگروه اول",
              id: 3,
              state: {
                checked: true,
              },
            },
          ],
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
        editNode : {
          style: {
            color: '#747cff'

          },
        },
        addNode : {
          style:{
            color: '#17d053'

          },
        }
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
    getAll () {
      console.log(this.treeDisplayData)
    },
    myCheckedFunction: function (nodeId, state) {
      console.log(`is ${nodeId} checked ? ${state}`);
      console.log(this.$refs["my-tree"].getCheckedNodes("id"));
      console.log(this.$refs["my-tree"].getCheckedNodes("text"));
    },
    mySelectedFunction: function (nodeId, state) {
      console.log(`is ${nodeId} selected ? ${state}`);
      console.log(this.$refs["my-tree"].getSelectedNode());
    },
    deleteNodeFunction: function (node) {
      const nodePath = this.$refs["my-tree"].findNodePath(node.id);
      const parentNodeId = nodePath.slice(-2, -1)[0];
      if (parentNodeId === undefined) {
        // 'root' node
        const nodeIndex =
          this.$refs["my-tree"].nodes.findIndex((x) => x.id !== node.id) - 1;
        this.$refs["my-tree"].nodes.splice(nodeIndex, 1);
      } else {
        // child node
        const parentNode = this.$refs["my-tree"].findNode(parentNodeId);
        const nodeIndex =
          parentNode.nodes.findIndex((x) => x.id !== node.id) - 1;
        parentNode.nodes.splice(nodeIndex, 1);
      }
      console.log("example: remove node", node.id);
    },
    addNodeFunction: function (node) {
      const newNode = {
        text: "زیرگروه جدید",
        id: Math.floor(Math.random() * 100),
        checkable: false,
      };
      console.log("example: add node", newNode);
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
      this.treeDisplayData.push(newNode)
      console.log("example: add node", newNode);
    },
    editNodeFunction: function (node) {
      Swal.fire({
        customClass: {
    confirmButton: 'btn btn-success mx-1',
    cancelButton: 'btn btn-light text-dark mx-1'
  },
      confirmButtonText: 'ثبت',
      cancelButtonText: 'انصراف',
      title: 'ویرایش نام گروه',
      input: 'text',
      inputLabel: 'نام گروه',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'لطفا نام صحیح وارد نمایید'
        }
        else {
          node.text = value
        }
      }
    })
    },
  },
};
</script>

<style lang='scss'>
.expanded_icon {
  margin-right: 8px;
}
#my-tree-id {
  li {
    width:unset!important
  }
}
</style>