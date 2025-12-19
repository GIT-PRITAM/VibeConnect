let IS_PROD = false;
const LOCAL_URL = import.meta.env.VITE_LOCAL_BACKEND_URL;
const PROD_URL = import.meta.env.VITE_PROD_BACKEND_URL;


const server = IS_PROD ? PROD_URL : LOCAL_URL;



export default server;