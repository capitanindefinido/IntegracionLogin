import ProductDaoMongo from "../DAO/Mongo/ProductDaoMongo.js";
import CartDaoMongo from "../DAO/Mongo/CartDaoMongo.js";
import UserDaoMongo from "../DAO/Mongo/UserDaoMongo.js";
import TicketDaoMongo from "../DAO/Mongo/TicketDaoMongo.js"; 
import TicketRepository from "../repository/ticket.repository.js"; 
import UserRepository from "../repository/users.repository.js";
import ProductRepository from "../repository/products.repository.js";
import CartRepository from "../repository/carts.repository.js";

const productService = new ProductRepository(new ProductDaoMongo());
const cartService = new CartRepository(new CartDaoMongo());
const userService = new UserRepository(new UserDaoMongo());
const ticketService = new TicketRepository(new TicketDaoMongo()); 

export default { productService, cartService, userService, ticketService };
