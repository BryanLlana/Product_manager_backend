import Product from "../../data/models/Product.model";
import { CreateProductDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors";

export class ProductService {
  constructor(){}
  
  public async createProduct(createProductDto: CreateProductDto) {
    const { name, price } = createProductDto
    try {
      const product = await Product.create({ name, price })
      return product
    } catch (error) {
      throw CustomError.internalServer('Hubo un error en el servidor')
    }
  }

  public async getProducts() {
    try {
      const products = await Product.findAll({
        order: [
          ['price', 'DESC']
        ],
        attributes: { exclude: ['createdAt', 'updatedAt']}
      })
      return products
    } catch (error) {
      throw CustomError.internalServer('Hubo un error en el servidor')
    }
  }

  public async getProduct(id: number) {
    const product = await Product.findOne({ where: { id }, attributes: { exclude: ['createdAt', 'updatedAt']}})
    if (!product) throw CustomError.notFound('Producto inexistente')
    return product
  }
}