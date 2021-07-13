import axios from 'axios';
import {OnlineRoot,RootPath} from './Config';
const Put = (path, root = false, data, token = null) => {
      // const cancelToken = axios.CancelToken
      // const source = cancelToken.source()
      const promise = new Promise ((resolve, reject) => {
            axios.put(`${root ? OnlineRoot : RootPath}${path}`, data,
                  {
                        headers : {
                              Authorization: (token ==null ? null : `Bearer ${token}`),
                              'Accept' : 'application/json',
                              'Access-Control-Allow-Origin': '*',
                              'Access-Control-Allow-Methods': 'POST, GET, PUT,PATCH,DELETE,OPTIONS',
                              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                              // 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'             
                        }
                  }
            )
            .then((result) => {
                  resolve(result.data);
            }, (err) => {
                  reject(err);
            })
      })
      return promise;
}

export default Put;