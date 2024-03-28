import request from 'supertest'
import { Server } from '../../server'
import { envs } from '../../../config'
import { AppRoutes } from '../../routes'
import { PostgresqlDB } from '../../../data/postgresql.config'

PostgresqlDB.connect(envs.POSTGRESQL_URL)
const server = new Server({ port: envs.PORT, routes: AppRoutes.routes })
server.start()

describe('POST /api/products', () => {

  test('Should display validation errors', async () => {
    const response = await request(server.app).post('/api/products').send({})
    expect(response.status).toBe(400)
  })

  test('Should create a new product', async () => {
    const response = await request(server.app).post('/api/products').send({
      name: 'Producto Nuevo - Test',
      price: 500
    })
    expect(response.status).toBe(201)
    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
  })
})

describe('GET /api/products', () => {
  test('Get a JSON response with products', async () => {
    const response = await request(server.app).get('/api/products')
    expect(response.status).toBe(200)
    expect(response.status).not.toBe(404)
  })
})

describe('GET /api/products/:id', () => {
  test('Should return 404 response for a non-existent product', async () => {
    const productId = 2000
    const response = await request(server.app).get(`/api/products/${productId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Producto inexistente')
  })

  test('Should check a valid ID in the URL', async () => {
    const response = await request(server.app).get('/api/products/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Id no válido')
  })

  test('Get a JSON response for a single product', async () => {
    const response = await request(server.app).get('/api/products/1')
    expect(response.status).toBe(200)
  })
})

describe('PUT /api/products/:id', () => {
  test('Should check a valid ID in the URL', async () => {
    const response = await request(server.app).put('/api/products/not-valid-url').send({
      name: 'Producto actualizado',
      price: 200
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Id no válido')
  })

  test('Should return 404 response for a non-existent product', async () => {
    const productId = 2000
    const response = await request(server.app).put(`/api/products/${productId}`).send({
      name: 'Producto actualizado',
      price: 200
    })
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Producto inexistente')
  })

  test('Should display validation error messages when updating a product', async () => {
    const response = await request(server.app).put('/api/products/1').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Debe ingresar por lo menos un campo que quiera actualizar')
  })

  test('Should validate that the price is greater than 0', async () => {
    const response = await request(server.app).put('/api/products/1').send({
      name: 'Producto actualizado',
      price: 0
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors.price).toBe('El precio tiene que ser mayor que 0')
  })

  test('Should update an existing product with valid data', async () => {
    const response = await request(server.app).put('/api/products/1').send({
      name: 'Producto actualizado',
      price: 900,
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Producto actualizado correctamente')
  })
})

server.close()
