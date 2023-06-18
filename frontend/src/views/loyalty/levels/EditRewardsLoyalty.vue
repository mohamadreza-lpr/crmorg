<template>
  <div>
    <BCard bg-variant="light-primary">
      <div>
        <div class="row">
          <div class="col-6">
            <h4>سطح {{ data.title }}</h4>
          </div>
          <div class="col-6 text-right">
            <h4>پاداش های مشتریان {{ data.title }}</h4>
          </div>
        </div>
        <h5>
          شما می توانید در این بخش میزان پاداش مورد نظر خود را برای مشتریان
          {{ data.title }} تعیین کنید.
        </h5>
      </div>
    </BCard>
    <div class="row">
      <div class="col-md-6">
        <div class="card card-body form-group">
          <div class="price-slider">
            <h4>تخفیف</h4>
            <p>درصدی از مبلغ کل فاکتور</p>
            <VueSlider
              tooltip="always"
              class="form-group"
              v-model="data.off"
              direction="rtl"
            />
            <b-form-checkbox v-model="selected" value="B">
              فعال
            </b-form-checkbox>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card card-body form-group">
          <h4>اعتبار</h4>
          <p>درصدی از مبلغ کل فاکتور</p>
          <VueSlider
            tooltip="always"
            class="form-group"
            v-model="data.credit"
            direction="rtl"
          />
          <b-form-checkbox v-model="selected1" value="B">
            فعال
          </b-form-checkbox>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-body form-group">
          <h4>لیست محصول</h4>
          <v-select
          dir='rtl'

            class="form-group"
            id="per-page-select"
            v-model="product"
            :options="data.products"
            size="sm"
            :clearable="false"
          />
          <b-form-checkbox v-model="selected2" value="B">
            فعال
          </b-form-checkbox>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-body form-group">
          <h4>کوپن تخفیف</h4>
          <v-select
          dir='rtl'

            class="form-group"
            id="per-page-select"
            v-model="coupons"
            :options="data.coupons"
            size="sm"
            :clearable="false"
          />
          <b-form-checkbox v-model="selected3" value="B">
            فعال
          </b-form-checkbox>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-body form-group">
          <h4>امتیاز</h4>
          <v-select
          dir='rtl'

            class="form-group"
            id="per-page-select"
            v-model="data.level"
            :options="data.point"
            size="sm"
            :clearable="false"
          />
          <b-form-checkbox v-model="selected4" value="B">
            فعال
          </b-form-checkbox>
        </div>
      </div>
    </div>
    <div class="text-right">
      <b-button variant="primary">
        <span class="text-nowrap">ذخیره</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import "vue-slider-component/theme/antd.css";
import VueSlider from "vue-slider-component";
import vSelect from "vue-select";

import {
  BFormCheckbox,
  BInputGroupAppend,
  BButton,
  BFormInput,
  BInputGroup,
  BFormGroup,
  BFormSelect,
  BCol,
  BRow,
  BCard,
  BTable,
  BAvatar,
  BImg,
  BDropdown,
  BDropdownItem,
  BPagination,
  BCardText,
  BDropdownText,
} from "bootstrap-vue";

export default {
  components: {
    vSelect,
    BFormCheckbox,
    VueSlider,
    BButton,
    BInputGroupAppend,
    BInputGroup,
    BFormInput,
    BFormSelect,
    BFormGroup,
    BDropdownText,
    BPagination,
    BDropdown,
    BDropdownItem,
    BCardText,
    BCard,
    BTable,
    BAvatar,
    BImg,
    BRow,
    BCol,
  },
  data() {
    return {
      product: "لطفا یک گزینه انتخاب نمایید",
      coupons: "لطفا یک گزینه انتخاب نمایید",
      selected: "",
      selected1: "",
      selected2: "",
      selected3: "",
      selected4: "",
      data: this.$route.params.data,
    };
  },
};
</script> 

<style>
.vue-slider-dot-tooltip-inner {
  font-size: 9px;
  padding: 1px 3px !important;
  border-radius: 5px;
  transform: unset !important;
}
</style>
