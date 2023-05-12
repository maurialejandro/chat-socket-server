const { response } = require("express");

const validateRol = (req, res = response, next) => {
    if( !req.user ){
        return res.status(500).json({
            msg: 'Require varificar el rol sin validar el token primero'
        })
    }
    const { role, name } = req.user;
    
    if( !role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${name} no es admin - no tienes permisos para efectuar esta peticion`
        });
    }

    next();
}

const existRole = (...roles) => {
    return (req, res = response, next) => {
        
        if( !req.user ){
            return res.status(401).json({
                msg: `se require verificar el role sin validar primero`
            });
        }
        if( !roles.includes(req.user.role) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    validateRol,
    existRole
}