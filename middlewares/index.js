const validarCampos = require('../middlewares/validar-campo');
const validarJWT = require('../middlewares/validate-jwt');
const existRole = require('../middlewares/validate-rol');
const validateRol = require('../middlewares/validate-rol');
const validateFile = require('../middlewares/validate-file');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...existRole,
    ...validateRol,
    ...validateFile
}