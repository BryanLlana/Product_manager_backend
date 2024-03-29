import { Router } from "express";
import { ProductRoutes } from "./products";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "../config/swagger";

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/api/products', ProductRoutes.routes)
    router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    return router
  }
}