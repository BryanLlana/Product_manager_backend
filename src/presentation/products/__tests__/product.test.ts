import request from 'supertest'
import { Server } from '../../server'
import { envs } from '../../../config'
import { AppRoutes } from '../../routes'
import { PostgresqlDB } from '../../../data/postgresql.config'

describe('POST /api/products', () => {
  PostgresqlDB.connect(envs.POSTGRESQL_URL)
  const server = new Server({ port: envs.PORT, routes: AppRoutes.routes })
  server.start()

  test('Should display validation errors', async () => {
    const response = await request(server.app).post('/api/products').send({})
    expect(response.status).toBe(400)
  })

  test('Should create a new product', async() => {
    const response = await request(server.app).post('/api/products').send({
      name: 'Producto Nuevo - Test',
      price: 500
    })
    server.close()
    expect(response.status).toBe(201)
    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
  })
})
