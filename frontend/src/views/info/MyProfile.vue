<template>
  <div>
    <b-row>
      <b-col col="12" sm="12" xs="12" md="6" lg="4" xl="4">
        <b-card bg-variant="light-primary">
          <h4 class="text-dark">
            <feather-icon icon="UserIcon" size="14" class="mr-1"></feather-icon
            >{{ userInfo.fName }} {{ userInfo.lName }}
          </h4>
          <h5 class="text-dark font-weight-light">
            <feather-icon icon="MailIcon" size="14" class="mr-1"></feather-icon
            >{{ userInfo.email }}
          </h5>
          <h5 class="text-dark font-weight-light">
            <feather-icon
              icon="PhoneCallIcon"
              size="14"
              class="mr-1"
            ></feather-icon
            >{{ userInfo.mobileNumber }}
          </h5>
          <h5 class="text-dark font-weight-light">
            <feather-icon icon="HashIcon" size="14" class="mr-1"></feather-icon>
            {{ userInfo.customerCode }}
          </h5>
          <b-card bg-variant='light'>
            <h6>
              <feather-icon icon="GridIcon" size="14"></feather-icon> گروه های
              اختصاص یافته:
            </h6>
            <ul v-for="g in userInfo.groups" :key="g.index">
              <li>{{ g.title }}</li>
              <div class="my-0" v-if="g.child">
                <ul v-for="ch in g.child" :key="ch.index">
                  <li>{{ ch }}</li>
                </ul>
              </div>
            </ul>
          </b-card>
        </b-card>
      </b-col>
      <b-col col="12" sm="12" xs="12" md="6" lg="8" xl="8">
        <b-card bg-variant="light">
          <h6>برچسب ها</h6>
          <h5 class="d-inline mr-1" v-for="l in userInfo.labels" :key="l.index">
            <b-badge variant="warning">{{ l }}</b-badge>
          </h5>
          <hr>
          <b-row class="form-group" v-for='g in userInfo.general' :key="g.index">
            <b-col col='6'>{{g.label}} :</b-col>
            <b-col col='6' class="text-right">{{g.value}}</b-col>
          </b-row>
          <h5 class="font-weight-light">
            <feather-icon
              icon="MapPinIcon"
              size="14"
              class="mr-1"
              stroke='indianred'
            ></feather-icon
            ><span class="text-muted">آدرس: </span>{{ userInfo.address }}
          </h5>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol, BCard, BBadge } from "bootstrap-vue";
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BBadge,
  },
  data() {
    return {
      userInfo: {
        fName: "آقای",
        lName: "حسینی",
        email: "aqayHoseyni@elanus.co",
        customerCode: "XA4578",
        mobileNumber: "09123456789",
        phoneNumber: "09123456789",
        groups: [
          { title: "گروه اول" },
          { title: "گروه دوم" },
          { title: "گروه سوم", child: ["زیرمجموعه سوم", "زیرمجموعه سوم دومی"] },
          { title: "گروه چهارم" },
          { title: "گروه پنجم" },
        ],
        labels: ["برچسب ششم", "برچسب پنجم", "برچسب چهارم","برچسب سوم", "برچسب دوم", "برچسب اول"],
        general:[
          {key:'customerCard',label:'کارت مشتری',value:'card45781'},
          {key:'idCard',label:'کد ملی',value:'0027985123'},
          {key:'personalCode',label:'کد پرسنلی',value:'MN78412'},
          {key:'website',label:'وبسایت',value:'elanus.com'},
          {key:'birthday',label:'تاریخ تولد',value:'13/01/78'},
          {key:'anniversary',label:'سالگرد ازدواج',value:'13/01/78'},
          {key:'relation',label:'وضعیت تاهل',value:'مجرد'},
          {key:'partnerBirthDay',label:'تاریخ تولد همسر',value:'13/01/78'},
          {key:'sex',label:'جنسیت',value:'خانم'},
          {key:'education',label:'تحصیلات',value:'لیسانس'},
          {key:'howToKnow',label:'نحوه آشنایی',value:'از طریق اینترنت'},
          {key:'jointDate',label:'تاریخ عضویت',value:'13/01/78'},
          {key:'branch',label:'نام شعبه',value:'شعبه ونک'},
          {key:'postalCode',label:'کد پستی',value:'1987549231'},
        ],
        address:'کشور- استان- شهر- منطقه- نام خیابان- نام کوچه- شماره پلاک- شماره واحد',


      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>