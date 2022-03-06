const express = require('express');
const empresaControlador = require('../controller/empresas.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarE', [md_autenticacion.Auth, md_roles.varAdmin], empresaControlador.AgregarEmpresa);
api.put('/editarE/:idEmpresa',  [md_autenticacion.Auth, md_roles.varAdmin], empresaControlador.EditarEmpresa);
api.delete('/eliminarE/:idEmpresa', [md_autenticacion.Auth, md_roles.varAdmin], empresaControlador.EliminarEmpresa);
api.get('/encontrarE', [md_autenticacion.Auth, md_roles.varAdmin], empresaControlador.BuscarEmpresa);
api.get('/encontrarId/:idEmpresa', [md_autenticacion.Auth, md_roles.varAdmin], empresaControlador.BuscarEmpresaId);

module.exports = api;