import format from "string-format"
import schools from "src/db/schools"
import { useSchoolStore } from "stores/school.store"

format.extend(String.prototype, {})

export default function (service){
  let store = useSchoolStore()
  return service.on('created', async (data) => {
    let string = 'data {_id} created in {path}'.format({_id :data._id, path :service.path})
    if(process.env.MODE === 'electron'){
      await schools.create(data)
    }
    store.save(data)
    console.info(string)
  })
}
