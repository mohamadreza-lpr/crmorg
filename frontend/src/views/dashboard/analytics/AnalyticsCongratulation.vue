<template>
  <div>
    <!-- <b-card
      v-if="data"
      text-variant="center"
      class="card card-congratulations"
    >
      <b-img
        :src="require('@/assets/images/elements/decore-left.png')"
        class="congratulations-img-left"
      />
      <b-img
        :src="require('@/assets/images/elements/decore-right.png')"
        class="congratulations-img-right"
      />

      <b-avatar
        variant="primary"
        size="70"
        class="shadow mb-2"
      >
        <feather-icon
          size="28"
          icon="AwardIcon"
        />
      </b-avatar>
      <h1 class="mb-1 mt-50 text-white">
        Congratulations {{ data.name }},
      </h1>
      <b-card-text class="m-auto w-75">
        You have done <strong>{{ data.saleToday }}%</strong> more sales today. Check your new badge in your profile.
      </b-card-text>
    </b-card> -->
    <b-card 
      text-variant="center"
      class="card card-congratulations"
    >

      <b-avatar
        variant="primary"
        size="49"
        class="shadow"
      >
        <feather-icon
          size="27"
          icon="MessageCircleIcon"
        />
      </b-avatar>
      <h3 class="mb-0 mt-50 text-white">
        اعلان یادداشت ها
      </h3>
      <b-card-text class="m-auto w-75">
        <p class="mb-0">
        آخرین یادداشت های ثبت شده را بررسی نمایید
        </p>
        <button class="btn bg-white text-dark btn-sm mt-1">
           برو به یادداشت ها
           <feather-icon
            size="11"
            icon="ArrowLeftIcon"
          />
        </button>
      </b-card-text>
    </b-card>

  </div>
</template>

<script>
import {
  BCard, BImg, BAvatar, BCardText,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BAvatar,
    BImg,
    BCardText,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
