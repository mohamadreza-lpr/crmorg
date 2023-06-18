<template>
  <div>
    <h4>تنظیمات مشتریان</h4>
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <h6 class="mb-1">محتوای پیامک در هنگام تغییر شماره مشتری :</h6>
          <QuillEditor />
        </div>
        <div class="form-group">
          <h6 class="mb-1">نوع باشگاه</h6>
          <b-form-input autocomplete="off" id="bussinesName" placeholder="نوع باشگاه" />
        </div>

        <div class="form-group">
          <h6 class="mb-1">متن پیام خطای عضویت در مدل Close Club</h6>
          <QuillEditor />
        </div>


        <div class="row">
          <div class="col-md-6 form-group">
            <label>نوع کد مشتری</label>
            <v-select
              dir="rtl"
              :options="options"
              size="sm"
              clearable
              class="per-page-selector"
              placeholder='انتخاب کنید..'
            >
              <template #no-options> رکوردی برای نمایش وجود ندارد </template>
            </v-select>
          </div>
          <div class="col-md-6 form-group">
            <label>نوع شماره کارت</label>
            <v-select
              dir="rtl"
              :options="options"
              size="sm"
              clearable
              class="per-page-selector"
              placeholder='انتخاب کنید..'
            >
              <template #no-options> رکوردی برای نمایش وجود ندارد </template>
            </v-select>
          </div>
          <div class="col-md-6 form-group">
            <label>نوع کد معرف</label>
            <v-select
              dir="rtl"
              :options="options"
              size="sm"
              clearable
              class="per-page-selector"
              placeholder='انتخاب کنید..'
            >
              <template #no-options> رکوردی برای نمایش وجود ندارد </template>
            </v-select>
          </div>
          <div class="col-md-6 form-group">
            <label>استان پیش فرض</label>
            <v-select
              dir="rtl"
              :options="options"
              size="sm"
              clearable
              class="per-page-selector"
              placeholder='انتخاب کنید..'
            >
              <template #no-options> رکوردی برای نمایش وجود ندارد </template>
            </v-select>
          </div>
          <div class="col-md-6 form-group">
            <label>شهر پیش فرض</label>
            <v-select
              dir="rtl"
              :options="options"
              size="sm"
              clearable
              class="per-page-selector"
              placeholder='انتخاب کنید..'
            >
              <template #no-options> رکوردی برای نمایش وجود ندارد </template>
            </v-select>
          </div>
          <div class="col-12">
                <div class="form-group">
              <h6 class="mb-1">متن انتخاب برچسب</h6>
              <b-form-input autocomplete="off" id="bussinesName" placeholder="متن انتخاب برچسب" />
            </div>

          </div>
        </div>

        <div class="form-group">
          <b-form-checkbox value="true">
            نمایش کد ملی در هنگام تکمیل اطلاعات عضویت
          </b-form-checkbox>
        </div>
        <div class="form-group">
          <b-form-checkbox value="true">
            نمایش کد پرسنلی در هنگام تکمیل اطلاعات عضویت
          </b-form-checkbox>
        </div>
        <div class="form-group">
          <b-form-checkbox value="true">
            الزام به ورود کد ملی در هنگام تکمیل اطلاعات عضویت
          </b-form-checkbox>
        </div>
        <div class="form-group">
          <b-form-checkbox value="true">
            الزام به ورود کد پرسنلی در هنگام تکمیل اطلاعات عضویت
          </b-form-checkbox>
        </div>
        <div class="form-group">
          <b-form-checkbox value="true">
            الزام به ورود کد ملی یا کد پرسنلی در هنگام تکمیل اطلاعات عضویت
          </b-form-checkbox>
        </div>

        <div>
          <BButton variant="primary">ذخیره</BButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";

import QuillEditor from "@/global/QuillEditor.vue";
import {
  BFormInput,
  BFormGroup,
  BFormFile,
  BFormCheckbox,
  BButton,
} from "bootstrap-vue";
export default {
  components: {
    vSelect,
    BButton,
    BFormCheckbox,
    BFormFile,
    QuillEditor,
    BFormInput,
    BFormGroup,
  },
  data() {
    return {
      options:['تست5','تست4','تست3','تست2','تست1',]
    };
  },
};
</script>
<style lang="scss">
</style>