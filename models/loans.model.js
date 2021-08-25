const mongoose = require('mongoose');

const loasnsSchema = mongoose.Schema({
loansName :String,   
loansType : String,
loansAmount : Number,
loansIssueDate :String,
loansStatus :String
})

const loansModel = mongoose.model('loans',loasnsSchema);

module.exports =loansModel;