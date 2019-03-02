"use strict"

let mongoose			= require('mongoose');
// let bcrypt				= require('bcrypt-nodejs');
// let mognoosePaginate	= require('mongoose-paginate');

let userSchema = mongoose.Schema({

		googleId:				String,
		displayName:		String,
		joinedrooms:		[{roomid: String}]
		// avatar	 	 : {
		//   data 				: Buffer,
		//   contentType		: String,
		//   default			: Boolean
		// },
});

// Methods ==================================

// userSchema.plugin(mognoosePaginate);

// hashing
// userSchema.methods.generateHash = function(password) {
// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// }; 

// valid or not
// userSchema.methods.validPassword = function(password) {
// 	return bcrypt.compareSync(password, this.password);
// };

// create model
module.exports = mongoose.model('User', userSchema);