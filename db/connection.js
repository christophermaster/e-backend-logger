
const mongoose = require('mongoose');
// URL de la base de datos de MongoDB

const usuario =  process.env.USER;
const password =  process.env.PASS;
const dbName =  process.env.DB;

const url = `mongodb+srv://${usuario}:${password}@cluster0.q5hgvsc.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Conexión a la base de datos
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch(err => {
        console.error('Error de conexión a la base de datos', err);
        process.exit();
    });


module.exports = mongoose.connection;