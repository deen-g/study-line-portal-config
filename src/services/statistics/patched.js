import format from "string-format"
import statistics from "src/db/statistics"
import { useStatisticStore } from "stores/statistics.store"

format.extend(String.prototype, {})

export default function (service){
  return service.on('patched', async (data) => {
    let store = useStatisticStore()
    let string = 'data {_id} patched in {path}'.format({_id :data._id, path :service.path})
    await statistics.patch(data)
    store.save(data)
    console.info(string)

  })
}
