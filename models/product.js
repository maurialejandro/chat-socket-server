const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
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
    price: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    description: { type: String },
    available: { type: String, default: true },
    img: { type: String }
})

ProductSchema.methods.toJSON = function() {
    const { __v, _id, ...product} = this.toObject();
    
    return product;
}


module.exports = model( 'Product', ProductSchema );