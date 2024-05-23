'use strict'

var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');
const { param } = require('../routs/Admin');
var jwt = require('../helpers/jwt');
const admin = require('../models/admin');

const registro_admin = async function (req, res) {

    var params = req.body;

    var admin_array = await Admin.find({email: params.email});

    if (admin_array.length > 0) {
        return res.status(200).send({ message: 'El email ya está registrado'});

    }else{

       
        if (params.password) {
            bcrypt.hash(params.password, null, null, async function(err, hash){
                params.password = hash;
                var reg = await Admin.create(params);
                 res.status(200).send({ message: reg});

            });
        }else{
            return res.status(200).send({ message: 'No se ha ingresado la contraseña'});
            
    
        }

}
}

const login_admin = async function (req, res) {

    var params = req.body;

    var admin_array = await Admin.find({email: params.email});

    if (admin_array.length > 0) {
        bcrypt.compare(params.password, admin_array[0].password,async  (err, check) => {
            if (check) {
                    res.status(200).send({ 
                    params: admin_array[0],
                    token: jwt.createToken(admin_array[0])});
            }else{
                return res.status(200).send({ message: 'La contraseña es incorrecta'});
            }
        });
    }else{
        return res.status(200).send({ message: 'El email no está registrado'});
    }
}

module.exports = {
    registro_admin,
    login_admin

}