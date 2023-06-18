<template>
    <div>
        <h4 class="mb-2">ویرایش قانون ارزیابی {{data.rule}}</h4>
        <BCard>
          <div class="row">
            <div class="col-md-6 form-group">
              <label for="" class="font-weight-bold">عنوان</label>
              <b-form-input autocomplete="off"
              v-model='data.rule'
                class="d-inline-block mr-1"
                placeholder="عنوان"
              />
            </div>
            <div class="col-md-6 form-group">
              <label for="" class="font-weight-bold">رنگ</label>
              <b-col md='4' class="mx-0 px-0">
              <b-form-input autocomplete="off"
              v-model='data.color' type='color' id="color" placeholder="رنگ" />

              </b-col>
            </div>
            <div class="col-md-6 form-group">
              <label for="" class="font-weight-bold">از</label>
              <b-form-input autocomplete="off"
              v-model='data.from'
                class="d-inline-block mr-1"
                placeholder="از"
                type='number'
              />
            </div>
            <div class="col-md-6 form-group">
              <label for="" class="font-weight-bold">تا</label>
              <b-form-input autocomplete="off"
              v-model='data.to'
                class="d-inline-block mr-1"
                placeholder="تا"
                type='number'
              />
            </div>
            <div class="col-12 form-group">
              <label for="" class="font-weight-bold">توضیحات</label>
              <b-form-textarea v-model='data.desc' id="description" placeholder="توضیحات" />
            </div>
          </div>
          <div class="text-right">
            <b-button variant="primary">
              <span class="text-nowrap">ذخیره</span>
            </b-button>
          </div>
        </BCard>
    </div>
</template>

<script>
import vSelect from "vue-select";

import {
  BFormCheckbox,
  BCard,
  BButton,
  BInputGroupAppend,
  BInputGroup,
  BFormInput,
  BFormSelect,
  BFormGroup,
  BCardText,
  BFormTextarea,
  BRow,
  BCol,
} from "bootstrap-vue";
    export default {
        data(){
            return {
                data: this.$route.params.data,
                options:['نمونه 5','نمونه 4','نمونه 3','نمونه 2','نمونه 1',]
            }
        },
        components :{
            vSelect,
              BFormCheckbox,
  BCard,
  BButton,
  BInputGroupAppend,
  BInputGroup,
  BFormInput,
  BFormSelect,
  BFormGroup,
  BCardText,
  BFormTextarea,
  BRow,
  BCol,
        },
    }
</script>

<style lang="scss" scoped>

</style>