const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});
// Above schema is sub documented schema //
// Sub documented schema need not to linked with mongoose. 
module.exports = recipientSchema; 