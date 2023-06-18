<template>
  <div>
    <h4>ویرایش کاربر</h4>

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
        <div class="col-md-6 form-group">
          <label for="" class="font-weight-bold">شماره موبایل</label>
          <b-form-input autocomplete="off"
            v-model="data.userName"
            class="d-inline-block mr-1"
            placeholder="شماره موبایل"
          />
          <span class="font-small-3 text-danger">
            شماره موبایل به عنوان نام کاربری و رمز عبور در نظر گرفته خواهد شد.لطفاً آن را به صورت صحیح و با دقت وارد نمایید.
          </span>
        </div>
        <div class="col-md-6 form-group">
          <label for="" class="font-weight-bold">ایمیل</label>
          <b-form-input autocomplete="off"
            v-model="data.email"
            class="d-inline-block mr-1"
            placeholder="ایمیل"
          /></div>  
        <div class="col-md-6 form-group">
          <label for="" class="font-weight-bold">شعبه</label>
          <v-select
          dir='rtl'
              id="branch"
              v-model="data.branch"
              :options="optionsBranch"
              size="sm"
              :clearable="false"
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
import vSelect from "vue-select";

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
    vSelect,
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
      optionsBranch:['رستوران','کافه','فست فود'],
      data: this.$route.params.user,
    };
  },
};
</script>