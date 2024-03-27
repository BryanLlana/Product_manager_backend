import { envs } from "./config"
import { PostgresqlDB } from "./data/postgresql.config"
import { AppRoutes, Server } from "./presentation"

(() => {
  main()
})()

async function main() {
  PostgresqlDB.connect(envs.POSTGRESQL_URL)
  const server = new Server({port: envs.PORT, routes: AppRoutes.routes})
  server.start()
}