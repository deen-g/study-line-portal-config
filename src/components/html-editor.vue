<template>
  <div class="full-height">
    <q-editor
      toolbar-bg="grey-2"
      :height="height"
      :flat="flat"
      v-model="editor"
      :dense="$q.screen.lt.md"
      :definitions="{
        name: {
          tip: body.name,
          label: body.name,
        },
                save: {
          tip: 'Save your work',
          icon: 'save',
          label: 'Save',
          handler: onSubmit
        },
        upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'Upload',
          handler: onUpload
        }
      }"
      :toolbar="[
        ['name'],
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
                    {
            label: $q.lang.editor.strikethrough,
            icon: $q.iconSet.editor.strikethrough,
            fixedLabel: true,
            list: 'only-icons',
            options: ['strike', 'underline', 'subscript', 'superscript']
          }
        ],
        ['bold', 'italic','quote'],
        ['token', 'hr', 'link'],
        [
          {
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            icon: $q.iconSet.editor.indent,
            fixedLabel: true,
            list: 'only-icons',
            options:  ['unordered', 'ordered', 'outdent', 'indent'],
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['viewsource'],['upload', 'save']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
    />
  </div>
</template>
<script>
import { onMounted, ref, watch } from 'vue'

export default {
  props :['height', 'flat', 'body', 'onClickOk'],

  setup(props){
    let editor = ref(props.body.content)
    onMounted(() => {
      editor.value = props.body.content
    })
    watch(
      () => props.body,
      (body) => {
        console.log(body)
        editor.value = body.content
      },{
        deep:true
      }
    )
    const onSubmit = () => {
      props.onClickOk(editor.value)
    }
    const onUpload = () => {
      props.onClickOk(editor.value)
    }
    return {
      editor, onSubmit, onUpload
    }
  }
}
</script>
