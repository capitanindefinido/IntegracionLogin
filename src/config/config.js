import dotenv from 'dotenv';
import program from '../utils/commander.js';
import mongoose from 'mongoose';


const {mode} = program.opts()
console.log(mode)
dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
});

const configObject = {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL
}

mongoose
  .connect(
    `${configObject.mongo_url}/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.error("Error al conectarse a la base de datos, error" + error);
  });


export default configObject