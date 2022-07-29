<template>
  <div class="board-content">
    <div class="board-header">
      <div class="board-header__user-icon"><i class="fa-regular fa-user"></i></div>
      <div class="board-header-title">
        <h1 class="board-header__subject">{{list.subject}}</h1>
        <div class="board-header__info">
          <span class="board-header__writer">{{list.writer}}</span>
          <span class="board-header__date">{{list.registDate}}</span>
        </div>
      </div>
      </div>
      <div class="board__text">
        <p>{{list.content}}</p>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Object,
      default: null
    }
  },
  setup () {
    return {
    }
  }
}
</script>

<style>

</style>
