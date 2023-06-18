import Vue from "vue";

// axios
import axios from "axios";

const axiosIns = axios.create({
    // You can add your headers here
    // ================================
    baseURL: "http://api.geranesh.club/",
    // timeout: 1000,
    headers: {
        /* "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://api.geranesh.club/" */
    },
});

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status == 401) {
            const keysToRemove = [
                "accessToken",
                "refreshToken",
                "userData",
            ];
            keysToRemove.forEach((k) => localStorage.removeItem(k));

            window.location.href = "/login";
        }
        if (error.response.status == 403)
            window.location.href = "/pages/miscellaneous/not-authorized";

        return Promise.reject(error);
    }
);

Vue.prototype.$http = axiosIns;

export default axiosIns;
