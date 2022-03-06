const Usuario = require('../models/usuarios.model');
const Empresa = require('../models/empresa.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');



function RegistrarAdmin(req, res) {
    var usuarioModel = new Usuario();

            usuarioModel.nombre = 'ADMIN';
            usuarioModel.email = 'ADMIN@gmail.com';
            usuarioModel.password = '123456'
            usuarioModel.rol = 'ADMIN';
            usuarioModel.imagen = null;

            Usuario.find({ email : 'ADMIN@gmail.com'}, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else{
                    console.log('El usuario de administrador ya existe');
                }
            })
    
}

function Login(req, res) {
    var parametros = req.body;
     Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado)=>{

        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(usuarioEncontrado){
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword)=>{
                    if ( verificacionPassword ) {
                      
                        if(parametros.obtenerToken === 'true'){
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;
                            return  res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        }             
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide'});
                    }
                })

        } else{
            Empresa.findOne({ email : parametros.email }, (err, usuarioEncontrado)=>{

                if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if(usuarioEncontrado){
                    bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                        (err, verificacionPassword)=>{
                            if ( verificacionPassword ) {
                              
                                if(parametros.obtenerToken === 'true'){
                                    return res.status(200)
                                        .send({ token: jwt.crearToken(usuarioEncontrado) })
                                } else {
                                    usuarioEncontrado.password = undefined;
                                    return  res.status(200)
                                        .send({ usuario: usuarioEncontrado })
                                }             
                            } else {
                                return res.status(500)
                                    .send({ mensaje: 'Las contrasena no coincide'});
                            }
                        })
        }
        else {
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.'})
        }
    })
    }  
    })
}



module.exports = {
    RegistrarAdmin,
    Login
}