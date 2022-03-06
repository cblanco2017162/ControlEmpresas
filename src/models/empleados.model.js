const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpleadoSchema = Schema({
    nombre : String,
    apellido : String,
    email : String,
    puesto : String,
    departamento : String,
    telefono: String,
    idEmpresa: { type: Schema.Types.ObjectId, ref: 'Empresas' }
});

module.exports = mongoose.model('Empleados', EmpleadoSchema);