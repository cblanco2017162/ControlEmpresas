exports.varEmpresa = function(req, res, next){
    if(req.user.rol !== 'EMPRESA') return res.status(400).send({ mensaje:'Solo la empresa tiene estos permisos' });

    next();
}

exports.varAdmin = function(req, res, next){
    if(req.user.rol !== 'ADMIN') return res.status(400).send({ mensaje:'Solo el admin tiene estos permisos' });

    next();
}