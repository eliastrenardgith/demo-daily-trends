import mongoose, { Schema } from 'mongoose';
import { IFeed } from './feed.interface';

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

export default mongoose.model<IFeed>('feed', FeedSchema);
