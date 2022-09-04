import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true

export function toastAll(e, type='error'){

    console.log(e)

    if(typeof(e) === 'string'){
        toast.error(e, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type:type
        })
    } else if(typeof(e) === 'array'){
        for (let i = 0; i < e.length; i++) {
            const element = e[i];
            toast.error(element, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type:type
            })
        }
    }else {
        for (const [key, value] of Object.entries(e)) {

            value.forEach(element => {
    
                toast.error(element, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    type:type
                })
            })
        }
    }    
}

export async function getUser() {

    let res = await axios.post('/api/authentication/get_user')

    if(res.data.success) {
        return {
            connected: res.data.user? true:false,
            user: res.data.user
        }
    } 

    toast('Something goes wrong during loading ...')
    
    return {
        connected: false,
        user: null
    }
}

export function getSuccess(res) {
    return res.data?.success? 'success':'warning'
}

