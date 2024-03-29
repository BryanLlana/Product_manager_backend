import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services";

export class ProductRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new ProductService()
    const controller = new ProductController(service)

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
    router.put('/:id', controller.updateProduct)
    router.patch('/:id', controller.updateProductAvailability)
    router.delete('/:id', controller.deleteProduct)

    return router
  }
} 