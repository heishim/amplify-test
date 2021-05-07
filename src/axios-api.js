import axios from 'axios'

const getAPI = axios.create({

    //baseURL: 'http://ec2-34-222-77-100.us-west-2.compute.amazonaws.com',
    baseURL : 'https://django.backend-altao.com',
    //baseURL: 'http://127.0.0.1:8000',
    timeout: 3500000,
})

export {getAPI}
