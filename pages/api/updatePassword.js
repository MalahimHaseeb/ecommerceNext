import connectDb from "@/middleware/mongoose"
import User from "@/models/User";
import jsonwebtoken from "jsonwebtoken";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    try {
        if (req.method == 'PUT') {
            let token = req.body.token
            let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
            let dbuser = await User.findOne({email:user.email})
            let decreptedpassword =CryptoJS.AES.decrypt(dbuser.password,process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
            if(decreptedpassword == req.body.password && req.body.newpassword == req.body.cpassword){

                let dbuser = await User.findOneAndUpdate({ email: user.email }, {password:CryptoJS.AES.encrypt(req.body.cpassword,process.env.SECRET_KEY).toString()});
                res.status(200).send({
                    success:true
                })  
                return
            }else{
                res.status(500).send({
                    success:false
                })  
            }
        }
        else {
            res.status(400).send({
                error: "error"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting products',
            error
        })
    }


}

export default connectDb(handler);
