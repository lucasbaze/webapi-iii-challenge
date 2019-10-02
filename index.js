// code away!
const express = require('express');

//Routes
const userRoutes = require('./users/userRouter');
const postRoutes = require('./posts/postRouter');

//middleware
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

//custom middleware
const logger = require('./middleware/logger');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
//server.use(morgan('dev'));
server.use(logger);

server.get('/', (req, res) => {
    console.log(req.headers);
    res.json({ content: 'Hello World' });
});

server.use('/users', userRoutes);
server.use('/posts', postRoutes);

function errorMiddleware(err, req, res, next) {
    res.send(err);
}

//error handling
server.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: 'There was an error performing the operation',
    });
});

const PORT = 8080;
server.listen(PORT, () => `App runnning on PORT: ${PORT}`);
