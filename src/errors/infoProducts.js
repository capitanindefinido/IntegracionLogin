import { logger } from "../utils/loggers.js"

const generateProductErrorInfo = (product) => {
    logger.info(product)
    return `
        One or more properties where incomplete or not valid
        List of require properties:
        * price: needs to be a string, recived ${product.price}
        * stock: needs to be a string, recived ${product.stock}
        * description: needs to be a string, recived ${product.description}
    `
}

export default generateProductErrorInfo