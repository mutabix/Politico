import {Pool} from 'pg';  
import dbKeys from './dbKeys';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || dbKeys.dataBasePath
});

  
  export default {
    query(text, params) {
      return new Promise((resolve, reject) => {
        pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
      });
    },
  };