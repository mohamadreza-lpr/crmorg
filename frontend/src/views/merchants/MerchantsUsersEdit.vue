<template>
  <div>
    <MerchantsAccess />
    <h4>ویرایش کاربر {{ data.firstName }} {{data.lastName}}</h4>

    <BCard>
      <div class="row">
        <div class="col-md-6 form-group">
          <label for="" class="font-weight-bold">نام</label>
          <b-form-input autocomplete="off"
            v-model="data.firstName"
            class="d-inline-block mr-1"
            placeholder="نام"
          />
        </div>
        <div class="col-md-6 form-group">
          <label for="" class="font-weight-bold">نام خانوادگی</label>
          <b-form-input autocomplete="off"
            v-model="data.lastName"
            class="d-inline-block mr-1"
            placeholder="نام خانوادگی"
          /></div>  
      </div>  
      <div class="text-right">
        <b-button
          variant="success">
          <span class="text-nowrap">ذخیره</span>
        </b-button>
      </div>
    </BCard>
  </div>
</template>

<script>
import MerchantsAccess from "./components/MerchantsAccess.vue"

import {
  BCard,
  BInputGroupAppend,
  BButton,
  BFormInput,
  BInputGroup,
  BFormGroup,
  BCardText,
} from "bootstrap-vue";

export default {
  components: {
    MerchantsAccess,
    BButton,
    BInputGroupAppend,
    BInputGroup,
    BFormInput,
    BFormGroup,
    BCardText,
    BCard,
  },
  data() {
    return {
      data: this.$route.params.users,
    };
  },
};
</script>