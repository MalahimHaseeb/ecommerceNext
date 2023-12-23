import User from "@/models/User"
import connectDb from "@/middleware/mongoose"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {
         const{name,email}=req.body   
        let u = new User({name,email,friend:CryptoJS.AES.encrypt(req.body.friend,process.env.SECRET_KEY1).toString(),password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()})
        await u.save()
        res.status(200).send({
            success: true,
            message: 'Your account has been created',
        })
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
            message: 'Error in adding User',
            error
        })
    }


}

export default connectDb(handler);
