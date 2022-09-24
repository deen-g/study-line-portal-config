import { useAuthStore } from "stores/auth"

const routeList = [
  {
    hr: true
  },
  {
    title: 'Home',
    icon: 'home',
    link: 'index-page',
    query: { page: 'home-page' }
  },
  {
    title: 'About Us',
    caption: 'Little but on study line',
    icon: 'mdi-help-network',
    link: 'index-page',
    query: { page: 'about-page' }
  },
  {
    title: 'Services',
    caption: 'Our services and features',
    icon: 'mdi-face-agent',
    link: 'index-page',
    query: { page: 'services-page' }
  },
  {
    title: 'Contact Us',
    caption: 'Get connected in real time',
    icon: 'mdi-card-account-phone',
    link: 'index-page',
    query: { page: 'contact-page' }
  },
  {
    hr: true
  }
  // {
  //   title: 'My Applications',
  //   caption: 'create applications for schools',
  //   icon: 'school',
  //   link: 'authenticated-applications'
  // },
  // {
  //   title: 'Access portals',
  //   caption: 'view and access portals',
  //   icon: 'school',
  //   link: 'authenticated-portal'
  // },
  // {
  //   title: 'Mails',
  //   caption: 'view and access mails',
  //   icon: 'school',
  //   link: 'mails'
  // },
  // {
  //   hr: true
  // },
  // {
  //   title: 'Create School',
  //   caption: 'create school profiles',
  //   icon: 'school',
  //   link: 'create-school'
  // }
]
const store = useAuthStore()

const addLink = (body, title, obj) => {
  // console.log(body)
  const comp = body.find(f => f.title === title)
  if (comp) {
    comp.list.push(obj)
  }
  return body
}
const addStudentLinks = (listings) => {
  listings.push({
    title: 'Application Manager',
    icon: 'school',
    list: []
  })
  listings = addLink(listings, 'Application Manager', {
    title: 'Apply',
    caption: 'create applications for schools',
    icon: 'school',
    link: 'new-application'
  })
  listings = addLink(listings, 'Application Manager', {
    title: 'Applications',
    caption: 'all school application',
    icon: 'school',
    link: 'user-application'
  })
  return listings
}
const addSchoolManagerLinks = (listings) => {
  listings.push({
    title: 'School Manager',
    icon: 'school',
    list: []
  })
  if (store.hasSchool) {
    listings = addLink(listings, 'School Manager', {
      title: 'School detail',
      caption: 'create applications for schools',
      icon: 'school',
      link: 'school-profile',
      params: { id: store.getSchool._id,type:'self' }
    })
  } else {
    listings = addLink(listings, 'School Manager', {
      title: 'New school',
      caption: 'create applications for schools',
      icon: 'school',
      link: 'new-school'
    })
  }
  return listings
}
const addLoggedInLink = (listings) => {
  listings = listings.filter(f => f.title !== 'Application Manager')
  listings = listings.filter(f => f.title !== 'School Manager')
  if (store.isLoggedIn && store.isVerified) {
    if (store.user.is_school_admin) {
      listings = addSchoolManagerLinks(listings)
    } else {
      listings = addStudentLinks(listings)
    }
  }
  return listings
}
const links = () => {
  let listings = routeList
  listings = addLoggedInLink(listings)
  return listings
}
export default { links }
