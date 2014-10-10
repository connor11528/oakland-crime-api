var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// "Idx","OPD_RD","OIdx","Date","Time","CType","Desc","Beat","Addr","Lat","Long","UCR","Statute","CrimeCat"
var crimeSchema = new Schema({
	idx: String,
	opd_rd: String,
	date: Date,
	time: String,
	crimetype: String,
	description: String,
	beat: String,
	address: String,
	location: [String],
	statute: String
});

module.exports = mongoose.model('Crime', crimeSchema);