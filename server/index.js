
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const passport = require('passport');
const db = require('./config/db');
const session 		= require('express-session');
const mongoose		= require('mongoose');

   // "start": "cross-env NODE_ENV=production node server/index.js",

require('./config/socket.js')(io);

// Configure ---
app.set('port', port)
mongoose.connect(db.url);
require('./config/passport')(passport);

app.use(session({ 
	secret: 'knowledgeispower',
	resave: false
})); 

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Routes ---
require('./routes/auth')(app, passport);
require('./routes/api')(app);

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  // app.listen(port, host)
  server.listen(3000, '0.0.0.0');
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

