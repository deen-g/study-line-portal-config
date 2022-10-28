import format from "string-format"
import users from "src/db/users"
import { useUserStore } from "stores/user.store"

format.extend(String.prototype, {})

export default function (service){
  let store = useUserStore()
  return service.on('created', async (data) => {
    let string = 'data {_id} created in {path}'.format({_id :data._id, path :service.path})
    if(process.env.MODE === 'electron'){
      await users.create(data)
    }
    store.save(data)
    console.info(string)
  })
}
