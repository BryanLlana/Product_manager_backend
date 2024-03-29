import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services";

export class ProductRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new ProductService()
    const controller = new ProductController(service)

    /**
     * @swagger
     * /api/products:
     *  post:
     *    summary: Create a new product
     *    tags: 
     *      - Products
     *    description: Returns a successfully created product message
     *    requestBody: 
     *      required: true
     *      content: 
     *        application/json:
     *          schema: 
     *            type: object
     *            properties:
     *              name: 
     *                type: string
     *                example: Procesador Intel i5
     *              price: 
     *                type: number
     *                example: 300
     *    responses:
     *      201: 
     *        description: Product created successfully
     *      400:
     *        description: Bad request - Invalid input data 
     */
    router.post('/', controller.createProduct)

    /**
     * @swagger
     * /api/products:
     *  get:
     *    summary: Get a list of products
     *    tags: 
     *      - Products
     *    description: Return a list of products
     *    responses: 
     *      200: 
     *        description: Successful response
     *        content: 
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Products'
     */
    router.get('/', controller.getproducts)

    /**
     * @swagger
     * /api/products/{id}:
     *  get:
     *    summary: Get a product by ID
     *    tags: 
     *      - Products
     *    description: Return a product based on its unique ID
     *    parameters: 
     *    - in: path
     *      name: id
     *      description: The ID of the product to retrieve
     *      required: true
     *      schema: 
     *        type: integer
     *    responses: 
     *      200:
     *        description: Successful response
     *        content: 
     *          application/json:
     *            schema: 
     *              $ref: '#/components/schemas/Products'
     *      404:
     *        description: Not found
     *      400:
     *        description: Bad request - Invalid ID
     */
    router.get('/:id', controller.getProduct)

    /**
     * @swagger
     * /api/products/{id}:
     *  put:
     *    summary: Updates a product whit user input
     *    tags: 
     *      - Products
     *    description: Returns a successfully updated product message
     *    parameters:
     *    - in: path
     *      name: id
     *      description: The ID of the product to retrieve
     *      required: true
     *      schema: 
     *        type: integer
     *    requestBody:
     *      required: true
     *      content: 
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              name: 
     *                type: string
     *                example: 'Nuevo nombre del producto'
     *              price:
     *                type: number
     *                example: 500
     *              availability: 
     *                type: boolean
     *                example: false
     *    responses:
     *      200:
     *        description: Product modified successfully
     *      400:
     *        description: Bad request - Invalid ID or Invalid input data
     *      404:
     *        description: Product not found
     */
    router.put('/:id', controller.updateProduct)

    /**
     * @swagger
     * /api/products/{id}:
     *  patch:
     *    summary: Update product availability
     *    tags: 
     *      - Products
     *    description: Returns an updated availability message
     *    parameters:
     *      - in: path
     *        name: id
     *        description: The ID of the product to retrieve
     *        required: true
     *        schema: 
     *          type: integer
     *    responses:
     *      200:
     *        description: Product availability modified successfully
     *      400:
     *        description: Bad request - Invalid ID
     *      404:
     *        description: Product not found
     */
    router.patch('/:id', controller.updateProductAvailability)

    /**
     * @swagger
     * /api/products/{id}:
     *  delete:
     *    summary: Deletes a product by a given ID
     *    tags: 
     *      - Products
     *    description: Returns a successfully deleted product message
     *    parameters:
     *      - in: path
     *        name: id
     *        description: The ID of the product to delete
     *        required: true
     *        schema: 
     *          type: integer
     *    responses:
     *      200:
     *        description: Product deleted successfully
     *      400:
     *        description: Bad request - Invalid ID
     *      404:
     *        description: Product not found
     */
    router.delete('/:id', controller.deleteProduct)

    return router
  }
} 