<template>
  <div>
    <b-row>
      <b-col lg="12" md="12" xl="12" sm="12" xs="12">
          <UserTables />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { BRow, BCol } from "bootstrap-vue";

import UserTables from './UserTables'


export default {
  components: {
    BRow,
    BCol,
    UserTables,

  },
};
</script>