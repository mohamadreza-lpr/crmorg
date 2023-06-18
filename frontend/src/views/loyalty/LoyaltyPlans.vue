<template>
    <div>
        <h2>برنامه های وفاداری</h2>
        <b-row>
            <b-col
                v-for="plan in plans"
                :key="plan.index"
                md="6"
                lg="4"
                xl="4"
                sm="12"
                xs="12"
            >
                <router-link :to="{ name: plan.route }" class="d-block">
                    <!-- :style="plan.style" -->
                    <b-card class="card-loyalty">
                        <b-badge
                            v-if="!plan.is_allowed"
                            variant="light-warning"
                        >
                            به این صفحه دسترسی ندارید!
                        </b-badge>
                        <div class="text-center mb-2">
                            <b-img
                                style="object-fit:cover;object-position:top"
                                class="w-100"
                                height="170px"
                                :src="plan.image"
                                :alt="plan.name"
                            />
                        </div>

                        <b-card-text class="text-center">
                            <h4 class="font-weight-bold">{{ plan.title }}</h4>
                            <h6>{{ plan.description }}</h6>
                        </b-card-text>
                    </b-card>
                </router-link>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { heightFade } from "@core/directives/animations";
import {
    BCard,
    BCol,
    BAlert,
    BRow,
    BImg,
    BCardText,
    BBadge
} from "bootstrap-vue";
import axios from "axios";
import _ from "lodash";
export default {
    components: { BCard, BCol, BAlert, BRow, BImg, BCardText, BBadge },
    directives: {
        "height-fade": heightFade
    },
    data() {
        return {
            plans: undefined,
            actions: [
                {
                    name: "UserRegistered",
                    route: "loyalty-plans-registerInClub",
                    image: require("@/assets/images/illustration/joinClub1.png")
                },
                {
                    name: "BillCreated",
                    route: "loyalty-plans-purchase",
                    image: require("@/assets/images/illustration/shop2.png")
                },
                {
                    name: "ProfileCompleted",
                    route: "loyalty-plans-completeProfile",
                    image: require("@/assets/images/illustration/profile.png")
                },
                {
                    name: "SurveyParticipated",
                    route: "loyalty-plans-survey",
                    image: require("@/assets/images/illustration/rate.png")
                },
                {
                    name: "BirthdayOccurred",
                    route: "loyalty-plans-giftPoint",
                    image: require("@/assets/images/illustration/credit.png")
                },
                {
                    name: "AnniversaryOccurred",
                    route: "loyalty-plans-anniversary",
                    image: require("@/assets/images/illustration/credit.png")
                },
                {
                    name: "ReferralUserRegistered",
                    route: "loyalty-plans-inviteFriends",
                    image: require("@/assets/images/illustration/call.png")
                }
            ]
        };
    },
    computed: {
        alert: {
            get() {
                return this.$store.getters["app/getAlert"];
            },
            set(value) {
                this.$store.commit("app/setAlert", value);
            }
        }
    },
    created() {
        this.getPlans().then(response => {
            console.log(response);
            this.plans = this.findPlanAction(response);
            console.log(this.plans);
        });
    },
    methods: {
        async getPlans() {
            return await axios
                .get(`${process.env.VUE_APP_URL}/loyalties`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`
                    }
                })
                .then(({ data }) => {
                    return data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        findPlanAction(plans) {
            const plansWithAction = _.map(plans, plan => {
                const permissionName = this.getPermissionAction(
                    plan.permissions
                );
                const isAllowed = this.isAllowed(permissionName);
                const action = _.find(this.actions, ["name", permissionName]);

                return { ...plan, ...action, is_allowed: isAllowed };
            });

            return plansWithAction;
        },
        getPermissionAction(permissions) {
            const permission = _.first(permissions);
            const permissionName = _.last(_.split(permission, "."));
            console.log(permissionName)
            return permissionName;
        },
        isAllowed(ability) {
            const abilities = JSON.parse(localStorage.getItem("userData"))
                .ability;

            const __ability = _.find(abilities, _ability => {
                return _ability.action.includes(`show.${ability}`);
            });

            return __ability ? true : false;
        }
    }
};
</script>

<style lang="scss">
.card-loyalty:hover {
    cursor: pointer;
    margin-top: -5px;
    transition: 0.5s;
}
</style>
