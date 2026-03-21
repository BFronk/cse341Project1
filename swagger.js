const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts'
  },
  host: isProduction
    ? 'cse341project1-hdpk.onrender.com'
    : 'localhost:3000',
  schemes: isProduction ? ['https'] : ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);