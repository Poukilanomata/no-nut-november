import { getCookies, setCookie, deleteCookie } from 'cookies-next'

import Account from '../../../utils/accountSchema'
import connectMongo from '../../../utils/connectMongo'

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

export default async function handler(req, res) {

    let name = req.body.name
    let pwd = req.body.pwd

    await connectMongo()

    let user = await Account.findOne({name: name}, ["_id"])

    if(user) {
        res.status(200).json({
            success: false,
            message: 'This account already exist...'
        })
        return
    } else {

        let new_user = new Account({
            name: name,
            password: bcrypt.hashSync(pwd, 8),
            last_validation: Date.now(),
            awards: []
        })

        new_user.save((err, user) => {
            if(err) {
                res.status(200).json({
                    success: false,
                    message: 'Something goes wrong...'
                })
                return
            } else {
                let token = jwt.sign({userid: user._id}, process.env.SECRET_JWT)
                setCookie('token', token, {
                    req,
                    res,
                    httpOnly: true,
                    secure: true,
                    maxAge: 100 * 24 * 3600
                })

                res.status(200).json({
                    success: true,
                    user: new_user,
                    message: 'Welcome soldier !'
                })
                return
            }
        })
    }

    return
}