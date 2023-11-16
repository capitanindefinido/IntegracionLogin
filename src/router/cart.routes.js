import { Router } from "express"
import CartController from "../controllers/carts.controller.js"

const cartRouter = Router()

const {postCart, getCarts, getCartById, postProductsInCart, deleteProductsFromCart, putProductsInCart, putProductInCart, deleteAllProductsFromCart, getCartWithProducts} = new CartController()

cartRouter.post("/", postCart)

cartRouter.get("/", getCarts)

cartRouter.get("/:id", getCartById)

cartRouter.post("/:cid/products/:pid", postProductsInCart)

cartRouter.delete("/:cid/products/:pid", deleteProductsFromCart)

cartRouter.put("/:cid", putProductsInCart)

cartRouter.put("/:cid/products/:pid", putProductInCart)

cartRouter.delete("/:cid", deleteAllProductsFromCart)

cartRouter.get("/population/:cid", getCartWithProducts)

export default cartRouter