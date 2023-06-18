<template>
  <div>
      <h4 class="mb-2">
          قوانین ارزیابی {{items.name}}
      </h4>
          <b-form-group>
      <b-button
      variant='primary'
        @click="$router.push({ name: 'survey-rules-create', params: {title:items.name,id:items.id} })"
        class="form-group mr-1 px-3"
        >افزودن قانون
        <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
      </b-button>
    </b-form-group>
  <BsTable :items='items.rules' :fields='fields' :perPage='perPage' :pageOptions='pageOptions' />
  </div>
</template>

<script>
import {BButton,BFormGroup,} from 'bootstrap-vue'
import BsTable from '@/global/table/BsTable.vue'
export default {
  components: {
    BsTable,
    BButton,
    BFormGroup,
  },
  data() {
    return {
      active: false,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "نمایش بیشتر" }],

      fields: [
        { key: "rule", label: "عنوان", sortable: true },
        { key: "from", label: "از", sortable: true },
        { key: "to", label: "تا", sortable: true },
        { key: "actionsRulesList", label: "عملیات" },
      ],
      items: this.$route.params.data,
    };
  },
};
</script>
