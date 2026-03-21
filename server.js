const express = require('express');
const app = express();
const mongodb = require('./data/database');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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


