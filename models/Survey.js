const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema] , // Including sub documented shcema to mongoose schema
    yes: { type: Number, default:0 },
    no: { type:Number, default:0 },
    _user: { type:Schema.Types.ObjectId, ref: 'User'},// Reference field to indentify specific user who owns this record(survey creater)  also "ref" represent referece to a User collection
    dateSent: Date,
    lastResponded:Date
}); 

mongoose.model('surveys',surveySchema); 