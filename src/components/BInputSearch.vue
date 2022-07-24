<template>
  <div class='home__searchbar'>
    <div class='base-input'>
      <input :type='type' v-model='input' @input='update' :placeholder='`${placeholder}`' class='base-input'>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  setup (props, { emit }) {
    const input = ref(props.modelValue)
    const update = () => {
      emit('update:modelValue', input.value)
    }

    return {
      input,
      update
    }
  }
}
</script>

<style>

</style>
