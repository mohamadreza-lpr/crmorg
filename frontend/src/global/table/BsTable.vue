<template>
  <div>
    <b-card no-body class="card-company-table">
      <BCardText class="p-2 mb-0">
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
      </BCardText>
      <b-table
      responsive
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        class="mb-0"
        show-empty
      >
        <template #empty>
             <h5 class="text-center text-muted">رکوردی برای نمایش وجود ندارد</h5>
        </template>
        <template #emptyfiltered>
          <h5 class="text-center text-muted">رکوردی برای نمایش وجود ندارد</h5>
        </template>
        <template #head(selected)>
          <b-form-group>
            <b-form-checkbox @change="checkCheck" v-model="checkAll" value="true"/>
          </b-form-group>
        </template>
        <template #cell(selected)="data">
          <b-form-group>
            <b-form-checkbox @change="checkCheckChild" value="true" v-model="data.item.selected">
            </b-form-checkbox>
          </b-form-group>
        </template>

        <template #cell(twoPartName)="data">
          <div class="d-flex align-items-center">
            <div>
              <div class="d-inline">
                <b-avatar size="22" variant="light-secondary">
                  <feather-icon size="13" icon="UserIcon" />
                </b-avatar>
              </div>
              <div class="font-weight-bolder d-inline">
                {{ data.item.firstName }} {{ data.item.lastName }}
              </div>
            </div>
          </div>
        </template>

        <template #cell(twoPartNameWithUserName)="data">
          <div class="d-flex align-items-center">
            <div>
              <div class="d-inline">
                <b-avatar size="22" variant="light-secondary">
                  <feather-icon size="13" icon="UserIcon" />
                </b-avatar>
              </div>
              <div class="font-weight-bolder d-inline">
                {{ data.item.firstName }} {{ data.item.lastName }}
              </div>
              <div class="font-small-3 text-muted">
                {{ data.item.userName }}
              </div>
            </div>
          </div>
        </template>

        <template #cell(status)="data">
          <div class="d-flex align-items-center">
            <div v-if="data.item.status == 1">
              <span class="badge bg-light-success px-1">فعال</span>
            </div>
            <div v-if="data.item.status == 2">
              <span class="badge bg-light-danger px-1">غیرفعال</span>
            </div>
            <div v-if="data.item.status == 3">
              <span class="badge bg-light-warning px-1">در انتظار</span>
            </div>
          </div>
        </template>

        <template #cell(uses)="data">
          <div class="d-flex align-items-center">
            <div v-if="data.item.uses == 1">
              <span class="badge bg-light-success px-1">استفاده نشده</span>
            </div>
            <div v-if="data.item.uses == 2">
              <span class="badge bg-light-danger px-1">استفاده شده</span>
            </div>
            <div v-if="data.item.uses == 3">
              <span class="badge bg-light-secondary px-1">نامشخص</span>
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

        <!-- title -->
        <template #cell(title)="data">
          <div class="d-flex align-items-center">
            <div>
              <div class="d-inline">
                <b-avatar size="22" variant="light-secondary">
                  <feather-icon size="13" icon="ZapIcon" />
                </b-avatar>
              </div>
              <div class="font-weight-bolder d-inline">
                {{ data.item.title }}
              </div>
            </div>
          </div>
        </template>

        <!-- level -->
        <template #cell(level)="data">
          <span v-for="i in data.item.level" :key="i.index">
            <feather-icon stroke="orange" size="15" icon="StarIcon" />
          </span>
        </template>

        <!-- actionsMerchantsList -->
        <template #cell(actionsMerchantsList)="data">
          <b-dropdown id="dropdown-right" right variant="white">
            <template #button-content>
              <feather-icon size="13" icon="MenuIcon" />
            </template>
            <b-dropdown-item>ویرایش</b-dropdown-item>
            <b-dropdown-item href="#">حذف</b-dropdown-item>
            <b-dropdown-item
              @click="
                $router.push({
                  name: 'merchants-users',
                  params: {
                    users: data.item.users,
                    id: data.item.id,
                    name: data.item.name,
                  },
                })
              "
              >کاربران</b-dropdown-item
            >
            <b-dropdown-item
              @click="
                $router.push({
                  name: 'merchants-rewards',
                  params: {
                    rewards: data.item.rewards,
                    id: data.item.id,
                    name: data.item.name,
                  },
                })
              "
              >پاداش ها</b-dropdown-item
            >
          </b-dropdown>
        </template>

        <!-- actionsMerchantsUsers -->
        <template #cell(actionsMerchantsUsers)="data">
          <b-dropdown id="dropdown-right" right variant="white">
            <template #button-content>
              <feather-icon size="13" icon="MenuIcon" />
            </template>
            <b-dropdown-item
              @click="
                $router.push({
                  name: 'merchants-users-edit',
                  params: {
                    users: data.item,
                    id: Id,
                  },
                })
              "
              >ویرایش</b-dropdown-item
            >
            <b-dropdown-item href="#">بازنشانی رمزعبور</b-dropdown-item>
            <b-dropdown-item href="#">حذف</b-dropdown-item>
          </b-dropdown>
        </template>

        <!-- actionsMerchantsRewards -->
        <template #cell(actionsMerchantsRewards)="data">
          <b-button
            variant="outline-warning"
            size="sm"
            @click="
              $router.push({
                name: 'merchants-rewards-edit',
                params: {
                  rewards: data.item,
                  id: Id,
                  name: name,
                },
              })
            "
            >ویرایش</b-button
          >
        </template>

        <!-- actionsMerchantsListUsers -->
        <template #cell(actionsMerchantsListUsers)="data">
          <b-dropdown id="dropdown-right" right variant="white">
            <template #button-content>
              <feather-icon size="13" icon="MenuIcon" />
            </template>
            <b-dropdown-item
              @click="
                $router.push({
                  name: 'merchants-users-edit-user',
                  params: {
                    user: data.item,
                    id: data.item.id,
                  },
                })
              "
              >ویرایش</b-dropdown-item
            >
            <b-dropdown-item href="#">بازنشانی رمز عبور</b-dropdown-item>
            <b-dropdown-item href="#">حذف</b-dropdown-item>
          </b-dropdown>
        </template>

        <!-- actionsCustomersManagementList -->
        <template #cell(actionsCustomersManagementList)="data">
          <b-dropdown id="dropdown-right" right variant="white">
            <template #button-content>
              <feather-icon size="13" icon="MenuIcon" />
            </template>
            <b-dropdown-item
              @click="
                $router.push({
                  name: 'customers-editPerson',
                  params: {
                    data: data.item,
                    id: data.item.id,
                  },
                })
              "
              >ویرایش</b-dropdown-item
            >
            <b-dropdown-item href="#">حذف</b-dropdown-item>
          </b-dropdown>
        </template>

        <!-- actionsCustomersManagementTags -->
        <template #cell(actionsCustomersManagementTags)="data">
          <b-dropdown id="dropdown-right" right variant="white">
            <template #button-content>
              <feather-icon size="13" icon="MenuIcon" />
            </template>
            <b-dropdown-item
              @click="
                $router.push({
                  name: 'customers-editTag',
                  params: {
                    data: data.item,
                    id: data.item.id,
                  },
                })
              "
              >ویرایش</b-dropdown-item
            >
            <b-dropdown-item href="#">حذف</b-dropdown-item>
          </b-dropdown>
        </template>

        <!-- actionsProductsManagementList -->
        <template #cell(actionsProductsManagementList)="data">
          <b-dropdown id="dropdown-right" right variant="white">
            <template #button-content>
              <feather-icon size="13" icon="MenuIcon" />
            </template>
            <b-dropdown-item
              @click="
                $router.push({
                  name: 'products-editProduct',
                  params: {
                    data: data.item,
                    id: data.item.id,
                  },
                })
              "
              >ویرایش</b-dropdown-item
            >
            <b-dropdown-item href="#">حذف</b-dropdown-item>
          </b-dropdown>
        </template>

        <!-- actionsLotteryList -->
        <template #cell(actionsLotteryList)="data">
          <b-dropdown id="dropdown-right" right variant="white">
            <template #button-content>
              <feather-icon size="13" icon="MenuIcon" />
            </template>
            <b-dropdown-item
              @click="
                $router.push({
                  name: 'lottery-edit',
                  params: {
                    data: data.item,
                    id: data.item.id,
                  },
                })
              "
              >ویرایش</b-dropdown-item
            >
            <b-dropdown-item href="#">حذف</b-dropdown-item>
          </b-dropdown>
        </template>

        <template #cell(actionsQuestionsList)="data">
          <b-dropdown id="dropdown-right" right variant="white">
            <template #button-content>
              <feather-icon size="13" icon="MenuIcon" />
            </template>
            <b-dropdown-item
              @click="
                $router.push({
                  name: 'survey-questions-edit',
                  params: {
                    data: data.item,
                    id: data.item.id,
                  },
                })
              "
              >ویرایش</b-dropdown-item
            >
            <b-dropdown-item               
              @click="
                $router.push({
                  name: 'survey-options',
                  params: {
                    data: data.item,
                    id: data.item.id,
                  },
                })
              ">گزینه ها</b-dropdown-item
            >
            <b-dropdown-item href="#">حذف</b-dropdown-item>
          </b-dropdown>
        </template>

        <template #cell(actionsRulesList)="data">
          <b-dropdown id="dropdown-right" right variant="white">
            <template #button-content>
              <feather-icon size="13" icon="MenuIcon" />
            </template>
            <b-dropdown-item
              @click="
                $router.push({
                  name: 'survey-rules-edit',
                  params: {
                    data: data.item,
                    id: data.item.id,
                  },
                })
              "
              >ویرایش</b-dropdown-item
            >
            <b-dropdown-item href="#">حذف</b-dropdown-item>
          </b-dropdown>
        </template>

        <template #cell(actionsSatisfactionsList)="data">
          <b-dropdown id="dropdown-right" right variant="white">
            <template #button-content>
              <feather-icon size="13" icon="MenuIcon" />
            </template>
            <b-dropdown-item
              @click="
                $router.push({
                  name: 'survey-satisfactions-edit',
                  params: {
                    data: data.item,
                    id: data.item.id,
                  },
                })
              "
              >ویرایش</b-dropdown-item
            >
            <b-dropdown-item href="#">حذف</b-dropdown-item>
          </b-dropdown>
        </template>

        <template #cell(actionsQuestionsOptionsList)="data">
          <b-dropdown id="dropdown-right" right variant="white">
            <template #button-content>
              <feather-icon size="13" icon="MenuIcon" />
            </template>
            <b-dropdown-item
              @click="
                $router.push({
                  name: 'survey-options-edit',
                  params: {
                    data: data.item,
                    id: data.item.id,
                  },
                })
              "
              >ویرایش</b-dropdown-item
            >
            <b-dropdown-item href="#">حذف</b-dropdown-item>
          </b-dropdown>
        </template>

        <template #cell(relatedActSurveyReslt)="data">
            <b-button
              @click="
                $router.push({
                  name: 'sales-list',
                  params: {
                    data: data.item,
                    id: data.item.id,
                  },
                })
              "
             size='sm' variant='outline-secondary'>
              <feather-icon size='15' icon='FileIcon'></feather-icon>
            </b-button>
        </template>

        <template #cell(actionsSurveyResultsList)="data">
            <b-button
            @click="
                $router.push({
                  name: 'survey-result',
                  params: {
                    data: data.item,
                    id: data.item.id,
                  },
                })
              "
             size='sm' variant='primary'>
              مشاهده
            </b-button>
        </template>

        <template #cell(download)>
            <b-button size='sm' variant='outline-primary'>
              <feather-icon icon="DownloadIcon" size='16'></feather-icon>
            </b-button>
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
  BFormCheckbox,
} from "bootstrap-vue";
export default {
  props: {
    items: Array,
    fields: Array,
    perPage: Number,
    pageOptions: Array,
  },
    watch:{
       items: {
          handler: function(newVal,oldVal) {
            this.items= newVal
          },
          deep: true
        }
    },
  data() {
    return {
      checkAll:false,
    currentPage:1,
      filter: null,
    };
  },

  computed: {
    totalRows: function () {
      if(this.items) return this.items.length;
      else return 0
    },
  },
  components: {
    BFormCheckbox,
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
  methods :{
    checkCheck() {
      if(this.checkAll) {
        this.items.map((x)=> {
          x.selected=true
        })
      }
      else{
        this.items.map((x)=> {
          x.selected=false
        })
      }
    },
    checkCheckChild(){
      let count = 0
      this.items.map((x)=> {
        if(x.selected) count++
      })
      if(count == this.items.length) this.checkAll=true
      else this.checkAll=false

    }
  },
};
</script>

<style lang="scss">
table {
    min-height: 200px;
}
</style>