const axios = require('axios')

exports.get = (url, notNeedFullLoading) => {
  let t = new Date().getTime()
  if (url.indexOf('?') >= 0) {
    url += `&t=/${t}`
  } else {
    url += `?t=/${t}`
  }
  if (notNeedFullLoading === true) {
    return axios.get(url)
  } else {
    return axios.get(url, {needFullScreenLoading: true})
  }
}

exports.post = (url, data, notNeedFullLoading) => {
  let axiosOpts = {
    method: 'post',
    url,
    params: {},
    data
  }
  if (url === '/api/auth/login/') axiosOpts['ignoreMsg'] = true
  if (notNeedFullLoading === true) {
    return axios(axiosOpts)
  } else {
    axiosOpts['needFullScreenLoading'] = true
    return axios(axiosOpts)
  }
}
