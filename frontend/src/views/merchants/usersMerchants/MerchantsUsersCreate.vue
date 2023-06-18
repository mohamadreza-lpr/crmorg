<template>
  <div>
    <h4>افزودن کاربر</h4>

    <BCard>
      <div class="row">
        <div class="col-md-6 form-group">
          <label for="" class="font-weight-bold">نام</label>
          <b-form-input autocomplete="off"
            v-model="firstName"
            class="d-inline-block mr-1"
            placeholder="نام"
          />
        </div>
        <div class="col-md-6 form-group">
          <label for="" class="font-weight-bold">نام خانوادگی</label>
          <b-form-input autocomplete="off"
            v-model="lastName"
            class="d-inline-block mr-1"
            placeholder="نام خانوادگی"
          /></div>  
        <div class="col-md-6 form-group">
          <label for="" class="font-weight-bold">شماره موبایل</label>
          <b-form-input autocomplete="off"
            v-model="userName"
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
            v-model="email"
            class="d-inline-block mr-1"
            placeholder="ایمیل"
          /></div>  
        <div class="col-md-6 form-group">
          <label for="" class="font-weight-bold">شعبه</label>
          <v-select
          dir='rtl'

              id="branch"
              v-model="branch"
              :options="optionsBranch"
              size="sm"
              :clearable="false"
            /></div>  
      </div>  
      <div class="text-right">
        <b-button
          variant="success">
          <span class="text-nowrap">افزودن کاربر</span>
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
      firstName:null,
      lastName:null,
      userName:null,
      email:null,
      branch:null,
    };
  },
};
</script>