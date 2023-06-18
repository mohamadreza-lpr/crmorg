<template>
    <div>
        <b-row v-if="dashboards.length > 0">
            <b-col
                v-for="dashboard in dashboards"
                :key="dashboard.index"
                xl="4"
                sm="4"
                
            >
                <BLink :to='{name : dashboard.route}'>
                    <b-card :class="dashboard.bgColor">
                        <b-media no-body>
                            <b-media-aside 
                            class="mr-2"
                            >
                                <feather-icon
                                size="65"
                                :icon="dashboard.icon"
                                class="text-light"
                                />
                            </b-media-aside>
                            <b-media-body class="my-auto">
                            <h4 class="font-weight-bolder text-light mb-0">
                                {{ dashboard.title }}
                            </h4>
                            <b-card-text class="mb-0 text-light font-small-2 font-weight-bold">
                                {{ dashboard.subTitle }}
                            </b-card-text>
                            <span class="bg-warning d-inline-block rounded px-1 text-light ">{{ dashboard.btn }}</span>
                            </b-media-body>
                            <b-media-aside 
                            class="mr-2 align-self-center"
                            >
                                <feather-icon
                                size="26"
                                icon="ChevronsLeftIcon"
                                class="text-light"
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
  BCard, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BMediaBody, BLink
} from 'bootstrap-vue'

    export default {
        components: {
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
                        title : 'پیشخوان مشتری',
                        bgColor : 'bg-fog',
                        route : 'dashboard-customer',
                        icon : 'UsersIcon',
                        subTitle : 'توضیحی در مورد پیشخوان',
                        btn: "اعلان جدید"
                    },
                    {
                        title : 'پیشخوان فروش',
                        bgColor : 'bg-dull',
                        route : 'dashboard-sale',
                        icon : 'ShoppingBagIcon',
                        subTitle : 'توضیحی در مورد پیشخوان',
                        btn: "اعلان جدید",
                    },
                    {
                        title : 'پیشخوان تحلیل',
                        bgColor : 'bg-foo',
                        route: 'dashboard-analysis',
                        icon : 'ActivityIcon',
                        subTitle : 'توضیحی در مورد پیشخوان',
                        btn: "بزودی"
                    },
                ]
            }
        }
    }
</script>

<style scoped>
.bg-fog {
    background: #4e54c8;
    background: -webkit-linear-gradient(to right, #8f94fb, #4e54c8);
    background: linear-gradient(to right, #8f94fb, #4e54c8);
}
.bg-dull {
    background: #457fca;
    background: -webkit-linear-gradient(to right, #5691c8, #457fca);
    background: linear-gradient(to right, #5691c8, #457fca);
}
.bg-foo {
    background: #2193b0;
    background: -webkit-linear-gradient(to right, #6dd5ed, #2193b0);
    background: linear-gradient(to right, #6dd5ed, #2193b0);
}
</style>