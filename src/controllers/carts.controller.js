import CartDaoMongo from "../DAO/Mongo/CartDaoMongo.js";

const carts = new CartDaoMongo()

class CartController {
    postCart = async (req,res) =>{
        let newCart = req.body
        res.send(await carts.addCart(newCart))
    }

    getCarts = async (req,res)=>{
        res.send(await carts.getCarts())
    }

    getCartById = async (req,res)=>{
        res.send(await carts.getCartById(req.params.id))
    }

    postProductsInCart = async (req,res) => {
        let cartId = req.params.cid
        let prodId = req.params.pid
        res.send(await carts.addProductInCart(cartId, prodId))
    }

    deleteProductsFromCart = async (req,res) => {
        let cartId = req.params.cid
        let prodId = req.params.pid
        res.send(await carts.removeProductFromCart(cartId, prodId))
    }

    putProductsInCart = async (req,res) => {
        let cartId = req.params.cid
        let newProducts = req.body
        res.send(await carts.updateProductsInCart(cartId, newProducts))
    }

    putProductInCart = async (req,res) => {
        let cartId = req.params.cid
        let prodId = req.params.pid
        let newProduct = req.body
        res.send(await carts.updateProductInCart(cartId, prodId, newProduct))
    }

    deleteAllProductsFromCart = async (req,res) => {
        let cartId = req.params.cid
        res.send(await carts.removeAllProductsFromCart(cartId))
    }

    getCartWithProducts = async (req,res)=>{
        let cartId = req.params.cid
        res.send(await carts.getCartWithProducts(cartId))
    }
}

export default CartController