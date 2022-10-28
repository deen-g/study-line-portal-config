import { LocalStorage } from 'quasar'

let localForage = {
  getItem :LocalStorage.getItem,
  setItem :LocalStorage.set,
  removeItem :LocalStorage.remove
}
export { localForage }
