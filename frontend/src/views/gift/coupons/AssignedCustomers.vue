<template>
  <div>
    <b-card no-body>
      <!-- title and dropdown -->
      <b-card-header>
        <b-card-title><h4 class="mb-2 align-middle d-inline">کوپن تخفیف {{ items.name }}</h4></b-card-title>
        <b-button @click="$router.push({name:'gift-coupones-assignCustomers', params:{name:items.name , id:items.id}})" variant="success">
          <feather-icon class="mr-1" icon="UserPlusIcon" size="15" />
          افزودن مشتریان
        </b-button>
      </b-card-header>
    </b-card>
    
    <BsTable
      :items="items.users"
      :fields="fields"
      :perPage="perPage"
      :pageOptions="pageOptions"
    />
  </div>
</template>

<script>
import BsTable from "@/global/table/BsTable.vue";
import { BCard, BCardHeader, BCardTitle, BButton } from "bootstrap-vue";
export default {
  components: {
    BsTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BButton,
  },
  data() {
    return {
      perPage: 5,
      pageOptions: [5, 10, 15],
      filter: null,
      fields: [
        { key: "name", label: "نام مشتری", sortable: true },
        { key: "code", label: "کد مشتری", sortable: true },
        { key: "serialNumber", label: "شماره سریال", sortable: true },
        { key: "startDate", label: "تاریخ شروع", sortable: true },
        { key: "expireDate", label: "تاریخ انقضا", sortable: true },
        { key: "uses", label: "وضعیت", sortable: true },
        { key: "actionsGiftAssignedCustomers", label: "عملیات" },
      ],
      items: this.$route.params.data,
    };
  },
};
</script>
