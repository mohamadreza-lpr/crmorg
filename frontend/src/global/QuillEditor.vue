<template>
    <div>
        <quill-editor
        v-model="content"
        :options="snowOption"
        />
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'

export default {
    components: {
        quillEditor,
    },
    data(){
        return {
            snowOption: {
                placeholder: 'اطلاعات خود را در این کادر وارد نمایید!',
                theme: 'snow',
            },
            content:''
        }
    }
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/quill.scss';
</style>