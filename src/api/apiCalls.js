import { api } from "./axiosInstances"

export const getPropertyList = async (payload = {}) => {
    try {
         const response = await api.post('/property/getpropertylist', payload, {
            timeout: 10000,
            headers: { 'Content-Type': 'application/json'}
         })
    return response.data
    } catch (error) {
        console.error('Error on Property Listing: ', error)
        throw error
    }
   
}