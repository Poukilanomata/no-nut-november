import Account from "../../../utils/accountSchema";
import connectMongo from "../../../utils/connectMongo";
import { getCookie } from 'cookies-next'
import awards from '../../../utils/constant/awards'

var jwt = require('jsonwebtoken')

export default async function handler(req, res) {
    await connectMongo()
    let token = getCookie('token', {res, req})

    function get_award(end, start) {
        let diff = end - start
        let days = Math.floor(diff/86400)
        
        let keys = Object.keys(awards)

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]

            if(awards[key].day === days) {
                console.log(key)
                return key 
            } else if (awards[key].day > days) {
                console.log(keys[i - 1])
                return keys[i - 1]
            }
        }
    }

    try {
        var decoded = jwt.verify(token, process.env.SECRET_JWT)

    } catch (error) {
        console.log(error)
        res.status(200).json({
            success: false,
            message: 'Cannot find the user'
        })
        return
    }

    if(req.body.holding === true) {
        var user = await Account.findOne({_id: decoded.userid})
        console.log(get_award(Date.now()/1000, user.fails_dates[user.fails_dates.length - 1]))
        await Account.updateOne({_id: decoded.userid}, {
            $set: {
                last_validation: Date.now()/1000,
                awards: get_award(Date.now()/1000, user.fails_dates[user.fails_dates.length - 1])
            }  
        })
        
        res.status(200).json({
            success: true,
        })
        return

    } else if(req.body.holding === false) {
        await Account.updateOne({_id: decoded.userid}, {
            $push: {
                fails_dates: Math.floor(Date.now()/1000)
            }
        })
        res.status(200).json({
            success: true,
        })
        return
    }

    res.status(200).json({
        success: false,
    })
    return
}