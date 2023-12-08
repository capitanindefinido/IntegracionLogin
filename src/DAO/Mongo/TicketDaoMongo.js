import { ticketsModel } from "../../models/ticket.model.js";
import { logger } from "../../utils/loggers.js";

class TicketDaoMongo {
    constructor() {}

    async createTicket(ticketData) {
        try {
            await ticketsModel.create(ticketData);
            logger.info('Ticket creado con éxito');
            return 'Ticket creado con éxito';
        } catch (error) {
            logger.info('Error al crear el ticket:', error);
            return 'Error al crear el ticket';
        }
    }
}

export default TicketDaoMongo;
