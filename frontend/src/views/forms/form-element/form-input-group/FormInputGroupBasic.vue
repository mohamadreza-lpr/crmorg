<template>
  <b-card-code title="Basic">
    <div class="demo-vertical-spacing">
      <!-- basic search -->
      <b-input-group>
        <b-input-group-prepend is-text>
          <feather-icon icon="SearchIcon" />
        </b-input-group-prepend>
        <b-form-input autocomplete="off" placeholder="Search" />
      </b-input-group>

      <!-- password -->
      <b-form-group>
        <label for="basic-password">Password</label>
        <b-input-group>
          <b-form-input autocomplete="off"
            id="basic-password"
            :type="passwordFieldType"
            placeholder="Your Password"
          />
          <b-input-group-append is-text>
            <feather-icon
              :icon="passwordToggleIcon"
              class="cursor-pointer"
              @click="togglePasswordVisibility"
            />
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <!-- with prop prepend  -->
      <b-input-group prepend="@">
        <b-form-input autocomplete="off" placeholder="Username" />
      </b-input-group>

      <!-- with prop append -->
      <b-input-group append="@example.com">
        <b-form-input autocomplete="off" placeholder="Recipient's username" />
      </b-input-group>

      <b-input-group prepend="https://example.com/users/">
        <b-form-input autocomplete="off" />
      </b-input-group>

      <!-- append and pepend -->
      <b-input-group
        prepend="$"
        append=".00"
      >
        <b-form-input autocomplete="off" placeholder="100" />
      </b-input-group>

      <!-- textarea -->
      <b-input-group prepend="With textarea">
        <b-form-textarea />
      </b-input-group>
    </div>

    <template #code>
      {{ codeBasic }}
    </template>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import {
  BInputGroup, BFormInput, BInputGroupPrepend, BInputGroupAppend, BFormGroup, BFormTextarea,
} from 'bootstrap-vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { codeBasic } from './code'

export default {
  components: {
    BCardCode,
    BFormTextarea,
    BInputGroup,
    BFormGroup,
    BFormInput,
    BInputGroupPrepend,
    BInputGroupAppend,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      codeBasic,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
}
</script>
