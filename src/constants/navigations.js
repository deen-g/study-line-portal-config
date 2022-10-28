import { useAuthStore } from "stores/auth"

const routeList = [
  {
    hr :true
  },
  {
    title :'WEB PAGES',
    icon :'school',
    authorized :['web', 'auth', 'user::is::student'],
    list :[
      {
        title :'Home',
        icon :'home',
        link :'web-pages',
        params :{id :'home-page'},
        authorized :['web']
      },
      {
        title :'About Us',
        caption :'Little but on study line',
        icon :'mdi-help-network',
        link :'web-pages',
        params :{id :'about-page'},
        authorized :['web']
      },
      {
        title :'Services',
        caption :'Our services and features',
        icon :'mdi-face-agent',
        link :'web-pages',
        params :{id :'services-page'},
        authorized :['web']
      },
      {
        title :'Contact Us',
        caption :'Get connected in real time',
        icon :'mdi-card-account-phone',
        link :'web-pages',
        params :{id :'contact-us-page'},
        authorized :['web']
      },
    ]
  },
  {
    hr :true
  },
  {
    title :'EMAIL TEMPLATES',
    link :'index-page',
    query :{page :'home-page'},
    authorized :['web']
  },
  {
    hr :true
  },
  {
    title :'SCHOOLS',
    icon :'school',
    authorized :['web', 'auth', 'user::is::student'],
    list :[
      {
        title :'APPLICATIONS',
        caption :'create applications for schools',
        icon :'list',
        link :'new-application',
        authorized :[]
      },
      {
        title :'PLANS',
        caption :'all school application',
        icon :'school',
        link :'user-application',
        authorized :[]
      }
    ]
  },
  {
    title :'School Manager',
    icon :'school',
    authorized :['web', 'auth', 'user::is::admin'],
    list :[
      {
        title :'School detail',
        caption :'create applications for schools',
        icon :'school',
        link :'school-profile',
        authorized :['user::has::school']
      },
      {
        title :'New school',
        caption :'create applications for schools',
        icon :'school',
        link :'new-school',
        authorized :['user::create::school']
      }
    ]
  }
]
const auth = useAuthStore()
const processLink = (item) => {
  let data = {...item}
  let check = true
  if(item.authorized){
    item.authorized.forEach((i) => {
      if(check){
        const user = auth.getUser
        switch (i) {
          case 'web':
            break
          case 'auth':
            check = auth.isLoggedIn
            break
          case 'user::is::student':
            check = !user.is_school_admin
            break
          case 'user::is::admin':
            if(user.is_school_admin){
              check = user.is_school_admin
            } else {
              check = false
            }
            break
          case 'user::has::school':
            if(auth.hasSchool){
              let school_id = auth.getSchool._id
              data.params = {id :school_id, type :'self'}
              check = user.is_school_admin
            } else {
              check = false
            }
            break
          case 'user::create::school':
            if(!auth.hasSchool){
              check = user.is_school_admin
            } else {
              check = false
            }
            break
        }
      }
    })
  }
  delete data.authorized
  return check ? data : check
}
const configureLinks = (links, authorized = null) => {
  let list = []
  links.forEach(function (item, index, arr){
    if(authorized){
      item.authorized = authorized.concat(item.authorized)
    }
    let obj = processLink(item)
    if(obj){
      if(obj.list){
        obj.list = configureLinks(item.list, item.authorized)
      }
      list.push(obj)
    }
  })
  return list
}
const links = () => {
  let listings = configureLinks(routeList)
  return listings
}
export default {links}
