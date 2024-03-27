import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services";

export class ProductRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new ProductService()
    const controller = new ProductController(service)

    router.post('/', controller.createProduct)
    router.get('/', controller.getproducts)
    router.get('/:id', controller.getProduct)
    router.put('/:id', controller.updateProduct)
    router.patch('/:id', controller.updateProductAvailability)
    router.delete('/:id', controller.deleteProduct)

    return router
  }
} 