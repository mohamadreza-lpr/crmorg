<template>
  <div>
    <b-row class="match-height">
      <b-col v-for="item in items" :key="item.index" md="6" xl="6" lg="6">
        <b-card>
          <div class="row form-group">
            <div class="col-6">
              <h4>{{ item.title }}</h4>
            </div>
            <div class="col-6 text-right">
              <b-badge variant="light-success">{{ item.status }}</b-badge>
            </div>
          </div>
          <b-media no-body>
            <b-media-aside>
              <b-avatar rounded size="41" variant="light-primary">
                <feather-icon size="33" icon="CheckCircleIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="align-self-center">
              <h4>
                {{ item.name }}
              </h4>

              <span
                ><strong>{{ item.index }}</strong></span
              >
              <div class="d-flex justify-content-between mt-1">
                <b-button
                  @click="
                    $router.push({
                      name: 'survey-settings',
                      params: { data: item, id: item.id },
                    })
                  "
                  size="sm"
                  variant="primary"
                  class="d-inline-block"
                  ><feather-icon icon="SettingsIcon" size="14"></feather-icon>
                  تنظیمات</b-button
                >
                <b-button
                  @click="
                    $router.push({
                      name: 'survey-questions',
                      params: { data: item, id: item.id },
                    })
                  "
                  size="sm"
                  variant="info"
                  class="d-inline-block"
                  ><feather-icon icon="FileTextIcon" size="14"></feather-icon>
                  سوالات</b-button
                >
                <b-button
                  @click="
                    $router.push({
                      name: 'survey-results',
                      params: { data: item, id: item.id },
                    })
                  " size="sm" variant="dark" class="d-inline-block"
                  ><feather-icon icon="PocketIcon" size="14"></feather-icon>
                  نتایج</b-button
                >
                <b-button
                  @click="
                    $router.push({
                      name: 'survey-rules',
                      params: { data: item, id: item.id },
                    })
                  "
                  size="sm"
                  variant="light"
                  class="d-inline-block"
                  ><feather-icon icon="ActivityIcon" size="14"></feather-icon>
                  قوانین ارزیابی</b-button
                >
              </div>
            </b-media-body>
          </b-media>
        </b-card>
      </b-col>
    </b-row>
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
          title: "از پیش تعریف شده",
          name: "نظر سنجی شاخص خالص ترویج کنندگان",
          index: "PurchaseSurvey",
          status: "فعال",
          type: "عمومی",
          offType: "درصد",
          expireType: "روز بعد از تخفیف",
          expire: 4,
          desc: "GUESTCARD_COUPON",
          service: true,
          active: true,
          limitCount: 12,
          limitCustomer: 11,
          startDate: "03/04/1400",
          expireDate: "03/06/1400",
          minPriceFactor: 1200000,
          off: 20,
          limitOff: "30",
          users: [
            {
              id:12,
              name: "آزاده بیگی",
              code: "09127597840",
              branch:'',
              rateDate: "",
              result:9,
              finallResult:'نتیجه نهایی',
            },
          ],
          questions: [
            {
              id: 1,
              question:
                "آیا شما محصول یا سازمان ما را به فرد یا سازمان دیگری معرفی می کنید؟",
              type: "",
              calculating: "",
              order: 0,
              weight: "",
              status: 1,
              options: [
                {
                  id: 1,
                  option: "عنوان گزینه",
                  order: 0,
                  weight: "",
                  status: 1,
                },
              ],
            },
          ],
          rules: [
            {
              id: 3,
              rule: "عنوان قانون ارزیابی",
              from: 8,
              to: 11,
              color: "#444876",
              desc: "توضیحات قانون ارزیابی",
            },
          ],
          satisfactions: [
            {
              id: 3,
              satisfaction: "عنوان دلیل",
              type: "نوع تستی",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>