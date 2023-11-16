import { Router } from "express"
import ProductController from "../controllers/products.controller.js"

const prodRouter = Router()
const {putProduct, getProductById, getProducts, deleteProduct, postProduct} = new ProductController()

prodRouter.get("/", getProducts)

prodRouter.put("/:id", putProduct)

prodRouter.get("/:id", getProductById);

prodRouter.delete("/:id", deleteProduct)

prodRouter.post("/", postProduct)

export default prodRouter