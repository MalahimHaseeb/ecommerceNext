import PinCode from "@/models/PinCode";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  try {
    if (req.method === 'DELETE') {
      const { id } = req.body;

      // Check if the ID parameter is provided
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'PinCode ID is required for deletion',
        });
      }

      // Attempt to find and delete the PinCode by its ID
      const deletedPinCode = await PinCode.findByIdAndDelete(id);

      if (!deletedPinCode) {
        return res.status(404).json({
          success: false,
          message: 'PinCode not found for deletion',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Successfully deleted PinCode',
        data: deletedPinCode,
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
      message: 'Error in deleting PinCode',
      error,
    });
  }
};

export default connectDb(handler);
