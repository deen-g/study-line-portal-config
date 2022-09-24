<template>
  <div>
    <q-input label="search" :borderless="border" dense standout="bg-teal text-white" v-model="search"
             input-class="text-right"
             class="full-width">
      <template v-slot:append>
        <q-icon v-if="search === ''" name="search"/>
        <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
      </template>
    </q-input>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  // name: 'ComponentName',
  props: ['borderless'],
  setup (props) {
    const search = ref('')
    const border = ref(props.borderless)
    return {
      border,
      search
    }
  }
}
</script>
