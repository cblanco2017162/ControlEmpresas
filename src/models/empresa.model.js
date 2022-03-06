const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpresaSchema = new Schema({
    nombreEmpresa: String,
    email: String,
    password: String,
    rol: String,
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
});

module.exports = mongoose.model('Empresas', EmpresaSchema);