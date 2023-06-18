<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <h5 class="mb-2">
                    {{ question.title }}
                </h5>
                <div v-if="question.choices.length > 0">
                    <div
                        class="form-group"
                        v-for="(choice, index) in question.choices"
                        :key="choice.id"
                    >
                        <h5 class="text-dark">
                            <small>{{ choice.title }}</small>
                        </h5>
                        <b-progress
                            :value="percentage(choice.users_count, usersCount)"
                            max="100"
                            :variant="getVariant(index)"
                            height="5px"
                            class="mt-25"
                        />
                    </div>
                    <div class="row mt-3 mb-2">
                        <div class="col-3 text-center">
                            <feather-icon size="24" icon="UsersIcon" />
                            <h5 class="mt-1">
                                {{ usersCount }}
                            </h5>
                            <h5>
                                <small>شرکت کنندگان</small>
                            </h5>
                        </div>
                        <div
                            class="col-3 text-center"
                            v-for="(choice, index) in question.choices"
                            :key="choice.id"
                        >
                            <feather-icon
                                size="24"
                                icon="UsersIcon"
                                :stroke="getColor(index)"
                            />
                            <h5 class="mt-1">
                                {{ choice.users_count }}
                            </h5>
                            <h5>
                                <small>{{ choice.title }}</small>
                            </h5>
                        </div>
                    </div>
                </div>
                <div class="text-center bg-light p-2" v-else>
                    <h5 class="mb-0 text-muted">موردی یافت نشد</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { BProgress } from "bootstrap-vue";

export default {
    components: {
        BProgress,
    },
    props: ["question"],
    computed: {
        usersCount() {
            return _.sumBy(this.question.choices, (item) => {
                return item.users_count;
            });
        },
    },
    methods: {
        percentage(partialValue, totalValue) {
            return (100 * partialValue) / totalValue;
        },
        getVariant(index) {
            const colors = [
                "success",
                "info",
                "warning",
                "danger",
                "primary",
                "secondary",
                "dark",
            ];

            return colors[index];
        },
        getColor(index) {
            const colors = [
                "#28c76f",
                "#00cfe8",
                "#ff9f43",
                "#ea5455",
                "#7367f0",
                "#82868b",
                "#4b4b4b",
            ];

            return colors[index];
        },
    },
};
</script>