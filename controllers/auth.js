const { response } = require('express');
const { check } = require('express-validator');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res) => {
  
    try {
        const { email, pass } = req.body;
        // Verify if email exist
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                msg: 'Usuario o pass incorrecto - correo'
            });
        }
        // is user active
        if(!user.state){
            return res.status(400).json({
                msg: 'Usuario o pass incorrecto - estado: false'
            });
        }
        // verify pass
        const isValidPass = bcryptjs.compareSync( pass, user.pass );
        if( !isValidPass ){
            return res.status(400).json({
                msg: 'Usuario o pass incorrecto - password: false'
            });
        }
    
        // Generar el JWT
        const token = await generateJWT( user.id ) 
        
        res.json({
            msg: 'Login ok',
            user,
            token
        })
    } catch (e) {
        throw new Error(e);
    }
}

const googleSingIn = async (req, res = response) => {
    const { id_token } = req.body;
    try {

        const { name, picture, email } = await googleVerify( id_token )
        
        let user = await User.findOne({ email })

        if ( !user ) {
            
            const data = { name, email, picture, pass: ':P', google: true, role: 'USER_ROLE' }
            user = new User(data)
            await user.save();
        }
                
        if( user.state == null  ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, user block'
            })
        } 
        // Generar token JWT
        const token = await generateJWT(user.id);

        res.status(200).json({
            user,
            token
        })
        
    } catch (e) {
       console.log(e);
        // res.status(400).json({
        //     ok: false,
        //     msg: ' Token no se pudo verificar'
        // })
    }
}

const validateTokenController = async ( req, res= response ) => { 

    const { user } = req;
    const token = await generateJWT(user.id);
    
    res.json({
        user,
        token
    })

}



module.exports = {
    login,
    googleSingIn,
    validateTokenController
};