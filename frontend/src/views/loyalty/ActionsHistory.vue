<template>
    <div>
        <div>
            <!-- <b-form-group>
        <label>انتخب برچسب ها</label>
        <v-select
          class="bg-white"
          v-model="selects"
          dir="rtl"
          multiple
          label="title"
          :options="tags"
        />
      </b-form-group> -->
            <!-- <app-collapse class="form-group">
        <app-collapse-item title="فیلتر">
          <b-form @submit.prevent>
            <b-row>
              <b-col cols="6">
                <b-form-group
                  label="از اعتبار"
                  label-for="min-credit"
                  label-cols-md="2"
                >
                  <b-form-input autocomplete="off"
                    id="min-credit"
                    type="number"
                    placeholder="از اعتبار.."
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  label="تا اعتبار"
                  label-for="max-credit"
                  label-cols-md="2"
                >
                  <b-form-input autocomplete="off"
                    id="max-credit"
                    type="number"
                    placeholder="تا اعتبار.."
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  label="از امتیاز"
                  label-for="min-point"
                  label-cols-md="2"
                >
                  <b-form-input autocomplete="off"
                    id="min-point"
                    type="number"
                    placeholder="از امتیاز.."
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  label="تا امتیاز"
                  label-for="max-point"
                  label-cols-md="2"
                >
                  <b-form-input autocomplete="off"
                    id="max-point"
                    type="number"
                    placeholder="تا امتیاز.."
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  label="از تاریخ"
                  label-for="min-date"
                  label-cols-md="2"
                >
                  <date-picker id="min-date" v-model="minDate" clearable />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  label="تا تاریخ"
                  label-for="max-date"
                  label-cols-md="2"
                >
                  <date-picker id="max-date" v-model="maxDate" clearable />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
        </app-collapse-item>
      </app-collapse> -->
            <!-- <b-card no-body>
        <BCardText class="p-2 mb-0">
          <div class="text-right">
            <b-dropdown id="dropdown-right" right variant="white">
              <template #button-content>
                <b-button size="sm" variant="outline-secondary">
                  <feather-icon
                    size="13"
                    class="mr-1"
                    icon="ExternalLinkIcon"
                  />
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
            <b-button v-b-toggle.sidebar-right size="sm" variant="danger">
              <feather-icon size="13" class="mr-1" icon="FilterIcon" />
              فیلتر</b-button
            >
          </div>
          <div class="row d-flex justify-content-between">
            <div class="col-md-6 text-left justify-content-start">
              <b-form-group
                label="جستجو"
                label-for="filter-input"
                label-cols-sm="3"
                label-align="left"
                label-size="sm"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input autocomplete="off"
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="برای جستجو تایپ نمایید"
                  ></b-form-input autocomplete="off">

                  <BInputGroupAppend>
                    <b-button :disabled="!filter" @click="filter = ''"
                      >حذف</b-button
                    >
                  </BInputGroupAppend>
                </b-input-group>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                label="تعداد در صفحه"
                label-for="per-page-select"
                label-cols-sm="6"
                label-cols-md="4"
                label-cols-lg="3"
                label-align="left"
                label-size="sm"
                class="mb-0"
              >
                <b-form-select
                  id="per-page-select"
                  v-model="perPage"
                  :options="pageOptions"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </div>
          </div>
        </BCardText> -->
            <b-table
                :striped="striped"
                :bordered="bordered"
                :outlined="outlined"
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                class="mb-0"
                empty-text="رکوردی یافت نشد"
                show-empty
            ></b-table>
            <div class="d-flex align-items-center justify-content-center p-2">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    first-number
                    last-number
                    class="mb-0 mt-1 mt-sm-0"
                    prev-class="prev-item"
                    next-class="next-item"
                >
                    <template #prev-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                    </template>
                    <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                    </template>
                </b-pagination>
            </div>
            <!-- </b-card> -->
            <b-sidebar
                id="sidebar-right"
                bg-variant="white"
                right
                backdrop
                shadow
            >
                <b-form @submit.prevent>
                    <app-collapse>
                        <app-collapse-item class="mb-1" title="مشخصات">
                            <b-form-group>
                                <label>انتخاب شعبه</label>
                                <v-select
                                    class="bg-white"
                                    v-model="branch"
                                    dir="rtl"
                                    label="title"
                                    :options="branches"
                                />
                            </b-form-group>
                            <b-form-group>
                                <label>انتخاب نوع</label>
                                <v-select
                                    class="bg-white"
                                    v-model="type"
                                    dir="rtl"
                                    label="title"
                                    :options="types"
                                />
                            </b-form-group>
                        </app-collapse-item>

                        <app-collapse-item
                            class="mb-1"
                            title="گروه های مشتریان"
                        >
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="groupCustomer"
                                    value="true"
                                >
                                    <feather-icon
                                        icon="FolderIcon"
                                        size="13"
                                    ></feather-icon>
                                    اقامت دائم
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="groupCustomer1"
                                    value="true"
                                >
                                    <feather-icon
                                        icon="FolderIcon"
                                        size="13"
                                    ></feather-icon>
                                    بومی
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="groupCustomer2"
                                    value="true"
                                >
                                    <feather-icon
                                        icon="FolderIcon"
                                        size="13"
                                    ></feather-icon>
                                    پرسنل همای سعادت
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="groupCustomer3"
                                    value="true"
                                >
                                    <feather-icon
                                        icon="FolderIcon"
                                        size="13"
                                    ></feather-icon>
                                    زوج های جوان
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="groupCustomer4"
                                    value="true"
                                >
                                    <feather-icon
                                        icon="FolderIcon"
                                        size="13"
                                    ></feather-icon>
                                    شرکت ها
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="groupCustomer5"
                                    value="true"
                                >
                                    <feather-icon
                                        icon="FolderIcon"
                                        size="13"
                                    ></feather-icon>
                                    غیر بومی
                                </b-form-checkbox>
                            </b-form-group>
                        </app-collapse-item>

                        <app-collapse-item class="mb-1" title="سطوح مشتریان">
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="levelCustomer"
                                    value="true"
                                >
                                    <feather-icon
                                        icon="StarIcon"
                                        size="13"
                                    ></feather-icon>
                                    CLASSIC
                                </b-form-checkbox>
                            </b-form-group>
                        </app-collapse-item>

                        <app-collapse-item class="mb-1" title="وضعیت مشتریان">
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="statusCustomer"
                                    value="true"
                                >
                                    جدید
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="statusCustomer1"
                                    value="true"
                                >
                                    فعال
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="statusCustomer2"
                                    value="true"
                                >
                                    بازگشته
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="statusCustomer3"
                                    value="true"
                                >
                                    از دست رفته
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="statusCustomer4"
                                    value="true"
                                >
                                    غیر فعال
                                </b-form-checkbox>
                            </b-form-group>
                        </app-collapse-item>
                    </app-collapse>
                </b-form>
            </b-sidebar>
        </div>
    </div>
</template>

<script>
import {
    VBToggle,
    BSidebar,
    BTable,
    BPagination,
    BInputGroupAppend,
    BCardText,
    BFormTextarea,
    BCard,
    BAlert,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BFormSelect
} from "bootstrap-vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import VSelect from "vue-select";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
export default {
    computed: {
        totalRows: function() {
            return this.items.length;
        }
    },
    data() {
        return {
            striped: true,
            bordered: true,
            outlined: true,
            statusCustomer: null,
            statusCustomer1: null,
            statusCustomer2: null,
            statusCustomer3: null,
            statusCustomer4: null,
            levelCustomer: null,
            groupCustomer: null,
            groupCustomer1: null,
            groupCustomer2: null,
            groupCustomer3: null,
            groupCustomer4: null,
            groupCustomer5: null,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15, { value: 100, text: "نمایش بیشتر" }],
            sortBy: "",
            filter: null,
            minDate: "",
            maxDate: "",
            selects: [
                {
                    title: "برچسب تستی"
                }
            ],
            type: "",
            branch: "",
            types: [
                {
                    title: "نوع تستی"
                },
                {
                    title: "نوع تستی 1"
                },
                {
                    title: "نوع تستی 2"
                },
                {
                    title: "نوع تستی 3"
                }
            ],
            branches: [
                {
                    title: "شعبه تستی"
                },
                {
                    title: "شعبه تستی 1"
                },
                {
                    title: "شعبه تستی 2"
                },
                {
                    title: "شعبه تستی 3"
                }
            ],
            tags: [
                {
                    title: "برچسب تستی"
                },
                {
                    title: "برچسب تستی 1"
                },
                {
                    title: "برچسب تستی 2"
                },
                {
                    title: "برچسب تستی 3"
                }
            ],
            fields: [
                {
                    key: "customer",
                    label: "مشتری",
                    sortable: true,
                    thClass: "fit"
                },
                {
                    key: "planType",
                    label: "نوع برنامه",
                    sortable: true,
                    thClass: "fit"
                },
                { key: "date", label: "تاریخ", sortable: true, thClass: "fit" },
                {
                    key: "branch",
                    label: "شعبه",
                    sortable: true,
                    thClass: "fit"
                },
                { key: "point", label: "امتیاز", sortable: true },
                { key: "credit", label: "اعتبار", sortable: true },
                { key: "relatedTo", label: "مرتبط با", sortable: true },
                {
                    key: "creditBalance",
                    label: "باقیمانده اعتبار",
                    sortable: true
                },
                {
                    key: "description",
                    label: "توضیحات",
                    sortable: true,
                    thClass: "fit"
                }
            ],
            items: [
                {
                    id: 1,
                    customer: "محمد یراقی",
                    planType: "عضویت در باشگاه مشتریان",
                    date: "15/03/1400",
                    branch: "غرفه سوهان و عروسک",
                    point: 10,
                    credit: 25,
                    relatedTo: "",
                    creditBalance: 5,
                    description: "دریافت پاداش عضویت در باشگاه مشتریان"
                },
                {
                    id: 2,
                    customer: "هادی رمضانعلی",
                    planType: "عضویت در باشگاه مشتریان",
                    date: "13/11/1400",
                    branch: "سوئیت اقامتی",
                    point: 10,
                    credit: 25,
                    relatedTo: "",
                    creditBalance: 5,
                    description: "دریافت پاداش عضویت در باشگاه مشتریان"
                },
                {
                    id: 3,
                    customer: "مینا شاهرخی",
                    planType: "تکمیل پروفایل کاربری",
                    date: "13/11/1400",
                    branch: "تعریف نشده",
                    point: 35,
                    credit: 50,
                    relatedTo: "",
                    creditBalance: 25,
                    description:
                        "	دریافت امتیاز با تکمیل پروفایل در باشگاه مشتریان"
                },
                {
                    id: 4,
                    customer: "امین میرزاجان زاده",
                    planType: "عضویت در باشگاه مشتریان",
                    date: "13/11/1400",
                    branch: "شعبه ارمغان 90",
                    point: 10,
                    credit: 50,
                    relatedTo: "",
                    creditBalance: 5,
                    description: "دریافت پاداش عضویت در باشگاه مشتریان"
                },
                {
                    id: 5,
                    customer: "ابوالفضل عسگری",
                    planType: "عضویت در باشگاه مشتریان",
                    date: "13/11/1400",
                    branch: "شعبه ارمغان 90",
                    point: 45,
                    credit: 15,
                    relatedTo: "",
                    creditBalance: 0,
                    description: "دریافت پاداش عضویت در باشگاه مشتریان"
                },
                {
                    id: 69,
                    customer: "",
                    planType: "عضویت در باشگاه مشتریان",
                    date: "13/11/1400",
                    branch: "شعبه ارمغان 90",
                    point: 60,
                    credit: 20,
                    relatedTo: "",
                    creditBalance: 10,
                    description: "دریافت پاداش عضویت در باشگاه مشتریان"
                },
                {
                    id: 86,
                    customer: "رضا نجاتی",
                    planType: "عضویت در باشگاه مشتریان",
                    date: "13/11/1400",
                    branch: "کافی شاپ",
                    point: 45,
                    credit: 50,
                    relatedTo: "",
                    creditBalance: 0,
                    description: "دریافت پاداش عضویت در باشگاه مشتریان"
                },
                {
                    id: 68,
                    customer: "عبدالخالق نقده",
                    planType: "عضویت در باشگاه مشتریان",
                    date: "13/11/1400",
                    branch: "تی بار",
                    point: 75,
                    credit: 85,
                    relatedTo: "",
                    creditBalance: 10,
                    description: "دریافت پاداش عضویت در باشگاه مشتریان"
                },
                {
                    id: 67,
                    customer: "فرشید حیدریان",
                    planType: "عضویت در باشگاه مشتریان",
                    date: "13/11/1400",
                    branch: "غرفه سوهان و عروسک",
                    point: 5,
                    credit: 20,
                    relatedTo: "",
                    creditBalance: 5,
                    description: "دریافت پاداش عضویت در باشگاه مشتریان"
                }
            ]
        };
    },
    directives: {
        "b-toggle": VBToggle
    },
    components: {
        // SidebarContent,
        BSidebar,
        BTable,
        BDropdown,
        BDropdownItem,
        BPagination,
        BInputGroupAppend,
        BCardText,
        BFormSelect,
        datePicker: VuePersianDatetimePicker,
        AppCollapse,
        AppCollapseItem,
        VSelect,
        BFormTextarea,
        BCard,
        BAlert,
        BFormGroup,
        BFormInput,
        BFormCheckbox,
        BForm,
        BButton,
        BInputGroup,
        BInputGroupPrepend,
        BRow,
        BCol
    }
};
</script>
