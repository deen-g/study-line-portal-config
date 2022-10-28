import useStore from "stores/store"
import general from "src/constants/general"

const routes = [
  {
    path :'/',
    component :() => import('layouts/no-app-layout.vue'),
    children :[
      {path :'', name :'initialise', component :() => import('pages/initialise-page.vue')},
      {path :'/login', name :'login', component :() => import('pages/login-page.vue')}
    ]
  },
  {
    path :'/restricted',
    component :() => import('layouts/app-layout.vue'),
    children :[
      {path :'', name :'dashboard', component :() => import('pages/dashboard-page.vue')},
      {
        path :'configurations',
        beforeEnter: async (to, from) => {
          // reject the navigation
          const store = useStore()
          await store.configuration.fetch({
            configuration_id :general.configuration
          })
          console.log('enter')
          return true
        },
        children :[
          {path :'web-pages/:id', name :'web-pages', component :() => import('pages/configurations/web-pages-page.vue')},
        ]
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path :'/:catchAll(.*)*',
    component :() => import('pages/ErrorNotFound.vue')
  }
]

export default routes
