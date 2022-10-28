<template>
  <q-page padding>
    <!-- content -->
    <div class="fit row wrap justify-center items-start content-start">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 self-center" style="padding-top: 30vh;">
        <q-card flat class="text-center">
          <q-card-section>
             <span style="cursor: pointer;" @click="$router.push({name:'index'})"><u
               style="color: #21BA45; font-size: 33px">Study</u><sub
               style="color: #1976D2; font-size: 22px">Line</sub></span>
            <br/>
            <q-separator inset/>
          </q-card-section>
          <q-card-section class="no-padding">
            <div class="text-uppercase text-center text-primary">
              configuration portal
            </div>
          </q-card-section>
          <q-card-section class="no-padding">
            <div class="text-uppercase text-center text-primary">
              <progress/>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { onMounted } from "vue"
import { api } from "boot/axios"
import apis from "src/constants/apis"
import { useAuthStore } from "stores/auth"
import { useRoute, useRouter } from "vue-router/dist/vue-router"
import { localForage } from "src/constants/localforge"

export default {
  // name: 'PageName',
  setup :() => {
    const router = useRouter()
    const route = useRoute()
    const auth = useAuthStore()
    onMounted(async () => {
      if(auth.isLoggedIn){
        await loadServiceData()
      } else {
        const response = await api.get(apis.authorised.session)
        console.log(response)
        let {status, data} = response
        if(status && data){
          localForage.setItem(process.env.auth, data.token)
          await auth.setAuthUser(data.user)
          await loadServiceData(data)
        } else {
          localForage.removeItem(process.env.auth)
          await router.push({name :'login', query :route.query})
        }
      }
    })
    const loadServiceData = async (data = false) => {
      console.log('authenticated', data)
      let path = {name :'dashboard'}
      if(route.query.next){
        path = {path :route.query.next}
      }
      await router.push(path)
    }
  }
}
</script>
