import { defineStore } from 'pinia'
import { api } from "boot/axios"
import apis from "src/constants/apis"
import global from "src/constants/global"

export const useUserStore = defineStore('users', {
  state :() => ({
    limit :10,
    skip :0,
    collection :[]
  }),

  getters :{
    all(state){
      return state.collection
    },
    get(state, id){
      return state.collection.find(f => f._id === id)
    },
    find(state){
      return ''
      // return global.finder(state.collection, query)
    }
  },

  actions :{
    getPage(configuration_id, id){
      let docs = global.finder(this.collection, {configuration_id})
      if(docs.length > 0){
        let doc = docs[0]
        let {pages} = doc
        return pages.find(f => f.id === id)
      }
      return {}
    },

    async fetch(data){

      const query = '?' + new URLSearchParams(data).toString();
      const response = await api.get(apis.authorised.config.management.configuration.find + query)
      if(response.status){
        if(response.data.total > 0){
          if(response.data.limit){
            this.limit = this.limit + response.data.limit
          }
          this.save(response.data.data)
        }
      }
    },
    fetchOne(data){
      return data
    },
    fetchMany(data){
      return data
    },
    async create(data){
      const response = await api.post(apis.authorised.config.management.configuration.create, {...data})
      if(response.status){
        this.save(response.data)
      }
    },
    async patch(data, query){
      query = '?' + new URLSearchParams(query).toString();
      const response = await api.post(apis.authorised.config.management.configuration.patch + query, {...data})
      if(response.status){
        this.save(response.data)
      }
    },
    async updateWebPage(data, query){
      query.section='pages'
      query = '?' + new URLSearchParams(query).toString();
      const response = await api.post(apis.authorised.config.management.configuration.createOrPatch + query, {...data})
      if(response.status){
        this.save(response.data)
      }
    },
    save(data){
      if(Array.isArray(data)){
        data.map(current => this.save(current))
      } else {
        let docs = this.collection.filter(f => f._id !== data._id)
        docs.push(data)
        this.collection = docs
      }
    }
  }
})
