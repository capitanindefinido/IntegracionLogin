import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import generateProductErrorInfo from "../errors/infoProducts.js";
import service from "../service/service.js";
import { logger } from "../utils/loggers.js";


const serviceProduct = service.productService

class ProductController {

    getProducts = async (req, res) => {
        try {
            let sortOrder = req.query.sortOrder; 
            let category = req.query.category; 
            let availability = req.query.availability; 
            if(sortOrder === undefined){
                sortOrder = "asc"
            }
            if(category === undefined){
                category = ""
            }
            if(availability === undefined){
                availability = ""
            }
            res.send(await serviceProduct.getProductsMaster(null,null,category,availability, sortOrder))
        } catch (error) {
            logger.info(error)
        } 
    }

    putProduct = async (req, res) => {
        try {
            let id = req.params.id;
            let updProd = req.body;

            if (req.user.rol === 'admin') {
                res.send(await serviceProduct.updateProduct(id, updProd));
            } else {
                const product = await serviceProduct.getProductById(id);
                if (product && product.owner === req.user.email) {
                    res.send(await serviceProduct.updateProduct(id, updProd));
                } else {
                    throw new CustomError({
                        name: 'Permission error',
                        message: 'No tienes permisos para modificar este producto',
                        code: EErrors.PERMISSION_ERROR,
                    });
                }
            }
        } catch (error) {
            logger.error('Error al modificar el producto:', error);
            res.status(500).json({ error: 'Error al modificar el producto' });
        }
    }

    getProductById = async (req, res) => {
        try{
            const prodId = req.params.id;
            const productDetails = await serviceProduct.getProductById(prodId);
            res.send(productDetails);
        } catch (error) {
            logger.error('Error al obtener el producto:', error);
            res.status(500).json({ error: 'Error al obtener el producto' });
        } 
    }

    deleteProduct = async (req, res) => {
        try {
            let id = req.params.id;

            if (req.user.rol === 'admin') {
                res.send(await serviceProduct.deleteProduct(id));
            } else {
                const product = await serviceProduct.getProductById(id);
                if (product && product.owner === req.user.email) {
                    res.send(await serviceProduct.deleteProduct(id));
                } else {
                    throw new CustomError({
                        name: 'Permission error',
                        message: 'No tienes permisos para eliminar este producto',
                        code: EErrors.PERMISSION_ERROR,
                    });
                }
            }
        } catch (error) {
            logger.error('Error al eliminar el producto:', error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    }

    postProduct = async (req, res, next) => {
        try {
            let newProduct = req.body;

            const productOwner = newProduct.owner || 'admin';

            newProduct.owner = productOwner;

            if (newProduct == null) {
                CustomError.createError({
                    name: 'Product creation error',
                    cause: generateProductErrorInfo(newProduct),
                    message: 'Error trying to create a product, invalid request',
                    code: EErrors.INVALID_REQUEST,
                });
            }

            res.send(await serviceProduct.addProduct(newProduct));
        } catch (error) {
            next(error);
        }
    }

}


export default ProductController