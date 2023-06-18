<template>
    <div>
        <b-card>
            <h5>مشتری : <a @click='$router.push()' class="text-primary">{{data.name}}</a></h5>
            <div class="row">
                <div class="col-md-4 text-center">
                    <b-avatar size="53" variant="light-primary">
                    <feather-icon size="33" icon="CalendarIcon" />
                    </b-avatar>
                    <h6 class="text-muted mt-1">تاریخ اجرا</h6>
                    <h6>
                        ‫دیروز پنج شنبه، ساعت 13:15
                    </h6>
                </div>
                <div class="col-md-4 text-center">
                    <b-avatar size="53" variant="light-success">
                    <feather-icon size="33" icon="FileIcon" />
                    </b-avatar>
                    <h6 class="text-muted mt-1">فاکتور</h6>
                    <a>
                        فاکتور مرتبط
                    </a>
                </div>
                <div class="col-md-4 text-center">
                    <b-avatar size="53" variant="light-danger">
                    <feather-icon size="33" icon="CpuIcon" />
                    </b-avatar>
                    <h6 class="text-muted mt-1">شعبه</h6>
                    <h6>
                        تعریف نشده
                    </h6>
                </div>
            </div>
            <b-tabs pills card>
                <b-tab title="نتایج نظر سنجی" active>
                    <b-card-text>
                        <div class="row">
                            <div class="col-md-6">
                                <h6>
                                    میانگین رضایت مشتری: 
                                </h6>
                                <vue-apex-charts
                                type="radialBar"
                                height="245"
                                class="my-2"
                                :options="chartOptions"
                                :series="series"
                                />
                            </div>
                            <div class="col-md-6">
                                <h6>
                                    ارزیابی نهایی: 
                                </h6>
                                <h4>
                                    <b-badge variant='success'>راضی و ترویج دهنده</b-badge>
                                </h4>
                            </div>
                        </div>
                    </b-card-text>
                </b-tab>
                <b-tab title="انتقادات و پیشنهادات">
                    <b-card-text>
                     <h6 class="text-muted">رکوردی برای نمایش وجود ندارد</h6>
                    </b-card-text>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import {BCard,BTab,BTabs,BAvatar,BBadge} from 'bootstrap-vue'
    export default {
        components :{
            BCard,BAvatar,
            BTabs,BTab,VueApexCharts,BBadge
        },
        data() {
            return {
                data: this.$route.params.data,
                series: [76],
                chartOptions: {
                    chart: {
                    type: 'radialBar',
                    offsetY: -20,
                    sparkline: {
                        enabled: true
                    }
                    },
                    plotOptions: {
                    radialBar: {
                        startAngle: -90,
                        endAngle: 90,
                        track: {
                        background: "#e7e7e7",
                        strokeWidth: '97%',
                        margin: 5, // margin is in pixels
                        dropShadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            color: '#999',
                            opacity: 1,
                            blur: 2
                        }
                        },
                        dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            offsetY: -2,
                            fontSize: '22px'
                        }
                        }
                    }
                    },
                    grid: {
                    padding: {
                        top: -10
                    }
                    },
                    fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        shadeIntensity: 0.4,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 53, 91]
                    },
                    },
                    labels: ['Average Results'],
                },
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>