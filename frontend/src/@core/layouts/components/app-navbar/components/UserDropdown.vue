<template>
    <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
    >
        <template #button-content>
            <div class="d-sm-flex d-none user-nav">
                <span class="user-status">
                    <span class="font-weight-bold">
                        {{ userData.fullName }}
                    </span>
                    <span style="margin-top: 3px" class="d-block">
                        عزیز خوش آمدید
                    </span>
                </span>
            </div>
            <b-avatar
                size="40"
                :src="userData.avatar"
                variant="light-primary"
                badge
                class="badge-minimal"
                badge-variant="success"
            >
                <feather-icon
                    v-if="!userData.fullName"
                    icon="UserIcon"
                    size="22"
                />
            </b-avatar>
        </template>

        <b-dropdown-item
            :to="`/apps/users/edit/${userData.id}`"
            link-class="d-flex align-items-center"
        >
            <feather-icon size="16" icon="UserIcon" class="mr-50" />
            <span>حساب کاربری من</span>
        </b-dropdown-item>
        <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
            <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
            <span>خروج</span>
        </b-dropdown-item></b-nav-item-dropdown
    >
</template>

<script>
import {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
} from "bootstrap-vue";
import axios from "axios";
import useJwt from "@/auth/jwt/useJwt";
import { initialAbility } from "@/libs/acl/config";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    components: {
        BNavItemDropdown,
        BDropdownItem,
        BDropdownDivider,
        BAvatar,
    },
    data() {
        return {};
    },
    computed: {
        userData() {
            return JSON.parse(localStorage.getItem("userData"));
        },
    },
    methods: {
        logout() {
            axios
                .post(
                    `${process.env.VUE_APP_URL}/auth/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then((response) => {})
                .catch((error) => {});

            localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName);
            localStorage.removeItem(
                useJwt.jwtConfig.storageRefreshTokenKeyName
            );
            localStorage.removeItem("userData");
            this.$ability.update(initialAbility);
            this.$router.replace({ name: "auth-login" }).then(() => {
                this.$toast({
                    component: ToastificationContent,
                    position: "top-right",
                    props: {
                        title: `خروج از حساب`,
                        icon: "CheckIcon",
                        variant: "success",
                        text: `شما با موفقیت خارج شدید`,
                    },
                });
            });
        },
    },
};
</script>
