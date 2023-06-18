<template>
    <div>
        <b-card class="border mt-4 pb-0">
            <b-media no-body>
                <b-media-body class="mb-0 mt-2">
                <h2 class="font-weight-bolder text-dark">
                    {{ info.title }}
                </h2>
                <b-card-text class="text-dark mb-0 font-small-5  font-weight-bold">
                    {{ info.description }}
                    <div class="text-right m-3">
                        <button class="btn bg-primary text-light">
                            <feather-icon
                            size="17"
                            :icon="info.icon"
                            class="text-light"
                            />
                            | 
                            {{info.titleButton}}
                            
                        </button>
                    </div>
                </b-card-text>
                </b-media-body>
                <b-media-aside 
                class="mr-2"
                >
                <img style="object-fit:cover; transform:translateY(-69px)" width="275" height="275" :src="info.imageAddress" :alt="info.title">
                </b-media-aside>
            </b-media>
        </b-card>
    </div>
</template>
<script>
import {
  BCard, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BMediaBody,
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
        },
        data() {
            return {
                info :{
                    title: 'گزارش تحلیل رفتار خرید مشتریان',
                    titleButton: 'مشاهده گزارش',
                    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم  لازم است و برای شرایط فعلی تکنولوژی!',
                    imageAddress: require('@/assets/images/illustration/analytics2.png'),
                    icon: 'FileTextIcon',
                }
            }
        }
}
</script>
<style scoped>
.card .card-body {
    padding-bottom: 0px!important;
}
</style>