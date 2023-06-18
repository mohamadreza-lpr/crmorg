<template>
  <div>
      <b-sidebar
    id="add-new-user-sidebar"
    :visible="active1"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    left
  >
    <template #default="{ hide }">
    <div class="card">
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New User
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>
      <b-form>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <b-form-group label="نام" label-for="firstName">
                <b-form-input autocomplete="off" id="firstName" v-model="firstName" />
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group label="نام خانوادگی" label-for="lastName">
                <b-form-input autocomplete="off" id="lastName" v-model="lastName" />
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group label="ایمیل" label-for="email">
                <b-form-input autocomplete="off" id="email" v-model="email" />
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group label="شماره موبایل" label-for="mobileNumber">
                <b-form-input autocomplete="off" type='number' id="mobileNumber" v-model="mobileNumber" />
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group label="رمزعبور" label-for="password">
                <b-form-input autocomplete="off" id="password" v-model="password" />
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group label="تکرار رمزعبور" label-for="confirmPassword">
                <b-form-input autocomplete="off" id="confirmPassword" v-model="confirmPassword" />
              </b-form-group>
            </div>
          </div>
        </div>
        <div class="card-footer text-right">
            <b-button variant="outline-secondary" type="reset"> ریست </b-button>
            <b-button variant="primary" class="mx-2">
            افزودن
            </b-button>
                        <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              انصراف
            </b-button>
        </div>
      </b-form>
    </div>
    </template>
        </b-sidebar>
  </div>
</template>
<script>
import {
  BButton,
  BMedia,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BSidebar,
  BFormCheckbox,
} from "bootstrap-vue";
export default {
  components: {
      BSidebar,
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
  },
  props: {
    active : Boolean 
},
  watch :{
      active:function(newVal) {
          this.active1= newVal
      }
  },
  data() {
      return {
          active1 : active,
          firstName : '',
          lastName : '',
          mobileNumber : '',
          email : '',
          password : '',
          confirmPassword : '',
      }
  }
};
</script>