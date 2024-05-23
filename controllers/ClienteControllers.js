'use strict'

var cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_cliente = async function (req, res) {

    var params = req.body;

    var clientes_array = await cliente.find({email: params.email});

    if (clientes_array.length > 0) {
        return res.status(200).send({ message: 'El email ya está registrado'});
    
    }else{

       
        if (params.password) {
            bcrypt.hash(params.password, null, null, async function(err, hash){
                params.password = hash;
                var reg = await cliente.create(params);
                 res.status(200).send({ message: reg});

            });
        }else{
            return res.status(200).send({ message: 'No se ha ingresado la contraseña'});
    
        }



    }



    

}


const login_cliente = async function (req, res) {

    var params = req.body;

    var clientes_array = await cliente.find({email: params.email});

    if (clientes_array.length > 0) {
        bcrypt.compare(params.password, clientes_array[0].password, (err, check) => {
            if (check) {
                return res.status(200).send({ 
                    params: clientes_array[0],
                    token: jwt.createToken(clientes_array[0])
                });
            }else{
                return res.status(200).send({ message: 'La contraseña es incorrecta'});
            }
        });
    }else{
        return res.status(200).send({ message: 'El email no está registrado'});
    }

}
 

const ListarClientes_filtro_admin = async function (req, res) {

    let tipo = req.params['tipo'];
    let filtro = req.params['filtro'];

if (tipo == null || 'null') {

    let reg = await cliente.find();
    res.status(200).send({ clientes: reg});

}else{
   if(filtro == 'apellido'){

    let reg = await cliente.find({apellido: new RegExp(filtro, 'i')});
    res.status(200).send({ clientes: reg});

   }else if(filtro == 'email'){ 
    let reg = await cliente.find({email: new RegExp(filtro, 'i')});
    res.status(200).send({ clientes: reg});
    }


}

}

const ListarClientes_filtro_admin_paginado = async function (req, res) {

    let tipo = req.params['tipo'];
    let filtro = req.params['filtro'];
    let pagina = parseInt(req.params['pagina']) ;
    let size = parseInt(req.params['size']) ;

    let skip = (pagina - 1) * size;

   try{

        let totalRegistros;

        if(req.user){
            if(req.user.role == 'admin'){
                
                if (tipo == null || 'null') {
        
                    totalRegistros = await cliente.countDocuments();//total de registros
                    let reg = await cliente.find().skip(skip).limit(size);
          
                    res.status(200).send({ clientes: reg});
                   }else{
                      if(filtro == 'apellido'){
          
                            totalRegistros = await cliente.countDocuments({ apellido: new RegExp(req.query.filtro, 'i') });// total de registros
          
                            let reg = await cliente.find({apellido: new RegExp(filtro, 'i')}).skip(skip).limit(size);
          
                            res.status(200).send({ clientes: reg});
          
                      }else if(filtro == 'email'){
          
                      totalRegistros = await cliente.countDocuments({ email: new RegExp(req.query.filtro, 'i') });
          
                      let reg = await cliente.find({email: new RegExp(filtro, 'i')}).skip(skip).limit(size);
          
                      res.status(200).send({ clientes: reg});
          
                      }else{
                      res.status(200).send({ message: 'No se ha ingresado un filtro válido'});
                  
                      }
                   }



            }else{
                return res.status(200).send({ message: 'No tienes permisos para realizar esta acción'});
            }
        }else{
            res.status(200).send({ message: 'No tienes permisos para realizar esta acción'});
        }

         

   }catch(err){
    res.status(500).send({ message: 'Error en el servidor'});
   }
   
   

  
   
}

const registro_cliente_admin = async function (req, res) {

    if(req.user){
        if(req.user.role == 'admin'){
            var data = req.body;

            bcrypt.hash('123456', null, null, async function(err, hash){
                if(hash){

                data.password = hash;
                let reg = await cliente.create(data);
                res.status(200).send({ data: reg});
                }else{
                    return res.status(200).send({ message: 'error en el servidor'});
                }

            });

        }else{
            return res.status(200).send({ message: 'error en el servidor'});
        }
    }

            

}

const update_cliente_admin = async function (req, res) {

    if(!req){
        return res.status(200).send({ message: 'No se han ingresado datos'});
    }
    if(req.user){
        if(req.user.role == 'admin'){
            var id = req.params['id'];
            var data = req.body;
            var reg = await cliente.findByIdAndUpdate( id, data, {new: true}); 
            res.status(200).send({ data: reg});
        }else{
            return res.status(200).send({ message: 'No tienes permisos para realizar esta acción'});
        }
    }else{
            return res.status(200).send({ message: 'No tienes permisos para realizar esta acción'});
     }
    
    

}

const delete_cliente_admind = async function (req, res) {

    if(!req){
        return res.status(200).send({ message: 'No se han ingresado datos'});
    }
    if(req.user){
        if(req.user.role == 'admin'){
            var id = req.params['id'];
            var reg = await cliente.findByIdAndDelete( id); 
            res.status(200).send({message: 'Registro eliminado con exito '});
        }else{
            return res.status(200).send({ message: 'No tienes permisos para realizar esta acción'});
        }
    }else{
            return res.status(200).send({ message: 'No tienes permisos para realizar esta acción'});
     }
}

const get_by_id_cliente = async function (req, res) {

    if(!req){
        return res.status(200).send({ message: 'No se han ingresado datos'});
    }
    if(req.user){
        if(req.user.role == 'admin'){
            var id = req.params['id'];
            var reg = await cliente.findById( id); 
            res.status(200).send({ data: reg});
        }else{
            return res.status(200).send({ message: 'No tienes permisos para realizar esta acción'});
        }
    }else{
            return res.status(200).send({ message: 'No tienes permisos para realizar esta acción'});
     }


}
    
module.exports = {
    registro_cliente,
    login_cliente,
    ListarClientes_filtro_admin,
    ListarClientes_filtro_admin_paginado,
    registro_cliente_admin,
    update_cliente_admin,
    delete_cliente_admind,

    get_by_id_cliente


}


