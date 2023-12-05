import { Router } from "express";
import generateProducts from "../utils/fakerProducts.js";

const pruebasRouter = Router()

pruebasRouter.get('/mockingProducts', (req, res) => {
    let products = []
    for(let i=0; i < 100; i++){
        products.push(generateProducts())
    }
    res.send({
        status: 'success',
        payload: products
    })
})

export default pruebasRouter