<template>
  <div>
    <h4>ایجاد مشتری</h4>

    <b-card>
      <b-form @submit.prevent>
        <b-row>
          <b-col md="6">
            <b-form-group label="نام" label-for="firstName">
              <b-form-input autocomplete="off" id="firstName" placeholder="نام" />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="نام خانوادگی" label-for="lastName">
              <b-form-input autocomplete="off" id="lastName" placeholder="نام خانوادگی" />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="کد مشتری(شماره موبایل)"
              label-for="customerCode"
            >
              <b-form-input autocomplete="off"
                id="customerCode"
                type="number"
                placeholder="کد مشتری"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="کارت مشتری" label-for="customerCard">
              <b-form-input autocomplete="off"
                id="customerCard"
                type="number"
                placeholder="کارت مشتری"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="جنسیت" label-for="sexSelect">
              <v-select
                dir="rtl"
                id="sexSelect"
                v-model="sex"
                :options="sexx"
                size="sm"
                clearable
                class="per-page-selector"
                placeholder="انتخاب کنید.."
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="تاریخ تولد" label-for="birthday">
              <date-picker id="birthday" clearable />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="نوع سرنخ" label-for="cluesSelect">
              <v-select
                placeholder="انتخاب کنید.."
                dir="rtl"
                id="cluesSelect"
                v-model="clues"
                :options="cluess"
                size="sm"
                clearable
                class="per-page-selector"
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <label for="introduced">معرف</label>
            <b-row>
              <b-col cols="12" md="6" xl="7" lg="8" sm="12">
                <v-select
                  placeholder="انتخاب کنید.."
                  dir="rtl"
                  id="introduced"
                  v-model="introduced"
                  :options="introducedd"
                  size="sm"
                  clearable
                  class="per-page-selector"
                  label="title"
                >
                  <template #option="{ title }">
                    <feather-icon
                      icon="UserIcon"
                      size="16"
                      class="align-middle mr-50"
                    />
                    <span> {{ title }}</span>
                  </template>
                  <template #no-options>
                    رکوردی برای نمایش وجود ندارد
                  </template>
                </v-select>
              </b-col>
              <b-col
                class="d-flex justify-content-between"
                cols="12"
                md="6"
                xl="5"
                lg="4"
                sm="12"
              >
                <b-button
                  variant="outline-primary"
                  size="sm"
                  v-b-modal.modal-showCustomer
                  v-b-popover.hover.top="'مشاهده مشتری'"
                  ><feather-icon icon="UserIcon" size="13"></feather-icon
                ></b-button>
                <b-button
                  variant="outline-primary"
                  class="ml-1"
                  size="sm"
                  v-b-modal.modal-newCustomer
                  v-b-popover.hover.top="'مشتری جدید'"
                  ><feather-icon icon="UserPlusIcon" size="13"></feather-icon
                ></b-button>
                <b-button
                  variant="outline-primary"
                  class="ml-1"
                  size="sm"
                  v-b-modal.modal-lostCard
                  v-b-popover.hover.top="'کارت مفقودی'"
                  ><feather-icon icon="CreditCardIcon" size="13"></feather-icon
                ></b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-modal
            id="modal-showCustomer"
            cancel-variant="outline-secondary"
            ok-title="بستن"
            cancel-title="انصراف"
            centered
            title="قرعه کشی"
          >
            <b-form>
              <b-tabs>
                <b-tab active>
                  <template #title>
                    <feather-icon icon="UserIcon" />
                    <span>اطلاعات مشتری</span>
                  </template>
                  <b-card-text>
                    <b-form-group>
                      <h5 class="font-weight-bold">نام مشتری:</h5>
                      <h5 v-if="introduced != null">{{ introduced.title }}</h5>
                      <h5 v-else>یک معرف انتخاب نمایید</h5>
                    </b-form-group>
                    <b-form-group>
                      <h5 class="font-weight-bold">کد مشتری:</h5>
                      <h5 v-if="introduced != null">{{ introduced.code }}</h5>
                      <h5 v-else>یک معرف انتخاب نمایید</h5>
                    </b-form-group>
                  </b-card-text>
                </b-tab>
                <b-tab>
                  <template #title>
                    <feather-icon icon="CreditCardIcon" />
                    <span>کارت</span>
                  </template>
                  <b-card-text>
                    <div v-if="introduced != null">
                      <b-form-group>
                        <label for="" class="font-weight-bold"
                          >کارت مشتری</label
                        >
                        <b-input-group>
                          <b-form-input autocomplete="off"
                            v-model="confirmCustomerCode"
                            type="number"
                            placeholder="کارت مشتری"
                          />
                          <b-input-group-append>
                            <b-button
                              @click="fitCard"
                              variant="outline-primary"
                            >
                              ثبت کارت مشتری
                            </b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </div>
                    <div v-else>
                      <h5>یک معرف انتخاب نمایید</h5>
                    </div>
                  </b-card-text>
                </b-tab>
              </b-tabs>
            </b-form>
          </b-modal>
          <b-modal
            id="modal-newCustomer"
            cancel-variant="outline-secondary"
            ok-title="ذخیره"
            cancel-title="انصراف"
            centered
            title="ثبت مشتری جدید"
          >
            <b-form>
              <b-form-group>
                <b-form-input autocomplete="off" type="text" placeholder="نام"></b-form-input autocomplete="off">
              </b-form-group>
              <b-form-group>
                <b-form-input autocomplete="off"
                  type="text"
                  placeholder="نام خانوادگی"
                ></b-form-input autocomplete="off">
              </b-form-group>
              <b-form-group>
                <b-form-input autocomplete="off"
                  type="number"
                  placeholder="کد مشتری(شماره همراه)"
                ></b-form-input autocomplete="off">
              </b-form-group>
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <feather-icon icon="CreditCardIcon" />
                  </b-input-group-prepend>
                  <b-form-input autocomplete="off"
                    type="number"
                    placeholder="تخصیص کارت"
                  ></b-form-input autocomplete="off">
                </b-input-group>
              </b-form-group>
              <b-form-group>
                <v-select
                  placeholder="جنسیت"
                  class="bg-white"
                  v-model="sex"
                  dir="rtl"
                  label="title"
                  transition=""
                  :options="sexx"
                />
              </b-form-group>
              <b-form-group>
                <date-picker
                  placeholder="تاریخ تولد"
                  id="max-date-create"
                  clearable
                />
              </b-form-group>
            </b-form>
          </b-modal>
          <b-modal
            id="modal-lostCard"
            cancel-variant="outline-secondary"
            ok-title="بستن"
            cancel-title="انصراف"
            centered
            title="تخصیص کوپن"
          >
            <b-form>
              <b-form-group>
                <label>جستجوی کارت مفقودی</label>
                <v-select class="bg-white" dir="rtl" label="title">
                  <template #no-options>
                    رکوردی برای نمایش وجود ندارد
                  </template>
                </v-select>
              </b-form-group>
            </b-form>
          </b-modal>
          <!-- submit and reset -->
          <b-col cols="12">
            <b-form-group>
              <b-form-checkbox value="B">
                عدم ارسال پیام کوتاه برنامه های وفاداری
              </b-form-checkbox>
            </b-form-group>
          </b-col>
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
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

import Ripple from "vue-ripple-directive";
import {
  BTabs,
  BTab,
  BModal,
  BInputGroupAppend,
  BCardText,
  VBModal,
  VBPopover,
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
} from "bootstrap-vue";
import vSelect from "vue-select";

export default {
  data() {
    return {
      notFitYet: true,
      confirmCustomerCode: null,
      message: "",
      sexx: ["مرد", "زن"],
      sex: null,
      cluess: ["نوع مشتری پیش فرض", "نوع سرنخ پیش فرض"],
      clues: null,
      introducedd: [
        { key: 1, title: "محسن رضایی", code: "09123456789" },
        { key: 11, title: "حسین رزمی", code: "09197894563" },
      ],
      introduced: null,
    };
  },
  components: {
    BCardText,
    datePicker: VuePersianDatetimePicker,
    BModal,
    BTabs,
    BTab,
    BInputGroupAppend,
    vSelect,
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
  },
  directives: {
    "b-modal": VBModal,

    "b-popover": VBPopover,
    Ripple,
  },
  methods: {
    fitCard() {
      if (this.confirmCustomerCode != null) {
        let a = this.introducedd.findIndex((x) => x.key == this.introduced.key);
        this.introducedd[a].customerCode = this.confirmCustomerCode;
      }
    },
  },
};
</script>

<style lang="scss">
.vpd-input-group input {
  border-radius: 0px;
}
</style>