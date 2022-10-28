import format from "string-format"
import configurations from "src/db/configurations"
import { useConfigurationStore } from "stores/configuration.store"

format.extend(String.prototype, {})

export default function (service){
  let store = useConfigurationStore()
  return service.on('removed', async (data) => {
    let string = 'data {_id} removed in {path}'.format({_id :data._id, path :service.path})
    await configurations.patch({_id :data._id}, data)
    store.save(data)
    console.info(string)
  })
}
