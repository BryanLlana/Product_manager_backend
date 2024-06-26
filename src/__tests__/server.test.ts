import request from 'supertest'
import { AppRoutes, Server } from '../presentation'
import { envs } from '../config'
import { CorsAdapter } from '../config/adapter'

describe('GET /api/products', () => {
  test('Should send back a json response', async () => {
    const server = new Server({ port: envs.PORT, routes: AppRoutes.routes, cors: CorsAdapter.create() })
    server.start()
    const res = await request(server.app).get('/api')
    server.close()
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.body.msg).toBe('Desde api')

    expect(res.status).not.toBe(404)
    expect(res.body.msg).not.toBe('desde api')
  })
})