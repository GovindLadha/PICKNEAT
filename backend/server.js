const express = require('express');
const app = express();
const mongoDB = require('./db');
const dotenv = require ('dotenv');
const port = process.env.PORT;

dotenv.config();

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Connect to MongoDB
async function startServer() {
    try {
        await mongoDB();
        console.log('Connected to MongoDB successfully!');
        app.listen(port, () => {
            console.log(`App is running on port: ${port}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

// Start the server
startServer();

// Default route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Routes

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

