import { getCookies, setCookie, deleteCookie } from 'cookies-next'

import Account from '../../../utils/accountSchema'
import connectMongo from '../../../utils/connectMongo'

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

export default async function handler(req, res) {
    let name = req.body.name
    let pwd = req.body.pwd

    await connectMongo()

    let user = await Account.findOne({name: name})
    
    if(!user) {
        res.status(200).json({
            success: false,
            message: 'User not found ...'
        })
    } else {
        if(bcrypt.compareSync(pwd, user.password)) {
            setCookie('token', jwt.sign({userid: user._id}, process.env.SECRET_JWT), {
                req,
                res,
                httpOnly: true,
                secure: true,
                maxAge: 100 * 24 * 3600
            })

            res.status(200).json({
                success: true,
                user: user,
                message: 'Welcome back !'
            })
        } else {
            res.status(200).json({
                success: false,
                message: 'Invalid password ...'
            })
        }
    }
}