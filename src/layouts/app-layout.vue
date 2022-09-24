<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-grey-2 text-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
         <span style="cursor: pointer;" @click="$router.push({name:'index'})"><u
           style="color: #21BA45; font-size: 33px">Study</u><sub
           style="color: #1976D2; font-size: 22px">Line</sub></span>
        </q-toolbar-title>
        <div class="gt-sm">
          <search-menu-comp :borderless="false"/>
        </div>
        <q-separator spaced vertical inset/>
        <q-btn
          flat
          dense
          round
          icon="mdi-bell-circle-outline"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-separator spaced vertical inset/>
        <q-btn
          flat
          dense
          @click="login"
        >
          <q-chip size="sm" :color="auth.isLoggedIn?'teal':'red'" text-color="white">
            <q-avatar size="sm" color="white">
              <img v-if="auth.isLoggedIn && auth.user.avatar" :src="auth.user.avatar">
              <img v-else src="~assets/user.png">
            </q-avatar>
            {{ auth.isLoggedIn ? auth.user.acronym : 'login' }}
          </q-chip>
        </q-btn>
      </q-toolbar>
      <div class="lt-sm full-width">
        <q-separator/>
        <search-menu-comp :borderless="true"/>
      </div>
    </q-header>
    <q-footer class="bg-grey-2 text-primary">
      <div class="text-center" style="font-size: 13px">
        <span><u style="color: #21BA45; font-size: 13px">Study</u><span
          style="color: #1976D2; font-size: 13px">Line</span></span>
        v{{ $q.version }}
      </div>
    </q-footer>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="left"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-separator inset spaced/>
        <q-list>
          <q-item-label class="text-uppercase"
                        header overline
          >
            {{ page }}

          </q-item-label>
          <q-btn
            v-if="auth.isLoggedIn && !auth.isVerified"
            color="orange"
            size="sm"
            icon-right="mdi-account-cancel-outline"
            class="full-width"
            @click="$router.push({name:'verify-account'})"
            label="verify account"/>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
          <q-btn
            v-if="auth.isLoggedIn"
            color="negative"
            size="sm"
            icon-right="mdi-logout"
            class="full-width absolute-bottom"
            @click="logout"
            label="logout"/>
        </q-list>
      </q-scroll-area>
      <panel-profile-comp :auth="auth"/>
    </q-drawer>
    <q-drawer
      v-model="rightDrawerOpen"
      show-if-above
      bordered
      side="right"
    >
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router/dist/vue-router'
import SearchMenuComp from 'components/search-menu-comp.vue'
import navigations from 'src/constants/navigations'
import PanelProfileComp from 'components/panels/panel-profile-comp.vue'
import { bus } from 'boot/global-event-bus'
import { useAuthStore } from "stores/auth"

export default defineComponent({
  name: 'AuthLayout',

  components: {
    PanelProfileComp,
    SearchMenuComp,
    EssentialLink
  },

  setup () {
    const auth = useAuthStore()
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const page = ref('dashboard')
    const list = computed(() => {
      return navigations.links()
    })
    // eslint-disable-next-line no-unused-vars
    const router = useRouter()
    const login = async () => {
      if (auth.isLoggedIn) {
        console.log('isLoggedIn')
        // toggleRightDrawer()
      } else {
        console.log('login')
        await router.push({ name: 'sign-in' })
      }
    }
    const closeDrawer = () => {
      leftDrawerOpen.value = false
    }
    const logout = async () => {
      await router.push({ name: 'index-page', query: { page: 'home-page' } })
    }
    onMounted(async () => {
      bus.$on('auth:is_logged_in', () => {
      })
    })
    onUnmounted(() => {
      bus.$off('auth:is_logged_in', () => {
      })
    })

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }
    return {
      page,
      essentialLinks: list,
      leftDrawerOpen,
      toggleLeftDrawer,
      rightDrawerOpen,
      toggleRightDrawer,
      auth,
      logout,
      login,
      closeDrawer
    }
  }
})
</script>
