<template>
    <div>
        <b-row>
            <b-col
                v-for="dashboard in dashboards"
                :key="dashboard.index"
                xl="4"
                sm="4"
                
            >
                <BLink :to='{name : dashboard.route}'>
                    <b-card>
                        <b-media no-body>
                            <b-media-aside 
                            class="mr-2"
                            >
                            <b-avatar  rounded="lg" size='45' :variant='dashboard.bgColor'>
                                <feather-icon
                                size="33"
                                :icon="dashboard.icon"
                                />
                            </b-avatar>
                            </b-media-aside>
                            <b-media-body class="my-auto">
                            <h4 class="font-weight-bolder text-dark mb-0">
                                {{ dashboard.title }}
                            </h4>
                            <b-card-text class="mb-0 text-dark font-small-2 font-weight-bold">
                                {{ dashboard.subTitle }}
                            </b-card-text>
                            </b-media-body>
                            <b-media-aside 
                            class="mr-2 align-self-center"
                            >
                                <feather-icon
                                size="26"
                                icon="ChevronsLeftIcon"
                                class="text-dark"
                                />
                            </b-media-aside>
                        </b-media>
                    </b-card>
                </BLink>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import {
  BCard, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BMediaBody, BLink,
  BAvatar,
} from 'bootstrap-vue'

    export default {
        components: {
            BAvatar,
            BRow, 
            BCol,
            BCard,
            BCardText,
            BCardBody,
            BMedia,
            BMediaAside,
            BMediaBody,
            BLink
        },
        data(){
            return {
                dashboards : [
                    {
                        title : 'شعبه جدید',
                        bgColor : 'light-success',
                        route : 'merchants-create',
                        icon : 'CpuIcon',
                        subTitle : 'برای افزودن شعبه جدید از این منو اقدام کنید'
                    },
                    {
                        title : 'کاربران',
                        bgColor : 'light-primary',
                        route : 'merchants-users',
                        icon : 'UsersIcon',
                        subTitle : 'مشاهده ی کاربران شعب ثبت شده'
                    },
                    {
                        title : 'گزارشات',
                        bgColor : 'light-danger',
                        route: 'merchants-report',
                        icon : 'ActivityIcon',
                        subTitle : 'تحلیل و بررسی عملکرد شعب در زمان دلخواه'
                    },
                ]
            }
        }
    }
</script>

<style>
.bg-fog {
background-color: #0bab64;
background-image: linear-gradient(315deg, #2ead74 0%, #1eac6c 74%);
}
.bg-dull {
background-color: #29539b;
background-image: linear-gradient(315deg, #29539b 0%, #1e3b70 74%);
}
.bg-foo {
background-color: #6b2210;
background-image: linear-gradient(315deg, #6b2210 0%, #a65b31 74%);
}
</style>