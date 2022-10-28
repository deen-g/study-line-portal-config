import Dexie from 'dexie'

let db = new Dexie("database");
db.version(1).stores({
  users :"_id, name,avatar,email, password, verification, forget_password, num_invalid_login, portal, is_online, is_verified",
  schools :"_id,admin_id, name, email, code, phone, address, state, country, access_key, is_verified, is_deployed, is_deleted\n",
  configurations :"_id, configuration_id,*pages,is_deleted",
  statistics :"_id, *routes,action,date,time,status"
});

class Db {
  constructor(name){
    this.db = db
    this.service = this.db[name]

  }

  async save(data){
    return await this.service.add({...data})
  }

  async update(data){
    return await this.service.put({...data})
  }

  async patch(id, data){
    return await this.service.update(id, {...data})

  }

  async get(data){
    return await this.service.get({...data})
  }

  async delete(id){
    return await this.service.delete(id)
  }

  async custom(){
    return await this.service
  }
}

export default Db
