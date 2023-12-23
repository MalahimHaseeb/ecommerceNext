import connectDb from "@/middleware/mongoose"
import User from "@/models/User";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
    try {
        if (req.method == 'PUT') {
            let token = req.body.token
            let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
            let dbuser = await User.findOneAndUpdate({ email: user.email } ,{address:req.body.address, pincode:req.body.pincode ,phone:req.body.phone ,name:req.body.name});
           
            res.status(200).send({
                success:true
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


}

export default connectDb(handler);
