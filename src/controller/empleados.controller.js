const Empleado = require('../models/empleados.model');
const Empresa = require('../models/empresa.model');
//PDFDocument = require('pdfkit');

function agregarEmpleados(req, res){
    var parametros = req.body;
    var empleadoModelo = new Empleado
    
    if( parametros.nombre && parametros.apellido && parametros.email && parametros.puesto &&
         parametros.departamento && parametros.telefono ) {
         empleadoModelo.nombre = parametros.nombre;
         empleadoModelo.apellido = parametros.apellido;
         empleadoModelo.email = parametros.email;
         empleadoModelo.puesto = parametros.puesto;
         empleadoModelo.departamento = parametros.departamento;
         empleadoModelo.telefono = parametros.telefono;
         empleadoModelo.idEmpresa = req.user.sub;

                 empleadoModelo.save((err, empleadoGuardado) => {
                       if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
                       if(!empleadoGuardado) return res.status(404).send( { mensaje: "Error, no se agrego ninguna empresa"});

                 return res.status(200).send({ empleado: empleadoGuardado });
        })
    }

}

function obtenerEmpleadosId (req, res) {
    var idEmpleado = req.params.idEmpleado;
 
     Empleado.findOne({_id : idEmpleado, idEmpresa : req.user.sub}, (err, empleadosObtenidos) => {
         if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
         if(!empleadosObtenidos) return res.status(500).send({ mensaje: "No puede visualizar empleados de otra empresa"});
 
         return res.status(200).send({ empleados: empleadosObtenidos });
     })
 }

function obtenerEmpleados (req, res) {
    Empleado.find({idEmpresa : req.user.sub}, (err, empleadosObtenidos) => {
        if (err) return res.send({ mensaje: "Error: " + err })

        for (let i = 0; i < empleadosObtenidos.length; i++) {
            console.log(empleadosObtenidos[i].nombre)
        }

        return res.send({ Empleados: empleadosObtenidos })
    }) 
}

function ObtenerEmpleadoNombre(req, res) {
    var nombreEmp = req.params.nombreEmpleado;

    Empleado.findOne( { nombre : { $regex: nombreEmp, $options: 'i' }, idEmpresa : req.user.sub }, (err, empleadoEncontrado) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!empleadoEncontrado) return res.status(404).send({ mensaje: "Error, ese empleado no existe o no perteneces a su empresa" });

        return res.status(200).send({ empleado: empleadoEncontrado });
    })
}

function ObtenerEmpleadoPuesto(req, res) {
    var puestoEmp = req.params.puestoEmpleado;

    Empleado.find( { puesto : { $regex: puestoEmp, $options: 'i' }, idEmpresa : req.user.sub }, (err, empleadoEncontrado) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!empleadoEncontrado) return res.status(404).send({ mensaje: "Error, ese empleado no existe o no perteneces a su empresa" });

        return res.status(200).send({ empleado: empleadoEncontrado });
    })
}

function ObtenerEmpleadoDepartamento(req, res) {
    var departamentoEmp = req.params.departamentoEmpleado;

    Empleado.find( { departamento : { $regex: departamentoEmp, $options: 'i' }, idEmpresa : req.user.sub }, (err, empleadoEncontrado) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!empleadoEncontrado) return res.status(404).send({ mensaje: "Error, ese empleado no existe o no perteneces a su empresa" });

        return res.status(200).send({ empleado: empleadoEncontrado });
    })
}

/*function CreacionPDF(dataCallback, endCallback) {
    const doc = new PDFDocument(); 

    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    doc.fontSize(40).text('Empleados en la empresa', { align: 'center' });
    //doc.text (obtenerEmpleados.empleadosObtenidos);
    let i;
    const invoiceTableTop = 330;
    Empleado.find((err, empleadosObtenidos) => {
    for(i=0; empleadosObtenidos.length; i++){
        const item = empleadosObtenidos[i];
        const position = invoiceTableTop + (i+1)*30;
        generateTableRow(
            doc,
            position,
            item.nombres,
            item.apellidos,
            item.puesto,
            item.departamento   
        );
     }
    })
    doc.end();
}*/

function crearPDF(req, res) {

    Empleado.find({idEmpresa : req.user.sub}, (err, empleadoEncontrado) => {
        if(err) return res.status(500)
        .send({ mensaje: 'Error en la peticion' });

        const fs = require('fs');
        const Pdfmake = require('pdfmake');

        var fonts = {
            Roboto: {
                normal: './fonts/Roboto-Regular.ttf',
                bold: './fonts/Roboto-Medium.ttf',
                italics: './fonts/Roboto-Italic.ttf',
                bolditalics: './fonts/Roboto-MediumItalic.ttf'
            }
        };

        let pdfmake = new Pdfmake(fonts);

        let content = [{
        text:  'Empleados en la empresa:',fontSize: 24, color: 'blue', italics: true, alignment : 'center',
        }]

        for (let i = 0; i < empleadoEncontrado.length ; i++) {

            let array = i + 1;

            content.push({
                text:'Empleado No:'+array,
            })

            content.push({
                text:'Empleado :'+' '+empleadoEncontrado[i].nombre+' - '+empleadoEncontrado[i].puesto +' - '+empleadoEncontrado[i].telefono, color : 'gray',
            })

            content.push({
                text:' ',
            })
        }

        let docDefinition = {
            content: content
        }
    
        let pdfDoc = pdfmake.createPdfKitDocument(docDefinition, {});
        pdfDoc.pipe(fs.createWriteStream('.Empresa.pdf'));
        pdfDoc.end();
        return res.status(200).send({mensaje: 'pdf Creado'});

    })

}



function contarEmpleados (req, res) {
    Empleado.count({idEmpresa : req.user.sub}, (err, empleadosObtenidos) => {
        if (err) return res.send({ mensaje: "Error: " + err })

        for (let i = 0; i < empleadosObtenidos.length; i++) {
            console.log(empleadosObtenidos[i].nombre)
        }

        return res.send({ Empleados: empleadosObtenidos })
    }) 
}

function editarEmpleados(req, res){
    var idEmpleado = req.params.idEmpleado;
    var parametros = req.body;    

     Empleado.findOneAndUpdate({_id : idEmpleado, idEmpresa : req.user.sub}, parametros, {new : true}, (err, empleadoActualizado)=>{
            if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if(!empleadoActualizado) return res.status(500)
                .send({ mensaje: 'No puede editar empleados de otra empresa'});
            
            return res.status(200).send({ empleado : empleadoActualizado })
        });
}

function eliminarEmpleados(req, res){
    var idEmpleado = req.params.idEmpleado;

     Empleado.findOneAndDelete({_id : idEmpleado, idEmpresa : req.user.sub}, (err, empleadoEliminado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!empleadoEliminado) return res.status(404).send( { mensaje: 'No puede eliminar empleados de otra empresa'});

        return res.status(200).send({ empleado: empleadoEliminado});
    })
}

module.exports = {
agregarEmpleados,
obtenerEmpleados,
obtenerEmpleadosId,
crearPDF,
ObtenerEmpleadoNombre,
ObtenerEmpleadoDepartamento,
ObtenerEmpleadoPuesto,
contarEmpleados,
editarEmpleados,
eliminarEmpleados
}