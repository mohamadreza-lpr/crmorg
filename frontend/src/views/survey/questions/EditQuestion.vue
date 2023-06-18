<template>
    <div>
        <h4 class="mb-2">ویرایش سوال نظر سنجی</h4>
        <BCard>
          <div class="row">
            <div class="col-md-6 form-group">
              <label for="" class="font-weight-bold">عنوان</label>
              <b-form-input autocomplete="off"
                v-model='data.question'
                class="d-inline-block mr-1"
                placeholder="عنوان"
              />
            </div>
            <div class="col-md-6 form-group">
              <label>نوع سوال</label>
              <v-select
              v-model='data.type'
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
            <div class="col-md-6 form-group">
              <label for="" class="font-weight-bold">اولویت نمایش</label>
              <b-form-input autocomplete="off"
              v-model='data.order'
                class="d-inline-block mr-1"
                placeholder="اولویت نمایش"
                type='number'
              />
            </div>
            <div class="col-md-6 form-group">
              <label for="" class="font-weight-bold">وزن</label>
              <b-form-input autocomplete="off"
              v-model='data.weight'
                class="d-inline-block mr-1"
                placeholder="وزن"
                type='number'
              />
            </div>

            <div class="col-md-6 form-group">
              <label>انتخاب رضایتمندی ها</label>
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
            <div class="col-md-6 form-group">
              <label>انتخاب نارضایتمندی ها</label>
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
            <div class="col-md-6 form-group">
              <label>انتخاب شعبه ها</label>
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
            <div class="col-12 form-group">
              <div class="form-group">
                <b-form-checkbox value="true">
                  فعال
                </b-form-checkbox>
              </div>
            </div>
          </div>
          <div class="text-right">
            <b-button variant="warning">
              <span class="text-nowrap">ویرایش</span>
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