class ProductDto {
    constructor(newProduct){
        this.description = newProduct.description
        this.image = newProduct.image
        this.price = newProduct.price
        this.stock = newProduct.stock
        this.category = newProduct.category
        this.availability = newProduct.availability
    }
}

export default ProductDto