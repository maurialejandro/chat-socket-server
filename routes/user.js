const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validarCampos,
    validateRol,
    existRole,
    validarJWT
 } = require('../middlewares')

const {  isValidRole, userEmailExist, isValidUserId } = require('../helpers/db-validators');

const router = Router();

const { 
    usersGet, 
    usersPut, 
    usersPost, 
    usersDelete, 
    usersPatch 
} = require('../controllers/users');

router.get('/', usersGet)
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isValidUserId ),
    check('role').custom( isValidRole ),
    validarCampos
], usersPut )
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('pass', 'El pass debe ser más de 6 letras').isLength({ min:6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('role').custom( isValidRole ),
    check('email').custom( userEmailExist ),
    validarCampos,
], usersPost )
router.delete('/:id', [
    validarJWT,
    // validateRol,
    existRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isValidUserId ),
    usersDelete])
router.patch('/', usersPatch)

module.exports = router;
