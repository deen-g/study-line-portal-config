<template>
  <template v-if="!hr">
    <template v-if="list.length>0">
      <q-expansion-item
        expand-separator
        expand-icon-toggle
        :label="title"
        :caption="list.length+' option (s) in '+title"
      >
        <EssentialLink
          v-for="l in list"
          :key="l.title"
          v-bind="l"
        />
      </q-expansion-item>
    </template>
    <template v-else>
      <q-item
        class="text-primary"
        clickable
        @click="navigate"
      >
        <q-item-section
          v-if="icon"
          avatar
        >
          <q-icon :name="icon"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ title }}</q-item-label>
          <q-item-label caption>{{ caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </template>
  <template v-else>
    <q-separator/>
  </template>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router/dist/vue-router'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    hr: {
      type: Boolean,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    auth: {
      type: Boolean,
      required: false
    },
    caption: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 0
    },
    link: {
      type: String,
      default: '#'
    },
    list: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    icon: {
      type: String,
      default: ''
    },
    hasSchool: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object,
      default: null
    },
    params: {
      type: Object,
      default: null
    }
  },
  components: {
    EssentialLink: () => import('src/components/EssentialLink.vue')
  },
  setup: (props) => {
    const router = useRouter()
    const navigate = () => {
      let push = { name: props.link }
      if (props.query) {
        push.query = props.query
      }
      if (props.params) {
        push.params = props.params
      }
      router.push(push)
    }
    return { navigate }
  }
})
</script>
