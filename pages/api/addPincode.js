export default function handler(req, res) {
    let pincodes={
      "53800":["Lahore","Chung"],
      "53700":["Lahore","Thokar"],
      "53720":["Lahore","Bharia"],
      "53801":["Lahore","Mohlanwal"],
      "56171":["Lahore","Shahpor"],
    }
    res.status(200).json(pincodes)
  }

// import PinCode from "@/models/PinCode";
// import connectDb from "@/middleware/mongoose"


// const handler = async (req, res) => {
//     try {
//         if (req.method == 'POST') {
//             for (let i = 0; i < req.body.length; i++) {   
//             let p = new PinCode({
//                 code: req.body[i].code,
//                 city: req.body[i].city,
//                 area: req.body[i].area
//             })
//             await p.save();
//         }
//         res.status(200).send({
//             success: true,
//             message: 'Successfully add pincode',
//         })
//         }
//         else {
//             res.status(400).send({
//                 success: false,
//                 message: 'This method is not allowed',
//             })
//         }
       
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error in adding pincode',
//             error
//         })
//     }


// }

// export default connectDb(handler);



