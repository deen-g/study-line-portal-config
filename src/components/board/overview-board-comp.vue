<template>
  <q-table
    grid
    class="full-width"
    no-data-label="false"
    dense
    hide-bottom
    :rows="rows"
    :columns="columns"
    row-key="name"
  >
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3">
        <q-card>
          <q-card-section class="text-center text-uppercase q-py-sm">
            component
            <br>
            <strong class="text-teal-3">{{ props.row.component }}</strong>
          </q-card-section>
          <q-separator/>
          <q-card-section class="flex flex-center text-lowercase no-padding text-italic q-pt-sm text-center">
            <div class="q-my-sm">
              TOTAL {{ props.row.component }} created: [{{ props.row.total }}]<br/>
              TOTAL {{ props.row.component }} created today : [{{ props.row.today }}]
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script>
import { onMounted, ref } from "vue"
import { useService } from "src/services"

export default {
  // name: 'ComponentName',
  setup :() => {
    let columns = ref([
      {name :'component', align :'center', label :'component', field :'component', sortable :true},
      {name :'total', align :'center', label :'total', field :'total', sortable :true},
      {name :'today', align :'center', label :'today', field :'today', sortable :true}
    ])
    let rows = ref([])
    onMounted(async () => {
      for (let name of ['users', 'schools', 'users', 'users']) {
        console.log(name)
        let data = await starts(name)
        rows.value.push({
          component :name,
          ...data
        })
      }
    })
    const starts = async (name) => {
      let service = useService()
      console.log(service)
      // Find all messages within the last day
      // return name
      const DAY_MS = 24 * 60 * 60 * 1000;
      let totalCount = await service[name].find({
        query :{
          $limit :0
        }
      })
      let todayCount = await service[name].find({
        query :{
          createdAt :{
            $gt :new Date().getTime() - DAY_MS
          },
          $limit :0
        }
      })
      return {
        total :totalCount.total,
        today :todayCount.total
      }
    }
    return {rows, columns}
  }
}
</script>
