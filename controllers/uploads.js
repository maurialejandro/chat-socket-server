const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { uploadFile } = require('../helpers/uploadFile');
const User = require('../models/user');
const Product = require('../models/product');
const cloudinary = require('cloudinary').v2;

const uploads = async (req, res = response ) => {

    try {
      const completePath = await uploadFile( req.files, undefined, 'text' );
      res.json({
        name: completePath
      });
    } catch (error) {
      res.status(400).json({ error });
    }

}

const updateImg = async ( req, res = response ) => {

  const { id, collection } = req.params;
  
  let model;
  
  switch (collection) {
    case 'user':

      model = await User.findById(id);
      if( !model ){
        res.status(400).json({
          msg: `No existe el usuario con el id ${id}`
        });
      }
      break;
      
    case 'product':
      
    model = await Product.findById(id);
      if( !model ){
        res.status(400).json({
          msg: `No existe el producto con el id ${id}`
        });
      }
    break;

      default:
        return res.status(500).json({ msg: 'Se me olvido validar esto' });
      }
  
  if( model.img ){

    const pathImg = path.join(__dirname, '../uploads', collection, model.img)
    if( fs.existsSync( pathImg ) ){
      fs.unlinkSync( pathImg );
    }
  }

  const completePath = await uploadFile( req.files, undefined, collection );
  model.img = completePath;
  await model.save();
  res.json({
    model
  })
}

const updateImgCloudinary = async ( req, res = response ) => {

  const { id, collection } = req.params;
  
  let model;
  
  switch (collection) {
    case 'user':

      model = await User.findById(id);
      if( !model ){
        res.status(400).json({
          msg: `No existe el usuario con el id ${id}`
        });
      }
      break;
      
    case 'product':
      
    model = await Product.findById(id);
      if( !model ){
        res.status(400).json({
          msg: `No existe el producto con el id ${id}`
        });
      }
    break;

      default:
        return res.status(500).json({ msg: 'Se me olvido validar esto' });
      }
  
  if( model.img ){
    const nameArr = model.img.split('/');
    const name = nameArr[ nameArr.length - 1 ];
    const [ public_id ] = name.split('.');
    cloudinary.uploader.destroy( public_id );
  }

  const tempFile = req.files.archivo;
  console.log(tempFile)
  const resp = await cloudinary.uploader.upload( tempFile.tempFilePath );
  model.img = resp.url;
  await model.save();
  res.json({
    resp
  })
}

const showImg = async (req, res) => {
  const { id, collection } = req.params;
  let model;
  
  switch (collection) {
    case 'user':
      model = await User.findById(id);
      if( !model ){
        res.status(400).json({
          msg: `No existe el usuario con el id ${id}`
        });
      }
    
    break;
      
    case 'product':
      model = await Product.findById(id);
      if( !model ){
        res.status(400).json({
          msg: `No existe el producto con el id ${id}`
        });
      }
    break;

      default:
        return res.status(500).json({ msg: 'Se me olvido validar esto' });
      }
  
  if( model.img ){

    const pathImg = path.join(__dirname, '../uploads', collection, model.img);
    
    if( fs.existsSync( pathImg ) ){
      return res.sendFile(pathImg);
    }
  } else {
    const defaultPathImg = path.join( __dirname, '../uploads/default', 'default.jpg' );
    return res.sendFile(defaultPathImg);
  }

  res.json({
    msg: 'Falta place holder'
  })
}

module.exports = {
    uploads,
    updateImg,
    showImg,
    updateImgCloudinary
}