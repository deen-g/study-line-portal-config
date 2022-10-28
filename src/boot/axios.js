import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { notifications } from "boot/notification"
import { localForage } from "src/constants/localforge"
// import { localForage } from "src/constants/localforge"

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  timeout :5000,
  headers :{
    'Content-Type' :'application/json',
    'x-access' :process.env.portal
  },
  // withCredentials :true,
  // // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  // xsrfCookieName :'XSRF-TOKEN', // default
  //
  // // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  // xsrfHeaderName :'X-XSRF-TOKEN' // default
})
export default boot(async ({app}) => {
  api.defaults.baseURL = process.env.api
  console.log('axios url:', api.defaults.baseURL)
  // for use inside Vue files (Options API) through this.$axios and this.$api
// Add a request interceptor
  api.interceptors.request.use(function (config){
    // Do something before request is sent
    let token = localForage.getItem(process.env.auth)
    if(token){
      config.headers['x-auth-token'] = `${token}`;
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  }, function (error){
    // Do something with request error
    return Promise.reject(error);
  }, {synchronous :true});
// Add a response interceptor
  api.interceptors.response.use(function (response){
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response)
    if(response.data){
      if(response.data.cookie) return {status :true, data :response.data}
      return response.data;
    }
    return response;
  }, function (error){
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let {response} = error
    if(response && response.data){
      let code = response.status
      let {message} = response.data
      if(code >= 400 && code < 500){
        notifications.warning(message)
      } else if(code >= 500){
        notifications.negative(message)
      }
      return {
        status :false,
        message :response.data.message
      }
    } else {
      notifications.negative('connection error')
    }

  });

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
