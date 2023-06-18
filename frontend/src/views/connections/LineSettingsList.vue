<template>
  <div>
    <b-row class="match-height">
      <b-col v-for="item in items" :key="item.index" md="6" xl="6" lg="6">
        <b-card>
          <div class="row">
            <div class="col-6">
              <h4>خط پیام کوتاه</h4>
            </div>
            <div class="col-6 text-right">
              <b-badge variant="light-success">{{item.status}}</b-badge>
            </div>
          </div>
          <b-media no-body>
            <b-media-aside>
              <b-avatar rounded size="41" variant="light-primary">
                <feather-icon size="33" icon="MailIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="align-self-center">
              <div class="row">
                <div class="col-6">
                  <h4>
                    {{ item.title }}
                  </h4>
                </div>
                <div class="col-6 text-right">
                  <h4>{{item.desc}}</h4>
                </div>
              </div>

              <span
                >شماره : <strong>{{ item.number }}</strong></span
              >
              <div class="mt-2">
                <b-button
                  @click="
                    $router.push({
                      name: 'connections-editLineSettings',
                      params: { data: item, id: item.id },
                    })
                  "
                  size="sm"
                  variant="primary"
                  class="d-inline-block"
                  >
									<feather-icon icon='SettingsIcon' size='11'></feather-icon>
									تنظیمات</b-button
                >
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
        @click="$router.push({ name: 'connections-createLineSettings' })"
      >
        تعریف خط پیام کوتاه جدید
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
  BBadge,
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
    BBadge,
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
      items: [
        {
          id: 12,
          title: "خط پیام کوتاه دایا مد",
          number: 10000020430,
					status:'فعال',
					desc:'پیشفرض',
					type:'سامانه پیام کوتاه SMSONLINE.IR',
					service:true,
					default:false,
					active:true,
					api:"ACDF@$%&%35453423513fds",
					code:"123465",
					userName:"ali8765",
					password:"123456"
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>