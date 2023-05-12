const { Router } = require('express');
const { check } = require('express-validator');
const { search } = require('../controllers/search')
const { 
    validarCampos,
    validateRol,
    existRole,
    validarJWT,
 } = require('../middlewares')
const { isObjectId } = require('../helpers/db-validators');

const router = Router();

// Obtener todas los productos
router.get('/:collection/:search',[
    validarJWT,
], search)

module.exports = router;