<template>
    <div>
        <b-navbar-nav class="nav">
            <b-nav-item id="quick-create-customer" v-b-toggle.quick-create>
                <feather-icon icon="UserPlusIcon" size="21" />
                <b-tooltip
                    triggers="hover"
                    target="quick-create-customer"
                    title="ساخت سریع مشتری"
                    :delay="{ show: 1000, hide: 50 }"
                />
            </b-nav-item>
            <b-nav-item
                v-for="(bookmark, index) in bookmarks"
                :id="`bookmark-${index}`"
                :key="index"
                :to="bookmark.route"
            >
                <feather-icon :icon="bookmark.icon" size="21" />
                <b-tooltip
                    triggers="hover"
                    :target="`bookmark-${index}`"
                    :title="bookmark.title"
                    :delay="{ show: 1000, hide: 50 }"
                />
            </b-nav-item>
            <!-- <b-nav-item-dropdown
                link-classes="bookmark-star"
                lazy
                @hidden="resetsearchQuery"
            >
                <feather-icon
                    slot="button-content"
                    icon="StarIcon"
                    size="21"
                    class="text-warning"
                />

                <li style="min-width:300px">
                    <div class="p-1">
                        <b-form-input autocomplete="off"
                            id="boomark-search-input"
                            v-model="searchQuery"
                            placeholder="نشان کردن صفحات..."
                            autofocus
                        />
                    </div>
                    <vue-perfect-scrollbar
                        :settings="perfectScrollbarSettings"
                        class="search-list search-list-bookmark scroll-area"
                        :class="{
                            show:
                                filteredData.pages && filteredData.pages.length
                        }"
                        tagname="ul"
                    >
                        <b-dropdown-item
                            v-for="(suggestion, index) in filteredData.pages ||
                                bookmarks"
                            :key="index"
                            class="suggestion-group-suggestion cursor-pointer"
                            link-class="d-flex align-items-center"
                            :to="suggestion.route"
                            @mouseenter="currentSelected = index"
                        >
                            <feather-icon
                                :icon="suggestion.icon"
                                class="mr-75"
                                size="18"
                            />
                            <span class="align-middle">{{
                                suggestion.title
                            }}</span>
                            <feather-icon
                                icon="StarIcon"
                                class="ml-auto"
                                size="16"
                                :class="{
                                    'text-warning': suggestion.isBookmarked
                                }"
                                @click.stop.prevent="
                                    toggleBookmarked(suggestion)
                                "
                            />
                        </b-dropdown-item>
                        <b-dropdown-item
                            v-show="
                                !(
                                    filteredData.pages &&
                                    filteredData.pages.length
                                ) && searchQuery
                            "
                            disabled
                        >
                            موردی یافت نشد
                        </b-dropdown-item></vue-perfect-scrollbar
                    >
                </li>
            </b-nav-item-dropdown> -->
        </b-navbar-nav>
        <b-sidebar
            id="quick-create"
            right
            shadow
            bg-variant="white"
            backdrop
            v-model="visible"
        >
            <div class="row p-2">
                <div class="col-md-12">
                    <b-form-group label="نام" label-for="q-first-name">
                        <b-form-input autocomplete="off"
                            id="q-first-name"
                            v-model="qFirstName"
                            placeholder="نام کاربر"
                        />
                    </b-form-group>
                </div>
                <div class="col-md-12">
                    <b-form-group label="نام خانوادگی" label-for="q-last-name">
                        <b-form-input autocomplete="off"
                            id="q-last-name"
                            v-model="qLastName"
                            placeholder="نام خانوادگی کاربر"
                        />
                    </b-form-group>
                </div>
                <div class="col-md-12">
                    <b-form-group label="شماره تماس" label-for="q-tel">
                        <b-form-input autocomplete="off"
                            dir="ltr"
                            id="q-tel"
                            v-model="qTel"
                            type="number"
                            class="text-right"
                            placeholder="شماره تماس کاربر"
                        />
                    </b-form-group>
                </div>
                <div class="col-md-12">
                    <b-form-group label="آدرس ایمیل" label-for="q-email">
                        <b-form-input autocomplete="off"
                            dir="ltr"
                            id="q-email"
                            v-model="qEmail"
                            class="text-right"
                            placeholder="آدرس ایمیل کاربر"
                        />
                    </b-form-group>
                </div>
                <div class="col-md-12">
                    <b-button @click="quickCustomerHandler" variant="primary">
                        ثبت کاربر
                    </b-button>
                    <b-button
                        @click="resetHandler"
                        variant="outline-secondary"
                        class="ml-1"
                    >
                        پاک کردن فرم
                    </b-button>
                </div>
            </div>
            <div class="row p-2" v-if="hasError">
                <div class="col-md-12">
                    <b-alert variant="danger" show>
                        <h6 class="alert-heading">خطا رخ داده است</h6>
                        <div class="alert-body">
                            <ul class="text-decoration-none">
                                <li
                                    v-for="(error, index) in errors"
                                    :key="index"
                                >
                                    <small>
                                        {{ error }}
                                    </small>
                                </li>
                            </ul>
                        </div>
                    </b-alert>
                </div>
            </div>
        </b-sidebar>
    </div>
</template>

<script>
import {
    BNavbarNav,
    BNavItem,
    BTooltip,
    BNavItemDropdown,
    BButton,
    BFormGroup,
    BFormInput,
    BAlert,
    BDropdownItem,
    BSidebar,
    VBToggle,
} from "bootstrap-vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import useAutoSuggest from "@core/components/app-auto-suggest/useAutoSuggest";
import { ref, watch } from "@vue/composition-api";
import router from "@/router";
import store from "@/store";
import searchAndBookmarkData from "../search-and-bookmark-data";
import axios from "axios";
import _ from "lodash";

export default {
    components: {
        BNavbarNav,
        BNavItem,
        BTooltip,
        BButton,
        BNavItemDropdown,
        BFormGroup,
        BSidebar,
        BAlert,
        VBToggle,
        BFormInput,
        VuePerfectScrollbar,
        BDropdownItem,
    },
    directives: {
        "b-toggle": VBToggle,
    },
    data() {
        return {
            // quick user create
            qFirstName: undefined,
            qLastName: undefined,
            qTel: undefined,
            qEmail: undefined,
            errors: [],
            hasError: false,
            visible: false,
        };
    },
    setup() {
        const searchAndBookmarkDataPages = ref(searchAndBookmarkData.pages);
        const bookmarks = ref(
            searchAndBookmarkData.pages.data.filter((page) => page.isBookmarked)
        );
        const currentSelected = ref(-1);

        const perfectScrollbarSettings = {
            maxScrollbarLength: 60,
        };

        const { searchQuery, resetsearchQuery, filteredData } = useAutoSuggest({
            data: { pages: searchAndBookmarkDataPages.value },
            searchLimit: 6,
        });

        watch(searchQuery, (val) => {
            store.commit("app/TOGGLE_OVERLAY", Boolean(val));
        });

        watch(filteredData, (val) => {
            currentSelected.value = val.pages && !val.pages.length ? -1 : 0;
        });

        const suggestionSelected = () => {
            const suggestion = filteredData.value.pages[currentSelected.value];
            router.push(suggestion.route).catch(() => {});
            resetsearchQuery();
        };

        const toggleBookmarked = (item) => {
            // Find Index of item/page in bookmarks' array
            const pageIndexInBookmarks = bookmarks.value.findIndex(
                (i) => i.route === item.route
            );

            // If index is > -1 => Item is bookmarked => Remove item from bookmarks array using index
            // Else => Item is not bookmarked => Add item to bookmarks' array
            if (pageIndexInBookmarks > -1) {
                bookmarks.value[pageIndexInBookmarks].isBookmarked = false;
                bookmarks.value.splice(pageIndexInBookmarks, 1);
            } else {
                bookmarks.value.push(item);
                bookmarks.value[bookmarks.value.length - 1].isBookmarked = true;
            }
        };

        return {
            bookmarks,
            perfectScrollbarSettings,
            currentSelected,
            suggestionSelected,
            toggleBookmarked,

            // AutoSuggest
            searchQuery,
            resetsearchQuery,
            filteredData,
        };
    },
    methods: {
        quickCustomerHandler() {
            this.hasError = false;
            const params = {
                first_name: this.qFirstName,
                last_name: this.qLastName,
                phones: [{ number: this.qTel, type: "mobile" }],
                email: this.qEmail,
                type: "mobile",
            };

            axios
                .post(`${process.env.VUE_APP_URL}/users/store/quick`, params, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((response) => {
                    // set alert data into VUEX
                    this.$store.commit("app/setAlert", {
                        text: "کاربر مورد نظر با موفقیت ثبت شد",
                        type: "success",
                        visible: true,
                        count: 10,
                    });
                    // navigate to branches list page
                    this.visible = false;
                    return this.$router.push("/customers/list");
                })
                .catch((error) => {
                    this.errors = _.flatten(
                        _.values(error.response.data.errors)
                    );
                    this.hasError = true;
                });
        },
        resetHandler() {
            this.qFirstName = undefined;
            this.qLastName = undefined;
            this.qTel = undefined;
            this.qEmail = undefined;
            this.hasError = false;
            this.errors = [];
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/bootstrap-extended/include";

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
p {
    margin: 0;
}

.nav-bookmar-content-overlay {
    position: fixed;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: all 0.7s;
    transition: all 0.7s;
    z-index: -1;

    &:not(.show) {
        pointer-events: none;
    }

    &.show {
        cursor: pointer;
        z-index: 10;
        opacity: 1;
    }
}
</style>
