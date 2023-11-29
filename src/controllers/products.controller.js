import service from "../service/service.js";


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
            console.log(error)
        } 
    }

    putProduct = async (req,res) => {
        try {
            let id = req.params.id
            let updProd = req.body
            res.send(await serviceProduct.updateProduct(id, updProd))
        } catch (error) {
            console.log(error)
        }
        
    }

    getProductById = async (req, res) => {
        try{
            const prodId = req.params.id;
            const productDetails = await serviceProduct.getProductById(prodId);
            res.send(productDetails);
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).json({ error: 'Error al obtener el producto' });
        } 
    }

    deleteProduct = async (req, res) => {
        try {
            let id = req.params.id
            res.send(await serviceProduct.deleteProduct(id))
        } catch (error) {
            console.log(error)
        }
        
    }

    postProduct = async (req, res) => {
        try {
            let newProduct = req.body
            res.send(await serviceProduct.addProduct(newProduct))
        } catch (error) {
            console.log(error)
        }
        
    }

}


export default ProductController