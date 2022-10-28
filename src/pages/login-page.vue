<template>
  <q-page padding>
    <!-- content -->
    <div class="fit row wrap justify-center items-start content-start">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 self-center" style="padding-top: 135px;">
        <q-card>
          <q-card-section>
             <span style="cursor: pointer;" @click="$router.push({name:'index'})"><u
               style="color: #21BA45; font-size: 33px">Study</u><sub
               style="color: #1976D2; font-size: 22px">Line</sub></span>
            <br/>
            <span class="text-uppercase">Login</span>
            <q-separator inset/>
          </q-card-section>
          <q-card-section class="no-padding">
            <div class="text-uppercase text-center text-primary">
              configuration portal
            </div>
          </q-card-section>

          <q-separator inset/>
          <q-card-section v-if="errMsg.length>0">
            <span class="text-red-5 text-italic" v-for="e in errMsg" :key="e">{{ e }} <br/></span>
          </q-card-section>
          <q-separator v-if="errMsg.length>0" inset/>
          <q-card-section>
            <q-form
              @submit="onSubmit"
              class="q-gutter-md"
            >

              <q-input
                filled
                type="email"
                v-model="input.email"
                dense
                label="Your email *"
              />
              <q-input
                filled
                type="password"
                v-model="input.password"
                dense
                label="Your password *"
              />
              <q-separator inset/>
              <div>
                <q-btn class="full-width" :loading="is_loading" label="Submit" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { api } from "boot/axios"
import apis from "src/constants/apis"
import { useAuthStore } from "stores/auth"
import { useRoute, useRouter } from "vue-router/dist/vue-router"
import { localForage } from "src/constants/localforge"


export default {
  // name: 'PageName',
  setup :() => {
    const auth = useAuthStore()
    const router = useRouter()
    const route = useRoute()
    let input = ref({
      email :'deen3@mailinator.com',
      password :'password'
    })
    let errMsg = ref([])
    let is_loading = ref(false)
    let onSubmit = async () => {
      is_loading.value = true
      const response = await api.post(apis.public.portal.account.config.login, {...input.value})
      console.log(response)
      let {status, data, errors} = response
      is_loading.value = false
      if(status){
        await auth.setAuthUser(data.user)
        localForage.setItem(process.env.auth, data.token)
        await router.push({name :'initialise', query :route.query})
      } else {
        //do errors
        if(errors){
          errMsg.value = []
          for (let err of errors) {
            let msg = '[' + err.param + '] : ' + err.msg
            if(errMsg.value.includes(msg) !== true){
              errMsg.value.push(msg)
            }
          }
        }
      }
      console.log('login', response)
    }
    return {input, is_loading, errMsg, onSubmit}
  }
}
</script>
