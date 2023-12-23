import PinCode from "@/models/PinCode";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      // Fetch all PinCodes from the database
      const pinCodes = await PinCode.find();

      res.status(200).json({
        success: true,
        message: 'Successfully retrieved PinCodes',
        data: pinCodes,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'This method is not allowed',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in retrieving PinCodes',
      error,
    });
  }
};

export default connectDb(handler);
