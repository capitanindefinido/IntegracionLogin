import TicketDto from "../dto/ticket.dto.js";

class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async createTicket(userId, productsNotPurchased) {
        const newTicket = new TicketDto({
            userId: userId,
            productsNotPurchased: productsNotPurchased,
        });

        return await this.dao.createTicket(newTicket);
    }
}

export default TicketRepository;
