const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const app = require('./app')

mongoose.connect(DB, {
    useNewUrlParser: true,
    createIndexes: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    //console.log(con.connections);
    //console.log('DB connection successful');
});


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running on port ${port}....`);
});