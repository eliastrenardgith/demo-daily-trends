import mongoose, { Schema } from 'mongoose';

export interface INews {
  title: string;
  summary: string;
}

export interface IFeed extends Document {
  url: string;
  news: INews[];
  createdAt: Date;
  updatedAt: Date;
}

const FeedSchema: Schema = new Schema(
  {
    url: {
      // TODO: This MUST be unique to avoid redundancy.
      type: String,
      required: true,
      trim: true,
    },
    news: [
      {
        title: { type: String, required: true },
        summary: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<IFeed>('Feed', FeedSchema);
