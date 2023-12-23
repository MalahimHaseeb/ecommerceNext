
// import User from "@/models/User";

// export const isAdmin = async (req, res) => {
//     try {
//         const user = await User.findById({email:"hisham@gmail.com"});
//         console.log(user)
//         if (!user && user.role !== 1) {
//             return res.status(401).send({
//                 success: false,
//                 message: "User not found",
//             });
//         }else{
//             return res.status(200).send({
//                 success: true,
//             })
//         }
        
//     } catch (error) {
//         console.error("Error in admin middleware:", error);
//         res.status(500).send({
//             success: false,
//             error,
//             message: "Error in admin middleware",
//         });
//     }
// };

import User from "@/models/User";

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: "hisham@gmail.com" });
        if (!user || user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access",
            });
        }
        next(); // Call next to proceed with the request if the user is an admin.
    } catch (error) {
        console.error("Error in admin middleware:", error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in admin middleware",
        });
    }
};

export default isAdmin;

