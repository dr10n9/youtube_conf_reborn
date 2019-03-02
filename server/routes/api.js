const shortid = require('shortid');
const Room = require('../models/room');
const User = require('../models/user');

module.exports = function(app) {

  // rooms ---------
  app.get('/api/room/:roomid', (req, res) => {
    Room.findOne({ roomid: req.params.roomid }, function(err, room) {
      res.json(room);
    })
  })

  app.post('/api/room', (req, res) => {
    let token = shortid.generate();

    // Should care about token collision
    Room.findOne({ roomid: token }, function (err, room) {
      room = new Room({
        roomid: token,
        creator: req.user.displayName,
        members: [{ username: req.user.displayName }]
      });

      room.save(err => { if (err) console.log(err); })
      res.json(room);
    })
  })

  // user ---------
  app.get('/api/user', (req, res) => {
    res.json(req.user);
  })

  app.post('/api/user/joinedrooms/:roomid', (req, res) => {
    User.findOne({ googleId: req.user.googleId }, function (err, data) {
      if (data.joinedrooms) {
        data.joinedrooms.push({ roomid: req.params.roomid })
        data.save(err => { if (err) console.log(err); })
        res.json(data);
      }
    })
  })
}