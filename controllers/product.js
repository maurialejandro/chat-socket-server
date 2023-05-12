const Product = require('../models/product');

const getProducts = async (req, res) => {

    const { limit = 5, since = 0 } = req.query;

    const [ total, product ] = await Promise.all([
        Product.countDocuments({ status: true }),
        Product.find({ status: true })
            .skip(Number(since))
            .limit(Number(limit))
            .populate('user', 'name')
            .populate('categorie', 'name')
    ])


    res.json({
        msg: 'aqui en el obtener prooducts',
        product
    })
}

const getOneProduct = async (req, res) => { 

    const { id } = req.params;

    const product = await Product.findById( id )
        .populate('user', 'name')
        .populate('categorie', 'name')

    if( !product ){
        return res.status(401).json({
            msg: 'No se ha encontrado la categoria'
        })
    }

    res.json({
        msg: 'Product',
        product
    })
} 
const createProduct = async (req, res) => {

    const { name, price, description, categorie } = req.body;
    const productDB = await Product.findOne({ name: name });
    
    if( productDB ) {
        return res.status(400).json({
            msg: `Product ${productDB.name} ya existe`
        })
    }

    const data = {
        name,
        price, 
        description, 
        categorie,
        user: req.user._id,
    }
    try {
        const product = new Product(data)
        await product.save();
        
        res.status(201).json(
            product
        )
        
    } catch (error) { 
        console.log(error)    
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate( id, { status: false });
        res.status(200).json({
            msg: 'Product',
            product
        })
    } catch (error) {
        throw new Error('No se elimino el producto', error)
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const name = req.body.name.toUpperCase();
    try {
        const product = await Product.findByIdAndUpdate( id ,{ name: name })
        res.status(200).json({
            msg: 'Update product',
            product
        })
    } catch (error) {
        throw new Error('No se pudo encontrar la product', error)
    }
    res.json({
        msg: 'aqui en el update'
    })
}

module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getOneProduct
}