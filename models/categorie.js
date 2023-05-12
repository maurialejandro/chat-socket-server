const { Schema, model } = require('mongoose');
const CategorieSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

CategorieSchema.methods.toJSON = function() {
    const { __v, _id, ...categorie} = this.toObject();
    
    return categorie;
}


module.exports = model( 'Categorie', CategorieSchema );