'use strict'
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

var clienteRoutes = require('./routs/cliente');
var AdminRoutes = require('./routs/Admin');

mongoose.connect('mongodb://root:secreto@localhost:27017/tienda?authSource=admin')
    .then(() => {
        console.log('Conexión a la base de datos correcta');
        app.listen(port, () => {
            console.log('API REST corriendo en http://localhost:' + port);
        });
    })
    .catch((err) => {
        throw err;
    });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb',extended: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

app.use('/api', clienteRoutes);
app.use('/api', AdminRoutes);



module.exports = app;