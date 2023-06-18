<template>
  <div>
    <MerchantsAccess />
    <BCard bg-variant='light-primary'>
    <div class="">
        <div class="row">
          <div class="col-6">
            <h4>شعبه {{name}}</h4>
          </div>
          <div class="col-6 text-right">
            <h4>پاداش های مشتریان {{ data.title }}</h4>
          </div>
        </div>

    </div>
    </BCard>
    <div class="row">
      <div class="col-md-4">
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
            <div class="form-group">
                <b-form-checkbox
                    v-model="selected"
                    value="B"
                > 
                    فعال
                </b-form-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-body form-group">
          <h4>صندوق</h4>
          <p>درصدی از مبلغ کل فاکتور</p>
            <VueSlider
            tooltip="always"
            class="form-group"
              v-model="data.fund"
              direction="rtl"
            />
            <div class="form-group">
                <b-form-checkbox
                    v-model="selected1"
                    value="B"
                > 
                    فعال
                </b-form-checkbox>
            </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-body form-group">
          <h4>اعتبار</h4>
          <p>درصدی از مبلغ کل فاکتور</p>
            <VueSlider
            tooltip="always"
            class="form-group"
              v-model="data.credit"
              direction="rtl"
            />
            <div class="form-group">
                <b-form-checkbox
                    v-model="selected2"
                    value="B"
                > 
                    فعال
                </b-form-checkbox>
            </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-body form-group">
          <h4>لیست محصول</h4>
          <v-select
          dir='rtl'

            id="per-page-select"
            v-model="product"
            :options="options"
            size="sm"
            :clearable="false"
        />
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-body form-group">
          <h4>کوپن تخفیف</h4>
          <v-select
          dir='rtl'

            id="per-page-select"
            v-model="coupons"
            :options="options1"
            size="sm"
            :clearable="false"
        />
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-body form-group">
          <h4>امتیاز</h4>
          <v-select
          dir='rtl'

            id="per-page-select"
            v-model="data.level"
            :options="options2"
            size="sm"
            :clearable="false"
        />
        </div>
      </div>
    </div>
    <div class="text-right">
      <b-button
        variant="success">
        <span class="text-nowrap">ذخیره</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import 'vue-slider-component/theme/antd.css'
import MerchantsAccess from "./components/MerchantsAccess.vue"
import VueSlider from 'vue-slider-component'
import vSelect from 'vue-select'

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
    MerchantsAccess,
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
      product: 'لطفا یک گزینه انتخاب نمایید',
      coupons: 'لطفا یک گزینه انتخاب نمایید',
      options : [
        { label: 'محصول1', value: '1' },
        { label: 'محصول2', value: '2' },
        { label: 'محصول3', value: '3' },
        { label: 'محصول4', value: '4' },
        { label: 'محصول5', value: '5' },
      ],
      options1 : [
        { label: '1کوپن', value: '1' },
        { label: 'کوپن2', value: '2' },
        { label: 'کوپن3', value: '3' },
        { label: 'کوپن4', value: '4' },
        { label: 'کوپن5', value: '5' },
      ],
      options2 : [
        { label: 'امتیاز  1', value: '1' },
        { label: 'امتیاز  2', value: '2' },
        { label: 'امتیاز  3', value: '3' },
        { label: 'امتیاز  4', value: '4' },
        { label: 'امتیاز  5', value: '5' },
      ],
      selected:'',
      selected1:'',
      selected2:'',
      selected3:'',
      selected4:'',
      selected5:'',
      data: this.$route.params.rewards,
      name: this.$route.params.name,

    };
  },
};
</script> 

<style>
.vue-slider-dot-tooltip-inner {
  font-size: 9px;
  padding: 1px 3px!important;
  border-radius: 5px;
  transform: unset!important;;
}
</style>
