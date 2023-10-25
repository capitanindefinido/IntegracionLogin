import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import UserManager from "../controllers/UserManager.js";
import GitHubStrategy from "passport-github2";

const LocalStrategy = local.Strategy;
const userMan = new UserManager();
const initializePassword = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, rol } = req.body;

        try {
          let user = await userMan.findEmail({ email: username });
          if (user) {
            console.log("El usuario ya existe");
            return done(null, false);
          }

          const hashedPassword = await createHash(password);

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            rol,
          };

          let result = await userMan.addUser(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al obtener el usuario" + error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let user = await userMan.getUserById(id);
    done(null, user);
  });
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userMan.findEmail({ email: username });
          if (!user) {
            console.log("Usuario no existe");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.2615bdae63886235",
        clientSecret: "8b8565c60d3a013965335f2f381832db08a3c518",
        callbackURL: "http://localhost:4000/api/sessions/githubcallback",
        proxy: true,
        scope: ['user:email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userMan.findEmail({ email: profile.emails[0].value });
          if (!user) {
            let newUser = {
              first_name: profile._json.login,
              last_name: "github",
              age: 77,
              email: profile.emails[0].value,
              password: "",
              rol: "usuario",
            };
            let result = await userMan.addUser(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassword;
