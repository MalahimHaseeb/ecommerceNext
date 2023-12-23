import User from "@/models/User"
import connectDb from "@/middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {

    try {
        if (req.method == 'POST') {
            let user = await User.findOne({ "email": req.body.email })
            if (user) {
                let password =CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
                if (req.body.email === user.email && req.body.password === password) {
                    var token = jwt.sign({ 
                        email: user.email,
                        name: user.name},process.env.JWT_SECRET,{ expiresIn: '3d'} );

                    res.status(200).send({ success: true,token , email: user.email})
                }
                else {
                    res.status(500).send({
                        success: false,
                        message: "Invalid Credentials"
                    })
                }

            } else {
                res.status(402).send({
                    success: false,
                    message: "No user  found"
                })
            }
        }
        else {
            res.status(400).send({
                success: false,
                message: 'This method is not allowed',
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }


}

export default connectDb(handler);


