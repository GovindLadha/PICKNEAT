const mongoose = require('mongoose');
const dotenv = require ('dotenv');

dotenv.config();
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zjksj3m.mongodb.net/pickneat?retryWrites=true&w=majority`;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connected with the database");

        const fetched_data = mongoose.connection.collection("foodItems");
        const foodCategory = mongoose.connection.collection("foodCategory");

        global.foodItems = await fetched_data.find({}).toArray();
        global.foodCategory= await foodCategory.find({}).toArray();

        // global.foodItems = data;
        // global.foodCategory = catchData;
    } catch (err) {
        console.error(err);
    }
};

module.exports = mongoDB;
