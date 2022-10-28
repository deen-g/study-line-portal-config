<template>
  <div>
    <q-item class="no-margin q-pt-none">
      <q-item-section>
        <q-item-label>
          SERVER REQUESTS
        </q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-item-label caption>
          UPDATES IN: {{ timer }} (s)
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator inset spaced/>
    <canvas id="myChart" width="100%" height="300"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { onMounted, ref, watch } from "vue"
import useStore from "stores/store"

export default {
  // name: 'ComponentName',

  setup(){
    let timer = ref(30)
    let chart = null
    let store = useStore()
    const addData = (chart, success, errors) => {
      const processMax = (prevMax, actual, constant) => {
        let newMax = 0
        if(actual > prevMax){
          newMax = prevMax + constant
          newMax = processMax(newMax, actual, constant)
        } else {
          newMax = prevMax
        }
        return newMax
      }
      let count = chart.data.datasets[0].data.length + 1
      success.x = count
      errors.x = count
      let maxY = success.y > errors.y ? success.y : errors.y
      let lenMax = String(maxY).length
      let constant = parseInt('1' + new Array(lenMax).fill(0).join(''))
      let prev = chart.options.scales.y.max
      let max = processMax(prev, maxY, constant)
      console.log(chart.options.scales.y.max)
      console.log(max)
      if(chart.options.scales.y.max !== max) chart.options.scales.y.max = max
      chart.data.datasets[0].data.push(success)
      chart.data.datasets[1].data.push(errors)

      chart.update();
    }
    const removeData = (chart) => {
      chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
        dataset.data = dataset.data.map((key, index) => {
          key.x = index
          return key
        })
      });
      chart.update();
    }
    watch(() => store.statistic.getCurrent,
      (current) => {
        loadGraph(chart,current)
    })
    const loadGraph = async (chart,data) => {
      let success = {y :data.success}
      let errors = {y :data.errors}
      if(chart.data.datasets[0].data.length > 100){
        removeData(chart)
      }
      addData(chart, success, errors)
    }
    onMounted(() => {
      timer.value = 30
      const ctx = document.getElementById('myChart').getContext('2d');
      const config = {
        type :'line',
        data :{
          datasets :[{
            label :'SUCCESS',
            borderColor :'rgb(54, 162, 235)',
            borderWidth :1,
            radius :0,
            data :[{x :0, y :0}]
          },
            {
              label :'ERRORS',
              borderColor :'rgb(255, 99, 132)',
              borderWidth :1,
              radius :0,
              data :[{x :0, y :0}]
            }]
        },
        options :{
          interaction :{
            intersect :false
          },
          plugins :{
            // legend :false
          },
          scales :{
            x :{
              min :0,
              max :100,
              type :'linear'
            },
            y :{
              min :0,
              max :100
            }
          }
        }
      };
      chart = new Chart(ctx, config)
      loadGraph(chart,{success:0,errors:0})
      // loadGraph(chart)
      // setInterval(async () => {
      //   timer.value = 30
      //   await loadGraph(chart)
      // }, 30000)
    })

    return {timer}
  }
}
</script>
