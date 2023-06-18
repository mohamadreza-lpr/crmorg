<template>
  <div>
    <b-row class="match-height">
      <b-col v-for="level in levels" :key="level.index" md="6" lg="4">
        <b-card title="سطح وفاداری">
          <b-media no-body>
            <b-media-aside class="align-self-center">
              <b-avatar rounded size="41" variant="light-warning">
                <feather-icon stroke='gold' size="33" icon="StarIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="align-self-center">
              <h4>
                {{ level.title }}
              </h4>
              <div class="row">
                  <div class="col-6">
                    <span>از امتیاز : <strong>{{level.min}}</strong></span>
                  </div>
                  <div class="col-6 text-right">
                    <span>تا امتیاز : <strong>{{level.max}}</strong></span> 
                  </div>
              </div>
              <div class="d-flex justify-content-between mt-1">
                  <b-button @click="$router.push({ name: 'loyalty-levels-editRewardsLoyalty', params :{data:level} })" size='sm' variant='primary' class="d-inline-block">پاداش دهی</b-button>
                  <b-button @click="$router.push({ name: 'loyalty-levels-editLoyaltyLevel', params :{data:level} })" size='sm' variant='info' class="d-inline-block">ویرایش</b-button>
                  <b-button size='sm' variant='light' class="d-inline-block">حذف</b-button>
              </div>
            </b-media-body>
          </b-media>
        </b-card>
      </b-col>
    </b-row>
    <div class="text-center">
      <b-button
        variant="success"
        size="lg"
        @click="$router.push({ name: 'loyalty-levels-createNewLevel' })"
      >
        تعریف سطح جدید
      </b-button>
    </div>
  </div>
</template>

<script>
import {
  BMediaBody,
  BMedia,
  BMediaAside,
  BAvatar,
  BCard,
  BCardText,
  BButton,
  BRow,
  BCol,
  BImg,
  BCardBody,
  BCardTitle,
  BCardSubTitle,
  BLink,
} from "bootstrap-vue";

export default {
  components: {
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BCard,
    BCardText,
    BButton,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    BRow,
    BCol,
    BLink,
    BImg,
  },
  data() {
    return {
      levels: [
        {
        id:12,
          title: "CLASSIC",
          min: 1,
          max: 1000,
          off:10,
          credit:25,
          level:4,
          order:0,
          desc:"این یک متن تستی است",
        products : [
            { label: 'محصول1', value: '1' },
            { label: 'محصول2', value: '2' },
            { label: 'محصول3', value: '3' },
            { label: 'محصول4', value: '4' },
            { label: 'محصول5', value: '5' },
        ],
        coupons : [
            { label: '1کوپن', value: '1' },
            { label: 'کوپن2', value: '2' },
            { label: 'کوپن3', value: '3' },
            { label: 'کوپن4', value: '4' },
            { label: 'کوپن5', value: '5' },
        ],
        point : [
            { label: 'امتیاز  1', value: '1' },
            { label: 'امتیاز  2', value: '2' },
            { label: 'امتیاز  3', value: '3' },
            { label: 'امتیاز  4', value: '4' },
            { label: 'امتیاز  5', value: '5' },
        ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>