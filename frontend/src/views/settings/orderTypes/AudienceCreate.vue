<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <b-card title="تعریف نوع">
          <b-media no-body class="align-items-center">
            <b-media-aside class="align-self-center">
              <b-avatar rounded size="37" variant="light-secondary">
                <feather-icon size="27" icon="SlackIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h5>
                <label for="title">نام</label>
                <b-form-input autocomplete="off" type="text" id="title" v-model="title" />
              </h5>
            </b-media-body>
          </b-media>
          <div class="text-right">
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="success"
            >
              ذخیره
            </b-button>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BFormInput,
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
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
export default {
  components: {
    BFormInput,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BCard,
    BCardText,
    BButton,
    BCardBody,
    BCardTitle,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      title: "",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>