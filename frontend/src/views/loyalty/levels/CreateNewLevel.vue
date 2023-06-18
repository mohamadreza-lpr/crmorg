<template>
  <div>
    <h4>تعریف سطح جدید</h4>
    <b-card>
      <b-form @submit.prevent>
        <b-row>
          <b-col md="6">
            <b-form-group label="عنوان" label-for="title">
              <b-form-input autocomplete="off"
                v-model="title"
                id="title"
                placeholder="First Name"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <label for="demo-sb">اولویت</label>
            <b-form-spinbutton
              id="demo-sb"
              v-model="order"
              min="1"
              max="100"
            />
          </b-col>
          <b-col md="6">
            <b-form-group label="از امتیاز" label-for="minPoint">
              <b-form-input autocomplete="off"
                id="minPoint"
                v-model="min"
                type="number"
                placeholder="حداقل امتیاز"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="تا امتیاز" label-for="minPoint">
              <b-form-input autocomplete="off"
                id="maxPoint"
                v-model="max"
                type="number"
                placeholder="حداکثر امتیاز"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="توضیحات" label-for="desc">
            
              <b-form-textarea
                v-model="desc"
                id="desc"
                placeholder="برای افزودن متغیر از دکمه های بالا استفاده نمایید"
                rows="3"
                no-resize
              />
            </b-form-group>

          </b-col>

          <!-- submit and reset -->
          <b-col>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
            >
              ذخیره
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
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
import Ripple from "vue-ripple-directive";
import {
  BFormTextarea,
  BCard,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
  BRow,
  BCol,
  BFormSpinbutton,
} from "bootstrap-vue";
export default {
  data() {
    return {
      data: this.$route.params.data,
      title: "",
      order: 0,
      min: "",
      max: "",
      desc: "",
    };
  },
  components: {
    BFormTextarea,
    BFormSpinbutton,
    BCard,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
};
</script>

<style lang="scss" scoped>
</style>