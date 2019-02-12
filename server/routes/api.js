const shortid = require('shortid');
const Room = require('../models/room');

module.exports = function(app) {
  app.get('/api/room', (req, res) => {
    Room.findOne({ roomid: req.query.roomid }, function(err, room) {
      res.json(room);
    })
  })

  app.get('/api/create_room', (req, res) => {
    let token = shortid.generate();

    // Should care about token collision
    Room.findOne({ roomid: token }, function (err, room) {
      console.log('dispname: ' + JSON.stringify(req.user));
      room = new Room({
        roomid: token,
        creator: req.user.displayName,
        members: [
          {
            username: req.user.displayName
          }
        ]
      });

      room.save(err => {
        if (err) console.log(err);
      })

      res.json(room);
    })
  })

  app.get('/api/user', (req, res) => {
    res.json(req.user);
  })
}