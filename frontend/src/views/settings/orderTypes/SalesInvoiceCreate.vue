<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <b-card title="تعریف نوع برگشت از فروش">
          <div class="card-body">
            <div class="form-group">
              <label for="title">نام</label>
              <b-form-input autocomplete="off" type="text" id="title" v-model="title" />
            </div>
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
          <div class="text-right">
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="success"
            >
              ذخیره
            </b-button>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
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