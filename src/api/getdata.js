import axios from 'axios'
import qs from 'qs'
import urls from './urls'

const get = (url, params) => {
    return new Promise(resolve => {
        axios
        .get(url, {params: params})
        .then(response => resolve(response.data))
        .catch(err => console.log(err))
    })
}
const post = (url, params) => {
    return new Promise(resolve => {
        axios
        .post(url, qs.stringify(params))
        .then(response => resolve(response.data))
        .catch(err => console.log(err))
    })
}
const postobj = (url, params) => {
    return new Promise(resolve => {
      axios
        .post(url, params)
        .then(response => resolve(response.data))
        .catch(err => console.log(err))
    })
  }
const api = {
    ...urls
}
export {
    api,
    get,
    post,
    postobj
}