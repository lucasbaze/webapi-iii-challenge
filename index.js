// code away!
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

//middleware
const logger = require('./middleware/logger');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use(logger);

//server.use(morgan('dev'));

server.get('/', (req, res) => {
    res.json({ content: 'Hello World' });
});

// server.use('/api/route', apiRoutes);

const PORT = 8080;
server.listen(PORT, () => `App runnning on PORT: ${PORT}`);
