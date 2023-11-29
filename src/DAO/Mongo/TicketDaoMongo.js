import { ticketsModel } from "../../models/ticket.model.js";

class TicketDaoMongo {
    constructor() {}

    async createTicket(ticketData) {
        try {
            await ticketsModel.create(ticketData);
            console.log('Ticket creado con éxito');
            return 'Ticket creado con éxito';
        } catch (error) {
            console.error('Error al crear el ticket:', error);
            return 'Error al crear el ticket';
        }
    }
}

export default TicketDaoMongo;
