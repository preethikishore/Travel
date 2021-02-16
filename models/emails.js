let mongoose = require('mongoose');
let Schema = mongoose.Schema;
emailSchema = new Schema({
    id:String,
    email:String,
    name:String,
    message:String, 
    date:Date,
})
let Emails = mongoose.model('Emails',emailSchema,'emails');
module.exports = {Emails};