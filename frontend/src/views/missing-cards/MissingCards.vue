<template>
  <div>
  <BsTable :items='items' :fields='fields' :perPage='perPage' :pageOptions='pageOptions' />
  </div>
</template>

<script>
import BsTable from '@/global/table/BsTable.vue'
export default {
  components: {
    BsTable,
  },
  data() {
    return {
      active: false,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "نمایش بیشتر" }],

      fields: [
        { key: "name", label: "نام", sortable: true },
        { key: "customerCode", label: "کد مشتری", sortable: true },
        { key: "cardNumber", label: "شماره کارت", sortable: true },
        { key: "status", label: "وضعیت", sortable: true },
        { key: "date", label: "تاریخ", sortable: true },
        { key: "instead", label: "کارت جایگزین شده", sortable: true },
        { key: "creator", label: "ایجاد کننده", sortable: true },
        { key: "editor", label: "ویرایش کننده", sortable: true },
        { key: "editDate", label: "تاریخ ویرایش", sortable: true },
      ],
      items: [
        {
            name:'موسی زارعی',
            customerCode:'1234',
            cardNumber:'625478945620311',
            status:1,
            date:'06/03/1399',
            instead:'6221061248759852',
            creator:'احمد غربی',
            editor:'حسین متقی',
            editDate:'05/04/1400',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/bootstrap-extended/include";
@import "~@core/scss/base/components/variables-dark";

.card-company-table ::v-deep td .b-avatar.badge-light-company {
  .dark-layout & {
    background: $theme-dark-body-bg !important;
  }
}
</style>
