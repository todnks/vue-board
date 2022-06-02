<template>
  <div class="base-input">
    <span class="base-input__placeholder">{{ placeholder }}</span>
    <input :type="type" v-model="input" @input="update" >
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  setup(props, { emit }) {
    let input = ref(props.modelValue);
    const update = () => {
      emit('update:modelValue', input.value);
    };

    return {
      input,
      update,
    };
  },
}
</script>

<style>

</style>