import _ from "lodash";
import { $themeBreakpoints } from "@themeConfig";

export default {
    namespaced: true,
    state: {
        windowWidth: 0,
        shallShowOverlay: false,
        alert: {
            visible: false,
            text: undefined,
            count: undefined,
            type: undefined
        },
        telephones: [],
        addresses: []
    },
    getters: {
        getAlert(state) {
            return state.alert;
        },
        currentBreakPoint: state => {
            const { windowWidth } = state;
            if (windowWidth >= $themeBreakpoints.xl) return "xl";
            if (windowWidth >= $themeBreakpoints.lg) return "lg";
            if (windowWidth >= $themeBreakpoints.md) return "md";
            if (windowWidth >= $themeBreakpoints.sm) return "sm";
            return "xs";
        },
        getTelephones(state) {
            return _.map(state.telephones, item => {
                item.number = item.phone_number;
                item.type = _.isObject(item.type) ? item.type.value : item.type;
                return _.omit(item, ["phone_number"]);
            });
        },
        getAddresses(state) {
            return _.map(state.addresses, item => {
                const _item = {
                    ...item,
                    city_id: item.city.id,
                    province_id: item.province.id,
                    type: _.isObject(item.type) ? item.type.value : item.type
                };
                return _.omit(_item, [
                    "city",
                    "province",
                    "latitude",
                    "longitude"
                ]);
            });
        }
    },
    mutations: {
        UPDATE_WINDOW_WIDTH(state, val) {
            state.windowWidth = val;
        },
        TOGGLE_OVERLAY(state, val) {
            state.shallShowOverlay =
                val !== undefined ? val : !state.shallShowOverlay;
        },
        setAlert(state, alert) {
            state.alert = alert;
        },
        hideAlert(state, flag) {
            state.alert.visible = flag;
        },
        setTelephones(state, telephones) {
            state.telephones = telephones;
        },
        setAddresses(state, addresses) {
            state.addresses = addresses;
        },
        removeAddresses(state) {
            state.addresses = [];
        },
        removeTelephones(state) {
            state.telephones = [];
        }
    },
    actions: {}
};
