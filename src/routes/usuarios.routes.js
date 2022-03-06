const express = require('express');
const usuarioControlador = require('../controller/usuarios.controller');

const api = express.Router();

api.post('/login', usuarioControlador.Login);


module.exports = api;