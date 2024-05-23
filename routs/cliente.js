'use strict'

var express = require('express');

var ClienteController = require('../controllers/ClienteControllers');

var api = express.Router();
var auth = require('../middlewares/authenticate');

         

api.post('/registro_cliente', ClienteController.registro_cliente);
api.post('/login_cliente', ClienteController.login_cliente);
api.get('/get_clientes_paginado/:tipo/:filtro?/:pagina?/:size?',auth.auth,ClienteController.ListarClientes_filtro_admin_paginado);
api.get('/get_cliente/:id',auth.auth,ClienteController.get_by_id_cliente);
api.post('/save_cliente',auth.auth,ClienteController.registro_cliente_admin);
api.put('/update_cliente/:id',auth.auth,ClienteController.update_cliente_admin);
api.delete('/delete_cliente/:id',auth.auth,ClienteController.delete_cliente_admind);

module.exports = api;