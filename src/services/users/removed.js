import format from "string-format"
import { useUserStore } from "stores/user.store"
import user from "src/db/users"

format.extend(String.prototype, {})

export default function (service){
  return service.on('removed', async (data) => {
    let string = 'data {_id} removed in {path}'.format({_id :data._id, path :service.path})
    let store = useUserStore()
    await user.patch(data)
    store.save(data)
    console.info(string)
  })
}
