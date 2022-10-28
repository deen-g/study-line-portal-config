import format from "string-format"
import statistics from "src/db/statistics"
import { useStatisticStore } from "stores/statistics.store"

format.extend(String.prototype, {})

export default function (service){
  let store = useStatisticStore()
  return service.on('created', async (data) => {
    let string = 'data {_id} created in {path}'.format({_id :data._id, path :service.path})
    await statistics.save(data)
    store.save(data)
    console.info(string)
  })
}
