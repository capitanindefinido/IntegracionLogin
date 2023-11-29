import ProductDto from "../dto/products.dto.js"

class ProductRepository {

    constructor(dao){
        this.dao = dao
    }

    async addProduct(productData){
        const newProduct = new ProductDto(productData)
        return await this.dao.addProduct(newProduct)
    }

    async updateProduct(id, productData){
        return await this.dao.updateProduct(id, productData)
    }

    async getProducts(){
        return await this.dao.getProducts()
    }

    async getProductById(id){
        return await this.dao.getProductById(id)
    }

    async getProductsMaster(page = 1, limit = 10, category, availability, sortOrder){
        return await this.dao.getProductsMaster(page = 1, limit = 10, category, availability, sortOrder)
    }

    async deleteProduct(id){
        return await this.dao.deleteProduct(id)
    }

}

export default ProductRepository