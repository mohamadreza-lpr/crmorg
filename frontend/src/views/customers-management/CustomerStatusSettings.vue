<template>
  <div>
    <h4>ایجاد برچسب</h4>
    <b-card>
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group label="نوع بازه زمانی" label-for="type" label-cols-md="3">
                <v-select
                dir="rtl"
                :options="types"
                size="sm"
                clearable
                class="per-page-selector" 
                placeholder="نوع بازه زمانی"
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="بازه زمانی فعلی" label-for="time" label-cols-md="3">
              <b-form-input autocomplete="off"
                placeholder="بازه زمانی فعلی"
                type="number"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="بازه زمانی قبلی" label-for="time" label-cols-md="3">
              <b-form-input autocomplete="off"
                placeholder="بازه زمانی قبلی"
                type="number"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="نوع آستانه" label-for="limit" label-cols-md="3">
                <v-select
                dir="rtl"
                :options="types"
                size="sm"
                clearable
                class="per-page-selector" 
                placeholder="نوع آستانه"
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
            </b-form-group>
          </b-col>
                    <b-col cols="12">
            <b-form-group label="تعداد فاکتور های فروش" label-for="count" label-cols-md="3">
              <b-form-input autocomplete="off"
                placeholder="تعداد فاکتور های فروش"
                type="number"
              />
            </b-form-group>
          </b-col>
                    <b-col cols="12">
            <b-form-group label="حجم ریالی خرید" label-for="time" label-cols-md="3">
              <b-form-input autocomplete="off"
                placeholder="حجم ریالی خرید"
                type="number"
              />
            </b-form-group>
          </b-col>
          <!-- submit and reset -->
          <b-col offset-md="3">
            <b-button
              type="submit"
              variant="primary"
              class="mr-1"
            >
              ذخیره
            </b-button>
            <b-button
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

import {
  BCard,
  BFormGroup,
  BFormInput,
  BForm,
  BRow,
  BCol,
  BButton,
} from "bootstrap-vue";
export default {
  components: {
    vSelect,

    BCard,
    BFormGroup,
    BFormInput,
    BForm,
    BRow,
    BCol,
    BButton,
  },
  data() {
      return {
          types:['نمونه اول','نمونه دوم ','نمونه سوم']
      }
  }
};
</script>

<style lang="scss" scoped>
</style>