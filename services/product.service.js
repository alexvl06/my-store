const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')
class ProductService{
  constructor(){
    this.products = []
    this.generate()
  }
  generate(){
    for (let index = 0; index < 100; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      });
    }
  }
  async create(product){
    const newProduct={
      id:faker.string.uuid(),
      ...product
    }
    this.products.push(newProduct)
    return newProduct
  }
  async findAll(){
    return this.products
  }
  async findOne(id){
    const product = this.products.find(product=>product.id ==id);
    if(!product){
      throw boom.notFound('Product not found')
    }
    if(product.isBlock){
      throw boom.conflict('product is block')
    }
    return product
  }
  async update(id, changes){
    const index = this.products.findIndex(item=>item.id===id)
    if(index ===-1){
      throw boom.notFound('Product not found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }
  async delete(id){
    const index = this.products.findIndex(item=>item.id===id)
    if(index ===-1){
      throw boom.notFound('Product not found')
    }
    this.products.splice(index, 1)
    return {id}
  }
}

module.exports = ProductService
