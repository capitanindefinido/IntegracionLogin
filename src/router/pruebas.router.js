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

pruebasRouter.get('/loggerTest', (req, res) => {
    //req.logger.warning('Warning ojo')
    req.logger.fatal('Error fatal')
    res.send('ejecutando el warning')
})

export default pruebasRouter