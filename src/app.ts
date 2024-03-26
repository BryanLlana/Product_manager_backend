import { AppRoutes, Server } from "./presentation"

(() => {
  main()
})()

async function main() {
  const server = new Server({port: 3000, routes: AppRoutes.routes})
  server.start()
}