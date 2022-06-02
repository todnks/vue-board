<template> 
    <div>
    <b-input placeholder="글제목" v-model="title"/>
    {{title}}
    <b-input placeholder="글내용" v-model="listtext"/>
    {{listtext}}
    <b-button @click='Write'>글작성</b-button>
    </div>
</template>

<script>
import BButton from '@/components/BButton.vue';
import BInput from '@/components/BInput.vue';
import { reactive,toRefs } from 'vue';
import axios from 'axios';
import router from '@/router';
import { useStore } from 'vuex';
export default {
    components:{BButton ,BInput},
    setup(){
        const store = useStore();
        if(!store.state.userlogin){
            alert("로그인후에 이용가능합니다.");
            router.push('/');
        };
        const text = reactive({
            title: '',
            listtext: '',
        });
        const username = store.state.userData.name;
        const Write = async () =>{
            await axios.post('/list', {
                    ...text,
                    name: username,
            });
            router.push('/');
        };
        return{
            ...toRefs(text),
            Write,

        };
    },
}
</script>

<style>

</style>