<template>
  <b-card
    v-if="data"
    class="card-congratulation-medal bg-primary"
  >
    <!-- <h5>Congratulations 🎉 {{ data.name }}!</h5> -->
    <h5 class="text-light">گزارش تحلیل فروش 🎉 کاربر کاربر !</h5>
    <b-card-text class="font-small-3 text-light">
      مشاهده تحلیل و بررسی دقیق میزان فروش شما
    </b-card-text>
    <h3 class="mb-75 pt-50 text-light">
      <b-link class="text-light">${{ kFormatter(data.saleToday) }}</b-link>
    </h3>
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="light"
    >
      مشاهده تحلیل فروش
    </b-button>
    <!-- <b-img
      :src="require('@/assets/images/illustration/badge.svg')"
      class="congratulation-medal"
      alt="Medal Pic"
    /> -->
  </b-card>
</template>

<script>
//  if you want to use BImg, you must to import it
import {
  BCard, BCardText, BLink, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { kFormatter } from '@core/utils/filter'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    // BImg,
    BButton,
  },
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    kFormatter,
  },
}
</script>
