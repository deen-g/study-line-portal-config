import Db from './db'

class School  extends Db {
  constructor(){
    super('schools')
  }


}

export default new School()
