const path = require('path');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, validExtension = [ 'png', 'jpg', 'jpeg', 'gif' ], file = '' ) => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        
        const nameShort = archivo.name.split('.');
        const extension = nameShort[ nameShort.length - 1 ];

        // Validate the extension
        if( !validExtension.includes(extension) ){
            return reject(`La extension ${extension} no es permitida, ${ validExtension } `);
        }

        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', file, nameTemp );

        archivo.mv(uploadPath, (err) => {
            if(err){
                reject(err)
            }
            resolve(nameTemp);
        });

    });
}

module.exports = { 
    uploadFile
}
