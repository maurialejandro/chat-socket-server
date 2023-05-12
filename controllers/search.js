const { ObjectId } = require('mongoose').Types;
const { response } = require('express');
const User = require('../models/user');
const Categorie = require('../models/categorie');
const Product = require('../models/product');

const collectionAllowed = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchUsers = async ( term = '', res = response ) => {
    const isMongoID = ObjectId.isValid( term ); 
    if( isMongoID ){
        const user = await User.findById( term )
        return res.json({
            result: ( user ) ? [ user ] : []
        })
    }
    const regex = new RegExp( term, 'i' );
    
    const user = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ google: true }]
    });
    res.json({
        result: user
    })
}
const searchCategories = async ( term = '', res = response ) => {
    const isMongoID = ObjectId.isValid( term ); 
    if( isMongoID ){
        const categorie = await Categorie.findById( term )
        return res.json({
            result: ( categorie ) ? [ categorie ] : []
        })
    }
    const regex = new RegExp( term, 'i' );
    
    const categorie = await Categorie.find({ name: regex, status: true });
    res.json({
        result: categorie
    })
}
const searchProduct = async ( term = '', res = response ) => {
    const isMongoID = ObjectId.isValid( term ); 
    if( isMongoID ){
        const product = await Product.findById( term );
        return res.json({
            result: ( product ) ? [ product ] : []
        })
    }
    const regex = new RegExp( term, 'i' );
    
    const product = await Product.find({ name: regex, status: true });
    res.json({
        result: product
    })
}

const search = async ( req, res) => {
const { collection, search } = req.params;
    
    if( !collectionAllowed.includes( collection )){
        return res.status(400).json({
            msg: 'Las colecciones permitidas son: ',
            collectionAllowed
        })
    }

    switch (collection) {
        case 'users':
            searchUsers( search, res );
        break;
    
        case 'categories':
            searchCategories( search, res );
        break;

        case 'products':
            searchProduct( search, res );
        break;
        default:
            res.status(500).json({
                msg: 'Se meolvido hacer esta busqueda'
            })
    }
    
}


module.exports = {
    search
}