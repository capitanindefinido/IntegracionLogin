import { Command } from "commander";

const program = new Command();

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Variable para el puerto', 4000)
    .option('--mode <mode>', 'Modo de ejecución de la app', 'development')
    .parse()
console.log('Options: ', program.opts())
console.log('Remaining arguments: ', program.args)

export default program