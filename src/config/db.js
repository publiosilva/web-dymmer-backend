import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
