import { Command } from "commander";
import { logger } from "./loggers.js";

const program = new Command();

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Variable para el puerto', 4000)
    .option('--mode <mode>', 'Modo de ejecución de la app', 'development')
    .parse()
logger.info('Options: ', program.opts())
logger.info('Remaining arguments: ', program.args)

export default program