const express = require('express');
const configureMiddleware = require('././data/middleware/middleware');
// const postsRouter = require('./posts/postRouter');
const usersRouter = require('./users/userRouter');

const server = express();

configureMiddleware(server);

// server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});



module.exports = server;
