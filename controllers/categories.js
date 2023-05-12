const Categorie = require('../models/categorie');

const getCategories = async (req, res) => {
    const { limit = 5, since = 0 } = req.query;
    // Pasar a entero y comprobar que sea

    const [ total, categories ] = await Promise.all([
        Categorie.countDocuments({ status:true }),
        Categorie.find({ status: true })
            .skip(Number(since))
            .limit(Number(limit))
            .populate('user', 'name')
    ])

    res.json({
        msg: 'get API',
        total,
        categories
    })
    
}

const getOneCategorie = async (req, res) => {
    const { id } = req.params;

    const categorie = await Categorie.findById( id ).populate('user', 'name')
    if( !categorie ){
        return res.status(401).json({
            msg: 'No se ha encontrado la categoria'
        })
    }

    res.json({
        msg: 'Categorias',
        categorie
    })
}

const createCategorie = async (req, res) => {


    const name = req.body.name.toUpperCase();
    const categorieDB = await Categorie.findOne({ name: name })
    if( categorieDB ) {
        return res.status(400).json({
            msg: `Categoria ${categorieDB.name} ya existe`
        })
    }

    const data = {
        name, 
        user: req.user._id
    }

    const categorie = new Categorie(data)
    await categorie.save();

    res.status(201).json(
        categorie
    )
}

const putCategorie = async (req, res) => {
    const { id } = req.params;
    const name = req.body.name.toUpperCase();
    
    try {
        const categorie = await Categorie.findByIdAndUpdate( id ,{ name: name })
        res.status(200).json({
            msg: 'Update categoris',
            categorie
        })
    } catch (error) {
        throw new Error('No se pudo encontrar la categoria', error)
    }
}

const deleteCategorie = async (req, res) => { 
    const id = req.params.id;
    try {
        const categorie = await Categorie.findByIdAndUpdate( id,{ status: false } )
        res.status(200).json({
            msg: 'Update categorie',
            categorie
        })
    } catch (error) {
        throw new Error('No se pudo encontrar la categoria', error)
    }
}

module.exports = { 
    getCategories,
    getOneCategorie,
    createCategorie,
    putCategorie,
    deleteCategorie
}
