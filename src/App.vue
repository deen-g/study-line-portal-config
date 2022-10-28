<template>
  <div>
    <div class="git text-teal text-uppercase q-mt-sm">
      <b class="bg-blue-3 q-pa-sm boarders">
        {{ ' study-line ' + git.app + ' : ' + git.branch }}
      </b>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
// import { api } from "boot/axios"
// import { localForage } from "src/constants/localforge"
// import dbs from "./db/index"

export default defineComponent({
  name :'App',
  setup :() => {
    const git = ref(process.env.git)
    onMounted(async () => {
      console.log(git.value)

      // let session = await window.api.getCookie()
      // console.log(session)
      // let cook = `${session.name}=${session.value}`
      // localForage.setItem('cookie', cook)
      // // document.cookie = "name=oeschger; SameSite=None; Secure";
      // // console.log(document.cookie)
      // session = await api.get('http://localhost:3000/api/v2/session')
      // console.log(session)

      // await dbs.user.save({
      //   _id :'1', name :'abiodun', email :'deen', is_verified :true
      // })
      // document.cookie.set('a')
    })
    return {git}
  }
})
</script>
<style>
.git {
  width: 100%;
  position: absolute;
  z-index: 3000;
  color: black;
  font-size: 10px;
  text-align: center;
}

.boarders {
  border-style: solid;
}
</style>
