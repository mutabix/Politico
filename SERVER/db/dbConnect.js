import {Pool} from 'pg'; 
import Keys from './dbKeys'; 
import dbKeys from './dbKeys';


const pool = new Pool({
connectionString: dbKeys.dataBasePath,
});


export default pool;