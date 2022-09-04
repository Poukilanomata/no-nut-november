import { getCookie } from "cookies-next";
import Account from "../../../utils/accountSchema";
import connectMongo from "../../../utils/connectMongo";

var jwt = require('jsonwebtoken')

export default async function handler(req, res) {
    let token = getCookie('token', {res, req})
    await connectMongo()

    if(!token) {
        res.status(200).json({
            success: true,
            user: null
        })
        return
    }

    try {
        let decoded = jwt.verify(token, process.env.SECRET_JWT)
        let user = await Account.findOne({_id: decoded.userid}, ['name', 'last_update', 'awards'])

        res.status(200).json({
            success: true,
            user: user
        })
        return

    } catch (error) {
        res.status(200).json({
            success: true,
            user: null
        })
        return
    }
}