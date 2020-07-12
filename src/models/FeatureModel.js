import mongoose from '../config/db';

const FeatureModelSchema = new mongoose.Schema({
  FeatureModelJson: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FeatureModel = mongoose.model('FeatureModel', FeatureModelSchema);

export default FeatureModel;
