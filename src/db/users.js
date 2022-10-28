import Db from './db'

class Users extends Db {
  constructor(){
    super('users')
  }


}

export default new Users()
