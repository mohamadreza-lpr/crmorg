<template>
  <div>
        <b-row>
            <b-col
            v-for="item in statisticsItems"
            :key="item.index"
            xl="3"
            lg="3"
            sm="6"
            class="form-group"
            >
            <b-card :class="'bg-'+[item.bg]">
                <b-media no-body>
                <b-media-aside

                    class="mr-2"
                >
                    <b-avatar
                    size="53"
                    class="bg-white-op"
                    >
                    <feather-icon
                        size="27"
                        :icon="item.icon"
                        class="text-light"
                    />
                    </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                    <h4 class="font-weight-bolder text-light mb-0">
                    {{ item.title }}
                    </h4>
                    <b-card-text class="font-small-5 text-light mb-0">
                    {{ item.subtitle }}
                    <span
                    class="font-weight-bolder ml-1"
                    :class="item.deduction ? 'text-danger' : 'text-success'"
                    >
                    {{ item.payment }}
                    </span>
                    </b-card-text>
                </b-media-body>
                </b-media>
            </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'

export default {
  components: {
    BRow, 
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
  },
  data(){
    return{
        statisticsItems: [
            {
            icon: 'UserXIcon',
            bg: 'dark-skies',
            color: 'light-primary',
            title: '215',
            subtitle: 'میانگین طول عمر (روز)',
            },
            {
            icon: 'ShoppingBagIcon',
            bg: 'sea-blue',
            color: 'light-info',
            title: '113',
            subtitle: 'میانگین تازگی خرید (روز)',
            },
            {
            icon: 'ShoppingCartIcon',
            bg: 'inbox',
            color: 'light-danger',
            title: '982',
            subtitle: 'میانگین تکرار خرید',
            },
            {
            icon: 'PieChartIcon',
            bg: 'mine',
            title: '6,167,300',
            color: 'light-info',
            subtitle: 'میانگین حجم خرید',
            },
        ],
      dashboards : [
        {
          'name' : 'تعداد فروش',
          'count' : '123',
          'percent' : '74',
        }
      ]
    }
  }
}
</script>

<style scoped>
.bg-white-op { 
    background-color:#ffffff66 ;
}
.bg-dark-skies {
background: #141E30;  /* fallback for old browsers */
background: -webkit-linear-gradient(to left, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to left, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.bg-sea-blue {
background: #4b6cb7;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #182848, #4b6cb7);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #182848, #4b6cb7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.bg-inbox {
background: #fe8c00;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #f83600, #fe8c00);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #f83600, #fe8c00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.bg-mine {
background: #FF512F;  /* fallback for old browsers */
background: -webkit-linear-gradient(to left, #F09819, #FF512F);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to left, #F09819, #FF512F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>