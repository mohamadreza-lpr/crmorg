<template>
  <div>
      <h4 class="mb-2">
          سوالات {{items.name}}
      </h4>
          <b-form-group>
      <b-button
      variant='primary'
        @click="$router.push({ name: 'survey-questions-create', params: {title:items.name,id:items.id} })"
        class="form-group mr-1 px-3"
        >افزودن سوال
        <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
      </b-button>
      <b-button
      variant='outline-primary'
        @click="$router.push({ name: 'survey-satisfactions', params: {items:items,id:items.id} })" 
        class="form-group mr-1 px-3"
        >لیست دلایل
        <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
      </b-button>
    </b-form-group>
  <BsTable :items='items.questions' :fields='fields' :perPage='perPage' :pageOptions='pageOptions' />
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
        { key: "question", label: "سوال", sortable: true },
        { key: "type", label: "نوع", sortable: true },
        { key: "calculating", label: "محاسباتی", sortable: true },
        { key: "order", label: "اولویت نمایش", sortable: true },
        { key: "weight", label: "وزن", sortable: true },
        { key: "status", label: "وضعیت", sortable: true },
        { key: "actionsQuestionsList", label: "عملیات" },
      ],
      items: this.$route.params.data,
    };
  },
};
</script>
