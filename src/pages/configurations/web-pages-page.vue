<template>
  <q-page>
    <html-editor height="70vh" :body="body"  :flat="true" :onClickOk="onSubmit"/>
  </q-page>
</template>

<script>
import HtmlEditor from "components/html-editor.vue"
import { onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router/dist/vue-router"
import useStore from "stores/store"
import general from "src/constants/general"


export default {
  components :{HtmlEditor},
  setup :() => {
    const route = useRoute()
    const store = useStore()
    let content ='What you see is <b>what</b> you get.'
    const body = ref({
      name :'',
      content :content
    })
    onMounted(() => {
      onLoad(route.params.id)
    })
    watch(
      () => route.params,
      (params) => {
        onLoad(params.id)
      }
    )
    const onLoad = async (id) => {
      // debugger
      let html = await store.configuration.getPage(general.configuration, id)
      if(html && html.content && id === html.id){
        body.value.name = html.name
        body.value.content = html.content
      }else{
        body.value.name = id
        body.value.content = content
      }
    }
    const onSubmit = async (content) => {
      let doc = {
        id :body.value.name,
        name :body.value.name,
        content :content
      }
      await store.configuration.updateWebPage(doc, {configuration_id :general.configuration})
      console.log(content)
    }
    return {
      body, onSubmit
    }
  }
}
</script>
