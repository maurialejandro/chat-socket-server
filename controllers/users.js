const { response } = require('express')
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const usersGet = async (req, res = response) => {
    const { limit = 5, since = 0 } = req.query;
    // Pasar a entero y comprobar que sea

    const [ total, users ] = await Promise.all([
        User.countDocuments({ state:true }),
        User.find({ state: true })
            .skip(Number(since))
            .limit(Number(limit))
    ])
    res.json({
        msg: 'get API',
        total,
        users
    })
}


const usersPut = async (req, res) => {

    const id = req.params.id
    const { _id, pass, google, email, ...rest } = req.body;

    // TODO validar contra db
    if( pass ){
        const salt = bcryptjs.genSaltSync(10);
        rest.pass = bcryptjs.hashSync(pass, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest ); 
    
    res.json({
        msg: 'put API',
        user
    })
}

const usersPost = async (req , res) => {
    
    const { name, pass, email, role } = req.body;
    const user = new User({name, pass, email, role});

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    user.pass = bcryptjs.hashSync(pass, salt);

    // Guardar
    try {
        await user.save();
    } catch (error) {
        console.log(error, ' aqui en el error');
        throw new Error('Error al guardar User');
    }

    res.json({
        msg: 'post API',
        user
    })
}

const usersDelete = async (req, res) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate( id, { state: false } );
    const userAuth = req.user;

    res.json({
        msg: 'delete API',
        user,
        userAuth
    })
}

const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API'
    })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}
