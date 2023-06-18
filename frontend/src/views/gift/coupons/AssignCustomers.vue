<template>
  <div>
    <h4 class="mb-2">کوپن تخفیف {{ name }}</h4>
    <b-row>
      <b-col
        v-for="data in datas"
        :key="data.index"
        cols="12"
        md="4"
        sm="12"
        xl="4"
        lg="4"
      >
        <a @click="index(data.method)">
          <b-card>
            <b-media no-body>
              <b-media-aside class="mr-2">
                <b-avatar rounded="lg" size="45" :variant="data.bgColor">
                  <feather-icon size="33" :icon="data.icon" />
                </b-avatar>
              </b-media-aside>
              <b-media-body class="my-auto">
                <h4 class="font-weight-bolder text-dark mb-0">
                  {{ data.title }}
                </h4>
                <b-card-text
                  class="mb-0 text-dark font-small-3 font-weight-bold"
                >
                  {{ data.subTitle }}
                </b-card-text>
              </b-media-body>
              <b-media-aside class="mr-2 align-self-center">
                <feather-icon
                  size="26"
                  icon="ChevronsLeftIcon"
                  class="text-dark"
                />
              </b-media-aside>
            </b-media>
          </b-card>
        </a>
      </b-col>
    </b-row>
    <b-card>
      <div>
        <b-form>
          <b-row  v-if="showFilter">
            <b-col cols="12" md="6">
              <b-form-group label="سطوح مشتریان" label-cols-md="4">
                <b-form-checkbox
                  value="true"
                >
                  CLASSIC
                  <feather-icon
                    stroke="gold"
                    icon="StarIcon"
                    size="13"
                  ></feather-icon>
                </b-form-checkbox>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6">
              <b-form-group
                label="برچسب مشتریان"
                label-for="h-number"
                label-cols-md="4"
              >
                <v-select
                  class="bg-white"
                  dir="rtl"
                  multiple
                  label="title"
                  :options="options"
                  placeholder="انتخاب برچسب"
                >
                  <template #no-options>
                    رکوردی برای نمایش وجود ندارد
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md='6'>
              <b-form-group label="گروه های مشتریان" label-cols-md="4">
                <b-form-checkbox value="true">
                  <feather-icon icon="FolderIcon" size="13"></feather-icon>
                  اقامت دائم
                </b-form-checkbox>
                <b-form-checkbox value="true">
                  <feather-icon icon="FolderIcon" size="13"></feather-icon>
                  بومی
                </b-form-checkbox>
                <b-form-checkbox value="true">
                  <feather-icon icon="FolderIcon" size="13"></feather-icon>
                  پرسنل همای سعادت
                </b-form-checkbox>
                <b-form-checkbox value="true">
                  <feather-icon icon="FolderIcon" size="13"></feather-icon>
                  زوج های جوان
                </b-form-checkbox>
                <b-form-checkbox value="true">
                  <feather-icon icon="FolderIcon" size="13"></feather-icon>
                  شرکت ها
                </b-form-checkbox>
                <b-form-checkbox value="true">
                  <feather-icon icon="FolderIcon" size="13"></feather-icon>
                  غیر بومی
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col cols="12" md='6'>
              <b-form-group label="وضعیت مشتریان" label-cols-md="4">
                <b-form-checkbox value="true">
                  <feather-icon icon="FolderIcon" size="13"></feather-icon>
                  جدید
                </b-form-checkbox>
                <b-form-checkbox value="true">
                  <feather-icon icon="FolderIcon" size="13"></feather-icon>
                  فعال
                </b-form-checkbox>
                <b-form-checkbox value="true">
                  <feather-icon icon="FolderIcon" size="13"></feather-icon>
                  بازگشته
                </b-form-checkbox>
                <b-form-checkbox value="true">
                  <feather-icon icon="FolderIcon" size="13"></feather-icon>
                  از دست رفته
                </b-form-checkbox>
                <b-form-checkbox value="true">
                  <feather-icon icon="FolderIcon" size="13"></feather-icon>
                  غیرفعال
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
              >
              <v-select
                class="bg-white"
                dir="rtl"
                label="title"
                :options="options"
                placeholder="انتخاب شعبه"
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="از اعتبار" label-cols-md="4">
                <b-form-input autocomplete="off" type="number" placeholder="از اعتبار.." />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="تا اعتبار" label-cols-md="4">
                <b-form-input autocomplete="off" type="number" placeholder="تا اعتبار.." />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="از امتیاز" label-cols-md="4">
                <b-form-input autocomplete="off" type="number" placeholder="از امتیاز.." />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="تا امتیاز" label-cols-md="4">
                <b-form-input autocomplete="off" type="number" placeholder="تا امتیاز.." />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="تاریخ تولد"
                label-for="birthday"
                label-cols-md="4"
              >
                <date-picker id="birthday" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="سالگرد ازدواج"
                label-for="anniversary"
                label-cols-md="4"
              >
                <date-picker id="anniversary" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="از تاریخ خرید" label-cols-md="4">
                <date-picker placehplder="از تاریخ خرید" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="تا تاریخ خرید" label-cols-md="4">
                <date-picker placehplder="تا تاریخ خرید" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="از تاریخ ایجاد" label-cols-md="4">
                <date-picker placehplder="از تاریخ ایجاد" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="تا تاریخ ایجاد" label-cols-md="4">
                <date-picker placehplder="تا تاریخ ایجاد" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group
                label="نوع"
                label-for="h-number"
                label-cols-md="4"
              >
                <v-select
                  class="bg-white"
                  dir="rtl"
                  multiple
                  label="title"
                  :options="options"
                  placeholder="انتخاب نوع"
                >
                  <template #no-options>
                    رکوردی برای نمایش وجود ندارد
                  </template>
                </v-select>
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col class="text-right" cols='12'>
              <b-button type="reset" variant="outline-secondary">
                پاک کردن فرم
              </b-button>
              <b-button type="submit" variant="primary" class="ml-1">
                جستجو
              </b-button>
            </b-col>
          </b-row>
          <BsTable
            :items="items"
            :fields="fields"
            :perPage="perPage"
            :pageOptions="pageOptions"
          />
          <div class="text-right">
              <b-button type="submit" variant="success" class="ml-1">
                <feather-icon icon='PlusSquareIcon' size='14'></feather-icon>
                تخصیص کوپن
              </b-button>
          </div>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
import vSelect from "vue-select";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import BsTable from "@/global/table/BsTable.vue";

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
  BCardBody,
  BMedia,
  BForm,
  BMediaAside,
  BMediaBody,
  BLink,
  BAvatar,
} from "bootstrap-vue";
export default {
  components: {
    BsTable,
    datePicker: VuePersianDatetimePicker,
    BFormCheckbox,
    BCard,
    BForm,
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
    vSelect,
    BAvatar,
    BCardBody,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
  },
  data() {
    return {
      perPage: 10,
      pageOptions: [5, 10, 15],
      name: this.$route.params.name,
      options: ["نمونه تستی", "نمونه تستی", "نمونه تستی", "نمونه تستی"],
      datas: [
        {
          title: "همه مشتریان",
          bgColor: "light-success",
          method: "allCustomers",
          icon: "UsersIcon",
          subTitle: "انتخاب تمامی مشتریان",
        },
        {
          title: "مشتریان عضو",
          bgColor: "light-primary",
          method: "joinedCustomers",
          icon: "UserCheckIcon",
          subTitle: "انتخاب مشتریان عضو شده",
        },
        {
          title: "فیلتر مشتریان",
          bgColor: "light-danger",
          method: "filterCustomer",
          icon: "FilterIcon",
          subTitle: "انتخاب براساس جستجو مشتریان",
        },
      ],
      fields: [
        { key: "name", label: "نام", sortable: true },
        { key: "mobileNumber", label: "شماره موبایل", sortable: true },
        { key: "email", label: "ایمیل", sortable: true },
      ],
      items:[],
      showFilter: false,
    };
  },
  methods: {
    index(a) {
      if (a == "filterCustomer") this.filterCustomer();
      else if (a == "allCustomers") this.allCustomers();
      else if (a == "joinedCustomers") this.joinedCustomers();
    },
    filterCustomer() {
      this.showFilter = true;
      this.items=[]
    },
    allCustomers() {
      this.items=[]
      for (let i = 0; i < 29; i++) {
        this.items.push({
          name:"همه ی مشتریان",
          mobileNumber:'09123456789',
          email:'example@elanus.co',
        })
      }
    },
    joinedCustomers() {
      this.items=[]
      for (let i = 0; i < 11; i++) {
        this.items.push({
          name:"مشتریان عضو شده",
          mobileNumber:'09123456789',
          email:'example@elanus.co',
        })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>