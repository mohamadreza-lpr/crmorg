<template>
  <div>
      <h4 class="mb-2">
          گزینه های سوال {{items.question}}
      </h4>
          <b-form-group>
      <b-button
      variant='primary'
        @click="$router.push({ name: 'survey-options-create', params: {data:items,id:items.id} })"
        class="form-group mr-1 px-3"
        >افزودن گزینه
        <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
      </b-button>
    </b-form-group>
  <BsTable :items='items.options' :fields='fields' :perPage='perPage' :pageOptions='pageOptions' />
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
        { key: "option", label: "عنوان", sortable: true },
        { key: "order", label: "اولویت نمایش", sortable: true },
        { key: "weight", label: "وزن", sortable: true },
        { key: "status", label: "وضعیت", sortable: true },
        { key: "actionsQuestionsOptionsList", label: "عملیات" },
      ],
      items: this.$route.params.data,
    };
  },
};
</script>
