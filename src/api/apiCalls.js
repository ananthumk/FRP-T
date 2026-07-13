import { api } from "./axiosInstances"

export const getPropertyList = async (filter) => {
    const response = await api.post('/property/getpropertylist', filter)
    return response.data
}