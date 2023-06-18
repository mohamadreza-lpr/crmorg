<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <b-card
          :title='headerText'
        >
          <b-media no-body>
            <b-media-aside>
              <b-avatar rounded size="37" variant="light-secondary">
                <feather-icon size="27" icon="SlackIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h5>
                <b-form-input autocomplete="off" 
                      type='text'
                      id="title"
                      v-model="type.title"
                  />
              </h5>
            </b-media-body>
          </b-media>
            <div class="text-right">
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="warning"
          >
            ذخیره تغییرات
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
  BCardBody,
  BCardTitle,
  BCardSubTitle,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  computed: {
   headerText() {
        return ' ویرایش نوع '+ ' ' +this.type.number;
    }
  },
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
    BCardSubTitle,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      type: this.$route.params.type
    };
  },
};
</script>

<style lang="scss" scoped>
</style>