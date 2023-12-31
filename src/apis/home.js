import axios from '../Axios'

export const getHome = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axios ({
            url: '/api/home',
            method: 'get'
        })
        resolve(response)
    } catch (error){
        reject(error)
    } 
})
