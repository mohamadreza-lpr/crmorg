<template>
  <div>
    <CreateUser :active="active" />
    <b-card no-body class="card-company-table">
      <BCardText class="p-2 mb-0">
        <div class="row d-flex justify-content-between">
          <div class="col-md-2">
            <b-button @click="active = true" size="sm" variant="primary">
              <feather-icon size="17" icon="UserPlusIcon" />
              <span class="d-inline-block ml-1">کاربر جدید</span>
            </b-button>
          </div>
          <div class="col-md-5 text-left justify-content-start">
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
          <div class="col-md-5">
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
      </BCardText>
      <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        class="mb-0"
      >
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
        <template #cell(actions)>
          <b-dropdown id="dropdown-right" right variant="white">
            <template #button-content>
              <feather-icon size="13" icon="MenuIcon" />
            </template>
            <b-dropdown-item href="#">ویرایش</b-dropdown-item>
            <b-dropdown-item href="#">بازنشانی رمز عبور</b-dropdown-item>
            <b-dropdown-item href="#">حذف</b-dropdown-item>
          </b-dropdown>
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
</template>

<script>

import CreateUser from './CreateUser.vue'
import {
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
  // setup() {
  //   const active = ref(false)
  //   return {
  //   }
  // },
  components: {
    CreateUser,

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
  },
  data() {
    return {
      active : false,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "نمایش بیشتر" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      fields: [
        { key: "name", label: "نام", sortable: true },
        { key: "email", label: "ایمیل", sortable: true },
        // { key: "userName", label: "نام کاربری" , sortable: true},
        { key: "branch", label: "شعبه", sortable: true },
        { key: "type", label: "نوع", sortable: true },
        { key: "actions", label: "عملیات" },
      ],
      items: [
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: true,
          age: 40,
          name: "آقای حسینی",
          email: "hosseini@elanusclub.com",
          userName: "user-hosseini",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: false,
          age: 21,
          name: "سمانه بهمنی",
          email: "s.bahmani@elanusclub.com",
          userName: "user-bahmani",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: false,
          age: 89,
          name: "مدیر سیستم",
          email: "admin@elanusclub.com",
          userName: "user-admin",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: true,
          age: 38,
          name: "مهدی بیات",
          email: "m.bayat@elanusclub.com",
          userName: "user-bayat",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: true,
          age: 40,
          name: "آقای حسینی",
          email: "hosseini@elanusclub.com",
          userName: "user-hosseini",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: false,
          age: 21,
          name: "سمانه بهمنی",
          email: "s.bahmani@elanusclub.com",
          userName: "user-bahmani",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: false,
          age: 89,
          name: "مدیر سیستم",
          email: "admin@elanusclub.com",
          userName: "user-admin",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: true,
          age: 38,
          name: "مهدی بیات",
          email: "m.bayat@elanusclub.com",
          userName: "user-bayat",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: true,
          age: 40,
          name: "آقای حسینی",
          email: "hosseini@elanusclub.com",
          userName: "user-hosseini",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: false,
          age: 21,
          name: "سمانه بهمنی",
          email: "s.bahmani@elanusclub.com",
          userName: "user-bahmani",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: false,
          age: 89,
          name: "مدیر سیستم",
          email: "admin@elanusclub.com",
          userName: "user-admin",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: true,
          age: 38,
          name: "مهدی بیات",
          email: "m.bayat@elanusclub.com",
          userName: "user-bayat",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: true,
          age: 40,
          name: "آقای حسینی",
          email: "hosseini@elanusclub.com",
          userName: "user-hosseini",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: false,
          age: 21,
          name: "سمانه بهمنی",
          email: "s.bahmani@elanusclub.com",
          userName: "user-bahmani",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: false,
          age: 89,
          name: "مدیر سیستم",
          email: "admin@elanusclub.com",
          userName: "user-admin",
          branch: "تعریف نشده",
          type: "مدیر",
        },
        {
          avatarIcon: "MonitorIcon",
          avatarColor: "light-primary",
          isActive: true,
          age: 38,
          name: "مهدی بیات",
          email: "m.bayat@elanusclub.com",
          userName: "user-bayat",
          branch: "تعریف نشده",
          type: "مدیر",
        },
      ],
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
