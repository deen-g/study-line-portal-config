import format from "string-format"
import configurations from "../../db/configurations"
import { useConfigurationStore } from "stores/configuration.store"

format.extend(String.prototype, {})

export default function (service){
  let store = useConfigurationStore()
  return service.on('created', async (data) => {
    let string = 'data {_id} created in {path}'.format({_id :data._id, path :service.path})
    await configurations.save(data)
    store.save(data)
    console.info(string)
  })
}
