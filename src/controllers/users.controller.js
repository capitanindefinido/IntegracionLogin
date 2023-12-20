import UserDto from "../dto/users.dto.js";
import service from "../service/service.js";
import CustomError from "../errors/CustomError.js";
import generateUserErrorInfo from "../errors/info.js";
import EErrors from "../errors/enums.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import configObject from "../config/config.js";

const userService = service.userService

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: configObject.email_user,
      pass: configObject.email_pass,
    },
  });

class UserController {
    postRegister = async (req, res) => {
        try 
        {
            const { first_name, last_name, email, age, password, rol }= req.body
            if (!first_name || !last_name || !email)  {
                //return res.status(400).send({ status: 400, error: 'Faltan datos' })
                CustomError.createError({
                    name: 'User creation error',
                    cause: generateUserErrorInfo({nombre, last_name, email}),
                    message: 'Error trying to create a user',
                    code: EErrors.INVALID_TYPE_ERROR
                })
            }
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

    forgotPassword = async (req, res) => {
        const { email } = req.body;
    
        try {
          const user = await UserModel.findOne({ email });
    
          if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
          }
    
          const token = crypto.randomBytes(20).toString('hex');
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; 
          await user.save();
    
          const mailOptions = {
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Restablecimiento de contraseña',
            text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://localhost:3000/reset-password/${token}`,
          };
    
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ error: 'Error al enviar el correo' });
            }
            console.log('Correo enviado: ' + info.response);
            res.json({ message: 'Se ha enviado un correo con instrucciones para restablecer la contraseña' });
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error interno del servidor' });
        }
      }

      resetPassword = async (req, res) => {
        const { token } = req.params;
        const { password } = req.body;
    
        try {
          const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
          });
    
          if (!user) {
            return res.status(404).json({ error: 'Token no válido o ha expirado' });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
    
          await user.save();
    
          res.json({ message: 'Contraseña restablecida con éxito' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error interno del servidor' });
        }
      }

      toggleUserRole = async (req, res) => {
        try {
            const { uid } = req.params;
            const user = await userService.getUserById(uid);

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            user.rol = user.rol === 'Usuario' ? 'premium' : 'Usuario';

            await user.save();

            res.json({ message: 'Rol de usuario actualizado con éxito', newRole: user.rol });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

export default UserController