import Product from "../../data/models/Product.model";
import { CreateProductDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors";

export class ProductService {
  constructor(){}
  
  public async createProduct(createProductDto: CreateProductDto) {
    const { name, price } = createProductDto
    try {
      await Product.create({ name, price })
      return {
        message: 'Producto agregado correctamente'
      }
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
    if (isNaN(+id)) throw CustomError.badRequest('Id no válido')
    const product = await Product.findOne({ where: { id }, attributes: { exclude: ['createdAt', 'updatedAt']}})
    if (!product) throw CustomError.notFound('Producto inexistente')
    return product
  }

  public async updateProduct(id: number, updateProductDto: {[key: string]: any}) {
    const product = await this.getProduct(id)
    try {
      await product.update(updateProductDto)
      await product.save()
      return {
        message: 'Producto actualizado correctamente'
      }
    } catch (error) {
      throw CustomError.internalServer('Hubo un error en el servidor')
    }
  }

  public async updateProductAvailability (id: number) {
    const product = await this.getProduct(id)
    try {
      product.availability = !product.dataValues.availability
      await product.save()
      return {
        message: 'Disponibilidad actualizada correctamente'
      }
    } catch (error) {
      throw CustomError.internalServer('Hubo un error en el servidor')
    }
  }

  public async deleteProduct (id: number) {
    const product = await this.getProduct(id)
    try {
      await product.destroy()
      return {
        message: 'Producto eliminado correctamente'
      }
    } catch (error) {
      throw CustomError.internalServer('Hubo un error en el servidor')
    }
  }
}