import { Pool } from 'pg';
import config from './config';


export const pool = new Pool({
    user: config.postgre.user,
    host: config.postgre.host,
    database: config.postgre.database,
    password: config.postgre.password,
    port: 5432
});
class DB_Connection {
    pool: any;
    constructor() {
        this.pool = new Pool({
            user: config.postgre.user,
            host: config.postgre.host,
            database: config.postgre.database,
            password: config.postgre.password,
            port: 5432
        });
    }
    query(query: string) {
        return new Promise<string>(async (resolve: any, reject: any) => {
            const client = await this.pool.connect();

            await client
                .query(query)
                .then((cursor: any) => {
                    client.release();
                    resolve(cursor);
                })
                .catch((e: any) => {
                    client.release();
                    reject(e);
                });
        });
    }
}

export const client = new DB_Connection();
