import axios from 'axios'

function requestMethod({
  url,
  method,
  params = {},
  data = {},
  headers = {'Content-Type':'application/json;charset=UTF-8'},
  transformRequest = []
}) {
  return new Promise((resolve, reject) => {
    axios({
      //在setupProxy.js配置文件下配置的代理
      baseURL: 'http://106.54.251.66:8081/DevOps',
      url,
      method,
      data: JSON.stringify(data),
      params,
      headers,
      transformRequest
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

export default requestMethod;