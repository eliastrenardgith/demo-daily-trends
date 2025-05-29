import mongoose, { Schema } from 'mongoose';

export interface INews {
  title: string;
  summary: string;
  url: string;
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
      type: String,
      required: true,
      trim: true,
      unique: true, // Feeds WILL BE UNIQUE, to keep integrity avoiding unnecessary redundancy and duplications.
    },
    news: [
      {
        title: { type: String, required: true },
        summary: { type: String, required: false },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<IFeed>('Feed', FeedSchema);
