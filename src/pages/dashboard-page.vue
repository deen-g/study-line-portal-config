<template>
  <q-page padding>
    <!-- content -->
    DASHBOARD
    <q-separator spaced/>
    <q-card flat bordered>
      <q-card-section>
        OVERVIEW
        <q-separator inset spaced/>
        <overview-board-comp/>
      </q-card-section>
    </q-card>

    <q-separator spaced inset/>

    <q-card flat bordered>
      <q-card-section>
        <graph-board-comp/>
      </q-card-section>
    </q-card>
    <q-separator spaced/>
    <q-card flat bordered>
      <q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import OverviewBoardComp from "components/board/overview-board-comp.vue"
import GraphBoardComp from "components/board/graph-board-comp.vue"

export default {
  components :{GraphBoardComp, OverviewBoardComp},
  // name: 'PageName',
  setup :() => {

  }
}
</script>
