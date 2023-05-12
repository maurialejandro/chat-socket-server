const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validateFile } = require('../middlewares');
const { uploads, updateImg, showImg, updateImgCloudinary } = require('../controllers/uploads');
const { allowedCollection } = require('../helpers/db-validators');

const router = Router();

router.post( '/', uploads );
router.put( '/:collection/:id', [
    validateFile,
    check('id', 'ID debe ser de mongo').isMongoId(),
    check('collection').custom( c => allowedCollection( c, ['user', 'product'] ) ),
    validarCampos
], updateImgCloudinary )
router.get('/:collection/:id', [
    check('id', 'ID debe ser de mongo').isMongoId(),
    check('collection').custom( c => allowedCollection( c, ['user', 'product'] ) ),
    validarCampos
], showImg)
// router.put('/:collection/:id', [
//     check('id', 'ID debe ser de mongo').isMongoId(),
//     check('collection').custom( c => allowedCollection( c, ['user', 'product'] ) ),
//     validarCampos
// ],updateImgCloudinary)

module.exports = router