const { Schema, model } = require('mongoose');
const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    pass: {
        type: String,
        required: [true, 'La constraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function() {
    const { _id, pass, __v, ...user } = this.toObject();
    user.uid = _id;
    
    return user;
}


module.exports = model( 'User', UserSchema );
