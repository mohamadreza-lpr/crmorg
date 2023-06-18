<template>
  <div>
    <b-row class="match-height">
      <b-col v-for="(type, index) in types" :key="type.index" md="6" lg="4">
        <b-card title="نوع های فاکتور برگشتی">
          <b-media no-body>
            <b-media-aside>
              <b-avatar rounded size="37" variant="light-danger">
                <feather-icon size="27" icon="FileMinusIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h5>
                {{ type.title }}
              </h5>
              <small>{{ type.number }}</small>
            </b-media-body>
            <div class="text-right">
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
                size="sm"
                @click="
                  $router.push({
                    name: 'settings-order-return-invoice-setting',
                    params: { type, index },
                  })
                "
              >
                تنظیمات
              </b-button>
            </div>
          </b-media>
        </b-card>
      </b-col>
    </b-row>
    <div class="text-center">
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        variant="success"
        size="lg"
        @click="$router.push({ name: 'settings-order-return-invoice-create' })"
      >
        تعریف نوع جدید
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
import Ripple from "vue-ripple-directive";

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
  directives: {
    Ripple,
  },
  data() {
    return {
      types: [
        {
          title: "نوع فاکتور برگشتی ",
          number: "#114325",
        },
        {
          title: "نوع فاکتور برگشتی شماره اول",
          number: "#65423",
        },
        {
          title: "نوع فاکتور برگشتی شماره دوم",
          number: "#54863",
        },
        {
          title: "نوع فاکتور برگشتی شماره سوم",
          number: "#5421",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>