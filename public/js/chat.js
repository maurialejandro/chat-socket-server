let user = null;
let socket = null;


const validateJWT = async () => {
    
    const token = localStorage.getItem('token') || '' ;
    
    if( token.length <= 10 ){
        window.location = 'index.html';
        throw new Error('No token app');
        
    }
    
    const resp = await fetch( 'http://localhost:8081/api/auth/login', {
        headers: { 'X-token': token }
    });
    
    const { user: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB);
    user = userDB;
    document.title = user.name;
    await socketConnect();

}

const socketConnect = async () => {
    const socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

}


const main = async  () => {

    // Validar JWT
    await validateJWT();


}

main()