import format from "string-format"
import { useStatisticStore } from "stores/statistics.store"
import statistics from "src/db/statistics"

format.extend(String.prototype, {})

export default function (service){
  return service.on('removed', async (data) => {
    let string = 'data {_id} removed in {path}'.format({_id :data._id, path :service.path})
    let store = useStatisticStore()
    await statistics.patch(data)
    store.save(data)
    console.info(string)
  })
}
