const collectionFinder = (collection, query) => {
  const queryKeys = Object.keys(query);
  return collection.filter(item => {
    return queryKeys.every(key => {
      if (typeof query[key] !== 'function') return true;
      return query[key](item[key])
    })
  })
}

let global = {
  finder :collectionFinder
}
export default global
