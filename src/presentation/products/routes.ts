import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services";

export class ProductRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new ProductService()
    const controller = new ProductController(service)

    router.post('/', controller.createProduct)

    return router
  }
} 