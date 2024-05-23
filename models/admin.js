'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = Schema({

    nombre: { type: String, required: true },
    apellido:{ type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    perfil: { type: String, default:'perfil.png' ,required: false},
    telefono: { type: String, required: true },
    role:{type: String, required: true} ,
    dni: { type: String, required: true},
    
    
});

module.exports = mongoose.model('admin', AdminSchema);