import format from "string-format"
import Service from "src/services/service"
import onCreated from "./created"
import onPatched from "./patched"
import onRemoved from "./removed"
format.extend(String.prototype, {})

class Index extends Service {
  constructor(name){
    super()
    this.name = name
    this.service = {}
  }

  async configure(client){
    await super.configure(client, this.name);
    await this.load()
    let string = '{} service is loaded'.format(this.service.path)
    console.info(string)
    return this.service
  }

  async load(){
    let service = this.service
    onCreated(service)
    onPatched(service)
    onPatched(service)
    onRemoved(service)
  }
}

export default new Index('statistics')
