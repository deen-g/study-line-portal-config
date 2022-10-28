import { defineStore } from 'pinia'
import { bus } from 'boot/global-event-bus'
// eslint-disable-next-line no-unused-vars
export const useAuthStore = defineStore('auth', {
  state :() => ({
    auth :{},
    user :{}
  }),

  getters :{
    isLoggedIn(state){
      return Object.prototype.hasOwnProperty.call(state.user, '_id')
    },
    isVerified(state){
      return !!state.user.is_verified
    },
    userId(state){
      return state.user._id
    },
    getUser(state){
      return state.user
    }
  },

  actions :{
    clearAuthUser(){
      this.auth = {}
      this.user = {}
      bus.emit('emit:account:authenticate', false)
    },
    setAuthUser(data){
      bus.emit('emit:account:authenticate', Object.hasOwnProperty.call(data.user, '_id'))
      this.auth = data
      if(data.user.name){
        const matches = data.user.name.match(/\b(\w)/g)
        data.user.acronym = matches.join('')
      }
      this.user = data.user
    },
    setUser(data){
      if(data.name){
        const matches = data.user.name.match(/\b(\w)/g)
        data.user.acronym = matches.join('')
      }
      this.user = data
    },
    setVerification(data){
      let user = this.user
      user.is_verified = data.is_verified
      this.user = user
    }
  }
})
