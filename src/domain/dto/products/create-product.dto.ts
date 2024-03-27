export class CreateProductDto {
  constructor(
    public readonly name: string,
    public readonly price: number,
  ) {}

  static create (object: {[key: string]: any}): [Object?, CreateProductDto?] {
    let { name, price } = object
    price = Number(price)
    const errors: {[key: string]: any} = {}

    if (!name) errors.name = 'El nombre es obligatorio'
    if (!price) errors.price = 'El precio es obligatorio'
    else if (price <= 0) errors.price = 'El precio no puede ser menor que 0'

    if (Object.values(errors).length > 0) return [errors, undefined]
    return [undefined, new CreateProductDto(name, price)]
  }
}