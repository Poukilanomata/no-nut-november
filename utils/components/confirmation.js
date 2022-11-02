import React, {useState} from "react";
import confirm from '../../styles/Confirm.module.scss'

import axios from 'axios'
import { toastAll } from "../functions";
import { toast } from "react-toastify";


axios.defaults.withCredentials = true

function Confirmation(props){
    const [confirmed, setConfirm] = useState(false)
    const [holding, setholding] = useState(null)

    function confirmation(hold) {
        axios.post('/api/handler/confirm', {
            holding: hold
        }).then((res) => {
            if(res.data.success) {
                hold? toast('GG bro keep it up !', {position: 'bottom-center'}): toast("Try again you'll do better next time !!", {position: 'bottom-center'})
                setholding(hold)
                setConfirm(true)
                return
            }

            toastAll('Something gone wrong ...')
            return
        })
    }

    return(
        <>
            <div className={confirm.container}>
                <div className={confirm.message_container}>
                    {!confirmed?
                        <h3>Still holding @{props.user.name} ?</h3>
                    : <h3>See you later man !</h3>}
                    
                </div>
                {!confirmed?
                <div className={confirm.button_container}>
                    <span className={confirm.confirm} onClick={() => confirmation(true)}>Confirm !</span>
                    <span className={confirm.fail} onClick={() => confirmation(false)}>Retry ...</span>
                </div>
                :null}
            </div>
        </>
    )
}

export default Confirmation