<template>
  <div class='write'>
    <div class='writ__title'>
      <h2>글쓰기</h2>
    </div>
    <div class='write__form'>
      <div class='write__form__title'>
          <b-input  v-model='subject' class='wirte-title__input' placeholder='제목을 입력해주세요'/>
      </div>
      <div class="write__form__contents">
        <b-textarea placeholder='내용을 입력해주세요' v-model='content' class='write__contents__textbox'/>
      </div>
      <b-button @click='upDate' v-if='getlist' class='write__btn base-btn__board'>글수정</b-button>
      <b-button @click='Write' v-else class='write__btn base-btn__board'>글작성</b-button>
    </div>
  </div>
</template>

<script>
import BButton from '@/components/BButton.vue'
import BInput from '@/components/BInput.vue'
import { reactive, toRefs } from 'vue'
import BTextarea from '@/components/BTextarea.vue'
import axios from 'axios'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useState } from '@/stores/helper'
export default {
  components: { BButton, BInput, BTextarea },
  setup () {
    const route = useRoute()
    const getlist = route.query.idx
    const { userinfo } = useState('user')
    if (!userinfo.value) {
      alert('로그인후에 이용가능합니다.')
      router.push('/')
    };
    const text = reactive({
      subject: '',
      content: ''
    })
    const username = userinfo.value.name
    // 글작성
    const Write = async () => {
      if (!text.subject) {
        alert('제목을 입력해주세요')
        return
      };
      if (!text.content) {
        alert('내용을 입력해주세요')
        return
      }
      if (text.subject.length > 30) {
        alert('제목은 30자 이내로 작성해주세요')
        return
      }
      await axios.post('/board', {
        ...text,
        writer: username
      })
      router.push('/')
    }
    // 글수정
    const upDate = async () => {
      axios.put('/board', {
        ...text,
        idx: getlist
      })
      alert('글수정완료')
      router.push('/')
    }
    return {
      ...toRefs(text),
      Write,
      getlist,
      upDate
    }
  }
}
</script>

<style>

</style>
