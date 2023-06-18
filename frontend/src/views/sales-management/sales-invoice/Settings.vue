<template>
  <div>
    <b-card title="تنظیمات فروش">
        <div class="card-body">
        <div class="form-group">
            <label for="title">قالب شماره فاکتور خودکار</label>
            <b-input-group prepend="شمارنده فاکتور">
            <b-form-input autocomplete="off" v-model="code" />
            </b-input-group>
            <span
            >شما می توانید از عبارت و
            <a class="text-primary" @click="generateCode()">کد شعبه</a> در
            قالب شماره فاکتور استفاده نمایید.</span
            >
        </div>
        <div class="form-group">
            <label for="title">واحد پول</label>
              <v-select
                placeholder="انتخاب کنید.."
                dir="rtl"
                :options="optionsSelect"
                size="sm"
                clearable
                class="per-page-selector"
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
        </div>
        <div class="form-group">
            <b-form-checkbox v-model="selected" value="B">
            تایید خودکار فاکتور برگشت از فروش
            </b-form-checkbox>
        </div>
        <div class="form-group">
            <b-form-checkbox v-model="selected1" value="A">
            عودت مبلغ فاکتور به عنوان اعتبار
            </b-form-checkbox>
        </div>
        <div class="form-group">
            <b-form-checkbox v-model="selected2" value="C">
            ابطال پاداش دریافتی فاکتور فروش
            </b-form-checkbox>
        </div>
        <div class="form-group">
            <b-form-checkbox v-model="selected3" value="D">
            فعال سازی شماره فاکتور خودکار
            </b-form-checkbox>
        </div>
        </div>
        <div>
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="primary"
        >
            ذخیره
        </b-button>
        </div>
    </b-card>
  </div>
</template>

<script>
import vSelect from "vue-select";

import {
  BFormCheckbox,
  BInputGroup,
  BFormInput,
  BMediaBody,
  BMedia,
  BMediaAside,
  BAvatar,
  BCard,
  BCardText,
  BButton,
  BRow,
  BCol,
  BImg,
  BCardBody,
  BCardTitle,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
export default {
  components: {
    vSelect,
    BFormCheckbox,
    BInputGroup,
    BFormInput,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BCard,
    BCardText,
    BButton,
    BCardBody,
    BCardTitle,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selected:null,
      selected1:null,
      selected2:null,
      selected3:null,
      title: "",
      code: "",
      optionsSelect:['نمونه اول', 'نمونه دوم']
    };
  },
  methods: {
    generateCode() {
      this.code = "#" + Math.floor(Math.random() * 10000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>