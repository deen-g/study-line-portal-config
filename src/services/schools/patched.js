import format from "string-format"
import { useSchoolStore } from "stores/school.store"
import schools from "src/db/schools"

format.extend(String.prototype, {})

export default function (service){
  return service.on('patched', async (data) => {
    let store = useSchoolStore()
    let string = 'data {_id} patched in {path}'.format({_id :data._id, path :service.path})
    if(process.env.MODE === 'electron'){
      await schools.patch(data)
    }
    store.save(data)
    console.info(string)

  })
}
