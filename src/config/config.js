import dotenv from 'dotenv';
import program from '../utils/commander.js';
import mongoose from 'mongoose';
import { logger } from '../utils/loggers.js';


const {mode} = program.opts()
console.log(mode)
dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
});

const configObject = {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS
}

mongoose
  .connect(
    `${configObject.mongo_url}/?retryWrites=true&w=majority`,
  )
  .then(() => {
    logger.info("Conectado a la base de datos");
  })
  .catch((error) => {
    logger.error("Error al conectarse a la base de datos, error" + error);
  });


export default configObject