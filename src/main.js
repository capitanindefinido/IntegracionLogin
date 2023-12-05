import express from "express"
import prodRouter from "./router/product.routes.js"
import cartRouter from "./router/cart.routes.js"
import ProductDaoMongo from "./DAO/Mongo/ProductDaoMongo.js"
import CartDaoMongo from "./DAO/Mongo/CartDaoMongo.js"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"
import userRouter from "./router/user.routes.js"
import MongoStore from "connect-mongo"
import session from 'express-session'
import FileStore from 'session-file-store'
import passport from "passport"
import initializePassword from "./config/passport.config.js"
import configObject from "./config/config.js"
import pruebasRouter from "./router/pruebas.router.js"
import errorHandleMidd from "./errors/index.js"

const app = express()
const fileStorage = FileStore(session)
const product = new ProductDaoMongo()
const cart = new CartDaoMongo()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
//---------------------------Puerto------------------------------------//

app.listen(configObject.port, () => {
  console.log(`Servidor Express Puerto ${configObject.port}`)
})

//-----------------------Session Mongo Atlas---------------------------//

app.use(
    session({
      //Session registrada en mongo atlas
      store: MongoStore.create({
        mongoUrl:
        `${configObject.mongo_url}/?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600,
      }),
      secret: "ClaveSecreta",
      resave: false,
      saveUninitialized: false,
    })
  );

//---------------------------Rutas------------------------------------//

app.use("/api/products", prodRouter)
app.use("/api/carts", cartRouter)
app.use("/api/sessions", userRouter)
app.use("/api/pruebas", pruebasRouter)

//------------------------Passport------------------------------------//

initializePassword()
app.use(passport.initialize())
app.use(passport.session())

app.use(errorHandleMidd)

//------------------------Handlebars----------------------------------//
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

app.use("/", express.static(__dirname + "/public"))

app.get("/products", async (req, res) => {
    if (!req.session.emailUsuario) 
    {
        return res.redirect("/login")
    }
    if(req.user.rol == "admin"){
        res.render("profile", {
            title: "Vista Profile Admin",
            first_name: req.session.nomUsuario,
            last_name: req.session.apeUsuario,
            email: req.session.emailUsuario,
            rol: req.session.rolUsuario,
        });
    }else{
        let allProducts  = await product.getProducts()
        allProducts = allProducts.map(product => product.toJSON());
        res.render("viewProducts", {
            title: "Vista Productos",
            products : allProducts,
            email: req.session.emailUsuario,
            rol: req.session.rolUsuario,
    });
    }
    
})
app.get("/carts/:cid", async (req, res) => {
    if(req.user.rol == "admin"){
        res.render("profile", {
            title: "Vista Profile Admin",
            first_name: req.session.nomUsuario,
            last_name: req.session.apeUsuario,
            email: req.session.emailUsuario,
            rol: req.session.rolUsuario,
        });
    }else {
        let id = req.params.cid
        let allCarts  = await cart.getCartWithProducts(id)
        res.render("viewCart", {
            title: "Vista Carro",
            carts : allCarts
        });
    }
})
app.get("/login", async (req, res) => {
    res.render("login", {
        title: "Vista Login",
    });
    
})
app.get("/register", async (req, res) => { 
        res.render("register", {
        title: "Vista Register",
    });
})
app.get("/profile", async (req, res) => { 
    if (!req.session.emailUsuario) 
    {
        return res.redirect("/login")
    }
    res.render("profile", {
        title: "Vista Profile Admin",
        first_name: req.session.nomUsuario,
        last_name: req.session.apeUsuario,
        email: req.session.emailUsuario,
        rol: req.session.rolUsuario,

    });
})
app.get("/", async (req, res) => { 
    if (!req.session.emailUsuario) 
    {
        return res.redirect("/login")
    }
})
app.get('/current', async (req, res) => {
    const jwtPayload = req.user;
    const user = {
        "first_name": `${jwtPayload.first_name}`,
        "last_name": `${jwtPayload.last_name}`,
        "rol": `${jwtPayload.rol}`,
    }
    res.json(user);
});

app.get("/carts/:cid/purchase", async (req, res) => {
    if(req.user.rol == "admin"){
        res.render("profile", {
            title: "Vista Profile Admin",
            first_name: req.session.nomUsuario,
            last_name: req.session.apeUsuario,
            email: req.session.emailUsuario,
            rol: req.session.rolUsuario,
        });
    }else {
        let id = req.params.cid
        let ticket  = await cart.purchaseCart(id, req.user)
        res.json(ticket)
    }
})