<template>
  <div class='write'>
    <div class='write__title'>
      <h2>글쓰기</h2>
    </div>
    <div class='write__form'>
      <div class='write__form__title'>
          <b-input  v-model='subject' class='wirte-title__input' placeholder='글 제목'/>
      </div>
      <div class="write__form__contents">
        <b-textarea placeholder='글 내용' v-model='content' class='write__contents__textbox'/>
      </div>
      <b-button @click='upDate' v-if='getlist' class='write__btn base-btn__board'>글수정</b-button>
      <b-button @click='Write' v-else class='write__btn base-btn__board'>글작성</b-button>
    </div>
  </div>
</template>

<script>
import BButton from '@/components/BButton.vue'
import BInput from '@/components/BInput.vue'
import { onMounted, reactive, toRefs } from 'vue'
import BTextarea from '@/components/BTextarea.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import Http from '@/service/Http'
export default {
  components: { BButton, BInput, BTextarea },
  setup () {
    const http = new Http()
    const route = useRoute()
    const getlist = route.query.idxs
    const text = reactive({
      subject: '',
      content: '',
      writer: ''
    })
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
      await http.post('/board', {
        ...text
      })
      router.push('/')
    }
    const upDate = async () => {
      http.put('/board', {
        ...text,
        idx: getlist
      })
      alert('글수정완료')
      router.push('/')
    }
    onMounted(async () => {
      const data = await http.get('/member/getMemberInfo')
      if (!data) {
        alert('로그인후에 이용가능합니다')
        router.push('/')
      }
      text.writer = data
    })
    return {
      ...toRefs(text),
      Write,
      getlist,
      upDate
    }
  }
}
</script>
