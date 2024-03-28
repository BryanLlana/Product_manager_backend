export class UpdateProductDto {
  constructor(
    public readonly name?: string,
    public readonly price?: number,
  ) {}

  get values() {
    const returnObj: {[key: string]: any} = {}
    if (this.name) returnObj.name = this.name
    if (this.price) returnObj.price = this.price

    return returnObj
  }

  static create (object: {[key: string]: any}): [Object?, UpdateProductDto?] {
    let { name, price } = object
    const errors: {[key: string]: any} = {}

    if (price || price === 0) {
      price = Number(price)
      if (isNaN(price)) errors.price = 'El precio tiene que ser un número'
      else if (price <= 0) errors.price = 'El precio tiene que ser mayor que 0'
    }

    if (Object.values(errors).length > 0) return [errors, undefined]
    return [undefined, new UpdateProductDto(name, price)]
  }
}