import { Request, Response } from "express";
import { ProductService } from "../services";
import { CreateProductDto, UpdateProductDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors";

export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`)
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  public createProduct = (req: Request, res: Response) => {
    const [errors, createProductDto] = CreateProductDto.create(req.body)
    if (errors) return res.status(400).json({ errors })

    this.productService.createProduct(createProductDto!)
      .then(product => res.status(200).json(product))
      .catch(error => this.handleError(error, res))
  }

  public getproducts = (req: Request, res: Response) => {
    this.productService.getProducts()
      .then(products => res.status(200).json(products))
      .catch(error => this.handleError(error, res))
  }

  public getProduct = (req: Request, res: Response) => {
    this.productService.getProduct(+req.params.id)
      .then(product => res.status(200).json(product))
      .catch(error => this.handleError(error, res))
  }

  public updateProduct = (req: Request, res: Response) => {
    const [errors, updateProductDto] = UpdateProductDto.create(req.body)
    if (errors) return res.status(400).json({ errors })

    this.productService.updateProduct(+req.params.id, updateProductDto?.values!)
      .then(product => res.status(200).json(product))
      .catch(error => this.handleError(error, res))
  }
}