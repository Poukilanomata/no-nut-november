import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { store } from '../store/store'
import { setAuthState, setUser } from "../store/authSlice"

const fetchUser = async () => {
    let response = await axios.post('/api/authentication/get_user')
    return response
}

export const useUserQuery = () => useQuery(['user_data'], fetchUser, {
    refetchOnMount: false,
    onSuccess: (res) => {
        store.dispatch(setAuthState(res.data.user?true:false))
        store.dispatch(setUser(res.data.user))
        //store.dispatch(setAuthState())
    }
})