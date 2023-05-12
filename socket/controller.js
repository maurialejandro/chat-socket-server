const { Socket } = require("socket.io");
const { checkToken } = require("../helpers/generateJWT");

const socketController = async ( socket = new Socket ) => {

    const user = await checkToken(socket.handshake.headers['x-token']);

    if( !user ){
        return socket.disconnect();
    }

    console.log('Se conecto', user.name);

}

module.exports = {
    socketController
}