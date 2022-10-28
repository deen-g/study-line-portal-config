import Db from './db'

class Configurations extends Db {
  constructor(){
    super('configurations')
  }
}

export default new Configurations()
