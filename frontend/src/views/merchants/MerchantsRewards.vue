<template>
  <div>
    <MerchantsAccess />
    <h4>پاداش های {{ name }}</h4>
    <BsTable :items='items' :fields='fields' :perPage='perPage' :pageOptions='pageOptions' />
  </div>
</template>

<script>
import MerchantsAccess from "./components/MerchantsAccess.vue";
import BsTable from '@/global/table/BsTable.vue'

export default {
  components: {
    MerchantsAccess,
    BsTable,
  },
  data() {
    return {
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "نمایش بیشتر" }],
      fields: [
        { key: "title", label: "عنوان", sortable: true },
        { key: "level", label: "سطح", sortable: true },
        { key: "off", label: "درصد تخفیف", sortable: true },
        { key: "credit", label: "درصد اعتبار", sortable: true },
        { key: "actionsMerchantsRewards", label: "عملیات" },
      ],
      items: this.$route.params.rewards,
      name: this.$route.params.name,
      Id: this.$route.params.id,
    };
  },
};
</script>
