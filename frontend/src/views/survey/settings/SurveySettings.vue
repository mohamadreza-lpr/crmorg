<template>
    <div>
        <b-alert
        variant="primary"
        show class='form-group'
        >
        <div class="alert-body">
            <h3 class='text-primary'>شاخص NPS</h3>
            <p>فرض کنید از هر یک از مشتریان خود بپرسید: «آیا شما حاضر هستید ما را به فرد یا سازمان دیگری معرفی کنید؟» همینطور فرض کنید که آنها در پاسخ بتوانند عددی بین صفر تا ده را مشخص کنند. عدد صفر به معنای این است که چنین تمایلی وجود ندارد و بالاتر رفتن عدد، به معنای وجود تمایل است. عدد ده نشان می‌دهد که پاسخ‌دهنده قطعاً حاضر است شما را به دیگران معرفی نماید</p>
        </div>
        </b-alert>
            <h4>تنظیمات</h4>
    <b-card>
        <b-form-group
          label="سوال"
          label-cols-md="3"
        >
          <b-form-input autocomplete="off"
          v-model='data.questions[0].question'
            placeholder="سوال.."
          />
          <b-form-checkbox class="mt-2"
            value="true"
            v-model='data.active'
          >
            فعال
          </b-form-checkbox>
        </b-form-group>
        <div class="text-right">
             <b-button
          type="submit"
          variant="primary"
          class="mr-1"
        >
          ویرایش
        </b-button>
        <b-button
          type="reset"
          variant="outline-secondary"
        >
          پاک کردن فرم
        </b-button>
        </div>
    </b-card>
    </div>
</template>

<script>
import { BAlert, BCard, BButton, BForm, BInputGroup, BFormGroup, BFormInput, BFormCheckbox,} from 'bootstrap-vue'
    export default {
        components :{
            BAlert, BCard, BButton, BForm, BInputGroup,BFormGroup,  BFormInput, BFormCheckbox,
        },
        data(){
            return {
                data:this.$route.params.data
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>