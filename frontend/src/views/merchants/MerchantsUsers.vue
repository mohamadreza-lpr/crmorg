<template>
  <div>
    <MerchantsAccess />
    <BsTable :items='items' :fields='fields' :perPage='perPage' :pageOptions='pageOptions' />
  </div>
</template>

<script>
import BsTable from '@/global/table/BsTable.vue'
import MerchantsAccess from "./components/MerchantsAccess.vue";
export default {
  components: {
    BsTable,
    MerchantsAccess,
  },
  data() {
    return {
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "نمایش بیشتر" }],
      fields: [
        { key: "twoPartNameWithUserName", label: "نام", sortable: true },
        { key: "email", label: "ایمیل", sortable: true },
        { key: "branch", label: "شعبه", sortable: true },
        { key: "type", label: "نوع", sortable: true },
        { key: "actionsMerchantsUsers", label: "عملیات" },
      ],
      items: this.$route.params.users,
      name: this.$route.params.name,
      Id: this.$route.params.id,
    };
  },
};
</script>

