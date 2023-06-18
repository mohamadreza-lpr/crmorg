<template>
  <div>
    <b-form-group>
      <b-button
        @click="$router.push({ name: 'sales-return-createInvoice' })"
        class="form-group bg-blue-1 mr-1 px-3"
        >برگشت
        <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
      </b-button>
      <b-button
        @click="$router.push({ name: 'sales-return-report' })"
        class="form-group bg-blue-2 mr-1 px-3"
        >گزارش فروش
        <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
      </b-button>
      <b-button
        @click="$router.push({ name: 'sales-return-settings' })"
        class="form-group bg-blue-3 mr-1 px-3"
        >تنظیمات
        <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
      </b-button>
      <b-button
        @click="$router.push({ name: 'sales-return-analyse' })"
        class="form-group bg-blue-4 mr-1 px-3"
        >تحلیل فروش
        <feather-icon size="13" icon="ChevronsLeftIcon"></feather-icon>
      </b-button>
    </b-form-group>

    <b-form class="form-group" @submit.prevent>
      <app-collapse class="form-group">
        <app-collapse-item title="فیلتر بر اساس فاکتور">
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
              <b-form-group label="از جمع کل" label-cols-md="4">
                <b-form-input autocomplete="off" type="number" placeholder="از جمع کل.." />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="تا جمع کل" label-cols-md="4">
                <b-form-input autocomplete="off" type="number" placeholder="تا جمع کل.." />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="از مبلغ نهایی" label-cols-md="4">
                <b-form-input autocomplete="off" type="number" placeholder="از مبلغ نهایی.." />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="تا مبلغ نهایی" label-cols-md="4">
                <b-form-input autocomplete="off" type="number" placeholder="تا مبلغ نهایی.." />
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
              <b-form-group label="تاریخ تولد" label-cols-md="4">
                <date-picker placehplder="تاریخ تولد" clearable />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6" sm="6">
              <b-form-group label="سالگرد ازدواج" label-cols-md="4">
                <date-picker placehplder="سالگرد ازدواج" clearable />
              </b-form-group>
            </b-col>
          </b-row>
        </app-collapse-item>
      </app-collapse>
      <div class="text-right">
        <b-button type="reset" variant="outline-secondary">
          پاک کردن فرم
        </b-button>
        <b-button type="submit" variant="primary" class="ml-1">
          جستجو
        </b-button>
      </div>
    </b-form>

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
                :options="branches"
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
                :options="types"
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
                :options="types"
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
                :options="types"
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
                :options="types"
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
                :options="tags"
                placeholder="انتخاب برچسب"
              >
                <template #no-options> رکوردی برای نمایش وجود ندارد </template>
              </v-select>
            </b-form-group>
          </app-collapse-item>
        </app-collapse>
      </b-form>
    </b-sidebar>
    <b-card>
      <div class="row justify-content-between form-group">
        <div class="col-6">
          <h4 class="form-group">
            <feather-icon icon="ShoppingCartIcon" size="15"></feather-icon>
            فاکتور فروش
          </h4>
						<b-form-checkbox v-model="showTotal" value="true">
							نمایش مجموع
						</b-form-checkbox>
        </div>
        <div class="col-6 text-right">
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
					<b-button class="mx-0" v-b-toggle.sidebar-right size="sm" variant="danger">
						<feather-icon size="13" class="mr-1" icon="FilterIcon" />
						فیلتر</b-button
					>
        </div>
      </div>
			<div v-if="showTotal">
				<b-row>
					<b-col
						v-for="item in statisticsItems"
						:key="item.icon"
						xl="3"
						sm="6"
						:class="item.customClass"
					>
						<b-media no-body>
							<b-media-aside

								class="mr-2"
							>
								<b-avatar
									size="48"
									:variant="item.color"
								>
									<feather-icon
										size="24"
										:icon="item.icon"
									/>
								</b-avatar>
							</b-media-aside>
							<b-media-body class="my-auto">
								<h4 class="font-weight-bolder mb-0">
									{{ item.title }}
								</h4>
								<b-card-text class="font-small-3 mb-0">
									{{ item.subtitle }}
									<span
									class="font-weight-bolder ml-1"
									:class="item.deduction ? 'text-danger' : 'text-success'"
								>
									{{ item.payment }}
								</span>
								</b-card-text>
							</b-media-body>
						</b-media>
					</b-col>
				</b-row>
			</div>
    </b-card>
    <BsTable
      :items="items"
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
      showTotal: false,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sex: ["زن", "مرد"],
      relation: ["مجرد", "متاهل"],
      introduced: ["فکس", "وبسایت", "آشنایان", "تلفن"],
      branches: [
        {
          title: "شعبه تستی",
        },
        {
          title: "شعبه تستی 1",
        },
        {
          title: "شعبه تستی 2",
        },
        {
          title: "شعبه تستی 3",
        },
      ],
      types: [{ title: "نوع مشتری پیش فرض" }, { title: "نوع سرنخ پیش فرض" }],
      tags: [
        {
          title: "برچسب تستی",
        },
        {
          title: "برچسب تستی 1",
        },
        {
          title: "برچسب تستی 2",
        },
        {
          title: "برچسب تستی 3",
        },
      ],
      points: [
        {
          title: "قرعه‌کشی تستی",
        },
        {
          title: "قرعه‌کشی تستی 1",
        },
        {
          title: "قرعه‌کشی تستی 2",
        },
        {
          title: "قرعه‌کشی تستی 3",
        },
      ],
      coupons: [
        {
          title: "کوپن تستی",
        },
        {
          title: "کوپن تستی 1",
        },
        {
          title: "کوپن تستی 2",
        },
        {
          title: "کوپن تستی 3",
        },
      ],
      fields: [
        { key: "name", label: "مشتری", sortable: true },
        { key: "phoneNumber", label: "شماره موبایل", sortable: true },
        { key: "level", label: "سطح", sortable: true },
        { key: "branch", label: "شعبه", sortable: true },
        { key: "date", label: "تاریخ", sortable: true },
        { key: "factorNum", label: "شماره فاکتور", sortable: true },
        { key: "factorIndex", label: "نوع فاکتور", sortable: true },
        { key: "total", label: "جمع کل", sortable: true },
        { key: "finalPrice", label: "مبلغ نهایی", sortable: true },
        { key: "credit", label: "اعتبار مشتری", sortable: true },
        { key: "status", label: "وضعیت", sortable: true },
        { key: "actionsSalesReturnManagementList", label: "عملیات" },
      ],
      items: [
        {
          id: 1,
          name: "محمد خسروی",
          phoneNumber: "09123456789",
          level: 1,
          branch: "تعریف نشده",
          date: "05/04/1400",
          factorIndex: "فاکتو مرجع",
          factorNum: "#165971",
          total: 15000000,
          credit: 200,
          finalPrice: 1400000,
          phoneNumber: "09123456789",
          status: 1,
        },
      ],
			statisticsItems: [
				{
					icon: 'ShoppingBagIcon',
					color: 'light-primary',
					title: '2000',
					subtitle: 'تعداد فاکتور برگشت از فروش',
					customClass: 'mb-2 mb-xl-0',
					payment: "+33%",
					deduction: false,
				},
				{
					icon: 'TagIcon',
					color: 'light-info',
					title: '150000',
					subtitle: 'تعداد فاکتور مرجع',
					customClass: 'mb-2 mb-xl-0',
					payment: "-%14",
					deduction: true,
				},
				{
					icon: 'DollarSignIcon',
					color: 'light-danger',
					title: '1520000',
					subtitle: 'مجموع اعتبار برگشتی',
					customClass: 'mb-2 mb-sm-0',
					payment: "+%12",
					deduction: false,
				},
				{
					icon: 'DollarSignIcon',
					color: 'light-success',
					title: '150000000',
					subtitle: 'جمع کل برگشت از فروش',
					customClass: '',
					payment: "+%49",
					deduction: false,
				},
			],
    };
  },
};
</script>

<style lang="scss">
.bg-blue-1 {
  background-color: #4a69bb !important;
}
.bg-blue-2 {
  background-color: #617be3 !important;
}
.bg-blue-3 {
  background-color: #4a47a3 !important;
}
.bg-blue-4 {
  background-color: #537ec5 !important;
}
.vpd-input-group input {
  border-radius: 0px;
}
</style>