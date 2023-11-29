class TicketDto {
    constructor(ticketData) {
        this.userId = ticketData.userId;
        this.productsNotPurchased = ticketData.productsNotPurchased || [];
        // Otros campos que puedas necesitar
    }
}

export default TicketDto;
