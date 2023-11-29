import UserDto from "../dto/users.dto.js";
import service from "../service/service.js";

const userService = service.userService

class UserController {
    postRegister = async (req, res) => {
        try 
        {
            const { first_name, last_name, email, age, password, rol }= req.body
            if (!first_name || !last_name || !email || !age)  return res.status(400).send({ status: 400, error: 'Faltan datos' })
            res.redirect("/login")
        } catch (error) 
        {
            res.status(500).send("Error al acceder al registrar: " + error.message);
        }
    }

    getFailRegister = async(req,res)=>{
        console.log("Failed Strategy")
        res.send({error: "Failed"})
    }

    getLogin = async (req, res) => {
        try 
        {
            if(!req.user) return res.status(400).send({status:"error", error: "Credenciales invalidas"})
            
            if(req.user.rol === 'admin'){
                req.session.emailUsuario = req.user.email
                req.session.nomUsuario = req.user.first_name
                req.session.apeUsuario = req.user.last_name
                req.session.rolUsuario = req.user.rol
                res.redirect("/profile")
            }
            else{
                req.session.emailUsuario = req.user.email
                req.session.rolUsuario = req.user.rol
                res.redirect("/products")
            }
    
        } 
        catch (error) 
        {
            res.status(500).send("Error al acceder al perfil: " + error.message);
        }
    }

    getFailLogin = async(req,res)=>{
        console.log("test")
        res.send({error: "Failed Login"})
    }

    getLogout = async (req, res) => {
        req.session.destroy((error) =>{
            if(error)
            {
                return res.json({ status: 'Logout Error', body: error})
            }
            res.redirect('../../login')
        })    
    }

    getGithub = async (req, res) => {}

    getGithubCallback = async (req, res) => {
        req.session.user = req.user
        req.session.emailUsuario = req.session.user.email
        req.session.rolUsuario = req.session.user.rol
        res.redirect("/products")
    }
}

export default UserController