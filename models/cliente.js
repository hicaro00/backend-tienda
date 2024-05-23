'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({

    nombre: { type: String, required: true },
    apellido:{ type: String, required: true }, 
    pais: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    perfil: { type: String, default:'perfil.png' ,required: true},
    telefono: { type: String, required: false },
    genero: { type: String, required: false },
    fechaNacimiento: { type: Date, required: false },
    dni: { type: String, required: false},
    
    
});

module.exports = mongoose.model('Cliente', ClienteSchema);