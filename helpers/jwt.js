'use strict'
require('dotenv').config();

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';


exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        role: user.role,    
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
}

