<template>
    <div class="text-center my-3" >
        <b-spinner label="درحال بارگذاری ..."  v-model="isLoading"/>
        <span class="d-block mt-1"> در حال بارگذاری ... </span>
    </div>
</template>

<script>
import { BSpinner } from "bootstrap-vue";
export default {
    components: {
        BSpinner
    },
    data() {
        return {
            isLoading: false
        };
    },
    methods:{
        isLoadingShow(){
            this.isLoading = true
        }
    }
};
</script>

<style lang="scss"></style>
