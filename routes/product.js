const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, createProduct, deleteProduct, updateProduct, getOneProduct } = require('../controllers/product')
const { 
    validarCampos,
    validateRol,
    existRole,
    validarJWT,
 } = require('../middlewares')
const { isObjectId } = require('../helpers/db-validators');

const router = Router();

// Obtener todas los productos
router.get('/',[
    validarJWT,
], getProducts)

router.get('/:id', [
    validarJWT,
    check('id').custom( isObjectId ),
    validarCampos
], getOneProduct)


router.post('/',[
    validarJWT,
    check('categorie').custom( isObjectId ),
    check('name', 'Nombre es requerido').not().isEmpty(),
    validarCampos
],createProduct)

router.put('/:id', [
    validarJWT,
    check('id').custom( isObjectId ),
    validarCampos
], updateProduct)

router.delete('/:id', [
    validarJWT,
    check('id').custom( isObjectId ),
    validarCampos
], deleteProduct)

module.exports = router;