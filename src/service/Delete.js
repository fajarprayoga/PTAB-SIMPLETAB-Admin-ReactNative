import axios from 'axios';
import {OnlineRoot,RootPath} from './Config';

const Delete = (path, root=false, token=null) => {
      const promise = new Promise ((resolve, reject) => {
            axios.delete(`${root ? OnlineRoot : RootPath}${path}`,
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
                  resolve(result);
            }, (err) => {
                  reject(err)
            })
      })

      return promise;
}

export default Delete;