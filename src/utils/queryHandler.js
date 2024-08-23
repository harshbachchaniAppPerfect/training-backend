import { pool } from "../db/config.js";
import { handleDatabaseError } from "./handleDBError.js";
export const queryHandler = (query, values, client) => {
  return new Promise((resolve, reject) => {
    if (client) {
      client
        .query(query, values)
        .then((res) => {
          return resolve(res.rows);
        })
        .catch((error) => {
          reject(handleDatabaseError(error));
        });
    } else {
      pool
        .query(query, values)
        .then((res) => {
          return resolve(res.rows);
        })
        .catch((error) => {
          reject(handleDatabaseError(error));
        });
    }
  });
};
