const Role = require('../models/role');
const User = require('../models/user');
const Categorie = require('../models/categorie');
const ObjectId = require('mongoose').Types.ObjectId;

const isValidRole = async ( role = '' ) => {
    
    const existRole = await Role.findOne({ role });
    
    if( !existRole ){
        throw new Error(`El rol ${ role } no está registrado en la db`)
    }
}

const userEmailExist = async ( email= '' ) => {

    const existeEmail = await User.findOne({ email });

    // Verificar correo
    if(existeEmail){
        throw new Error(`Este correo: ${ email } esta registrado`)
    }   
}

const isValidUserId = async ( id  ) => {
    const user = await User.findById({ _id: id })
    if(!user){
        console.log('no existe el usuario entonces no actualizar')
        throw new Error('El ID ingresado no es correcto')
    }
}

const isValidCategorieId = async ( id  ) => {
    const categorie = await Categorie.findById({ _id: id })
    if(!categorie){
        console.log('no existe categoria entonces no actualizar')
        throw new Error('El ID ingresado no es correcto')
    }
}


const isObjectId = async ( id = '' ) => {
    if( !ObjectId.isValid(id) ){
        throw new Error('El ID ingresado no es correcto')
    }
}

const allowedCollection = ( collection = '', colections = [] ) => {
    const include = colections.includes( collection );
    if( !include ){
        throw new Error(`La coleccion ${ colection } no es permitida, ${ collections }`)
    }

    return true;
}
module.exports = {
    isValidRole,
    userEmailExist,
    isValidUserId,
    isObjectId,
    isValidCategorieId,
    allowedCollection
}