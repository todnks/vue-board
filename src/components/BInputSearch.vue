<template>
  <div class='home__searchbar'>
    <div class='base-input'>
      <input :type='type' v-model='input' @input='update' :placeholder='`${placeholder}`' class='base-input' @focus="addclass(true)" @blur="addclass(false)" >
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
    const addclass = (v) => {
      const $searchBar = document.querySelector('.home__searchbar')
      if (v) {
        $searchBar.classList.add('input--focus')
        return
      }
      $searchBar.classList.remove('input--focus')
    }
    return {
      input,
      update,
      addclass
    }
  }
}
</script>

<style>

</style>
