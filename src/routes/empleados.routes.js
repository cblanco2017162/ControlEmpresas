const express = require('express');
const controladorEmpleado = require('../controller/empleados.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');


const api = express.Router();

api.post('/agregarEmpleado', [md_autenticacion.Auth, md_roles.varEmpresa], controladorEmpleado.agregarEmpleados);
api.get('/obtenerEmpleadosId/:idEmpleado', [md_autenticacion.Auth, md_roles.varEmpresa], controladorEmpleado.obtenerEmpleadosId);
api.get('/obtenerPorNombre/:nombreEmpleado', [md_autenticacion.Auth, md_roles.varEmpresa], controladorEmpleado.ObtenerEmpleadoNombre);
api.get('/obtenerPorPuesto/:puestoEmpleado', [md_autenticacion.Auth, md_roles.varEmpresa], controladorEmpleado.ObtenerEmpleadoPuesto);
api.get('/obtenerPorDepartamento/:departamentoEmpleado', [md_autenticacion.Auth, md_roles.varEmpresa], controladorEmpleado.ObtenerEmpleadoDepartamento);
api.get('/obtenerEmpleados', [md_autenticacion.Auth, md_roles.varEmpresa], controladorEmpleado.obtenerEmpleados);
api.get('/contarEmpleados', [md_autenticacion.Auth, md_roles.varEmpresa], controladorEmpleado.contarEmpleados);
api.put('/editarEmpleados/:idEmpleado', [md_autenticacion.Auth, md_roles.varEmpresa], controladorEmpleado.editarEmpleados);
api.delete('/eliminarEmpleados/:idEmpleado', [md_autenticacion.Auth, md_roles.varEmpresa], controladorEmpleado.eliminarEmpleados);
api.get('/generarPdf',[md_autenticacion.Auth, md_roles.varEmpresa], controladorEmpleado.crearPDF);


module.exports = api;