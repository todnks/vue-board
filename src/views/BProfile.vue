<template>
    <div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  setup () {
    const profile = async () => {
      const userinfo = await axios.get('/api/v1/member/getMemberInfo')
      console.log(userinfo.data)
    }
    profile()
    return {
      profile
    }
  }
}
</script>

<style>

</style>
