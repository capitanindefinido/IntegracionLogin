import CartDto from "../dto/carts.dto.js"

class CartRepository {

    constructor(dao){
        this.dao = dao
    }

    async getCarts(){
        return await this.dao.getCarts()
    }

    async addCart(cartData){
        const newCart = new CartDto(cartData)
        return await this.dao.addCart(newCart)
    }

    async getCartById(id){
        return await this.dao.getCartById(id)
    }

    async addProductInCart(cid, pid){
        return await this.dao.addProductInCart(cid, pid)
    }

    async removeProductFromCart(cid, pid){
        return await this.dao.removeProductFromCart(cid, pid)
    }

    async updateProductsInCart(cid, pid){
        return await this.dao.updateProductsInCart(cid, pid)
    }

    async updateProductInCart(cartId, prodId, updatedProduct){
        return await this.dao.updateProductInCart(cartId, prodId, updatedProduct)
    }

    async removeAllProductsFromCart(cartId){
        return await this.dao.removeAllProductsFromCart(cartId)
    }

    async getCartWithProducts(cartId){
        return await this.dao.getCartWithProducts(cartId)
    }

    async purchaseCart(cartId, user){
        return await this.dao.purchaseCart(cartId, user)
    }
    
}

export default CartRepository