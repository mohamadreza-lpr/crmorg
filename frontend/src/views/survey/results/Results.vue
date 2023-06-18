<template>
  <div>
    <h4 class="mb-2">نتایج نظرسنجی {{ data.name }}</h4>
    <b-form-group>
      <label>انتخاب برچسب ها</label>
      <v-select
        class="bg-white"
        dir="rtl"
        multiple
        label="title"
        :options="options"
      />
    </b-form-group>
    <b-form class="form-group" @submit.prevent>
      <app-collapse class="form-group">
        <app-collapse-item title="فیلتر نظرسنجی">
          <b-row>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="از تاریخ" label-cols-md="4">
                <date-picker placeholder="از تاریخ" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="تا تاریخ" label-cols-md="4">
                <date-picker placeholder="تا تاریخ" clearable />
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="از نتیجه" label-cols-md="4">
                <b-form-input autocomplete="off" type="number" placeholder="از نتیجه.." />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="تا نتیجه" label-cols-md="4">
                <b-form-input autocomplete="off" type="number" placeholder="تا نتیجه.." />
              </b-form-group>
            </b-col>
          </b-row>
        </app-collapse-item>
      </app-collapse>
      <app-collapse class="form-group">
        <app-collapse-item title="فیلتر بر اساس مشتری">
          <b-row>
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
              <b-form-group label="از تاریخ ایجاد" label-cols-md="4">
                <date-picker placehplder="از تاریخ ایجاد" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="تا تاریخ ایجاد" label-cols-md="4">
                <date-picker placehplder="تا تاریخ ایجاد" clearable />
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="از تاریخ جذب"
                label-for="min-date-join"
                label-cols-md="4"
              >
                <date-picker id="min-date-join" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="تا تاریخ جذب"
                label-for="max-date-join"
                label-cols-md="4"
              >
                <date-picker id="max-date-join" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="از تاریخ تولد"
                label-for="min-date-birth"
                label-cols-md="4"
              >
                <date-picker id="min-date-birth" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="تا تاریخ تولد"
                label-for="max-date-birth"
                label-cols-md="4"
              >
                <date-picker id="max-date-birth" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="از تاریخ ازدواج"
                label-for="min-date-marriage"
                label-cols-md="4"
              >
                <date-picker id="min-date-marriage" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="تا تاریخ ازدواج"
                label-for="max-date-marriage"
                label-cols-md="4"
              >
                <date-picker id="max-date-marriage" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="از تاریخ تولد همسر"
                label-for="min-date-partner-birth"
                label-cols-md="4"
              >
                <date-picker id="min-date-partner-birth" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="تا تاریخ تولد همسر"
                label-for="max-date-partner-birth"
                label-cols-md="4"
              >
                <date-picker id="max-date-partner-birth" clearable />
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
              <b-form-group
                label="تاریخ تولد همسر"
                label-for="birthday-love"
                label-cols-md="4"
              >
                <date-picker id="birthday-love" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="نوع" label-for="type" label-cols-md="4">
                <v-select
                  id="type"
                  dir="rtl"
                  label="title"
                  :options="options"
                  placeholder="انتخاب کنید"
                >
                  <template #no-options>
                    رکوردی برای نمایش وجود ندارد
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="از طول عمر"
                label-for="min-age"
                label-cols-md="4"
              >
                <b-form-input autocomplete="off"
                  id="min-age"
                  type="number"
                  placeholder="از طول عمر.."
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="تا طول عمر"
                label-for="max-age"
                label-cols-md="4"
              >
                <b-form-input autocomplete="off"
                  id="max-age"
                  type="number"
                  placeholder="تا طول عمر.."
                />
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="از تازگی خرید"
                label-for="min-shopping"
                label-cols-md="4"
              >
                <b-form-input autocomplete="off" id="min-shopping" placeholder="از تازگی خرید" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="تا تازگی خرید"
                label-for="max-shopping"
                label-cols-md="4"
              >
                <b-form-input autocomplete="off" id="max-shopping" placeholder="تا تازگی خرید" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="از تعداد خرید"
                label-for="min-count"
                label-cols-md="4"
              >
                <b-form-input autocomplete="off"
                  id="min-count"
                  type="number"
                  placeholder="از تعداد خرید.."
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="تا تعداد خرید"
                label-for="max-count"
                label-cols-md="4"
              >
                <b-form-input autocomplete="off"
                  id="max-count"
                  type="number"
                  placeholder="تا تعداد خرید.."
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="از حجم خرید"
                label-for="min-value"
                label-cols-md="4"
              >
                <b-form-input autocomplete="off"
                  id="min-value"
                  type="number"
                  placeholder="از حجم خرید.."
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="تا حجم خرید"
                label-for="max-value"
                label-cols-md="4"
              >
                <b-form-input autocomplete="off"
                  id="max-value"
                  type="number"
                  placeholder="تا حجم خرید.."
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="ازآخرین‌ تاریخ‌ خرید"
                label-for="birthday"
                label-cols-md="4"
              >
                <date-picker id="birthday" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group
                label="تاآخرین ‌تاریخ ‌خرید"
                label-for="anniversary"
                label-cols-md="4"
              >
                <date-picker id="anniversary" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="جنسیت" label-cols-md="4">
                <v-select
                  class="bg-white"
                  dir="rtl"
                  :options="options"
                  placeholder="انتخاب کنید..."
                >
                  <template #no-options>
                    رکوردی برای نمایش وجود ندارد
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="وضعیت تاهل" label-cols-md="4">
                <v-select
                  class="bg-white"
                  dir="rtl"
                  :options="options"
                  placeholder="انتخاب کنید..."
                >
                  <template #no-options>
                    رکوردی برای نمایش وجود ندارد
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="نحوه آشنایی" label-cols-md="4">
                <v-select
                  class="bg-white"
                  dir="rtl"
                  :options="options"
                  placeholder="انتخاب کنید..."
                >
                  <template #no-options>
                    رکوردی برای نمایش وجود ندارد
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </app-collapse-item>
      </app-collapse>
      <div class="text-right">
        <b-button type="reset" variant="outline-secondary">
          پاک کردن فیلتر
        </b-button>
        <b-button v-b-toggle.sidebar-question type="submit" variant="outline-primary" class="ml-1">
          فیلتر بر اساس سوال
        </b-button>
        <b-button type="submit" variant="primary" class="ml-1">
          جستجو
        </b-button>

      </div>
    </b-form>

    <b-sidebar id="sidebar-question" bg-variant="white" right backdrop shadow>
      <b-form @submit.prevent>
        <div class="p-2">

          <b-form-group>
            <label>سوالات</label>
            <v-select
              class="bg-white"
              dir="rtl"
              label="title"
              :options="options"
              placeholder="سوالات"
            >
              <template #no-options> رکوردی برای نمایش وجود ندارد </template>
            </v-select>
          </b-form-group>
          <b-form-group>
            <label>پاسخ ها</label>
            <v-select
              class="bg-white"
              dir="rtl"
              label="title"
              :options="options"
              placeholder="پاسخ ها"
            >
              <template #no-options> رکوردی برای نمایش وجود ندارد </template>
            </v-select>
          </b-form-group>
        </div>
      </b-form>
    </b-sidebar>

    <b-sidebar id="sidebar-right" bg-variant="white" right backdrop shadow>
      <b-form @submit.prevent>
        <app-collapse>
          <app-collapse-item class="mb-1" title="مشخصات">
            <b-form-group>
              <label>انتخاب شعبه</label>
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
            <b-form-group>
              <label>انتخاب کوپن</label>
              <v-select
                class="bg-white"
                dir="rtl"
                label="title"
                :options="options"
                placeholder="انتخاب کوپن"
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
            </b-form-group>
            <b-form-group>
              <label>انتخاب وضعیت</label>
              <v-select
                class="bg-white"
                dir="rtl"
                label="title"
                :options="options"
                placeholder="انتخاب وضعیت"
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
            </b-form-group>
            <b-form-group>
              <label>انتخاب نوع فاکتور</label>
              <v-select
                class="bg-white"
                dir="rtl"
                label="title"
                :options="options"
                placeholder="انتخاب نوع فاکتور"
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
            </b-form-group>
            <b-form-group>
              <label>انتخاب محصول</label>
              <v-select
                class="bg-white"
                dir="rtl"
                label="title"
                :options="options"
                placeholder="انتخاب محصول"
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
            </b-form-group>
          </app-collapse-item>

          <app-collapse-item class="mb-1" title="گروه های مشتریان">
            <b-form-group>
              <b-form-checkbox value="true">
                <feather-icon icon="FolderIcon" size="13"></feather-icon>
                اقامت دائم
              </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox value="true">
                <feather-icon icon="FolderIcon" size="13"></feather-icon>
                بومی
              </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox value="true">
                <feather-icon icon="FolderIcon" size="13"></feather-icon>
                پرسنل همای سعادت
              </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox value="true">
                <feather-icon icon="FolderIcon" size="13"></feather-icon>
                زوج های جوان
              </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox value="true">
                <feather-icon icon="FolderIcon" size="13"></feather-icon>
                شرکت ها
              </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox value="true">
                <feather-icon icon="FolderIcon" size="13"></feather-icon>
                غیر بومی
              </b-form-checkbox>
            </b-form-group>
          </app-collapse-item>

          <app-collapse-item class="mb-1" title="سطوح مشتریان">
            <b-form-group>
              <b-form-checkbox value="true">
                <feather-icon icon="StarIcon" size="13"></feather-icon>
                CLASSIC
              </b-form-checkbox>
            </b-form-group>
          </app-collapse-item>

          <app-collapse-item class="mb-1" title="وضعیت مشتریان">
            <b-form-group>
              <b-form-checkbox value="true"> جدید </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox value="true"> فعال </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox value="true"> بازگشته </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox value="true"> از دست رفته </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox value="true"> غیر فعال </b-form-checkbox>
            </b-form-group>
          </app-collapse-item>

          <app-collapse-item class="mb-1" title="برچسب مشتریان">
            <b-form-group>
              <label>انتخاب برچسب ها</label>
              <v-select
                class="bg-white"
                dir="rtl"
                multiple
                label="title"
                :options="options"
                placeholder="انتخاب برچسب"
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
            </b-form-group>
          </app-collapse-item>
        </app-collapse>
      </b-form>
    </b-sidebar>

    <div class="text-right">
      <b-dropdown id="dropdown-right" right variant="white">
        <template #button-content>
          <b-button size="sm" variant="outline-secondary">
            <feather-icon size="13" class="mr-1" icon="ExternalLinkIcon" />
            خروجی
            <feather-icon size="13" class="mr-1" icon="ChevronDownIcon" />
          </b-button>
        </template>
        <b-dropdown-item>
          <feather-icon size="13" icon="PrinterIcon" />
          چاپ
        </b-dropdown-item>
        <b-dropdown-item>
          <feather-icon size="13" icon="FileIcon" />
          اکسل
        </b-dropdown-item>
        <b-dropdown-item>
          <feather-icon size="13" icon="CopyIcon" />
          کپی
        </b-dropdown-item>
      </b-dropdown>
      <b-button
        class="mx-0"
        v-b-toggle.sidebar-right
        size="sm"
        variant="danger"
      >
        <feather-icon size="13" class="mr-1" icon="FilterIcon" />
        فیلتر</b-button
      >
    </div>
    <BsTable
      :items="data.users"
      :fields="fields"
      :perPage="perPage"
      :pageOptions="pageOptions"
    />
  </div>
</template>

<script>
import BsTable from "@/global/table/BsTable.vue";
import VSelect from "vue-select";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import {
  VBToggle,
  BForm,
  BFormCheckbox,
  BSidebar,
  BInputGroupAppend,
  BButton,
  BFormInput,
  BInputGroup,
  BFormGroup,
  BFormSelect,
  BCol,
  BRow,
  BCard,
  BTable,
  BAvatar,
  BImg,
  BDropdown,
  BDropdownItem,
  BPagination,
  BCardText,
  BDropdownText,
  BMedia,
  BMediaAside,
  BMediaBody,
} from "bootstrap-vue";
export default {
  components: {
    BMedia,
    BMediaAside,
    BMediaBody,
    datePicker: VuePersianDatetimePicker,
    BsTable,
    BFormCheckbox,
    BSidebar,
    BForm,
    AppCollapse,
    AppCollapseItem,
    VSelect,
    BInputGroupAppend,
    BButton,
    BFormInput,
    BInputGroup,
    BFormGroup,
    BFormSelect,
    BCol,
    BRow,
    BCard,
    BTable,
    BAvatar,
    BImg,
    BDropdown,
    BDropdownItem,
    BPagination,
    BCardText,
    BDropdownText,
  },
  directives: {
    "b-toggle": VBToggle,
  },
  data() {
    return {
      options: ["نمونه 5", "نمونه 4", "نمونه 3", "نمونه 2", "نمونه 1"],
      data: this.$route.params.data,
      perPage: 5,
      pageOptions: [5, 10, 15],
      fields: [
        { key: "name", label: "نام مشتری", sortable: true },
        { key: "code", label: "کد مشتری", sortable: true },
        { key: "branch", label: "شعبه", sortable: true },
        { key: "rateDate", label: "تاریخ نظرسنجی", sortable: true },
        { key: "result", label: "نتیجه", sortable: true },
        { key: "finallResult", label: "نتیجه نهایی", sortable: true },
        { key: "relatedActSurveyReslt", label: "فعالیت مرتبط" },
        { key: "actionsSurveyResultsList", label: "عملیات" },
      ],
    };
  },
};
</script>

<style lang="scss">
.vpd-input-group input {
  border-radius: 0px;
}
</style>