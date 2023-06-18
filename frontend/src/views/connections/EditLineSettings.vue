<template>
  <div>
    <h4>ویرایش سطح {{ data.title }}</h4>
    <b-card>
      <b-form @submit.prevent>
        <b-row>
          <b-col md="6">
            <b-form-group label="عنوان" label-for="title">
              <b-form-input autocomplete="off"
                v-model="data.title"
                id="title"
                placeholder="عنوان"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <label for="demo-sb">شماره خط</label>
              <b-form-input autocomplete="off"
                v-model="data.number"
                id="title"
                placeholder="شماره خط"
                type='number'
              />
          </b-col>
          <b-col md="6">
            <b-form-group label="نوع خط" label-for="minPoint">
                  <v-select
                    placeholder="انتخاب کنید.."
                    dir="rtl"
                    id="introduced"
                    v-model="data.type"
                    :options="options"
                    size="sm"
                    clearable
                    class="per-page-selector"
                    label="title"
                  >
                    <template #no-options>
                      رکوردی برای نمایش وجود ندارد
                    </template>
                  </v-select>
            </b-form-group>
          </b-col>
        <b-col md="6">
            <b-form-group label="کلید API">
              <b-form-input autocomplete="off"
                v-model="data.api"
                placeholder="کلید API"
              />
            </b-form-group>
          </b-col>
                  <b-col md="6">
            <b-form-group label="کد امنیتی">
              <b-form-input autocomplete="off"
                v-model="data.code"
                placeholder="کد امنیتی"
                type='number'
              />
            </b-form-group>
          </b-col>
                  <b-col md="6">
            <b-form-group label="نام کاربری">
              <b-form-input autocomplete="off"
                v-model="data.userName"
                placeholder="نام کاربری"
              />
            </b-form-group>
          </b-col>
                            <b-col md="6">
            <b-form-group label="رمز عبور">
              <b-form-input autocomplete="off"
                v-model="data.password"
                placeholder="رمز عبور"
                type='number'
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="امکانات" label-for="desc">
                <b-form-group>
                    <b-form-checkbox v-model='data.service' value="true">
                        سرویس اعتبار سنجی
                    </b-form-checkbox>
                </b-form-group>
                <b-form-group>
                <b-form-checkbox v-model='data.default' value="true">
                    خط پیش فرض 
                </b-form-checkbox>
                </b-form-group>
                <b-form-group>

                <b-form-checkbox v-model='data.active' value="true">
                   فعال
                </b-form-checkbox>
                </b-form-group>
            </b-form-group>

          </b-col>



          <!-- submit and reset -->
          <b-col>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
            >
              ویرایش
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
            >
              پاک کردن فرم
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import vSelect from "vue-select";

import Ripple from "vue-ripple-directive";
import {
  BFormTextarea,
  BCard,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
  BRow,
  BCol,
  BFormSpinbutton,
} from "bootstrap-vue";
export default {
  data() {
    return {
      data: this.$route.params.data,
      message: "",
      options:[
          'سامانه پیامک انبوه SMS.IR',
          'سامانه پیامک سفید SMS.IR',
          'ماژول باشگاه مشتریان SMS.IR',
          'سامانه پیام کوتاه قاصدک',
          'سامانه پیام کوتاه SMSONLINE.IR',
          'سامانه پیام کوتاه SMS1000.IR',
          'سامانه پیام کوتاه تلفن ثابت ISMS.IR',
      ]
    };
  },
  components: {
    vSelect,
    BFormTextarea,
    BFormSpinbutton,
    BCard,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
};
</script>

<style lang="scss" scoped>
</style>