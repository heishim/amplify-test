import axios from 'axios'

const getAPI = axios.create({

    baseURL : 'https://backend-altao.com',
    //baseURL: 'http://127.0.0.1:8000',
    timeout: 3500000, //temps maximum d'attente de réponse du backend
})

export {getAPI}
