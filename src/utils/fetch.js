import axios from 'axios'
import router from '../router'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      timeout: 10000 // 超时
    })
    instance(options)
      .then(response => {
        const res = response.data
        if(400 === res.statusCode){
            router.push('/login')
        }
        resolve(res)
      })
      .catch(error => {
        console.log(error) // for debug
        LoadingBar.finish()
        reject(error)
      })

  });
}




