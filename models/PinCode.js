import mongoose from 'mongoose';

const pincodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique:true,
  },
  city: {
    type: String,
    required: true,
    unique:true,
  },
  area: {
    type: String,
    required: true,
    unique:true,
  },
});

export default mongoose.models.Pincode || mongoose.model('Pincode', pincodeSchema);