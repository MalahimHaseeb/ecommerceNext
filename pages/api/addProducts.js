import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"


const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            for (let i = 0; i < req.body.length; i++) {   
            let p = new Product({
                title: req.body[i].title,
                slug: req.body[i].slug,
                description: req.body[i].description,
                img: req.body[i].img,
                category: req.body[i].category,
                size: req.body[i].size,
                color: req.body[i].color,
                tPrice: req.body[i].tPrice,
                price: req.body[i].price,
                availableQty: req.body[i].availableQty,
            })
            await p.save();
        }
        res.status(200).send({
            success: true,
            message: 'Successfully add product',
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
            message: 'Error in adding products',
            error
        })
    }
    
    
}
export default connectDb(handler);


