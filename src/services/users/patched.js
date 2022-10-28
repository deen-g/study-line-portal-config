import format from "string-format"
import users from "src/db/users"
import { useUserStore } from "stores/user.store"

format.extend(String.prototype, {})

export default function (service){
  return service.on('patched', async (data) => {
    let store = useUserStore()
    let string = 'data {_id} patched in {path}'.format({_id :data._id, path :service.path})
    await users.patch(data)
    store.save(data)
    console.info(string)

  })
}
