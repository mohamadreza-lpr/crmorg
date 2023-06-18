<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <h4>مجوزهای دسترسی شعب</h4>
        <b-card no-body class="card-company-table">
          <BCardText class="p-2 mb-0">
            <b-form-group
              label="جستجو"
              label-for="filter-input"
              label-cols-sm="3"
              label-align="left"
              label-size="sm"
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
            <b-form-group
              label="تعداد در صفحه"
              label-for="per-page-select"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align="left"
              label-size="sm"
            >
              <b-form-select
                id="per-page-select"
                v-model="perPage"
                :options="pageOptions"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </BCardText>
          <b-table
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            class="mb-0"
          >
            <template #emptyfiltered>
              <h5 class="text-danger">رکوردی برای نمایش وجود ندارد</h5>
            </template>
            <!-- name and userName -->
            <template #cell(name)="data">
              <div class="d-flex align-items-center">
                <div>
                  <div class="d-inline">
                    <b-avatar size="22" variant="light-secondary">
                      <feather-icon size="13" icon="UserIcon" />
                    </b-avatar>
                  </div>
                  <div class="font-weight-bolder d-inline">
                    {{ data.item.name }}
                  </div>
                  <div class="font-small-3 text-muted">
                    {{ data.item.userName }}
                  </div>
                </div>
              </div>
            </template>

            <!-- email -->
            <template #cell(email)="data">
              <div class="d-inline">
                <b-avatar size="22" variant="light-danger">
                  <feather-icon size="13" icon="MailIcon" />
                </b-avatar>
                <div class="font-weight-bolder d-inline">
                  {{ data.item.email }}
                </div>
              </div>
            </template>

            <!-- actions -->
            <template #cell(select)="data">
              <button class="btn" @click="showData(data)">
                <feather-icon size="13" icon="MousePointerIcon" />
              </button>
            </template>
          </b-table>
          <BCardText>
            <div class="text-center my-2">
              <b-pagination
                align="center"
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                size="sm"
                class="my-0"
                pills
              ></b-pagination>
            </div>
          </BCardText>
        </b-card>
      </div>
      <div class="col-md-8" v-if="selectItem">
        <h5>
          کاربران
          <b-badge variant="success">{{ title }}</b-badge>
        </h5>
        <b-card no-body class="card-company-table">
          <div class="p-2">
            <label class="font-weight-bold" for="users"
              >اعطای دسترسی به کاربر</label
            >
            <div class="row">
              <div class="col-10">
                <b-form-select
                  id="addPermisson"
                  v-model="users1"
                  :options="users"
                  size="sm"
                ></b-form-select>
              </div>
              <div class="col-2 text-right">
                <BButton
                  size="sm"
                  variant="primary"
                  @click="addPermissonMethod()"
                  >افزودن</BButton
                >
              </div>
            </div>
          </div>
          <BCardText class="p-2 mb-0">
            <b-form-group
              label="جستجو"
              label-for="filter-input"
              label-cols-sm="3"
              label-align="left"
              label-size="sm"
            >
              <b-input-group size="sm">
                <b-form-input autocomplete="off"
                  id="filter-input"
                  v-model="filter1"
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
            <b-form-group
              label="تعداد در صفحه"
              label-for="per-page-select"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align="left"
              label-size="sm"
            >
              <b-form-select
                id="per-page-select"
                v-model="perPage1"
                :options="pageOptions"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </BCardText>
          <b-table
            :items="items1"
            :fields="fields1"
            :current-page="currentPage1"
            :per-page="perPage1"
            :filter="filter1"
            class="mb-0"
          >
            <template #emptyfiltered>
              <h5 class="text-danger">رکوردی برای نمایش وجود ندارد</h5>
            </template>
            <!-- name and userName -->
            <template #cell(name)="data">
              <div class="d-flex align-items-center">
                <div>
                  <div class="d-inline">
                    <b-avatar size="22" variant="light-secondary">
                      <feather-icon size="13" icon="UserIcon" />
                    </b-avatar>
                  </div>
                  <div class="font-weight-bolder d-inline">
                    {{ data.item.name }}
                  </div>
                  <div class="font-small-3 text-muted">
                    {{ data.item.userName }}
                  </div>
                </div>
              </div>
            </template>

            <!-- email -->
            <template #cell(email)="data">
              <div class="d-inline">
                <b-avatar size="22" variant="light-danger">
                  <feather-icon size="13" icon="MailIcon" />
                </b-avatar>
                <div class="font-weight-bolder d-inline">
                  {{ data.item.email }}
                </div>
              </div>
            </template>

            <!-- actions -->
            <template #cell(actions)="data">
              <BButton variant="danger" size="sm" @click="deleted(data)">
                <feather-icon size="13" icon="Trash2Icon" />
              </BButton>
            </template>
          </b-table>
          <BCardText>
            <div class="text-center my-2">
              <b-pagination
                align="center"
                v-model="currentPage1"
                :total-rows="totalRows1"
                :per-page="perPage1"
                size="sm"
                class="my-0"
                pills
              ></b-pagination>
            </div>
          </BCardText>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BBadge,
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
} from "bootstrap-vue";

export default {
  components: {
    BBadge,
    BButton,
    BInputGroupAppend,
    BInputGroup,
    BFormInput,
    BFormSelect,
    BFormGroup,
    BDropdownText,
    BPagination,
    BDropdown,
    BDropdownItem,
    BCardText,
    BCard,
    BTable,
    BAvatar,
    BImg,
    BRow,
    BCol,
  },
  computed: {
    totalRows: function () {
      return this.items.length;
    },
    totalRows1: function () {
      return this.items1.length;
    },
  },
  methods: {
    showData(a) {
      this.selectItem = true;
      this.title = "";
      this.title = a.item.title;
      (this.items1 = []), (this.items1 = a.item.sub);
    },
    addPermissonMethod() {
      (this.res = null),
        (this.find = []),
        (this.add = true),
        this.users.map((a) => {
          if (a.value != null && a.value == this.users1) {
            (this.res = a.text), (this.find = this.res.split("-"));
          }
        });
      if (this.find.length > 0) {
        this.items1.map((b) => {
          if (b.email == this.find[1]) {
            this.add = false;
          }
        });
      }

      if (this.add == true && this.find.length > 0) {
        this.items1.unshift({
          name: this.find[0],
          email: this.find[1],
          branch: this.find[3],
        });
        this.makeToast("success", this.find[0]);
      } else if (this.add == false && this.find.length > 0) {
        this.makeToast("danger", this.find[0]);
      } else if (this.find.length == 0) {
        this.makeToast("warning");
      }
    },
    makeToast(variant, name) {
      if (variant == "success") {
        this.$bvToast.toast(`مجوز دسترسی به ${name} با موفقیت انجام شد`, {
          title: "عملیات موفق",
          variant,
          solid: false,
          toaster: "b-toaster-top-center",
        });
      } else if (variant == "danger") {
        this.$bvToast.toast(`${name} دسترسی دارد، امکان افزودن مجدد نیست!`, {
          title: "خطا",
          variant,
          solid: false,
          toaster: "b-toaster-top-center",
        });
      } else if (variant == "warning") {
        this.$bvToast.toast("لطفا مقدار صحیح انتخاب نمایید", {
          title: "هشدار",
          variant,
          solid: false,
          toaster: "b-toaster-top-center",
        });
      }
    },
  },
  data() {
    return {
      selectItem: false,
      res: null,
      find: [],
      add: true,
      title: "",
      active: false,
      currentPage: 1,
      currentPage1: 1,
      perPage: 10,
      perPage1: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "نمایش بیشتر" }],
      users: [
        { value: null, text: "برای انتخاب کاربر کلیک کنید." },
        { value: 1, text: "مدیر سیستم-admin@dayaclub.com- " },
        { value: 2, text: "مهدی بیات-m.bayat@dayaclub.com- " },
        { value: 3, text: "سمانه بهمنی-s.bahmani@dayaclub.com- " },
        { value: 4, text: "آقای حسینی-hosseini@dayaclub.com- " },
      ],
      users1: null,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filter1: null,
      fields: [
        { key: "title", label: "عنوان مجوز", sortable: true },
        { key: "select", label: "انتخاب" },
      ],
      fields1: [
        { key: "name", label: "نام", sortable: true },
        { key: "email", label: "ایمیل", sortable: true },
        { key: "branch", label: "شعبه", sortable: true },
        { key: "actions", label: "عملیات" },
      ],
      items: [
        {
          title: "مدیر پذیرنده",
          sub: [
            {
              name: "آقای حسینی",
              email: "hosseini@dayaclub.com",
              branch: "",
            },
            {
              name: "مهدی بیات",
              email: "m.bayat@dayaclub.com",
              branch: "",
            },
            {
              name: "سمانه بهمنی",
              email: "s.bahmani@dayaclub.com",
              branch: "",
            },
          ],
        },
        {
          title: "ویرایش تاریخ فاکتور",
          sub: [
            {
              name: "مدیر سیستم",
              email: "admin@dayaclub.com",
              branch: "",
            },
            {
              name: "مهدی بیات",
              email: "m.bayat@dayaclub.com",
              branch: "",
            },
            {
              name: "سمانه بهمنی",
              email: "s.bahmani@dayaclub.com",
              branch: "",
            },
          ],
        },
        {
          title: "ثبت فاکتور برگشت از فروش",
          sub: [
            {
              name: "مدیر سیستم",
              email: "admin@dayaclub.com",
              branch: "",
            },
            {
              name: "آقای حسینی",
              email: "hosseini@dayaclub.com",
              branch: "",
            },
          ],
        },
        {
          title: "ثبت مشتری",
          sub: [
            {
              name: "مدیر سیستم",
              email: "admin@dayaclub.com",
              branch: "",
            },
          ],
        },
        {
          title: "مشاهده مشتری",
          sub: [
            {
              name: "مهدی بیات",
              email: "m.bayat@dayaclub.com",
              branch: "",
            },
          ],
        },
        {
          title: "لیست مشتری",
          sub: [
            {
              name: "آقای حسینی",
              email: "hosseini@dayaclub.com",
              branch: "",
            },
            {
              name: "مهدی بیات",
              email: "m.bayat@dayaclub.com",
              branch: "",
            },
            {
              name: "سمانه بهمنی",
              email: "s.bahmani@dayaclub.com",
              branch: "",
            },
          ],
        },
        {
          title: "ثبت فاکتور",
          sub: [],
        },
      ],
      items1: [],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/bootstrap-extended/include";
@import "~@core/scss/base/components/variables-dark";

.card-company-table ::v-deep td .b-avatar.badge-light-company {
  .dark-layout & {
    background: $theme-dark-body-bg !important;
  }
}
</style>
