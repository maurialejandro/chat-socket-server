const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn, validateTokenController } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares');

const router = Router();

router.post('/',[
    check('email', 'Email es obligatorio').isEmail(),
    check('pass', 'Contraseña es obligatoria').isLength({ min:6 }),
    validarCampos
] , login)

router.post('/google',[
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos
] , googleSingIn)

router.get('/', validarJWT, validateTokenController )

module.exports = router;