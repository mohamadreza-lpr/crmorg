<template>
  <div>
    <h4>ورود اطلاعات فاکتورهای فروش</h4>
    <b-card>
    <b-alert 
      variant="danger"
      class="form-group"
      show
    >
      <div class="alert-body">
        <feather-icon
          icon="InfoIcon"
          class="mr-50"
        />
        کاربر گرامی، توجه داشته باشید که شما فقط قادر به افزودن فایلهایی با پسوند
        <span class="text-danger font-weight-bold">xlsx</span>
        و
        <span class="text-danger font-weight-bold">xls</span>
        هستید.
      </div>
    </b-alert>
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group label="قایلهای انتخابی شما" label-for="title" label-cols-md="3">
               <b-form-file accept=".xlsx, .xls" browse-text='مرور' placeholder='هیچ فایلی انتخاب نشده است' multiple>
                    <template
                    slot="file-name"
                    slot-scope="{ names }"
                    >
                    <b-badge class="mr-1" v-for="i in names.length" :key="i.index" variant="primary">
                        <span v-if='i<4'>{{ names[i] }}</span>
                    </b-badge>
                    <b-badge
                        v-if="names.length > 3"
                        variant="dark"
                    >
                        + {{ names.length - 1 }} فایل دیگر
                    </b-badge>
                    </template>
                </b-form-file>
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
import {
  BCard,
  BFormGroup,
 BFormFile, BBadge ,
  BForm,
  BRow,
  BCol,
  BButton,
  BAlert,
} from "bootstrap-vue";
export default {
  components: {
    BCard,
    BAlert,
    BFormGroup,
 BFormFile, BBadge ,
    BForm,
    BRow,
    BCol,
    BButton,
  },
};
</script>

<style lang="scss" scoped>
</style>