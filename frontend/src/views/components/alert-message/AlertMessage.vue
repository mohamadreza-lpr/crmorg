<template>
    <div>
        <b-alert
            v-height-fade
            :variant="variant"
            v-model="visibility"
            :dismissible="dismissible"
        >
            <div class="alert-body">
                <div v-for="(message, index) in messages" :key="index">
                  <small>{{ message }}</small>
                </div>
            </div>
        </b-alert>
    </div>
</template>
<script>
import { BProgress, BAlert, BButton } from "bootstrap-vue";
import { heightFade } from "@core/directives/animations";

export default {
    name: "alert-message",
    props: {
        messages: {
            type: Array,
            value: [],
        },
        dismissible: false,
        variant: undefined
    },
    directives: {
        heightFade,
    },
    components: {
        BProgress,
        BAlert,
        BButton,
    },
    data() {
      return {
        visibility: false,
      }
    },
    methods: {
        hideMessage() {
            this.visibility = false;
        },
        showMessage() {
            this.visibility = true;
        },
    },
};
</script>
<style lang="scss">
</style>