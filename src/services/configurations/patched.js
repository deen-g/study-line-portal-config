import format from "string-format"
import configurations from "src/db/configurations"
import { useConfigurationStore } from "stores/configuration.store"

format.extend(String.prototype, {})

export default function (service){
  let store = useConfigurationStore()
  return service.on('patched', async (data) => {
    let string = 'data {_id} patched in {path}'.format({_id :data._id, path :service.path})
    console.info(string)
    await configurations.patch({_id :data._id}, data)
    store.save(data)
    console.info(string)
  })
}
