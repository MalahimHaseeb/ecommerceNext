
import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            let { name, email, subTotal, address, oid, pincode, phone } = req.body;
            if (subTotal <= 0) {
                res.status(500).json({
                    success: false,
                    "error": "Your cart is empty. Please build your cart and try again.",
                });
                return;
            }
            //check if the details are valid -- [pending]


            // if(req.body.phone.length !== 10 || !Number.isInteger(req.body.phone)){
            //     res.status(500).json({
            //         success: false,
            //         "error": "Please enter your 10 digits phone number.",
            //     });
            //     return;
            // }

            //  Initiate the order

            let order = new Order({
                name,
                email,
                orderId: oid,
                address,
                amount: subTotal + 100,
                pincode,
                phone,
                products: req.body.cart
            });
            await order.save();
            //check the tempering of price  
            let product, sumtotal = 0;
            let cart = req.body.cart;
            if (subTotal <= 0) {
                res.status(500).json({
                    success: false,
                    "error": "Your cart is empty. Please build your cart and try again.",
                });
                return;
            }
            let products;
            for (let item in cart) {
                sumtotal += cart[item].price * cart[item].qty;
                product = await Product.findOne({ slug: item });
                let orders;
                orders = await Order.findOne({ orderId: oid })
                products = orders.products
                if (product.availableQty < cart[item].qty) {
                    res.status(500).json({
                        success: false,
                        "error": "Some items in your cart went out of stock. Please try again.",
                    });
                    return;
                }
                if (product.price != cart[item].price) {
                    res.status(500).json({
                        success: false,
                        "error": "The prices of items in your cart have changed",
                    });
                    return;
                }
            }
            for (let slug in products) {
                const productDetails = products[slug];
                console.log(productDetails);
                await Product.findOneAndUpdate(
                    { slug: slug },
                    { $inc: { "availableQty": -productDetails.qty } }
                );
            }
            res.status(201).json({
                success: true,
                "error": 'Order saved successfully',
                orderId: order._id
            }); // Include the orderId in the response


            if (sumtotal != req.body.subTotal) {
                res.status(500).json({
                    success: false,
                    "error": "The prices of items in your cart have changed",
                });
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ "error": 'Error saving order' });
        }
    }
};
export default connectDb(handler);
