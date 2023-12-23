import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"


const handler = async (req, res) => {
    try {
        if (req.method == 'PUT') {
            for (let i = 0; i < req.body.length; i++) {   
            let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
            await p.save();
        }
        res.status(200).send({
            success: true,
            message: 'Successfully update product',
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
            message: 'Error in updating products',
            error
        })
    }


}

export default connectDb(handler);
