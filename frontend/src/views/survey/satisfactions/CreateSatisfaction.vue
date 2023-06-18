<template>
    <div>
        <h4 class="mb-2">ایجاد دلیل نظر سنجی {{title}}</h4>
        <BCard>
          <div class="row">
            <div class="col-md-6 form-group">
              <label for="" class="font-weight-bold">عنوان</label>
              <b-form-input autocomplete="off"
                class="d-inline-block mr-1"
                placeholder="عنوان"
              />
            </div>
            <div class="col-md-6 form-group">
              <label>نوع دلیل</label>
              <v-select
                dir="rtl"
                id="per-page-select"
                :options="options"
                size="sm"
                :clearable="false"
                class="per-page-selector"
              placeholder="انتخاب کنید.."
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
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
                title: this.$route.params.title,
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