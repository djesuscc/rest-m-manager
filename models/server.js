const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        
        // DB Connect
        this.connectDB();
        
        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        //Read and parse body
        this.app.use( express.json() );

        // Public
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'))
    } 

    listen() {
        this.app.listen(this.port, () => console.log(`PORT ${this.port}`));
    }
}

module.exports = Server;