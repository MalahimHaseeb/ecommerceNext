import connectDb from "@/middleware/mongoose"
import User from "@/models/User";
import jsonwebtoken from "jsonwebtoken";
import { isAdmin } from "./adminApi";

const handler =  (isAdmin,async(req, res) => {
    try {
        if (req.method == 'POST') {
            let token = req.body.token
            let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
            let dbuser = await User.findOne({ email: user.email });
            const {name, email,address,pincode,phone } = dbuser
            res.status(200).send({
                name, email,address,pincode ,phone
            })
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


})

export default connectDb(handler);
