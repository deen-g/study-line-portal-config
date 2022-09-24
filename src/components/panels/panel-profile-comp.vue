<template>
  <div>
    <q-img class="absolute-top" src="~assets/images.png" style="height: 150px">
      <template v-if="auth.isLoggedIn">
<span>
<q-list>
  <q-item>
  <q-item-section side>
    <q-avatar rounded>
      <img src="https://cdn.quasar.dev/img/avatar.png">
    </q-avatar>
  </q-item-section>
  <q-item-section>
    <q-item-label caption>{{auth.user.name}}</q-item-label>
    <q-item-label caption>{{auth.user.email}}</q-item-label>
  </q-item-section>
</q-item>
  <q-separator inset/>
  <q-item>
    <q-item-section>
      <q-item-label overline>{{auth.user.is_school_admin?'MANAGER':'STUDENT'}} STATUS</q-item-label>
      <q-item-label caption>APPLICATIONS: 0</q-item-label>
      <q-item-label v-if="!auth.user.is_school_admin" caption>SCHOOLS: 0</q-item-label>
      <q-item-label caption>SL-USER SINCE : {{auth.user.createdAt}}</q-item-label>
    </q-item-section>
  </q-item>
</q-list>
</span>
      </template>
      <template v-else>
<span class="text-center absolute-center"/>
      </template>
    </q-img>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: {
    auth: {
      type: Object
    }
  },
  setup (props) {
    return {}
  }
}
</script>
