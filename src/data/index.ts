import { envs } from "../config";
import { PostgresqlDB } from "./postgresql.config";

if (process.argv[2] === '--delete') {
  PostgresqlDB.clearDB(envs.POSTGRESQL_URL)
}