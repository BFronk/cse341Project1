const express = require('express');
const app = express();
const mongodb = require('./data/database');
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log('Unable to connect to database');
        
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log('Database connection ready');
        });
    }
})


