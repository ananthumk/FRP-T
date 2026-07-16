import { api } from "./axiosInstances"

const APIhandler = async (method, url, payload = null) => {
    try {
        const response = await api({
            method, 
            url, 
            data: payload,
            timeout: 10000,
            headers: { 'Content-Type' : 'application/json' }
        })

        return response.data
    } catch (error) {
        console.log(`Error at ${url}: `, error)
        throw error
    }
}

export default APIhandler