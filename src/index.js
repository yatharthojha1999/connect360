const express = require('express');
const runServer = express();
const route = require('./rest-service');


const PORT = process.env.PORT || 8000; 
runServer.use(express.json());
runServer.use('/', route);

runServer.listen(PORT, (req, res) => {
    console.info(`Listening on port: ${PORT}`);
});