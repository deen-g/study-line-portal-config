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

export default defineComponent({
  name :'App',
  setup :() => {
    const git = ref(process.env.git)
    onMounted(() => {
      console.log(git.value)
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
