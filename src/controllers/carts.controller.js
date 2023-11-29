import service from "../service/service.js";

const cartService = service.cartService

class CartController {
    postCart = async (req,res) =>{
        let newCart = req.body
        res.send(await cartService.addCart(newCart))
    }

    getCarts = async (req,res)=>{
        res.send(await cartService.getCarts())
    }

    getCartById = async (req,res)=>{
        res.send(await cartService.getCartById(req.params.id))
    }

    postProductsInCart = async (req,res) => {
        let cartId = req.params.cid
        let prodId = req.params.pid
        res.send(await cartService.addProductInCart(cartId, prodId))
    }

    deleteProductsFromCart = async (req,res) => {
        let cartId = req.params.cid
        let prodId = req.params.pid
        res.send(await cartService.removeProductFromCart(cartId, prodId))
    }

    putProductsInCart = async (req,res) => {
        let cartId = req.params.cid
        let newProducts = req.body
        res.send(await cartService.updateProductsInCart(cartId, newProducts))
    }

    putProductInCart = async (req,res) => {
        let cartId = req.params.cid
        let prodId = req.params.pid
        let newProduct = req.body
        res.send(await cartService.updateProductInCart(cartId, prodId, newProduct))
    }

    deleteAllProductsFromCart = async (req,res) => {
        let cartId = req.params.cid
        res.send(await cartService.removeAllProductsFromCart(cartId))
    }

    getCartWithProducts = async (req,res)=>{
        let cartId = req.params.cid
        res.send(await cartService.getCartWithProducts(cartId))
    }

    purchase = async (req, res) => {
        try {
            let cartId = req.params.cid
            const result = await cartService.purchaseCart(cartId);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: 'Error al finalizar la compra' });
        }
    }
    
}

export default CartController