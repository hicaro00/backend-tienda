'use strict'


var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';


exports.auth = function(req, res, next){

    if(!req.headers.authorization){
       return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

     var segments = token.split('.');

    if(segments.length != 3){
        return res.status(403).send({message: 'Token incorrecto'});
    }else{
        try{
            var payload = jwt.decode(token, secret);
            if(payload.exp <= moment().unix()){
                return res.status(401).send({message: 'Token ha expirado'});
            }
         }catch(ex){
            return res.status(403).send({message: 'Token incorrecto'});
         }

        }

   
    req.user = payload;

    

   
    

    next();



}