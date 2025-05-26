import mongoose, { Schema } from 'mongoose';

export interface IFeed extends Document {
  name: string;

  url: string;

  createdAt: Date;

  updatedAt: Date;
}

const FeedSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model<IFeed>('Feed', FeedSchema);
