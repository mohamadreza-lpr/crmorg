<template>
  <div>
      <h4 class="mb-2">
          سوالات {{items.name}}
      </h4>
          <b-form-group>
      <b-button
      variant='primary'
        @click="$router.push({ name: 'survey-satisfactions-create', params: {title:items.name,id:items.id} })"
        class="form-group mr-1 px-3"
        >افزودن دلیل
        <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
      </b-button>
    </b-form-group>
  <BsTable :items='items.satisfactions' :fields='fields' :perPage='perPage' :pageOptions='pageOptions' />
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
        { key: "satisfaction", label: "عنوان", sortable: true },
        { key: "type", label: "نوع", sortable: true },
        { key: "actionsSatisfactionsList", label: "عملیات" },
      ],
      items: this.$route.params.items,
    };
  },
};
</script>
