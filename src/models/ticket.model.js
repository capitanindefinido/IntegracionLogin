import mongoose from 'mongoose';

const ticketsCollection = "ticket";

const ticketSchema = new mongoose.Schema({
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
});

export const ticketsModel = mongoose.model(ticketsCollection, ticketSchema)
