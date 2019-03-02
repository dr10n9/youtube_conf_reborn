"use strict"

let mongoose			= require('mongoose');

let roomSchema = mongoose.Schema({
  roomid:				String,
  creator:      String,
  roomname:		  String,
  members:      [{ username: String }]
});

module.exports = mongoose.model('Room', roomSchema);