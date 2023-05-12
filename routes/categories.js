const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getCategories, 
    getOneCategorie, 
    createCategorie,
    putCategorie,
    deleteCategorie
} = require('../controllers/categories');
const { 
    validarCampos,
    validateRol,
    existRole,
    validarJWT,
 } = require('../middlewares')
const { isObjectId, isValidCategorieId } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias
router.get('/',[
], getCategories)

// Obtener una categoria
router.get('/:id', [
    validarJWT,
    check('id').custom( isObjectId ),
    //check('id').custom( isValidCategorieId ),
    validarCampos
],getOneCategorie)

// Crear categoria - privado - cualquier user con token
router.post('/', [
    validarJWT,
    check('name', 'Nombre es requerido').not().isEmpty(),
    validarCampos
], createCategorie)

// Actualizar - privado - cualquier user con token
router.put('/:id', [
    validarJWT,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('id').custom( isObjectId ),
    validarCampos
], putCategorie)

// Borrar categoria - solo user Admin
router.delete('/:id', [
    validarJWT,
    validateRol,
    check('id').custom( isObjectId ),
    validarCampos
], deleteCategorie)

module.exports = router;