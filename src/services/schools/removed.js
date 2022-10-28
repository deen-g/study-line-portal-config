import format from "string-format"
import { useSchoolStore } from "stores/school.store"
import schools from "src/db/schools"

format.extend(String.prototype, {})

export default function (service){
  return service.on('removed', async (data) => {
    let string = 'data {_id} removed in {path}'.format({_id :data._id, path :service.path})
    let store = useSchoolStore()
    if(process.env.MODE === 'electron'){
      await schools.patch(data)
    }
    store.save(data)
    console.info(string)
  })
}
