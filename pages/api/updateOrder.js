// pages/api/updateDeliveryStatus.js

import mongoose from 'mongoose';
import Order from '@/models/Order'; // Import the Order model

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Parse the request body
    const { orderId, deliveryStatus } = req.body;

    // Connect to the MongoDB database
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    // Find and update the order
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { $set: { deliveryStatus } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Respond with the updated order
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating delivery status:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
