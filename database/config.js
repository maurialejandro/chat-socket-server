const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGODB_CNN);
        console.log('connected');
    } catch (error) {
        console.log(error, 'aqui en el error');
        throw new Error('Error al conectar db')
    }
}
 
module.exports = {
    dbConnection
}