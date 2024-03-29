import { Router } from "express";
import { ProductRoutes } from "./products";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "../config/swagger";

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    /**
     * @swagger
     * components: 
     *  schemas:
     *    Products: 
     *      type: object
     *      properties: 
     *        id:
     *          type: integer
     *          description: The product ID
     *          example: 1
     *        name: 
     *          type: string
     *          description: The product name
     *          example: Procesador Intel i5
     *        price: 
     *          type: number
     *          description: The product price
     *          example: 300
     *        availability: 
     *          type: boolean
     *          description: The product availability
     *          example: true
     */

    router.use('/api/products', ProductRoutes.routes)
    router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    return router
  }
}