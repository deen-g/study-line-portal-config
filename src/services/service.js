class Service {
  constructor(){
    this.service = {}
  }

  async configure(client, name){
    this.service = await client.service(name)
  }
}

export default Service
