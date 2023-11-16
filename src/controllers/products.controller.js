import ProductDaoMongo from "../DAO/Mongo/ProductDaoMongo.js"


const product = new ProductDaoMongo()

class ProductController {

    getProducts = async (req, res) => {
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
        res.send(await product.getProductsMaster(null,null,category,availability, sortOrder))
    }

    putProduct = async (req,res) => {
        let id = req.params.id
        let updProd = req.body
        res.send(await product.updateProduct(id, updProd))
    }

    getProductById = async (req, res) => {
        try{
            const prodId = req.params.id;
            const productDetails = await product.getProductById(prodId);
            res.render("viewDetails", { product: productDetails });
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).json({ error: 'Error al obtener el producto' });
        } 
    }

    deleteProduct = async (req, res) => {
        let id = req.params.id
        res.send(await product.delProducts(id))
    }

    postProduct = async (req, res) => {
        let newProduct = req.body
        res.send(await product.addProduct(newProduct))
    }

}


export default ProductController