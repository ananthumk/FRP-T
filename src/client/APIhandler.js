import { useAuth } from "../context/ContextAPI"
import { api } from "./axiosInstances"

const useAPIhandler = () => {
    const { token, user } = useAuth()
    const parsedUser = JSON.parse(user)

    return async (method, url, payload = {}) => {
        if (token && method !== 'get' && payload !== null) {
            payload = {
                ...payload,
                LoggedUserId: parsedUser?.userId
            }
        }

        const response = await api({
            method,
            url,
            data: payload,
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' }
        })

        return response.data
    }
}

export default useAPIhandler