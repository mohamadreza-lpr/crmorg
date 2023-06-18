<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">
                    تنظیمات نمایش
                </h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <h6 class="mb-1">نام تجاری</h6>
                            <b-form-input autocomplete="off"
                                id="bussinesName"
                                placeholder="نام تجاری"
                            />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <h6 class="mb-1">وبسایت</h6>
                            <b-form-input autocomplete="off"
                                id="website"
                                placeholder="آدرس وبسایت مثل : https://elanus.co"
                            />
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <h6 class="mb-1">منوی پایین صفحه پنل مشتریان</h6>
                    <QuillEditor />
                </div>
                
                <div class="form-group">
                    <h6 class="mb-1">منوی پایین صفحه پنل مشتریان</h6>
                    <QuillEditor />
                </div>
                
                <div class="form-group">
                    <h6 class="mb-1">متن انتهای صفحه پنل مدیریت</h6>
                    <QuillEditor />
                </div>
                

                <div class="row">
                    <div class="form-group col-md-6">
                        <h6 class="mb-1">لوگوی اصلی</h6>
                        <b-form-file browse-text='انتخاب فایل' placeholder="برای انتخاب عکس کلیک کنید" id="file-default"></b-form-file>
                    </div>
                    
                    <div class="form-group col-md-6">
                        <h6 class="mb-1">لوگوی کوچک</h6>
                        <b-form-file browse-text='انتخاب فایل' placeholder="برای انتخاب عکس کلیک کنید" id="file-default"></b-form-file>
                    </div>
                    
                    <div class="form-group col-md-6">
                        <h6 class="mb-1">تصویر پشت زمینه صفحات</h6>
                        <b-form-file browse-text='انتخاب فایل' placeholder="برای انتخاب عکس کلیک کنید" id="file-default"></b-form-file>
                    </div>
                    <div class="form-group col-md-6">
                        <h6 class="mb-1">رنگ سازمانی</h6>
                        <b-form-input autocomplete="off" 
                            type='color'
                            id="color"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <b-form-checkbox
                        v-model="selected"
                        value="B"
                    > 
                        نمایش نام شعبه مشتری در پنل مشتریان
                    </b-form-checkbox>
                </div>

                <div class="text-right">
                    <BButton variant='primary'>ذخیره</BButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QuillEditor from '@/global/QuillEditor.vue'
import { BFormInput, BFormGroup,BFormFile,BFormCheckbox,BButton } from 'bootstrap-vue'
export default {
    components: {
        BButton,
        BFormCheckbox,
        BFormFile,
        QuillEditor,
        BFormInput,
        BFormGroup,
    },
    data(){
        return {
            selected: ''

        }
    }
}
</script>
<style lang="scss">


</style>