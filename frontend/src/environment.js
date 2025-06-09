let IS_PROD = true;

const server = IS_PROD ?
    "https://vibeconnectbackend-t3kq.onrender.com"
    :
    "http://localhost:8000"



export default server;